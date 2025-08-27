// src/app/modules/repair/repair.controller.ts
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RepairService } from "./repair.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";


// Create repair
const createRepair = catchAsync(async (req: Request, res: Response) => {
  const result = await RepairService.createRepair(req.body, req.user);

  sendResponse(res, {
    status: true,
    message: "Repair created and product price updated successfully",
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

// Get all repairs
const getAllRepairs = catchAsync(async (req: Request, res: Response) => {
  const result = await RepairService.getAllRepairs();

  sendResponse(res, {
    status: true,
    message: "All repairs fetched successfully",
    statusCode: StatusCodes.OK,
    data: result,
  });
});




// Get repairs for a product
const getRepairsForProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await RepairService.getRepairsByProductId(productId);

  sendResponse(res, {
    status: true,
    message: "Repairs fetched successfully",
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const RepairController = {
  createRepair,
  getAllRepairs,
  getRepairsForProduct,
};
