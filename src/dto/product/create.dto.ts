import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Whey Protein',
    description: 'The product name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 100,
    description: 'The product price',
  })
  @IsNumber()
  price: number;
}
