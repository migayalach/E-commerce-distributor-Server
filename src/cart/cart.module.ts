import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './schema/cart.schema';
import { UserModule } from 'src/user/user.module';
import { ProductModel } from '@model/product.model';

@Module({
  imports: [
    UserModule,
    ProductModel,
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
  ],
  exports: [CartService],
  providers: [CartResolver, CartService],
})
export class CartModule {}
