import { Role } from "../../../prisma/generated/prisma/enums";



export interface IRegisterUsersPayload {
	name: string;
	email: string;
	password: string;
    registerUser: {
		contactNumber?: string;
	};
}

export interface IVerifyEmailPayload {
	email: string;
	otp: string;
}


