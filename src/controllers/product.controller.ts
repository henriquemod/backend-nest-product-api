import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from '../services/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createProduct(): string {
    return this.productService.createProduct();
  }

  @Get()
  getAllProducts(): string {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProduct(@Param('id') id: string): string {
    return this.productService.getProduct(id);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string): string {
    return this.productService.updateProduct(id);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): string {
    return this.productService.deleteProduct(id);
  }
}
