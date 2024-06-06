import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './controllers';
import { ProductService } from './services';

describe('AppController', () => {
  let appController: ProductService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    appController = app.get<ProductController>(ProductController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getAllProducts()).toBe('All products!');
    });
  });
});
