import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Flight Booking')
  .setBasePath('/api/v1')
  .setDescription('Book flights at your convenience')
  .setVersion('1.0.0')
  .addTag('book', 'flights')
  .addServer('')
  .build();
