import { Router } from "express";
import { validateRequest } from '../../middleware/validateRequest';
import { UserValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";



const router = Router();

router.post("/register",validateRequest(UserValidation.UserRegistrationZodSchema),AuthController.registerUser,);
router.post("/verify-email",validateRequest(UserValidation.UserEmailVerifyZodSchema),AuthController.verifyUserEmail,);

export const AuthRoutes = router;
