import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Whey Protein',
    description: 'The product name to be updated',
    nullable: false,
    title: 'Product Name',
  })
  name?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 100,
    description: 'The product price to be updated',
    nullable: false,
    title: 'Product Price',
  })
  price?: number;
}
