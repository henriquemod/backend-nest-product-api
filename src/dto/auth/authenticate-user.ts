import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @ApiProperty({
    example: 'admin',
    description: 'The username of the user',
    nullable: false,
    title: 'Username',
  })
  username: string;

  @IsString()
  @ApiProperty({
    example: 'admin',
    description: 'The password of the user',
    nullable: false,
    title: 'Password',
  })
  password: string;
}
