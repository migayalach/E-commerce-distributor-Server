import { Module } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { SubscribeResolver } from './subscribe.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscribe, SubscribeSchema } from './schema/subscribe.schema';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    EmailModule,
    MongooseModule.forFeature([
      { name: Subscribe.name, schema: SubscribeSchema },
    ]),
  ],
  exports: [SubscribeService],
  providers: [SubscribeResolver, SubscribeService],
})
export class SubscribeModule {}
