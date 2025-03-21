import { Get, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ResponseDto } from './dtos/response.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly LOGGER: Logger,
  ) {}

  @Get()
  getHello(): ResponseDto {
    this.LOGGER.log('info', 'Server is up and running');
    return {
      message: 'Server is up and running',
      statusCode: 200,
    };
  }
}
