import { Router } from "express";
import { DestinationController } from "./destination.controller";

const router = Router();
router.get("/", DestinationController.getAllDestinations);






export const DestinationRoutes = router;