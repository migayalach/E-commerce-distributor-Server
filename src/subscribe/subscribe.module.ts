import { Module } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { SubscribeResolver } from './subscribe.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscribe, SubscribeSchema } from './schema/subscribe.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subscribe.name, schema: SubscribeSchema },
    ]),
  ],
  providers: [SubscribeResolver, SubscribeService],
})
export class SubscribeModule {}
