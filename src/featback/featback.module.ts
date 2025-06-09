import { Module } from '@nestjs/common';
import { FeatbackService } from './featback.service';
import { FeatbackResolver } from './featback.resolver';

@Module({
  providers: [FeatbackResolver, FeatbackService],
})
export class FeatbackModule {}
