import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AccessTokenPayload } from "../interfaces/access-token-payload.interface";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(
        configService: ConfigService,
        private readonly authService: AuthService,

      ) {
        super({
          jwtFromRequest: ExtractJwt.fromExtractors([
            (request: Request) => request.cookies?.Refresh,
          ]),
          secretOrKey: configService.getOrThrow<string>(
            'JWT_REFRESH_TOKEN_SECRET_KEY',
          ),
          passReqToCallback: true, // give us request object to validate function
        });
      }

      async validate(request: Request, payload: AccessTokenPayload) {
        return await this.authService.verifyUserRefreshToken(request.cookies?.Refresh, payload.user_id)
      }
}