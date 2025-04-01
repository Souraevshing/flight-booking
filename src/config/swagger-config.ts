import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Flight Booking')
  .setDescription('Book flights at your convenience')
  .setVersion('1.0.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'jwt',
      name: 'jwt',
      in: 'header',
    },
    'jwt',
  )
  .build();
