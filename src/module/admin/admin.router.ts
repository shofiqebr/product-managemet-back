// src/app/modules/admin/admin.router.ts
import express from "express";
import { AdminController } from "./admin.controller";

const router = express.Router();

// User routes
router.post("/users", AdminController.createUser);
router.get("/users", AdminController.getAllUsers);
router.put("/users/:id", AdminController.updateUser);
router.delete("/users/:id", AdminController.deleteUser);

// Product routes
router.post("/products", AdminController.createProduct);
router.get("/products", AdminController.getAllProducts);
router.put("/products/:id", AdminController.updateProduct);
router.delete("/products/:id", AdminController.deleteProduct);

// Repair routes
router.post("/repairs", AdminController.createRepair);
router.get("/repairs", AdminController.getAllRepairs);
router.put("/repairs/:id", AdminController.updateRepair);
router.delete("/repairs/:id", AdminController.deleteRepair);

export const AdminRoutes = router;
