import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('distributor');
  // app.enableCors({
  //   origin: [
  //     'http://localhost:3000',
  //     'http://localhost:3001',
  //     'https://miapp.vercel.app',
  //   ],
  //   allowedHeaders: 'Authorization, Content-Type',
  // });
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
