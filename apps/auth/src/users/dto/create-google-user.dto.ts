import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsStrongPassword,
    IsUUID,
    ValidateIf,
  } from 'class-validator';
  import { Providers } from '@app/common';
  
  export class CreateGoogleUserDto {
    @IsUUID()
    @IsNotEmpty()
    googleId: string;

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
  }
  