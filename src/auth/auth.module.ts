import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LocalStrategy } from './local.strategy';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Auth0Strategy } from './auth0.strategy';
import { JwtStrategy } from './jwt.strategy';
import { expressJwtSecret, passportJwtSecret } from 'jwks-rsa';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: './.env.development' }),
    CacheModule.register(),
    PassportModule.register({
      defaultStrategy: 'jwt',
      // defaultStrategy: 'local',
    }),
    JwtModule.register({
      secret:'asdfghjkl',
      signOptions: { expiresIn: '60s', algorithm: 'RS256' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    Auth0Strategy,
    JwtStrategy,
    UsersService,
  ],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
