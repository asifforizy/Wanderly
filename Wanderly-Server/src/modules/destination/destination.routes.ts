import { Router } from "express";
import { DestinationController } from "./destination.controller";
import { Role } from "../../../prisma/generated/prisma/browser";
import { auth } from "../../middleware/checkAuth";

const router = Router();
router.get("/", DestinationController.getAllDestinations);
router.get("/my", auth(Role.ADMIN, Role.USER), DestinationController.getMyDestinations);
router.get("/:id/related", DestinationController.getRelatedDestinations);
router.get("/:id", DestinationController.getDestinationById);
 



export const DestinationRoutes = router;