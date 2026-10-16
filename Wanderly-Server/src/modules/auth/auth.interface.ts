import { Role } from "../../../prisma/generated/prisma/enums";



export interface IRegisterUsersPayload {
	name: string;
	email: string;
	password: string;
}


