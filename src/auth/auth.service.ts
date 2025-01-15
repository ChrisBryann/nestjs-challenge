import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { subscribe } from 'diagnostics_channel';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: String,
    password: string,
  ): Promise<Omit<User, 'password'> | any> {
    const user = await this.usersService.findOne(
      (user) => user.username === username,
    );

    if (user && user.password === password) {
      // for better security, store hashed password and hash the inputted password before comparison
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async validateAuth0User({ username, id }: { username: string; id: string }) {
    let user = await this.usersService.findOne(
      (user) => user.provider === 'auth0' && user.provider_id === id,
    );

    if (!user) {
      // add user to database if user doesn't exist
      user = await this.usersService.add({
        password: '',
        provider: 'auth0',
        username,
        provider_id: id,
      });
    }
    const { password: _, ...result } = user; // Remove password from the returned user object
    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId};
    return {
        access_token: this.jwtService.sign(payload) // Generate JWT token using user info
    }
  }
}
