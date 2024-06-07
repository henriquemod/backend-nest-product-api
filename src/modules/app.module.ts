import { Module } from '@nestjs/common';
// import { ProductController } from './controllers';
// import { ProductService } from './services';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017/product-api?retryWrites=true&loadBalanced=false&replicaSet=rs0&readPreference=primary&connectTimeoutMS=10000',
    ),
    ProductModule,
  ],
})
export class AppModule {}
