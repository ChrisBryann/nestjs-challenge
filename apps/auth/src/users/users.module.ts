import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
// import { MongooseModule } from '@nestjs/mongoose';
// import { UsersRepository } from './users.repository';
import { UsersTypeOrmRepository } from './users-typeorm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    // MongooseModule.forFeature([
    //   {
    //     name: User.name,
    //     schema: UserSchema,
    //   },
    // ]),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UsersService, UsersTypeOrmRepository],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
