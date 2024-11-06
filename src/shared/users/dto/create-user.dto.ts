import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { Currencies } from 'src/enums/Currencies';

export class CreateUserDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name?: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password?: string;

  @IsString()
  @IsOptional()
  googleId?: string;

  @IsOptional()
  @IsEnum(Currencies)
  currency: Currencies;

  @IsString()
  @IsOptional()
  salt?: string;
}
