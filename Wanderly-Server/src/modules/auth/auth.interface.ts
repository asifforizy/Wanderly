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



export interface ILoginUserPayload {
	email: string;
	password: string;
}


export interface IRequestUser {
	userId: string;
	email: string;
	name: string;
	role: Role;
}



export interface IGoogleLoginPayload {
	idToken: string;
}
