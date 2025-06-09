import { Module } from '@nestjs/common';
import { QuealificationService } from './quealification.service';
import { QuealificationResolver } from './quealification.resolver';

@Module({
  providers: [QuealificationResolver, QuealificationService],
})
export class QuealificationModule {}
