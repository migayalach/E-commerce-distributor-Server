import { Injectable } from '@nestjs/common';
import { CartService } from 'src/cart/cart.service';
import { ProductsService } from 'src/products/products.service';
import { Detail } from './schema/detail.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class DetailService {
  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    @InjectModel(Detail.name) private buyModel: Model<Detail>,
  ) {}

  async addDetail(idBuy: string, idCart: string): Promise<void> {
    try {
      const cartData = await this.cartService.getAllListCartUser(idCart);
      if (!cartData?.listProducts.length) {
        throw new ApolloError(
          "We couldn't continue with your purchase because your cart is empty.",
          'INTERNAL_SERVER_ERROR',
        );
      }
      console.log(cartData.listProducts);
      for (let i = 0; i < cartData.listProducts.length; i++) {
        await this.productService.getIdProduct(
          cartData.listProducts[i].toString(),
        );
      }
      // ADD DETAIL AND PRODUCTDETAIL
      // quitar stock
      await this.cartService.clearCart(idCart);
      return;
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while creating the detail to products.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  getIdDetail() {
    return;
  }
}
