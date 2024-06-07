import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignInDto } from '../dto/auth';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
          },
        },
        UsersService,
        JwtService,
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signIn', () => {
    it('should call AuthService.signIn with correct parameters', async () => {
      const signInDto: SignInDto = {
        username: 'testuser',
        password: 'testpass',
      };
      const expectedResult = { access_token: 'testtoken' };

      jest.spyOn(authService, 'signIn').mockResolvedValue(expectedResult);

      const result = await authController.signIn(signInDto);

      expect(authService.signIn).toHaveBeenCalledWith(
        signInDto.username,
        signInDto.password,
      );
      expect(result).toEqual(expectedResult);
    });

    it('should return the correct response when login is successful', async () => {
      const signInDto: SignInDto = {
        username: 'testuser',
        password: 'testpass',
      };
      const expectedResult = { access_token: 'testtoken' };

      jest.spyOn(authService, 'signIn').mockResolvedValue(expectedResult);

      const result = await authController.signIn(signInDto);

      expect(result).toEqual(expectedResult);
    });

    it('should throw an error if AuthService.signIn fails', async () => {
      const signInDto: SignInDto = {
        username: 'testuser',
        password: 'wrongpass',
      };

      jest
        .spyOn(authService, 'signIn')
        .mockRejectedValue(new Error('Unauthorized'));

      await expect(authController.signIn(signInDto)).rejects.toThrow(
        'Unauthorized',
      );
    });
  });
});
