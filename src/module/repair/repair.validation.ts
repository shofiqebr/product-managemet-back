// src/app/modules/repair/repair.validation.ts
import { z } from "zod";

const createRepairSchema = z.object({
  body: z.object({
    productId: z.string({ required_error: "Product ID is required" }),
    repairItems: z
      .array(
        z.object({
          name: z.string({ required_error: "Repair item name is required" }),
          cost: z
            .number({ required_error: "Cost is required" })
            .positive({ message: "Cost must be positive" }),
        })
      )
      .min(1, { message: "At least one repair item is required" }),
    image: z.string().url({ message: "Image must be a valid URL" }).optional(),
  }),
});

const updateRepairSchema = z.object({
  body: z.object({
    repairItems: z
      .array(
        z.object({
          name: z.string(),
          cost: z.number().positive(),
        })
      )
      .optional(),
    image: z.string().url().optional(),
  }),
});

export const RepairValidation = {
  createRepairSchema,
  updateRepairSchema,
};
