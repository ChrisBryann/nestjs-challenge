import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  ValidateIf,
} from 'class-validator';
import { Providers } from '@app/common';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEnum(Providers)
  @IsString()
  @IsNotEmpty()
  provider: Providers;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @ValidateIf((obj) => obj.provider === Providers.None)
  @IsNotEmpty()
  password?: string;
}
