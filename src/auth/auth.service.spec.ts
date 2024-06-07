import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an access token for valid credentials', async () => {
    const username = 'test_user';
    const password = 'test_password';
    const user = { id: 1, username, password };
    const accessToken = 'test_token';

    jest.spyOn(usersService, 'findOne').mockResolvedValue(user);
    jest.spyOn(jwtService, 'signAsync').mockResolvedValue(accessToken);

    const result = await service.signIn(username, password);

    expect(result).toEqual({ access_token: accessToken });
    expect(usersService.findOne).toHaveBeenCalledWith(username);
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      sub: user.id,
      username: user.username,
    });
  });

  it('should throw UnauthorizedException for invalid credentials', async () => {
    const username = 'test_user';
    const password = 'wrong_password';
    const user = { id: 1, username, password: 'test_password' };

    jest.spyOn(usersService, 'findOne').mockResolvedValue(user);

    await expect(service.signIn(username, password)).rejects.toThrow(
      UnauthorizedException,
    );
    expect(usersService.findOne).toHaveBeenCalledWith(username);
  });

  it('should throw UnauthorizedException if user is not found', async () => {
    const username = 'non_existent_user';
    const password = 'anyPassword';

    jest.spyOn(usersService, 'findOne').mockResolvedValue(null);

    await expect(service.signIn(username, password)).rejects.toThrow(
      UnauthorizedException,
    );
    expect(usersService.findOne).toHaveBeenCalledWith(username);
  });
});
