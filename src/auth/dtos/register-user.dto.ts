import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';

import { CreateUserDto } from 'src/users/dto/create-user.dto';

export enum UserRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class RegisterUserDto extends CreateUserDto {
  @ApiProperty({
    required: true,
    minLength: 8,
    description: 'User password',
  })
  @Exclude({
    toPlainOnly: true,
  })
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @IsNotEmpty({ message: 'Required' })
  password: string;
}
