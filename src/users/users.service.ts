import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { from, Observable, of } from 'rxjs';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const password = await bcrypt.hash(createUserDto.password, 12);
      const newUser = this.userRepository.create({
        ...createUserDto,
        password: password,
      });
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12));
  }
  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findById(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (user) {
      return user;
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
  async findOne(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    if (user) {
      return user;
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    const updatedTodo = await this.userRepository.findOne({ where: { id } });
    if (updatedTodo) {
      return updatedTodo;
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: number) {
    const deletedTodo = await this.userRepository.delete(id);
    if (!deletedTodo.affected) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
