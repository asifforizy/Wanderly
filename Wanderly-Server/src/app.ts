import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import config from "./config";
import cors from 'cors';
import { notFound } from "./middleware/notFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { AuthRoutes } from "./modules/auth/auth.routes";
import { DestinationRoutes } from "./modules/destination/destination.routes";









const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true
  })
);







app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: config.app_url,
    credentials: true
  })
);

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/destinations", DestinationRoutes);





app.get("/", async (req: Request, res: Response) => {
  res.send("wanderly server is running");
});









app.use(notFound)
app.use(globalErrorHandler)
export default app;