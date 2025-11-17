import { Injectable } from '@nestjs/common';
import { CartService } from 'src/cart/cart.service';
import { ProductsService } from 'src/products/products.service';
import { Detail } from './schema/detail.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ApolloError } from 'apollo-server-express';
import {
  DataDetailProduct,
  ListProduct,
  objProductData,
} from './interface/detail.interface';
import { CartUserList } from 'src/cart/interface/cart.interface';
import { responseDetail } from '@utils/response.util';
import { PagDetailResponse } from './dto/pag-detail-res.dto';
import { FeatbackService } from 'src/featback/featback.service';
import { QualificationService } from 'src/qualification/qualification.service';

@Injectable()
export class DetailService {
  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private feedbackService: FeatbackService,
    private qualifactionService: QualificationService,
    @InjectModel(Detail.name) private detailModel: Model<Detail>,
  ) {}

  async setDetailProduct(cartData: CartUserList) {
    let sum: number = 0;
    const listProduct: objProductData[] = [];
    const userId: string = cartData.idUser;

    for (let i = 0; i < cartData.listProducts.length; i++) {
      const obj = {
        idProduct: cartData.listProducts[i].idProduct,
        price: 0,
        amount: cartData.listProducts[i].amount,
        total: 0,
      };

      const infoProduct = await this.productService.getIdProduct(
        cartData.listProducts[i].idProduct.toString(),
      );

      obj.price = infoProduct.price;
      obj.total = obj.price * obj.amount;

      await this.productService.discountStock(
        obj.idProduct.toString(),
        obj.amount,
      );
      listProduct.push(obj);
      sum += obj.total;

      await this.feedbackService.enableFeadback(
        infoProduct.idFeatback.toString(),
        userId,
      );

      await this.qualifactionService.enableQualification(
        infoProduct.idQualification.toString(),
        userId,
      );
    }
    return { listProduct, totalBuy: sum };
  }

  async addDetail(idBuy: string, idCart: string): Promise<void> {
    try {
      const cartData = await this.cartService.getAllListCartUser(idCart);
      if (!cartData?.listProducts.length) {
        throw new ApolloError(
          "We couldn't continue with your purchase because your cart is empty.",
          'INTERNAL_SERVER_ERROR',
        );
      }
      const { listProduct, totalBuy } = await this.setDetailProduct(cartData);
      const detailInfo = new this.detailModel({
        idBuy: new Types.ObjectId(idBuy),
        listProduct,
        totalBuy,
      });
      await detailInfo.save();
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

  async getIdDetail(idBuy: string, page: number): Promise<PagDetailResponse> {
    try {
      const data = (await this.detailModel
        .findOne({
          idBuy: new Types.ObjectId(idBuy),
        })
        .select('listProduct totalBuy -_id')) as ListProduct;

      const dataDetail: DataDetailProduct[] = [];
      for (let i = 0; i < data?.listProduct.length; i++) {
        const objProduct = {
          idProduct: data.listProduct[i].idProduct.toString(),
          nameProduct: '',
          imageProduct: '',
          amount: data.listProduct[i].amount,
          price: data.listProduct[i].price,
          total: data.listProduct[i].total,
        };
        const { nameProduct, imageProduct } =
          await this.productService.getIdProduct(
            String(data.listProduct[i].idProduct),
          );
        objProduct.nameProduct = nameProduct;
        objProduct.imageProduct = imageProduct[0];
        dataDetail.push(objProduct);
      }
      return responseDetail(dataDetail, page, data.totalBuy);
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while searching for your products list detail.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }
}
