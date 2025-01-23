import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Providers } from 'src/common/enums/provider.enum';
import { Request } from 'express';
import { Profile } from 'passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { User } from 'src/users/schema/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      clientID: configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: `${configService.getOrThrow<string>('BASE_URL')}/auth/google/callback`,
      passReqToCallback: true,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    request: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    // find the user in our database, and create one if not present
    let user: User;
    try {
      user = await this.usersService.getUser({
        email: profile.emails[0].value,
      });
    } catch (error) {
      // user is not found, create one
      user = await this.usersService.createUser({
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        provider: Providers.Google,
      });
    }
    // return user to the request
    done(null, user);
  }
}
