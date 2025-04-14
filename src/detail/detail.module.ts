import { Module } from '@nestjs/common';
import { DetailService } from './detail.service';
import { DetailResolver } from './detail.resolver';
import { ProductsModule } from 'src/products/products.module';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [ProductsModule, CartModule],
  providers: [DetailResolver, DetailService],
})
export class DetailModule {}
