import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }))

  const config = new DocumentBuilder()
  .setTitle('Documentação API')
  .setDescription(
    'Essa aplicação retorna todas as rotas que estão registradas na aplicação, tanto como suas funcionalidades e integrações.'
  )
  .addBearerAuth()
  .addTag('login')
  .addTag('Teste de Autenticação')
  .addTag('users')
  .addTag('Saldos')
  .addTag('Gastos')
  .addTag('Ganhos')
  .addTag('Saldos e Ganhos')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
