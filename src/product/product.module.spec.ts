import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { AuthModule } from '../auth/auth.module';
import { ProductSchema } from '../infra/mongo/schemas';
import { JwtService } from '@nestjs/jwt';

describe('ProductModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
        AuthModule,
      ],
      controllers: [ProductController],
      providers: [ProductService, JwtService],
    })
      .overrideProvider(getModelToken('Product'))
      .useValue(jest.fn())
      .overrideModule(AuthModule)
      .useModule(jest.fn())
      .compile();
  });

  it('should have ProductController', () => {
    const productController = module.get<ProductController>(ProductController);
    expect(productController).toBeDefined();
  });

  it('should have ProductService', () => {
    const productService = module.get<ProductService>(ProductService);
    expect(productService).toBeDefined();
  });
});
