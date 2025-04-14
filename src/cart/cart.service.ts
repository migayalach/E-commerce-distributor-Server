import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductsService } from 'src/products/products.service';
import { Cart } from './schema/cart.schema';
import { Model, Types } from 'mongoose';
import { ActionCartDto } from './dto/actionCart.dto';
import { ApolloError } from 'apollo-server-express';
import { ActionAddDelete } from 'enum/options.enum';
import { RespInfoBase } from '@interface/data.info.interface';
import { PagCartResponse } from './dto/pag-cart-res.dto';
import { CartUserList } from './interface/cart.interface';
import { response } from '@utils/response.util';
import { DataProductCart } from 'src/favorite/interface/favorite.interface';
import { clearlistFavProduct } from 'helpers/clearData.helpers';

@Injectable()
export class CartService {
  constructor(
    private productService: ProductsService,
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
  ) {}

  async getAllListCartUser(idCart: string) {
    const data: CartUserList | null = await this.cartModel
      .findById(idCart)
      .select('listProducts');
    return data;
  }

  async actionCart(dataCart: ActionCartDto): Promise<RespInfoBase> {
    try {
      if (
        dataCart.action === ActionAddDelete.add ||
        dataCart.action === ActionAddDelete.delete
      ) {
        const existList = await this.cartModel.findById(dataCart.idCart);
        if (!existList) {
          throw new ApolloError(
            'Sorry, your cart list is not available.',
            'NOT_FOUND',
          );
        }
        await this.productService.getIdProduct(dataCart.idProduct);
        const listProducts = await this.cartModel
          .findById(dataCart.idCart)
          .select('-__v');

        if (dataCart.action === ActionAddDelete.add) {
          if (
            listProducts?.listProducts.includes(
              new Types.ObjectId(dataCart.idProduct),
            )
          ) {
            throw new ApolloError(
              'Sorry, this product is currently registered.',
              'NOT_FOUND',
            );
          }
          await this.cartModel.findByIdAndUpdate(dataCart.idCart, {
            $push: {
              listProducts: new Types.ObjectId(dataCart.idProduct),
            },
          });
          return {
            message: 'Added product successfully.',
            code: '201',
            value: 'add-product',
          };
        } else {
          if (
            !listProducts?.listProducts.includes(
              new Types.ObjectId(dataCart.idProduct),
            )
          ) {
            throw new ApolloError(
              'Sorry, this product is not currently registered.',
              'NOT_FOUND',
            );
          }
          await this.cartModel.findByIdAndUpdate(dataCart.idCart, {
            $pull: { listProducts: new Types.ObjectId(dataCart.idProduct) },
          });
          return {
            message: 'Remove product successfully.',
            code: '201',
            value: 'remove-product',
          };
        }
      } else {
        throw new ApolloError(
          'Sorry, your favorites list is not available.',
          'NOT_FOUND',
        );
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'Sorry, this option is not accept.',
        'INTERNAL_ERROR',
      );
    }
  }

  async getListCart(idCart: string, page: number): Promise<PagCartResponse> {
    try {
      const data = await this.getAllListCartUser(idCart);
      const arrayProduct: DataProductCart[] = [];
      if (!data) {
        return response(arrayProduct, page);
      }

      for (let i = 0; i < data.listProducts.length; i++) {
        const infoProduct = await this.productService.getIdProduct(
          data.listProducts[i].toString(),
        );
        arrayProduct.push(clearlistFavProduct(infoProduct));
      }
      return response(arrayProduct, page);
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while loading your cart.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async clearCart(idCart: string): Promise<void> {
    try {
      await this.cartModel.updateOne(
        { _id: idCart },
        { $set: { listProducts: [] } },
      );
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while clearing your cart.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }
}
