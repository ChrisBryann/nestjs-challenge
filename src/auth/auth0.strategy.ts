import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-auth0';
import { AuthService } from './auth.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

// https://stackoverflow.com/questions/60935178/how-to-test-auth-0-implemented-with-passport-strategy-with-nestjs
@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'auth0') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    super({
      domain: configService.get('AUTH0_DOMAIN'),
      clientID: configService.get('AUTH0_CLIENT_ID'),
      clientSecret: configService.get('AUTH0_CLIENT_SECRET'),
      callbackURL: configService.get('AUTH0_CALLBACK_URL'),
      scope: 'openid email profile',
      state: false,
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    console.log('calling validate');
    
    const user = await this.authService.validateAuth0User({
      username: profile.displayName,
      id: profile.user_id,
    });

    console.log(`access token: ${_accessToken}`);
    console.log(`refresh token: ${_refreshToken}`);

    return {
      ...user,
      access_token: _accessToken,
    };
  }
}
