import { Injectable } from '@nestjs/common';

export type User = {
  id?: number;
  name: string;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  // constructor(private readonly prismaService: PrismaService) {}
  async findOne(username: string): Promise<User | undefined> {
    // return this.users.find((user) => user.username === username);
    return null;
  }
  // async create(user: User) {
  //   return this.prismaService.user.create({
  //     data: user,
  //   });
  // }
}
