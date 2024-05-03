import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Films and Users API')
    .setDescription('An API developed in Nest responsible to manage Users and Films. Using Docker, Redis, TypeORM, Swagger and Postgres')
    .setVersion('1.0')
    .addTag('users')
    .addTag('films')
    .addTag('auth')
    .addBearerAuth()    
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
