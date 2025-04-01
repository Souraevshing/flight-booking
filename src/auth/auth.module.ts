import { Module } from '@nestjs/common';
import { JwtModule } from 'src/jwt/jwt.module';
import { NestJsJwtService } from 'src/jwt/jwt.service';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirstUserController } from './first-user.controller';

@Module({
  imports: [JwtModule, UsersModule],
  controllers: [AuthController, FirstUserController],
  providers: [NestJsJwtService, AuthService, JwtStrategy],
})
export class AuthModule {}
