import { IsString, IsNumber } from 'class-validator';

export class ProductDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  createdAt: Date;

  @IsString()
  updatedAt: Date;
}
