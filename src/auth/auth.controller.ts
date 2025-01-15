import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Login route using local authentication strategy
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('auth0'))
  @Get('auth0/callback')
  async auth0Callback(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('auth0'))
  @Get('auth0/login')
  async auth0Login() {
    // No explicit implementation is needed here as AuthGuard handles the authentication flow
  }
}
