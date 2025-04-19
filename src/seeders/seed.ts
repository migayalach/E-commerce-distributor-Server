import { NestFactory } from '@nestjs/core';
import { SeedersModule } from './seeders.module';
import { SeedersService } from './seeders.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedersModule);
  const seeder = app.get(SeedersService);
  await seeder.run();
  await app.close();
}
bootstrap();
