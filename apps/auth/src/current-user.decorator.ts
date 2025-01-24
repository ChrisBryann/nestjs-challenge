import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './users/entities/user.entity';

const getCurrentUserByContext = (context: ExecutionContext) =>
  context.switchToHttp().getRequest().user as User;

export const CurrentUserDecorator = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
