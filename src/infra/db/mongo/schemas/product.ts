import mongoose from 'mongoose';
import { ProductModel } from 'src/domain/models';

export const ProductSchema = new mongoose.Schema<ProductModel>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});
