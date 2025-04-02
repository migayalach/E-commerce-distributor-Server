import { Module } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { SubscribeResolver } from './subscribe.resolver';

@Module({
  providers: [SubscribeResolver, SubscribeService],
})
export class SubscribeModule {}
