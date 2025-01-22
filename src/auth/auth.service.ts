import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/schema/user.schema';
import { TokenPayload } from './interfaces/token-payload.interface';
import { Response } from 'express';
import { hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.usersService.getUser({
        email,
      });

      const authenticated = await compare(password, user.password);
      if (!authenticated) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException('Credentials are not valid!');
    }
  }

  async verifyUserRefreshToken(refresh_token: string, user_id: string) {
    try {
      const user = await this.usersService.getUser({
        _id: user_id,
      });

      const authenticated = await compare(refresh_token, user.refreshToken);

      if (!authenticated) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException('Refresh token is not valid');
    }
  }

  async login(user: User, response: Response) {
    const access_token_expires = new Date();
    access_token_expires.setMilliseconds(
      access_token_expires.getTime() +
        parseInt(
          this.configService.getOrThrow<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION_MS',
          ),
        ),
    );

    const refresh_token_expires = new Date();
    refresh_token_expires.setMilliseconds(
      refresh_token_expires.getTime() +
        parseInt(
          this.configService.getOrThrow<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION_MS',
          ),
        ),
    );

    const payload: TokenPayload = {
      user_id: user._id.toHexString(),
      email: user.email,
    };

    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow<string>(
        'JWT_ACCESS_TOKEN_SECRET_KEY',
      ),
      expiresIn: `${this.configService.getOrThrow<string>(
        'JWT_ACCESS_TOKEN_EXPIRATION_MS',
      )}ms`,
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow<string>(
        'JWT_REFRESH_TOKEN_SECRET_KEY',
      ),
      expiresIn: `${this.configService.getOrThrow<string>(
        'JWT_REFRESH_TOKEN_EXPIRATION_MS',
      )}ms`,
    });

    this.usersService.updateUser(
      {
        _id: user._id,
      },
      {
        $set: {
          refresh_token: await hash(refresh_token, 10),
        },
      },
    );

    response.cookie('Authentication', access_token, {
      httpOnly: true, // only accessible by the web server and not on client-side where javascript can get access to it
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: access_token_expires,
    });

    response.cookie('Refresh', refresh_token, {
      httpOnly: true, // only accessible by the web server and not on client-side where javascript can get access to it
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: refresh_token_expires,
    });
  }
}

// async validateUser(
//   username: String,
//   password: string,
// ): Promise<Omit<User, 'password'> | any> {
//   const user = await this.usersService.findOne(
//     (user) => user.username === username,
//   );

//   if (user && user.password === password) {
//     // for better security, store hashed password and hash the inputted password before comparison
//     const { password: _, ...result } = user;
//     return result;
//   }
//   return null;
// }

// async validateAuth0User({ username, id }: { username: string; id: string }) {
//   let user = await this.usersService.findOne(
//     (user) => user.provider === 'auth0' && user.provider_id === id,
//   );

//   console.log(user);

//   if (!user) {
//     // add user to database if user doesn't exist
//     user = await this.usersService.add({
//       password: '',
//       provider: 'auth0',
//       username,
//       provider_id: id,
//     });
//   }
//   const { password: _, ...result } = user; // Remove password from the returned user object
//   return result;
// }

// async validateAuth0Token(token: string): Promise<any> {
//    const client = jwksClient({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://${this.configService.get('AUTH0_DOMAIN')}/.well-known/jwks.json`,
//   })
//   const getKey = (header, callback) => {
//     client.getSigningKey(header.kid, (err, key) => {
//       if (err) {
//         callback(err, null);
//       } else {
//         const signingKey = key.getPublicKey();
//         callback(null, signingKey);
//       }
//     });
//   };
//     return new Promise((resolve, reject) => {
//       jwt.verify(token, getKey, {
//         algorithms: ['RS256'],
//         audience: this.configService.get('AUTH0_AUDIENCE'),
//         issuer: `https://${this.configService.get('AUTH0_DOMAIN')}`
//       }, (err, decoded) => {
//         if(err){
//           reject(err);
//         }
//         resolve(decoded);
//       })
//     })
// }

// async login(user: any) {
//   const payload = { username: user.username, sub: user.userId};
//   return {
//       access_token: this.jwtService.sign(payload) // Generate JWT token using user info
//   }
// }
