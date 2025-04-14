import { Module } from '@nestjs/common';
import { SignService } from './sign.service';
import { SignResolver } from './sign.resolver';

@Module({
  providers: [SignResolver, SignService],
})
export class SignModule {}
