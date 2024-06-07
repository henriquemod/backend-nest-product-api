import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { jwtConstants } from './constants';
import { Request } from 'express';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  it('should return true for a valid token', async () => {
    const mockRequest = {
      headers: {
        authorization: 'Bearer valid-token',
      },
    } as unknown as Request;

    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as unknown as ExecutionContext;

    const payload = { sub: 1, username: 'testuser' };
    jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(payload);

    const result = await authGuard.canActivate(mockExecutionContext);

    expect(result).toBe(true);
    expect(jwtService.verifyAsync).toHaveBeenCalledWith('valid-token', {
      secret: jwtConstants.secret,
    });
    expect(mockRequest['user']).toEqual(payload);
  });

  it('should throw UnauthorizedException for missing token', async () => {
    const mockRequest = {
      headers: {},
    } as unknown as Request;

    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as unknown as ExecutionContext;

    await expect(authGuard.canActivate(mockExecutionContext)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException for invalid token', async () => {
    const mockRequest = {
      headers: {
        authorization: 'Bearer invalid-token',
      },
    } as unknown as Request;

    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as unknown as ExecutionContext;

    jest
      .spyOn(jwtService, 'verifyAsync')
      .mockRejectedValue(new Error('Invalid token'));

    await expect(authGuard.canActivate(mockExecutionContext)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should extract token from header', () => {
    const mockRequest = {
      headers: {
        authorization: 'Bearer valid-token',
      },
    } as unknown as Request;

    const result = (authGuard as any).extractTokenFromHeader(mockRequest);

    expect(result).toBe('valid-token');
  });

  it('should return undefined if authorization header is not Bearer', () => {
    const mockRequest = {
      headers: {
        authorization: 'Basic some-token',
      },
    } as unknown as Request;

    const result = (authGuard as any).extractTokenFromHeader(mockRequest);

    expect(result).toBeUndefined();
  });

  it('should return undefined if authorization header is missing', () => {
    const mockRequest = {
      headers: {},
    } as unknown as Request;

    const result = (authGuard as any).extractTokenFromHeader(mockRequest);

    expect(result).toBeUndefined();
  });
});
