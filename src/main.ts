import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { doubleCsrf, DoubleCsrfConfigOptions } from 'csrf-csrf';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { swaggerConfig } from './config/swagger-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // csrf protection
  const doubleCsrfOptions: DoubleCsrfConfigOptions = {
    getSecret: () => process.env.CSRF_SECRET,
    cookieName: 'csrf-token',
    size: 64,
    ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
    getTokenFromRequest: (req) => req.headers['x-csrf-token'] as string,
  };

  const { doubleCsrfProtection } = doubleCsrf(doubleCsrfOptions);

  app.use(doubleCsrfProtection);

  app.setGlobalPrefix('api/v1/flights');

  app.use(helmet());

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
