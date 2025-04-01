// A better long-term solution - create a separate controller for first user

import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';

/**
 * @description Creating first user as admin since only admins can create standard user
 * @augments RegisterUserDto
 * @returns UserResponseDto RegisterUserDto
 */
@ApiTags('Admin user')
@Controller('su')
export class FirstUserController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Create first admin user',
    description:
      'Creates the first super admin user. This user is required to perform other CRUD operations.',
  })
  @ApiBody({ type: RegisterUserDto })
  @ApiCreatedResponse({ description: 'First admin user successfully created' })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  @ApiForbiddenResponse({ description: 'Users already exist in the system' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async createFirstUser(@Body() registerDto: RegisterUserDto) {
    return await this.authService.registerUser(registerDto);
  }
}
