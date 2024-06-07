import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';

const db = process.env.DB_NAME || 'product-api';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://127.0.0.1:27017/${db}?retryWrites=true&loadBalanced=false&replicaSet=rs0&readPreference=primary&connectTimeoutMS=10000`,
    ),
    ProductModule,
  ],
})
export class AppModule {}
