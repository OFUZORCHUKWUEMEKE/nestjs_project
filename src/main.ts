import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './config/config'
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { ModelExceptionFilter } from './shared/filters/model-exception.filter';

const configs = configuration()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.setGlobalPrefix('/api/v1')

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true
  }))

  app.useGlobalFilters(new HttpExceptionFilter(), new ModelExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('Personal Blog Project')
    .setDescription('A personal Blog Project Built With Nestjs')
    .setVersion('1.0')
    .addTag('BLOG')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(configs.port);
}
bootstrap();
