import {
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
    IsStrongPassword,
    IsUUID,
    ValidateIf,
  } from 'class-validator';
  import { Providers } from '@app/common';
  
  export class CreateGoogleUserDto {
    @IsUUID()
    googleId: string;

    @IsString()
    firstName: string;
  
    @IsString()
    lastName: string;
  
    @IsEnum(Providers)
    @IsString()
    provider: Providers;
  
    @IsEmail()
    email: string;
  }
  