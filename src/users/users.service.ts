import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
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

  async createUser(data: CreateUserDto) {
    await new this.userModel({
      ...data,
      password: await hash(data.password, 10),
    }).save();
  }

  async getUser(query: FilterQuery<User>) {
    const user = (await this.userModel.findOne(query)).toObject();
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  async getUsers() {
    return this.userModel.find({});
  }

  async updateUser(query: FilterQuery<User>, data: UpdateQuery<User>) {
    return this.userModel.findOneAndUpdate(query, data);
  }
}
