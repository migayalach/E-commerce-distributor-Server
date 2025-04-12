import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelResolver } from './level.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Level, LevelSchema } from './schema/level.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Level.name, schema: LevelSchema }]),
  ],
  exports: [LevelService],
  providers: [LevelResolver, LevelService],
})
export class LevelModule {}
