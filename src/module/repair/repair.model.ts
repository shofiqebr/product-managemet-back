import { Schema, model } from "mongoose";

const repairSchema = new Schema(
  {
    productName: { type: String },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    repairItems: [
      {
        description: { type: String, required: true },
        cost: { type: Number, required: true },
      },
    ],
    totalRepairCost: { type: Number, required: true },
    image: { type: String },

    createdBy: {
      _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
      name: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export const Repair = model("Repair", repairSchema);
