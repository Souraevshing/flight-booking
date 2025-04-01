import { ApiProperty } from '@nestjs/swagger';

import { UserRoles } from 'src/auth/dtos/register-user.dto';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    description: 'First name',
  })
  readonly firstName: string;

  @ApiProperty({
    required: true,
    description: 'Last name',
  })
  readonly lastName: string;

  @ApiProperty({
    required: true,
    description: 'Username',
  })
  readonly username: string;

  @ApiProperty({
    required: true,
    description: 'Email',
  })
  readonly email: string;

  @ApiProperty({
    required: true,
    description: 'User roles (USER or ADMIN)',
  })
  @ApiProperty({
    required: true,
    description: 'User roles (USER or ADMIN)',
  })
  readonly roles: UserRoles[];

  @ApiProperty({
    required: false,
    description: 'Profile Image URL',
  })
  readonly profileImage: string;
}
