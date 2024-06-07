import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users: {
    id: number;
    username: string;
    password: string;
  }[];

  constructor() {
    this.users = [
      {
        id: 1,
        username: 'admin',
        password: 'admin',
      },
    ];
  }

  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
