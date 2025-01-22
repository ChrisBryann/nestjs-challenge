import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { hash } from 'bcryptjs';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  // async findOne(filterFn: (user: User) => boolean): Promise<User | undefined> {
  //     return this.users.find(filterFn)
  // }

  // async add(user: Omit<User, 'userId'>) : Promise<User> {
  //     const lastId = this.users.sort((a, b) => a.userId - b.userId)[0].userId;
  //     const userData: User = {...user, userId: lastId + 1};
  //     this.users.push(userData);
  //     return userData
  // }

  async createUser(data: CreateUserDto): Promise<User> {
    return await this.usersRepository.create({
      ...data,
      password: await hash(data.password, 10),
      tokenVersion: 0,
    });
  }

  async getUser(query: FilterQuery<User>) {
    const user = await this.usersRepository.findOne(query);
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  async getUsers() {
    return this.usersRepository.find({});
  }

  async updateUser(query: FilterQuery<User>, data: UpdateQuery<User>) {
    return this.usersRepository.findOneAndUpdate(query, data);
  }
}
