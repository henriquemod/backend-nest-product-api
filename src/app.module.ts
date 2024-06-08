import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';

const host = process.env.DB_HOST || '127.0.0.1';
const db = process.env.DB_NAME || 'product-api';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${host}:27017/${db}`),
    ProductModule,
  ],
})
export class AppModule {}
