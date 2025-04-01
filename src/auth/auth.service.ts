import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtTokenDto } from 'src/jwt/dtos/jwt-token.dto';

import { ResponseDto } from 'src/dtos/response.dto';
import { NestJsJwtService } from 'src/jwt/jwt.service';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { RegisterUserDto } from './dtos/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private nestJsJwtService: NestJsJwtService,
  ) {}

  async loginUser(loginUserDto: LoginUserDto): Promise<JwtTokenDto> {
    const response = await this.usersService.findUserByEmail(
      loginUserDto.email,
    );

    if (response instanceof ResponseDto && !response.data) {
      throw new NotFoundException(response.error || 'User not found');
    }

    const user = response as UserResponseDto;

    return {
      user,
      access_token: await this.generateJwtToken(
        user.id,
        user.email,
        user.roles,
      ),
    };
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    const response = await this.usersService.createUser(registerUserDto);

    if (!(response instanceof ResponseDto) || !response.data) {
      throw new NotFoundException(response || 'User not found');
    }

    const user = response.data as UserResponseDto;

    return {
      user,
      access_token: await this.generateJwtToken(
        user.id,
        user.email,
        user.roles,
      ),
    };
  }

  async getUserWithRoles(userId: string) {
    const response = await this.usersService.findUserById(userId);

    if (response instanceof ResponseDto && !response.data) {
      throw new NotFoundException(response.error || 'User not found');
    }

    const user = response as UserResponseDto;

    return {
      id: user.id,
      email: user.email,
      roles: user.roles,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
    };
  }

  private async generateJwtToken(
    id: string,
    email: string,
    roles: string[],
  ): Promise<string> {
    const payload = { id, email, roles };

    const access_token = await this.nestJsJwtService.signInAsync(payload);
    return access_token;
  }
}
