import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from 'src/dto/product';

@Injectable()
export class ProductService {
  getAllProducts(): string {
    return 'All products!';
  }

  getProduct(id: string): string {
    return `Product ${id}!`;
  }

  createProduct(): string {
    return 'Product created!';
  }

  updateProduct(id: string, updateData: UpdateProductDto): string {
    return `Product ${id} updated! New data: ${updateData}`;
  }

  deleteProduct(id: string): string {
    return `Product ${id} deleted!`;
  }
}
