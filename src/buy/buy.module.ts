import { Module } from '@nestjs/common';
import { BuyService } from './buy.service';
import { BuyResolver } from './buy.resolver';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Buy, BuySchema } from './schema/buy.schema';
import { DetailModule } from 'src/detail/detail.module';

@Module({
  imports: [
    UserModule,
    DetailModule,
    MongooseModule.forFeature([{ name: Buy.name, schema: BuySchema }]),
  ],
  exports: [BuyService],
  providers: [BuyResolver, BuyService],
})
export class BuyModule {}
