import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Whey Protein',
    description: 'The product name',
    nullable: false,
    title: 'Product Name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 100,
    description: 'The product price',
    nullable: false,
    title: 'Product Price',
  })
  @IsNumber()
  price: number;
}
