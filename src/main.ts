import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from './shared/domain/transform/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  const serverPort = configService.get<number>('SERVER_PORT') || 3000;

  const config = new DocumentBuilder()
    .setTitle('Serviço (Backend) - Retirada de Equipamentos')
    .setDescription(
      'Documentação da API para retirada de equipamentos, desenvolvida em NestJS.',
    )
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger/docs', app, document);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(serverPort, () => {
    console.log(`Server is running on http://localhost:${serverPort}`);
  });
}
bootstrap();
