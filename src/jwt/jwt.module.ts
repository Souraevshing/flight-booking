import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule as NestJsJwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { NestJsJwtService } from './jwt.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: true,
    }),
    NestJsJwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION_TIME'),
        },
      }),
    }),
  ],
  providers: [NestJsJwtService],
  exports: [NestJsJwtService, NestJsJwtModule],
})
export class JwtModule {}
