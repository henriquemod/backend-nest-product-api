import { Injectable } from '@nestjs/common';

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

  updateProduct(id: string): string {
    return `Product ${id} updated!`;
  }

  deleteProduct(id: string): string {
    return `Product ${id} deleted!`;
  }
}
