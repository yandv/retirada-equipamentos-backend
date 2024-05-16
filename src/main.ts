import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverPort = process.env.SERVER_PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('Serviço (Backend) - Retirada de Equipamentos')
    .setDescription(
      'Documentação da API para retirada de equipamentos, desenvolvida em NestJS.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger/docs', app, document);

  await app.listen(serverPort, () => {
    console.log(`Server is running on http://localhost:${serverPort}`);
  });
}
bootstrap();
