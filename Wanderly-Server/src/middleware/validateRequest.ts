import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { z } from "zod";
import { AppError } from "../utils/AppError";
import { catchAsync } from "../utils/catchAsync";

export const validateRequest = (zodSchema: z.ZodType) => {
  return catchAsync((req: Request, res: Response, next: NextFunction) => {
    const result = zodSchema.safeParse(req.body ?? {});

    if (!result.success) {
      console.log(result.error.issues);

      const issue = result.error.issues[0];
      const field = issue?.path.join(".");

      throw new AppError(
        httpStatus.BAD_REQUEST,
        field ? `${field}: ${issue?.message}` : issue?.message ?? "Validation failed"
      );
    }

    req.body = result.data;
    next();
  });
};