import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './schema/cart.schema';
import { ProductsModule } from 'src/products/products.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    ProductsModule,
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
  ],
  exports: [CartService],
  providers: [CartResolver, CartService],
})
export class CartModule {}
