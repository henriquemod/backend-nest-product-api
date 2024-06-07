import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose, { Model } from 'mongoose';
import { ProductModel } from '../domain/product';
import { CreateProductDto, UpdateProductDto } from '../dto/product';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let model: Model<ProductModel>;

  const mockProductModel = {
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getModelToken('Product'),
          useValue: mockProductModel,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    model = module.get<Model<ProductModel>>(getModelToken('Product'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllProducts', () => {
    it('should return an array of products', async () => {
      const products = [
        {
          _id: new mongoose.Types.ObjectId(),
          name: 'Product1',
          price: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      mockProductModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(products),
      });

      const result = await service.getAllProducts();
      expect(result).toEqual(products.map(service['createDTO']));
    });
  });

  describe('getProduct', () => {
    it('should return a product', async () => {
      const productObjId = new mongoose.Types.ObjectId();
      const product = {
        _id: productObjId,
        name: 'Product1',
        price: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockProductModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(product),
      });

      const result = await service.getProduct(productObjId.toHexString());
      expect(result).toEqual(
        service['createDTO']({
          ...product,
          id: product._id.toHexString(),
        }),
      );
    });

    it('should throw NotFoundException if product not found', async () => {
      mockProductModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.getProduct('invalid_id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createProduct', () => {
    it('should create and return a product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Product1',
        price: 10,
      };
      const createdProduct = {
        _id: new mongoose.Types.ObjectId(),
        ...createProductDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockProductModel.create.mockReturnValue(createdProduct);

      const result = await service.createProduct(createProductDto);
      expect(result).toEqual(
        service['createDTO']({
          ...createdProduct,
          id: createdProduct._id.toHexString(),
        }),
      );
    });
  });

  describe('updateProduct', () => {
    it('should update and return a product', async () => {
      const updateProductDto: UpdateProductDto = {
        name: 'UpdatedProduct',
        price: 20,
      };
      const updatedProduct = {
        _id: new mongoose.Types.ObjectId(),
        ...updateProductDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockProductModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedProduct),
      });

      const result = await service.updateProduct(
        updatedProduct._id.toHexString(),
        updateProductDto,
      );
      expect(result).toEqual(
        service['createDTO']({
          ...updatedProduct,
          name: updateProductDto.name,
          price: updateProductDto.price,
          id: updatedProduct._id.toHexString(),
        }),
      );
    });

    it('should throw NotFoundException if product not found', async () => {
      mockProductModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(
        service.updateProduct('invalid_id', {} as UpdateProductDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product', async () => {
      const product = { _id: new mongoose.Types.ObjectId() };
      mockProductModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(product),
      });

      await expect(
        service.deleteProduct(product._id.toHexString()),
      ).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if product not found', async () => {
      mockProductModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.deleteProduct('invalid_id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
