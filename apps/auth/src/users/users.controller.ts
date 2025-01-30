import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { CurrentUserDecorator } from '../current-user.decorator';
import { User } from './schema/user.schema';
import { JwtRmqGuard } from '@app/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() request: CreateUserDto) {
    await this.usersService.createUser(request);
  }

  @Get()
  @UseGuards(JwtRmqGuard)
  async getUsers(
    @CurrentUserDecorator() user: User
  ) {
    console.log(user)
    return this.usersService.getUsers();
  }
}
