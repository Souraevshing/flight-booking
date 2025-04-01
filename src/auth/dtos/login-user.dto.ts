import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: '',
    default: '',
    required: true,
    description: 'User email',
  })
  @IsEmail({}, { message: 'Enter email' })
  @IsNotEmpty({ message: 'Required' })
  email: string;

  @ApiProperty({
    example: '',
    default: '',
    required: true,
    minLength: 8,
    description: 'User password',
  })
  @IsStrongPassword()
  @IsNotEmpty({ message: 'Required' })
  @MinLength(8, { message: 'Must be at least 8 characters long' })
  password: string;
}
