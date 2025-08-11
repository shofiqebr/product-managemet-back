import express from "express";
import { ProductController } from "./product.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./product.validation";

const router = express.Router();

// Create a new product
router.post(
  "/",
  validateRequest(ProductValidation.createProductSchema),
  ProductController.createProduct
);

// Get all products
router.get("/", ProductController.getAllProducts);

// Get single product by ID
router.get("/:id", ProductController.getProductById);

// Update product by ID
router.patch(
  "/:id",
  validateRequest(ProductValidation.updateProductSchema),
  ProductController.updateProduct
);

// Delete product by ID
router.delete("/:id", ProductController.deleteProduct);

export const ProductRoutes = router;
