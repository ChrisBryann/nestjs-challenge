import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
  ValidateIf,
} from 'class-validator';
import { Providers } from '@app/common';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEnum(Providers)
  @IsString()
  provider: Providers;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  @ValidateIf((obj) => obj.provider === Providers.None)
  password?: string;
}
