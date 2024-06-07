import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ProductModel } from '../domain/product';
import { CreateProductDto, ProductDto, UpdateProductDto } from '../dto/product';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductModel>,
  ) {}

  async getAllProducts(): Promise<ProductDto[]> {
    const products = await this.productModel.find().exec();
    return products.map(this.createDTO);
  }

  async getProduct(id: string): Promise<ProductDto> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.createDTO(product);
  }

  async createProduct(createProductDto: CreateProductDto): Promise<ProductDto> {
    const createdProduct = new this.productModel(createProductDto);
    await createdProduct.save();
    return this.createDTO(createdProduct);
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductDto> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }
    return this.createDTO(updatedProduct);
  }

  async deleteProduct(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Product not found');
    }
  }

  private readonly createDTO = (
    product: ProductDto & { _id: mongoose.Types.ObjectId },
  ): ProductDto => ({
    id: product._id.toHexString(),
    name: product.name,
    price: product.price,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  });
}
