import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(
    username: string,
    userEnteredPassword: string,
  ): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user) {
      const matches = await bcrypt.compare(userEnteredPassword, user.password);
      if (matches) {
        const { password, username, ...rest } = user;
        return rest;
      } else {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return null;
  }
}
