import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { ResponseDto } from './dtos/response.dto';

@Controller()
@ApiResponse({ status: 200, description: 'Success' })
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiResponse({ status: 401, description: 'Unauthorized' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): ResponseDto {
    return this.appService.getHello();
  }
}
