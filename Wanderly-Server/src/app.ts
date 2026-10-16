import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import config from "./config";
import cors from 'cors';
import { notFound } from "./middleware/notFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";








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

app.get("/", async (req: Request, res: Response) => {
  res.send("RentNest");
});









app.use(notFound)
app.use(globalErrorHandler)
export default app;