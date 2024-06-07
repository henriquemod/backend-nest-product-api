import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  HttpCode,
} from '@nestjs/common';
import { ProductService } from '../../services/product.service';
import {
  CreateProductDto,
  ProductDto,
  UpdateProductDto,
} from '../../dto/product';
import { ValidateObjectIdPipe } from '../../infra/db/mongo/helpers/path-validator';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductDto> {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  async getAllProducts(): Promise<ProductDto[]> {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  async getProduct(
    @Param('id', ValidateObjectIdPipe) id: string,
  ): Promise<ProductDto> {
    return this.productService.getProduct(id);
  }

  @Put(':id')
  async updateProduct(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductDto> {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteProduct(
    @Param('id', ValidateObjectIdPipe) id: string,
  ): Promise<any> {
    return this.productService.deleteProduct(id);
  }
}
