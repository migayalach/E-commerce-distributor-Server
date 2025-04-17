import { Module } from '@nestjs/common';
import { SeedersService } from './seeders.service';

@Module({
  imports: [],
  exports: [],
  providers: [SeedersService],
})
export class SeedersModule {}
