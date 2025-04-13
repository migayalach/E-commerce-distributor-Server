import { Resolver } from '@nestjs/graphql';
import { CartService } from './cart.service';

@Resolver('Cart')
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  getAllIdCart() {}

  actionCart() {}

  clearCart() {}
}
