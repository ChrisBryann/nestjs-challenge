import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService, private readonly authService: AuthService) {
    // super({
    //   secretOrKeyProvider: passportJwtSecret({
    //     cache: true,
    //     rateLimit: true,
    //     jwksRequestsPerMinute: 5,
    //     jwksUri: `${configService.get('AUTH0_DOMAIN')}.well-known/jwks.json`,
    //   }),
    //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //   audience: configService.get('AUTH0_AUDIENCE'),
    //   issuer: `${configService.get('AUTH0_DOMAIN')}`,
    //   algorithms: ['RS256'],
    // });
    super();
  }

  // validate(payload: unknown): unknown {
  //   return payload;
  // }
  async validate(username: string, password: string): Promise<any> {
    // Call the AuthService to validate the user's credentials
    const user = await this.authService.validateUser(username, password);
    // If the user is not found or the password doesn't match, throw UnauthorizedException
    if(!user){
      throw new UnauthorizedException();
    }

    return user;
  }
}
