import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): ThrottlerModuleOptions => ({
        throttlers: [
          {
            ttl: Number(configService.get<number>('THROTTLE_TTL', 60)),
            limit: Number(configService.get<number>('THROTTLE_LIMIT', 10)),
          },
        ],
      }),
    }),
  ],
})
export class RateLimiterModule {}
