import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { ProductService } from "./product.service";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.createProduct(req.body);

  sendResponse(res, {
    status: true,
    message: "Product created successfully",
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getAllProducts();

  sendResponse(res, {
    status: true,
    message: "Products fetched successfully",
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getProductById(req.params.id);

  sendResponse(res, {
    status: true,
    message: "Product fetched successfully",
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.updateProduct(req.params.id, req.body);

  sendResponse(res, {
    status: true,
    message: "Product updated successfully",
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.deleteProduct(req.params.id);

  sendResponse(res, {
    status: true,
    message: "Product deleted successfully",
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
