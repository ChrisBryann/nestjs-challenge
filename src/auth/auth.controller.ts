import {
  Controller,
  Get,
  Post,
  Redirect,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Auth0AuthGuard } from './auth0.guard';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  // // Login route using local authentication strategy
  // @UseGuards(AuthGuard('local'))
  // @Post('login')
  // async login(@Req() req) {
  //   return this.authService.login(req.user);
  // }

  // @UseGuards()
  // @UseGuards(Auth0AuthGuard)
  // @Get('auth0/callback')
  // async auth0Callback(@Req() req) {
  //   return req.user;
  // }

  // @UseGuards(Auth0AuthGuard)
  // @Get('auth0/login')
  // async auth0Login() {
  //   // No explicit implementation is needed here as AuthGuard handles the authentication flow
  // }

  // @Post('auth0/verify')
  // async verifyAuth0(@Req() req: Request) {
  //   const token = req.headers.authorization?.split(' ')[1];

  //   if (!token) {
  //     throw new UnauthorizedException('Auth0 token is missing!');
  //   }

  //   // validate auth0 token using Auth0's public keys
  //   const user_data = await this.authService.validateAuth0Token(token);
  //   return user_data
  // }

  // // @UseGuards(AuthGuard('jwt')) // use this when you are testing locally; using cloud shell doesn't work in postman, need to sign in to google
  // @Get('auth0/logout')
  // async auth0Logout(@Res() res) {
  //   res.redirect(
  //     `https://${this.configService.get('AUTH0_DOMAIN')}/v2/logout?client_id=${this.configService.get('AUTH0_CLIENT_ID')}&returnTo=https://8080-cs-1098171152999-default.cs-us-west1-ijlt.cloudshell.dev`,
  //   );
  // }
}
