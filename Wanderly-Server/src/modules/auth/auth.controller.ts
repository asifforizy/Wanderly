import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendresponse";
import { AuthService } from "./auth.service";


const registerUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  await AuthService.registerKids(payload);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Verification OTP Sent",
    data: null,
  });
});







export const AuthController = {
  registerUser,

};
