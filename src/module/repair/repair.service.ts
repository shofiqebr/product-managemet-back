// src/app/modules/repair/repair.service.ts
import { Repair } from "./repair.model";
import { Product } from "../product/product.model";

interface RepairItem {
  name: string;
  cost: number;
}

interface CreateRepairPayload {
  productId: string;
  repairItems: RepairItem[];
  image?: string;
}

const createRepair = async (payload: CreateRepairPayload) => {
  const totalRepairCost = payload.repairItems.reduce((sum, item) => sum + item.cost, 0);

  // Create repair document
  const repair = await Repair.create({
    productId: payload.productId,
    repairItems: payload.repairItems,
    totalRepairCost,
    image: payload.image,
  });

  // Update product price by adding totalRepairCost
  await Product.findByIdAndUpdate(payload.productId, {
    $inc: { price: totalRepairCost },
  });

  return repair;
};

const getRepairsByProductId = async (productId: string) => {
  return Repair.find({ productId });
};

export const RepairService = {
  createRepair,
  getRepairsByProductId,
};
