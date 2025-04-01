import { Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggerService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  info(message: string, context?: string) {
    this.logger.log('info', message, context);
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, context);
  }

  error(message: string, trace: string, context?: string) {
    this.logger.error(message, trace, context);
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, context);
  }
}
