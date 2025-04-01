import { ArrayContains, IsBoolean, IsString } from 'class-validator';

export class UserRoleDto {
  @IsString()
  @ArrayContains(['ADMIN', 'USER'])
  roles: string;

  @IsBoolean()
  isActive: boolean;
}
