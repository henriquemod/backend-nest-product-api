import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { AppModule } from './app.module';

describe('AppModule', () => {
  let appModule: TestingModule;

  beforeEach(async () => {
    appModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/test'),
        AppModule,
      ],
    })
      .overrideProvider(getModelToken('Model'))
      .useValue(jest.fn())
      .compile();
  });

  afterEach(async () => {
    await appModule.close();
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });

  it('should import MongooseModule', () => {
    const mongooseModule = appModule.get<MongooseModule>(MongooseModule);
    expect(mongooseModule).toBeDefined();
  });
});
