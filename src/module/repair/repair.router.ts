// src/app/modules/repair/repair.router.ts
import express from "express";
import { RepairController } from "./repair.controller";
import { RepairValidation } from "./repair.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/repairs",
  validateRequest(RepairValidation.createRepairSchema),
  RepairController.createRepair
);

router.get("/repairs/:productId", RepairController.getRepairsForProduct);

export const RepairRoutes = router;
