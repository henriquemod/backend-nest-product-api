import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from '../dto/auth';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseErrors } from '../docs/api-response-errors';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: SignInDto })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      example: { access_token: 'some_access_token' },
    },
  })
  @ApiResponse(ApiResponseErrors.INVALID_OR_MISSING_PARAMS)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
