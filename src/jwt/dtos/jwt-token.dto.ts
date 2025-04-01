import { IsJWT, IsObject } from 'class-validator';

import { UserResponseDto } from 'src/users/dto/user-response.dto';

export class JwtTokenDto {
  @IsJWT()
  access_token: string;

  @IsObject()
  user: Omit<UserResponseDto, UserResponseDto['password']>;
}
