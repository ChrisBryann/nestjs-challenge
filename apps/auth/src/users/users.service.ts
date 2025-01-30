import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcryptjs';
import { UsersRepository } from './users.repository';
import { UsersTypeOrmRepository } from './users-typeorm.repository';
import { User } from './entities/user.entity';
import { DeepPartial, FindOneOptions } from 'typeorm';
import { CreateGoogleUserDto } from './dto/create-google-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersTypeOrmRepository: UsersTypeOrmRepository,
  ) {}

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
    // return await this.usersRepository.create({
    //   ...data,
    //   password: await hash(data.password, 10),
    //   tokenVersion: 0,
    // });
    const user = this.usersTypeOrmRepository.create({
      ...data,
      password: await hash(data.password, 10),
    });
    return await this.usersTypeOrmRepository.save(user);
  }

  async createGoogleUser(data: CreateGoogleUserDto): Promise<User> {
    const googleUser = this.usersTypeOrmRepository.create(data);
    return await this.usersTypeOrmRepository.save(googleUser);
  }

  async getGoogleUser(googleId: string): Promise<User> {
    const user = await this.usersTypeOrmRepository.findOneBy({
      googleId,
    });
    if (!user) {
      throw new NotFoundException(
        'User is not affiliated with google or not found!',
      );
    }

    return user;
  }

  async getGoogleUser(googleId: string): Promise<User> {
    const user = await this.usersTypeOrmRepository.findOne({
      where: {
        googleId,
      }
    })
    if(!user) {
      throw new NotFoundException('User is not affiliated with google or not found!'); 
    }

    return user;
  }

  async getUser(query: FindOneOptions<User>) {
    // const user = await this.usersRepository.findOne(query);
    // if (!user) {
    //   throw new NotFoundException('User not found!');
    // }

    // return user;

    const user = await this.usersTypeOrmRepository.findOne(query);
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  async getUsers() {
    return this.usersTypeOrmRepository.findAll({
      
    });
  }

  async updateUser(query: FindOneOptions<User>, data: DeepPartial<User>) {
    // return this.usersRepository.findOneAndUpdate(query, data);
    return this.usersTypeOrmRepository.findOneAndUpdate(query, data);
  }
}
