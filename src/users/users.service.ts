import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { instanceToPlain } from 'class-transformer';
import { Repository } from 'typeorm';

import { RegisterUserDto } from 'src/auth/dtos/register-user.dto';
import { ResponseDto } from 'src/dtos/response.dto';
import { LoggerService } from 'src/logger/logger.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly loggerService: LoggerService,
  ) {}

  async findUserById(id: string): Promise<UserResponseDto | ResponseDto> {
    try {
      const userFound = await this.usersRepository.findOne({ where: { id } });

      if (!userFound) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return new ResponseDto(
        'User found successfully',
        200,
        new UserResponseDto(userFound),
      );
    } catch (err) {
      return new ResponseDto(
        'Internal server error',
        err instanceof NotFoundException ? 404 : 500,
        null,
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  async createUser(registerUserDto: RegisterUserDto): Promise<ResponseDto> {
    const queryRunner =
      this.usersRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const existingUser = await queryRunner.manager.findOne(User, {
        where: { email: registerUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

      const user = queryRunner.manager.create(User, {
        ...registerUserDto,
        password: hashedPassword,
      });

      const savedUser = await queryRunner.manager.save(User, user);

      await queryRunner.commitTransaction();

      this.loggerService.info('User created successfully', 'UsersService');

      return new ResponseDto(
        'User created successfully',
        201,
        instanceToPlain(new UserResponseDto(savedUser)),
      );
    } catch (err) {
      await queryRunner.rollbackTransaction();

      return new ResponseDto(
        'Internal server error',
        err instanceof ConflictException ? 409 : 500,
        null,
        err instanceof Error ? err.message : String(err),
      );
    } finally {
      await queryRunner.release();
    }
  }

  async findAllUsers(): Promise<UserResponseDto[] | ResponseDto> {
    try {
      const users = await this.usersRepository.find();

      const allUsers = users.map((user) => new UserResponseDto(user));

      return new ResponseDto('Users fetched successfully', 200, allUsers);
    } catch (err) {
      return new ResponseDto(
        'Internal server error',
        err instanceof NotFoundException ? 404 : 500,
        null,
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  async findUserByEmail(email: string): Promise<UserResponseDto | ResponseDto> {
    try {
      const userFound = await this.usersRepository.findOne({
        where: { email },
      });

      if (!userFound) {
        throw new NotFoundException(`User with email ${email} not found`);
      }

      return new ResponseDto(
        'User found with email',
        200,
        new UserResponseDto(userFound),
      );
    } catch (err) {
      return new ResponseDto(
        'Internal server error',
        err instanceof NotFoundException ? 404 : 500,
        null,
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  async updateUserById(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto | ResponseDto> {
    try {
      const userFound = await this.usersRepository.findOne({
        where: { id },
      });

      if (!userFound) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      const updatedUser = this.usersRepository.merge(userFound, updateUserDto);

      const savedUser = this.usersRepository.save(updatedUser);

      return new ResponseDto('User updated successfully', 200, savedUser);
    } catch (err) {
      return new ResponseDto(
        'Internal server error',
        err instanceof NotFoundException ? 404 : 500,
        null,
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  async deleteUserById(userId: string) {
    try {
      const deletedUser = await this.usersRepository.delete(userId);

      return new ResponseDto('User deleted successfully', 200, deletedUser);
    } catch (err) {
      return new ResponseDto(
        'Internal server error',
        err instanceof NotFoundException ? 404 : 500,
        null,
        err instanceof Error ? err.message : String(err),
      );
    }
  }
}
