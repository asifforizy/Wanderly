import { Router } from "express";
import { DestinationController } from "./destination.controller";
import { Role } from "../../../prisma/generated/prisma/browser";
import { auth } from "../../middleware/checkAuth";
import { DestinationValidation } from "./destination.validation";
import { validateRequest } from "../../middleware/validateRequest";

const router = Router();
router.get("/", DestinationController.getAllDestinations);
router.get("/my", auth(Role.ADMIN, Role.USER), DestinationController.getMyDestinations);
router.get("/:id/related", DestinationController.getRelatedDestinations);
router.get("/:id", DestinationController.getDestinationById);
router.post("/",  auth(Role.ADMIN, Role.USER),validateRequest(DestinationValidation.createDestinationZodSchema),DestinationController.createDestination,);
router.patch("/:id",auth(Role.ADMIN, Role.USER),validateRequest(DestinationValidation.updateDestinationZodSchema),DestinationController.updateDestination,);
router.delete("/:id", auth(Role.ADMIN, Role.USER), DestinationController.deleteDestination);


export const DestinationRoutes = router;