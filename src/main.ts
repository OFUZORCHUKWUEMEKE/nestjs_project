import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './config/config'
import { ValidationPipe } from '@nestjs/common';

const config = configuration()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1')
  app.useGlobalPipes(new ValidationPipe({
    transform:true
  }))
  await app.listen(config.port);
}
bootstrap();
