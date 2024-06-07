import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, ProductDto, UpdateProductDto } from '../dto/product';
import { ValidateObjectIdPipe } from '../infra/mongo/helpers/path-validator';
import { AuthGuard } from '../auth/auth.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateProduct(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductDto> {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteProduct(
    @Param('id', ValidateObjectIdPipe) id: string,
  ): Promise<any> {
    return this.productService.deleteProduct(id);
  }
}
