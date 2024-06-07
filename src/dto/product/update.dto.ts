import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  price?: number;
}
