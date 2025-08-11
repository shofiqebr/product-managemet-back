import { z } from "zod";

const createProductSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Product name is required" }),
    brand: z.string({ required_error: "Brand is required" }),
    model: z.string({ required_error: "Model is required" }),
    year: z
      .number({ required_error: "Year is required" })
      .min(1886, { message: "Invalid year" }),
    price: z
      .number({ required_error: "Price is required" })
      .positive({ message: "Price must be a positive number" }),
    fuelType: z.enum(["Petrol", "Diesel", "Electric", "Hybrid"], {
      required_error: "Fuel type is required",
    }),
    description: z.string().optional(),
  }),
});

const updateProductSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    brand: z.string().optional(),
    model: z.string().optional(),
    year: z.number().min(1886, { message: "Invalid year" }).optional(),
    price: z.number().positive({ message: "Price must be a positive number" }).optional(),
    fuelType: z.enum(["Petrol", "Diesel", "Electric", "Hybrid"]).optional(),
    description: z.string().optional(),
  }),
});

export const ProductValidation = {
  createProductSchema,
  updateProductSchema,
};


