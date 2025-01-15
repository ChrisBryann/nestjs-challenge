import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LocalStrategy } from './local.strategy';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Auth0Strategy } from './auth0.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: './env' }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, Auth0Strategy, JwtService, UsersService],
  exports: [PassportModule],
})
export class AuthModule {}
