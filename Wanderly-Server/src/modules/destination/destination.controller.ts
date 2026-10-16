import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendresponse";
import httpStatus from "http-status";
import { IDestinationQuery } from "./destination.interface";
import { DestinationService } from "./destination.service";

const getAllDestinations = catchAsync(async (req: Request, res: Response) => {
  const result = await DestinationService.getAllDestinations(
    req.query as IDestinationQuery
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Destinations Retrieved Successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getMyDestinations = catchAsync(async (req: Request, res: Response) => {
  const result = await DestinationService.getMyDestinations(req.user!.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Your Destinations Retrieved Successfully",
    data: result,
  });
});

const getDestinationById = catchAsync(async (req: Request, res: Response) => {
  const result = await DestinationService.getDestinationById(
    req.params.id as string
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Destination Retrieved Successfully",
    data: result,
  });
});

const getRelatedDestinations = catchAsync(async (req: Request, res: Response) => {
    const result = await DestinationService.getRelatedDestinations(req.params.id as string );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Related Destinations Retrieved Successfully",
      data: result,
    });
  }
);

export const DestinationController = {
  getAllDestinations,
  getMyDestinations,
  getDestinationById,
  getRelatedDestinations,
};
