/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/modules/admin/admin.service.ts
import { Product } from "../product/product.model";
import { Repair } from "../repair/repair.model";
import User from "../user/user.model";


interface RepairItem {
  name: string;
  cost: number;
}

const createUser = async (payload: any) => {
  return User.create(payload);
};

const getAllUsers = async () => {
  return User.find();
};

const updateUser = async (id: string, payload: any) => {
  return User.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
};

const deleteUser = async (id: string) => {
  return User.findByIdAndDelete(id);
};

const createProduct = async (payload: any) => {
  return Product.create(payload);
};

const getAllProducts = async () => {
  return Product.find();
};

const updateProduct = async (id: string, payload: any) => {
  return Product.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
};

const deleteProduct = async (id: string) => {
  return Product.findByIdAndDelete(id);
};

const createRepair = async (payload: {
  productId: string;
  repairItems: RepairItem[];
  image?: string;
}) => {
  const totalRepairCost = payload.repairItems.reduce((sum, item) => sum + item.cost, 0);

  const repair = await Repair.create(payload);

  // Increase product price by repair cost
  await Product.findByIdAndUpdate(payload.productId, {
    $inc: { price: totalRepairCost },
  });

  return repair;
};

const updateRepair = async (
  id: string,
  payload: { repairItems?: RepairItem[]; image?: string }
) => {
  const existingRepair = await Repair.findById(id);
  if (!existingRepair) throw new Error("Repair not found");

  // Calculate old repair cost sum
  const oldCost = existingRepair.repairItems.reduce((sum, item) => sum + item.cost, 0);
  const newCost = payload.repairItems
    ? payload.repairItems.reduce((sum, item) => sum + item.cost, 0)
    : oldCost;

  // Update repair document
  const updatedRepair = await Repair.findByIdAndUpdate(
    id,
    { ...payload, totalRepairCost: newCost },
    { new: true, runValidators: true }
  );

  // Adjust product price accordingly
  const costDifference = newCost - oldCost;

  await Product.findByIdAndUpdate(updatedRepair?.productId, {
    $inc: { price: costDifference },
  });

  return updatedRepair;
};

const deleteRepair = async (id: string) => {
  const repair = await Repair.findById(id);
  if (!repair) throw new Error("Repair not found");

  // Decrease product price by repair cost
  await Product.findByIdAndUpdate(repair.productId, {
    $inc: { price: -repair.totalRepairCost },
  });

  return Repair.findByIdAndDelete(id);
};

const getAllRepairs = async () => {
  return Repair.find();
};

export const AdminService = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,

  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,

  createRepair,
  updateRepair,
  deleteRepair,
  getAllRepairs,
};
