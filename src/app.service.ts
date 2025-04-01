import { Get, Injectable } from '@nestjs/common';
import { ResponseDto } from './dtos/response.dto';
import { LoggerService } from './logger/logger.service';

@Injectable()
export class AppService {
  constructor(private readonly loggerService: LoggerService) {}

  @Get()
  getHello(): ResponseDto {
    this.loggerService.info('Server is up and running', 'AppService');
    return {
      message: 'Server is up and running',
      statusCode: 200,
    };
  }
}
