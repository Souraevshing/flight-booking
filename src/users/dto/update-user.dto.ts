/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Exclude } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { IsImageFile } from 'src/utils/image-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @Exclude()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsArray()
  @IsOptional()
  roles?: string[];

  @IsUrl()
  @IsOptional()
  @IsImageFile()
  profileImage?: string;
}
