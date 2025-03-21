import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { swaggerConfig } from './config/swagger-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1/flights');

  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization,application/json',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    ignoreGlobalPrefix: false,
    deepScanRoutes: true,
  });

  SwaggerModule.setup('api/v1/docs', app, document);

  await app.listen(process.env.PORT ?? 5000);
}

void bootstrap();
