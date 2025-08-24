/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/modules/admin/admin.controller.ts
import { Request, Response } from "express";
import { AdminService } from "./admin.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await AdminService.createUser(req.body);
    res.status(201).json({ success: true, data: user, message: "User created" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await AdminService.getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await AdminService.updateUser(req.params.id, req.body);
    res.status(200).json({ success: true, data: user, message: "User updated" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    await AdminService.deleteUser(req.params.id);
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Product controllers
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await AdminService.createProduct(req.body);
    res.status(201).json({ success: true, data: product, message: "Product created" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await AdminService.getAllProducts();
    res.status(200).json({ success: true, data: products });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await AdminService.updateProduct(req.params.id, req.body);
    res.status(200).json({ success: true, data: product, message: "Product updated" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    await AdminService.deleteProduct(req.params.id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Repair controllers
const createRepair = async (req: Request, res: Response) => {
  try {
    const repair = await AdminService.createRepair(req.body);
    res.status(201).json({ success: true, data: repair, message: "Repair created" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateRepair = async (req: Request, res: Response) => {
  try {
    const repair = await AdminService.updateRepair(req.params.id, req.body);
    res.status(200).json({ success: true, data: repair, message: "Repair updated" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteRepair = async (req: Request, res: Response) => {
  try {
    await AdminService.deleteRepair(req.params.id);
    res.status(200).json({ success: true, message: "Repair deleted" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllRepairs = async (req: Request, res: Response) => {
  try {
    const repairs = await AdminService.getAllRepairs();
    res.status(200).json({ success: true, data: repairs });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const AdminController = {
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
