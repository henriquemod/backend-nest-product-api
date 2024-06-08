import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class ProductDto {
  @ApiProperty({
    example: '6123b1f5d8c8d2f1d0d3f1a2',
    description: 'The product id',
    nullable: false,
    title: 'Product Id',
  })
  @IsString()
  id: string;

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

  @ApiProperty({
    type: 'date',
    example: '2021-08-23T10:00:00Z',
    description: 'The date and time when the product was created',
    nullable: false,
    title: 'Created At',
  })
  @IsString()
  createdAt: Date;

  @ApiProperty({
    type: 'date',
    example: '2021-08-23T10:00:00Z',
    description: 'The date and time when the product was last updated',
    nullable: false,
    title: 'Updated At',
  })
  @IsString()
  updatedAt: Date;
}
