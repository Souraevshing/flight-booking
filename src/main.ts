import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.PORT ?? 3000);

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/docs', app, document);
}
void bootstrap();
