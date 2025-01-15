import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy } from 'passport-auth0';
import { AuthService } from "./auth.service";

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'auth0') {
    constructor(private readonly configService: ConfigService, private readonly authService: AuthService){
        super({
            domain: configService.get('AUTH0_DOMAIN'),
            clientID: configService.get('AUTH0_CLIENT_ID'),
            clientSecret: configService.get('AUTH0_CLIENT_SECRET'),
            callbackURL: configService.get('AUTH0_CALLBACK_URL'),
            scope: 'openid email profile',
            state: false,
        })
    }
}