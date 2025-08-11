// src/app/modules/repair/repair.model.ts
import { Schema, model } from "mongoose";

const repairSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    repairItems: [
      {
        name: { type: String, required: true },
        cost: { type: Number, required: true },
      },
    ],
    totalRepairCost: {
      type: Number,
      required: true,
    },
    image: {
      type: String, // URL of uploaded image
    },
  },
  { timestamps: true }
);

export const Repair = model("Repair", repairSchema);
