import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { swaggerConfig } from './config/swagger-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api/v1/flights');

  app.use(helmet());

  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization,application/json',
  });

  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    ignoreGlobalPrefix: false,
    deepScanRoutes: true,
  });

  SwaggerModule.setup('api/v1/docs', app, document);

  await app.listen(configService.get<string>('PORT') ?? 5000);
}

void bootstrap();
