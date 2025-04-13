import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductsService } from 'src/products/products.service';
import { Cart } from './schema/cart.schema';
import { Model } from 'mongoose';

@Injectable()
export class CartService {
  constructor(
    private productService: ProductsService,
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
  ) {}

  getListFavorites() {}

  actionFavorite() {}

  clearCart() {}
}
