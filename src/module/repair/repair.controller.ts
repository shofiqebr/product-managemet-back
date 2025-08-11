// src/app/modules/repair/repair.controller.ts
import { Request, Response } from "express";
import { RepairService } from "./repair.service";

const createRepair = async (req: Request, res: Response) => {
  try {
    const repair = await RepairService.createRepair(req.body);

    res.status(201).json({
      success: true,
      message: "Repair created and product price updated successfully",
      data: repair,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getRepairsForProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const repairs = await RepairService.getRepairsByProductId(productId);

    res.status(200).json({
      success: true,
      message: "Repairs fetched successfully",
      data: repairs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const RepairController = {
  createRepair,
  getRepairsForProduct,
};
