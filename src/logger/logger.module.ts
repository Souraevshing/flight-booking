import { Module } from '@nestjs/common';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

import { LoggerService } from './logger.service';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Http({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.prettyPrint(),
            winston.format.label(),
            winston.format.json(),
            utilities.format.nestLike(),
          ),
        }),

        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.prettyPrint(),
            winston.format.label(),
            winston.format.json(),
            utilities.format.nestLike(),
          ),
        }),

        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.prettyPrint(),
            winston.format.label(),
            winston.format.json(),
            utilities.format.nestLike(),
          ),
        }),
      ],
    }),
  ],
  exports: [WinstonModule],
  providers: [LoggerService],
})
export class LoggerModule {}
