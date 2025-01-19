import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { subscribe } from 'diagnostics_channel';
import { ConfigService } from '@nestjs/config';
import * as jwksClient from 'jwks-rsa';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

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
}
