/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductDto, UpdateProductDto } from '../dto/product';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';

const MOCK_PRODUCT_ID = new mongoose.Types.ObjectId().toHexString();
const MOCK_PRODUCT = {
  id: MOCK_PRODUCT_ID,
  name: 'Test Product',
  price: 100,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('ProductController', () => {
  let productController: ProductController;

  const mockProductService = {
    createProduct: jest.fn().mockResolvedValue(MOCK_PRODUCT),
    getAllProducts: jest.fn().mockResolvedValue([MOCK_PRODUCT]),
    getProduct: jest.fn().mockResolvedValue(MOCK_PRODUCT),
    updateProduct: jest.fn().mockResolvedValue({
      ...MOCK_PRODUCT,
      name: 'Updated Product',
    }),
    deleteProduct: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
        JwtService,
      ],
    }).compile();

    productController = app.get<ProductController>(ProductController);
  });

  describe('createProduct', () => {
    it('should create a product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        price: 100,
      };
      await expect(
        productController.createProduct(createProductDto),
      ).resolves.toEqual(MOCK_PRODUCT);
    });
  });

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      await expect(productController.getAllProducts()).resolves.toEqual([
        MOCK_PRODUCT,
      ]);
    });
  });

  describe('getProduct', () => {
    it('should return a product', async () => {
      await expect(
        productController.getProduct(MOCK_PRODUCT_ID),
      ).resolves.toEqual(MOCK_PRODUCT);
    });
  });

  describe('updateProduct', () => {
    it('should update a product', async () => {
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
        price: 150,
      };
      await expect(
        productController.updateProduct(MOCK_PRODUCT_ID, updateProductDto),
      ).resolves.toEqual({
        ...MOCK_PRODUCT,
        name: 'Updated Product',
      });
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product', async () => {
      await expect(
        productController.deleteProduct(MOCK_PRODUCT_ID),
      ).resolves.toBeUndefined();
    });
  });
});
