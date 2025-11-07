import { Module } from '@nestjs/common';
import { QualificationService } from './qualification.service';
import { QualificationResolver } from './qualification.resolver';

@Module({
  providers: [QualificationResolver, QualificationService],
})
export class QualificationModule {}
