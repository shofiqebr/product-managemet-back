import { IProduct } from "./product.interface";
import { Product } from "./product.model";


const createProduct = async (payload: IProduct) => {
  return await Product.create(payload);
};

const getAllProducts = async () => {
  return await Product.find();
};

const getProductById = async (id: string) => {
  return await Product.findById(id);
};

const updateProduct = async (id: string, payload: Partial<IProduct>) => {
  return await Product.findByIdAndUpdate(id, payload, { new: true });
};

const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
