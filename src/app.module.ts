import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { JwtModule } from './jwt/jwt.module';
import { LoggerModule } from './logger/logger.module';
import { RateLimiterModule } from './rate-limiter/rate-limiter.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    LoggerModule,
    JwtModule,
    RateLimiterModule,
    AuthModule,
    UsersModule,
    DbModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AppService,
  ],
})
export class AppModule {}
