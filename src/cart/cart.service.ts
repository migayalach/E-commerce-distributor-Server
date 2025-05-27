import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductsService } from 'src/products/products.service';
import { Cart } from './schema/cart.schema';
import { Model, Types } from 'mongoose';
import { ActionCartDto } from './dto/actionCart.dto';
import { ApolloError } from 'apollo-server-express';
import { ActionAddUpdate } from 'enum/options.enum';
import { RespInfoBase } from '@interface/data.info.interface';
import { PagCartResponse } from './dto/pag-cart-res.dto';
import { CartUserList, DataProductsCart } from './interface/cart.interface';
import { response } from '@utils/response.util';
import { clearlistCartProduct } from 'helpers/clearData.helpers';
import { CartModelGQL } from '@model/cart.model';

@Injectable()
export class CartService {
  constructor(
    private productService: ProductsService,
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
  ) {}

  async getAllList(idCart: string): Promise<CartModelGQL[]> {
    const data = await this.getAllListCartUser(idCart);
    const arrayProduct: DataProductsCart[] = [];
    if (!data) {
      return [];
    }
    for (let i = 0; i < data.listProducts.length; i++) {
      const infoProduct = await this.productService.getIdProduct(
        data.listProducts[i].idProduct.toString(),
      );
      arrayProduct.push(
        clearlistCartProduct({
          ...infoProduct,
          amount: data.listProducts[i].amount,
        }),
      );
    }
    return arrayProduct;
  }

  async getAllListCartUser(idCart: string) {
    const data: CartUserList | null = await this.cartModel
      .findById(idCart)
      .select('listProducts');
    return data;
  }

  async actionCart(dataCart: ActionCartDto): Promise<RespInfoBase> {
    try {
      if (
        dataCart.action === ActionAddUpdate.add ||
        dataCart.action === ActionAddUpdate.update
      ) {
        const existList = await this.cartModel.findById(dataCart.idCart);
        if (!existList) {
          throw new ApolloError(
            'Sorry, your cart list is not available.',
            'NOT_FOUND',
          );
        }
        const { stock } = await this.productService.getIdProduct(
          dataCart.idProduct,
        );
        if (dataCart.amount > stock) {
          throw new ApolloError(
            'We are sorry, our stock is less than what you requested.',
            'NOT_FOUND',
          );
        }

        const listProducts = await this.cartModel
          .findById(dataCart.idCart)
          .select('-__v');
        const clearList = (listProducts?.listProducts ?? []).map(
          ({ idProduct }) => idProduct.toString(),
        );

        if (dataCart.action === ActionAddUpdate.add) {
          if (clearList.includes(dataCart.idProduct)) {
            throw new ApolloError(
              'Sorry, this product is currently registered.',
              'NOT_FOUND',
            );
          }

          await this.cartModel.updateOne(
            { _id: dataCart.idCart },
            {
              $push: {
                listProducts: {
                  idProduct: new Types.ObjectId(dataCart.idProduct),
                  amount: dataCart.amount,
                },
              },
            },
          );
          return {
            message: 'Added product successfully.',
            code: '201',
            value: 'add-product',
          };
        } else {
          if (!clearList.includes(dataCart.idProduct)) {
            throw new ApolloError(
              'Sorry, this product is not currently registered.',
              'NOT_FOUND',
            );
          }
          await this.cartModel.updateOne(
            {
              _id: dataCart.idCart,
              'listProducts.idProduct': new Types.ObjectId(dataCart.idProduct),
            },
            {
              $set: {
                'listProducts.$.amount': dataCart.amount,
              },
            },
          );
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

  async removeItemCart(
    idProduct: string,
    idCart: string,
  ): Promise<RespInfoBase> {
    try {
      await this.cartModel.findById(idCart);
      await this.productService.getIdProduct(idProduct);
      const listProducts = await this.cartModel.findById(idCart).select('-__v');
      const clearList = (listProducts?.listProducts ?? []).map(
        ({ idProduct }) => idProduct.toString(),
      );
      if (!clearList.includes(idProduct)) {
        throw new ApolloError(
          'Sorry, this product is not currently registered.',
          'NOT_FOUND',
        );
      }
      await this.cartModel.updateOne(
        { _id: idCart },
        {
          $pull: {
            listProducts: {
              idProduct: new Types.ObjectId(idProduct),
            },
          },
        },
      );
      return {
        message: 'Remove product successfully.',
        code: '201',
        value: 'remove-product',
      };
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while remove that product.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async getListCart(idCart: string, page: number): Promise<PagCartResponse> {
    try {
      const data = await this.getAllListCartUser(idCart);
      const arrayProduct: DataProductsCart[] = [];
      if (!data) {
        return response(arrayProduct, page);
      }

      for (let i = 0; i < data.listProducts.length; i++) {
        const infoProduct = await this.productService.getIdProduct(
          data.listProducts[i].idProduct.toString(),
        );
        arrayProduct.push(
          clearlistCartProduct({
            ...infoProduct,
            amount: data.listProducts[i].amount,
          }),
        );
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
      return;
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
