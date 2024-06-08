import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseErrors } from '../docs/api-response-errors';
import { AuthGuard } from '../auth/auth.guard';
import { CreateProductDto, ProductDto, UpdateProductDto } from '../dto/product';
import { ValidateObjectIdPipe } from '../infra/mongo/helpers/path-validator';
import { ProductService } from './product.service';
import { ApiErrorMessage } from '../docs/ape-error-messages';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ProductDto,
    description: 'Return created product',
  })
  @ApiResponse(ApiResponseErrors.UNAUTHORIZED)
  @ApiResponse(ApiResponseErrors.INVALID_OR_MISSING_PARAMS)
  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductDto> {
    return this.productService.createProduct(createProductDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: [ProductDto],
    description: 'Return all products',
  })
  @Get()
  async getAllProducts(): Promise<ProductDto[]> {
    return this.productService.getAllProducts();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductDto,
    description: 'Return a product by id',
  })
  @ApiResponse({
    ...ApiResponseErrors.NOT_FOUND,
    description: 'Product not found',
  })
  @ApiResponse({
    ...ApiResponseErrors.BAD_REQUEST,
    description: ApiErrorMessage.MALFORMED_ID,
  })
  @Get(':id')
  async getProduct(
    @Param('id', ValidateObjectIdPipe) id: string,
  ): Promise<ProductDto> {
    return this.productService.getProduct(id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductDto,
    description: 'Return updated product by id',
  })
  @ApiResponse(ApiResponseErrors.UNAUTHORIZED)
  @ApiResponse({
    ...ApiResponseErrors.BAD_REQUEST,
    description: ApiErrorMessage.MALFORMED_ID,
  })
  @ApiResponse({
    ...ApiResponseErrors.NOT_FOUND,
    description: 'Product not found',
  })
  @Put(':id')
  async updateProduct(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductDto> {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse(ApiResponseErrors.UNAUTHORIZED)
  @ApiResponse({
    ...ApiResponseErrors.BAD_REQUEST,
    description: ApiErrorMessage.MALFORMED_ID,
  })
  @ApiResponse({
    ...ApiResponseErrors.NOT_FOUND,
    description: 'Product not found',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Product deleted, no body returned',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProduct(
    @Param('id', ValidateObjectIdPipe) id: string,
  ): Promise<any> {
    return this.productService.deleteProduct(id);
  }
}
