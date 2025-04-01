import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsUrl } from 'class-validator';

import { User } from '../users.entity';

@Exclude()
export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  roles: string[];

  @Expose()
  isActive: boolean;

  @Expose()
  @IsDate()
  createdAt: Date;

  @Expose()
  @IsDate()
  updatedAt: Date;

  @Expose()
  @IsUrl()
  profileImage: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
