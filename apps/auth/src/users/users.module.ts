import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
// import { MongooseModule } from '@nestjs/mongoose';
// import { UsersRepository } from './users.repository';
import { UsersTypeOrmRepository } from './users-typeorm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from '@app/common';

@Module({
  imports: [
    // MongooseModule.forFeature([
    //   {
    //     name: User.name,
    //     schema: UserSchema,
    //   },
    // ]),
    TypeOrmModule.forFeature([User]),
    AuthModule,
  ],
  providers: [UsersService, UsersTypeOrmRepository],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
