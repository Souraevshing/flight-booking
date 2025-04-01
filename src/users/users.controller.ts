import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { RegisterUserDto } from 'src/auth/dtos/register-user.dto';
import { ResponseDto } from 'src/dtos/response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findUserById(
    @Param('userId') userId: string,
  ): Promise<UserResponseDto | ResponseDto> {
    return this.usersService.findUserById(userId);
  }

  @Post()
  async createUser(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<UserResponseDto | ResponseDto> {
    return this.usersService.createUser(registerUserDto);
  }

  @Get()
  async findAllUsers(): Promise<UserResponseDto[] | ResponseDto> {
    return this.usersService.findAllUsers();
  }

  @Get(':email/email')
  async findUserByEmail(
    @Param('email') email: string,
  ): Promise<UserResponseDto | ResponseDto> {
    return this.usersService.findUserByEmail(email);
  }

  @Put(':userId/update')
  async updateUserById(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUserById(userId, updateUserDto);
  }

  @Delete(':userId')
  async deleteUserById(@Param('userId') userId: string) {
    return this.usersService.deleteUserById(userId);
  }
}
