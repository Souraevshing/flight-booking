import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { RegisterUserDto } from './dtos/register-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth('jwt')
  @ApiOperation({
    summary: 'Login user',
    description: 'Login using email and password',
  })
  @ApiBody({ type: LoginUserDto })
  @ApiCreatedResponse({ description: 'User successfully logged in' })
  @ApiBadRequestResponse({
    description: 'Invalid credentials or missing fields',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiOkResponse({ description: 'Created' })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @ApiBearerAuth('jwt')
  @Post('register')
  @ApiOperation({
    summary: 'Register user',
    description: 'Register using email and password',
  })
  @ApiBody({ type: RegisterUserDto })
  @ApiCreatedResponse({ description: 'User successfully logged in' })
  @ApiBadRequestResponse({
    description: 'Invalid credentials or missing fields',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiOkResponse({ description: 'Created' })
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.authService.registerUser(registerUserDto);
  }

  @ApiBearerAuth('jwt')
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user',
    description: 'Delete user by id',
  })
  async deleteUserById(@Param('id') id: string) {}
}
