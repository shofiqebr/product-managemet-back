/* eslint-disable @typescript-eslint/no-explicit-any */

import { Repair } from "./repair.model";
import { Product } from "../product/product.model";

interface CreateRepairPayload {
  productId: string;
  repairItems: { name: string; cost: number }[];
  image?: string;
  createdBy: { _id: string; name: string };
}

const createRepair = async (payload: CreateRepairPayload, user: any) => {
  const totalRepairCost = payload.repairItems.reduce(
    (sum, item) => sum + item.cost,
    0
  );

  const repair = await Repair.create({
    productId: payload.productId,
    repairItems: payload.repairItems,
    totalRepairCost,
    image: payload.image,

    createdBy: {
      _id: user._id,   // from token
      name: user.name, // from token
    },
  });

  // Update product price
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
