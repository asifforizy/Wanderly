import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendresponse";
import httpStatus from 'http-status';
import { IDestinationQuery } from "./destination.interface";
import { DestinationService } from "./destination.service";



 
const getAllDestinations = catchAsync(async (req: Request, res: Response) => {
  const result = await DestinationService.getAllDestinations(req.query as IDestinationQuery);
 
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Destinations Retrieved Successfully",
    meta: result.meta,
    data: result.data,
  });
});



export const DestinationController = {
    getAllDestinations,
};