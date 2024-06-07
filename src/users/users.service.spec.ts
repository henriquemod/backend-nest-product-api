import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user if username exists', async () => {
      const username = 'admin';
      const user = await service.findOne(username);
      expect(user).toEqual({ id: 1, username: 'admin', password: 'admin' });
    });

    it('should return undefined if username does not exist', async () => {
      const username = 'nonexistent';
      const user = await service.findOne(username);
      expect(user).toBeUndefined();
    });
  });
});
