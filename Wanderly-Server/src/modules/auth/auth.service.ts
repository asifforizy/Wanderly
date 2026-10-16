import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import config from "../../config";
import { IRegisterUsersPayload, IVerifyEmailPayload } from "./auth.interface";
import { redisClient } from "../../lib/redis";
import ejs from "ejs";
import path from "path";
import { transporter } from "../../lib/nodemailer";
import { randomInt } from "crypto";
import { Role, UserStatus } from "../../../prisma/generated/prisma/client";
import { jwtUtils } from "../../utils/jwt";
import { SignOptions } from "jsonwebtoken";

const registerUsers = async (payload: IRegisterUsersPayload) => {
  const { name, password, registerUser: usersData } = payload;

  const email = payload.email.trim().toLowerCase();

  const isUserExists = await prisma.user.findUnique({
    where: { email },
  });

  if (isUserExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      "User with this email already exists"
    );
  }

  const hashedPassword = await bcrypt.hash(password, 8);

  const expirationSeconds = 5 * 60;

  const otpKey = `user-registration-otp:${email}`;
  const otpValue = randomInt(100000, 1000000).toString();

  await redisClient.set(otpKey, otpValue, {
    expiration: {
      type: "EX",
      value: expirationSeconds,
    },
  });

  const usersRegistrationKey = `user-registration-data:${email}`;
  const redisUserDataPayload = {
    name,
    email,
    password: hashedPassword,
    registerUser: usersData,
  };

  await redisClient.set(
    usersRegistrationKey,
    JSON.stringify(redisUserDataPayload),
    {
      expiration: {
        type: "EX",
        value: expirationSeconds,
      },
    }
  );

  const tempatePath = path.join(
    process.cwd(),
    "/src/templates/registration-user-otp.ejs"
  );

  const templateData = {
    name,
    email,
    otp: otpValue,
    expirationMinutes: expirationSeconds / 60,
  };

  const html = await ejs.renderFile(tempatePath, templateData);

  await transporter.sendMail({
    from: config.email_sender,
    to: email,
    subject: "Email Verification",
    html,
  });
};

const verifyUsersEmail = async (payload: IVerifyEmailPayload) => {
  const otp = payload.otp;
  const email = payload.email.trim().toLowerCase();

  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });

  if (isUserExist?.status === "BLOCKED") {
    throw new AppError(httpStatus.FORBIDDEN, "User is Blocked");
  }

  if (isUserExist?.emailVerified) {
    throw new AppError(httpStatus.CONFLICT, "Email ALready Verified");
  }

  if (isUserExist?.isDeleted || isUserExist?.status === "DELETED") {
    throw new AppError(httpStatus.FORBIDDEN, "User is Deleted");
  }

  const otpKey = `user-registration-otp:${email}`;

  const redisOtp = await redisClient.get(otpKey);

  if (!redisOtp) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid OTP");
  }

  if (redisOtp !== otp) {
    throw new AppError(httpStatus.BAD_REQUEST, "OTP Does Not Match");
  }

  await redisClient.del(otpKey);

  const UsersRegistrationKey = `user-registration-data:${email}`;

  const redisKidsData = await redisClient.get(UsersRegistrationKey);

  if (!redisKidsData) {
    throw new AppError(httpStatus.NOT_FOUND, "Users Doesnt Exist");
  }

  const usersPayload: IRegisterUsersPayload = JSON.parse(redisKidsData);

  const createdUser = await prisma.user.create({
    data: {
      name: usersPayload.name,
      email: usersPayload.email,
      password: usersPayload.password,
      role: Role.USER,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      registerUser: {
        create: {
          name: usersPayload.name,
          email: usersPayload.email,
          contactNumber: usersPayload?.registerUser?.contactNumber || "",
        },
      },
    },
    omit: { password: true },
    include: { registerUser: true },
  });

  await redisClient.del(UsersRegistrationKey);

  const tempatePath = path.join(
    process.cwd(),
    "/src/templates/users-welcome-email.ejs"
  );

  const templateData = {
    name: createdUser.name,
  };

  const html = await ejs.renderFile(tempatePath, templateData);

  await transporter.sendMail({
    from: config.email_sender,
    to: email,
    subject: "Welcome To Wanderly",
    // text : `Your OTP is ${otp}`
    // html: `<h1>Your OTP is ${otp}</h1>`
    html,
  });

  const { registerUser, ...user } = createdUser;
  const jwtPayload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions
  );

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions
  );

  return {
    user,
    registerUser,
    accessToken, 
    refreshToken,
  };
};

export const AuthService = {
  registerUsers,
  verifyUsersEmail,
};
