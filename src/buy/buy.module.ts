import { Module } from '@nestjs/common';
import { BuyService } from './buy.service';
import { BuyResolver } from './buy.resolver';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [CartModule],
  providers: [BuyResolver, BuyService],
})
export class BuyModule {}
