import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable, tap } from 'rxjs';

@Injectable()
export class JwtRmqGuard implements CanActivate {
  constructor(@Inject('AUTH') private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authentication = this.getAuthentication(context);

    return this.authClient
      .send('validate_user', {
        Auththentication: authentication,
      })
      .pipe(
        tap((res) => {
          this.addUser(res, context);
        }),
        catchError(err => {
            throw new UnauthorizedException();
        })
      );
  }

  private getAuthentication(context: ExecutionContext) {
    let authentication: string;
    if (context.getType() === 'rpc') {
      // if request is through rabbit mq, get authentication data instead of header
      authentication = context.switchToRpc().getData().Authentication;
    } else if (context.getType() === 'http') {
      authentication = context.switchToHttp().getRequest()
        .cookies?.Authentication;
    }

    if (!authentication) {
      throw new UnauthorizedException(
        'No value was provided for Authentication',
      );
    }

    return authentication;
  }

  private addUser(user: any, context: ExecutionContext) {
    if (context.getType() === 'rpc') {
      context.switchToRpc().getData().user = user;
    } else if (context.getType() === 'http') {
      context.switchToHttp().getRequest().user = user;
    }
  }
}
