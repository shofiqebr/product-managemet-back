import { model, Schema } from "mongoose";
import { IProduct } from "./product.interface";

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
      required: true,
    },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", productSchema);