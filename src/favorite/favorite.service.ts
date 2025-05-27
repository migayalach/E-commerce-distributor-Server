import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Favorite } from './schema/favorite.schema';
import { Model, Types } from 'mongoose';
import { ProductsService } from 'src/products/products.service';
import { ActionFavoriteDto } from './dto/actionFavorite.dto';
import { ApolloError } from 'apollo-server-express';
import { ActionAddDelete } from 'enum/options.enum';
import { RespInfoBase } from '@interface/data.info.interface';
import { FavoriteUserList } from './interface/favorite.interface';
import { DataProductFavorite } from 'src/products/interface/product.interface';
import { clearlistFavProduct } from 'helpers/clearData.helpers';
import { response } from '@utils/response.util';
import { PagFavoriteResponse } from './dto/pag-favorite-res.dto';
import { FavoriteModelGQL } from '@model/favorite.model';

@Injectable()
export class FavoriteService {
  constructor(
    private productService: ProductsService,
    @InjectModel(Favorite.name) private favoriteModel: Model<Favorite>,
  ) {}

  async getAllFavorite(idFavorite: string): Promise<FavoriteModelGQL[]> {
    const data: FavoriteUserList | null = await this.favoriteModel
      .findById(idFavorite)
      .select('listProducts');
    const arrayProduct: DataProductFavorite[] = [];
    if (!data) {
      return [];
    }
    for (let i = 0; i < data.listProducts.length; i++) {
      const infoProduct = await this.productService.getIdProduct(
        data.listProducts[i].toString(),
      );
      arrayProduct.push(clearlistFavProduct(infoProduct));
    }
    return arrayProduct;
  }

  async getListFavorites(
    idFavorite: string,
    page: number,
  ): Promise<PagFavoriteResponse> {
    try {
      const data: FavoriteUserList | null = await this.favoriteModel
        .findById(idFavorite)
        .select('listProducts');
      const arrayProduct: DataProductFavorite[] = [];
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
        'An unexpected error occurred while loading the favorites.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async actionFavorite(dataProduct: ActionFavoriteDto): Promise<RespInfoBase> {
    try {
      if (
        dataProduct.action === ActionAddDelete.add ||
        dataProduct.action === ActionAddDelete.delete
      ) {
        const existList = await this.favoriteModel.findById(
          dataProduct.idFavorite,
        );
        if (!existList) {
          throw new ApolloError(
            'Sorry, your favorites list is not available.',
            'NOT_FOUND',
          );
        }
        await this.productService.getIdProduct(dataProduct.idProduct);
        const listProducts = await this.favoriteModel
          .findById(dataProduct.idFavorite)
          .select('-__v');
        if (dataProduct.action === ActionAddDelete.add) {
          if (
            listProducts?.listProducts.includes(
              new Types.ObjectId(dataProduct.idProduct),
            )
          ) {
            throw new ApolloError(
              'Sorry, this product is currently registered.',
              'NOT_FOUND',
            );
          }
          await this.favoriteModel.findByIdAndUpdate(dataProduct.idFavorite, {
            $push: {
              listProducts: new Types.ObjectId(dataProduct.idProduct),
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
              new Types.ObjectId(dataProduct.idProduct),
            )
          ) {
            throw new ApolloError(
              'Sorry, this product is not currently registered.',
              'NOT_FOUND',
            );
          }
          await this.favoriteModel.findByIdAndUpdate(dataProduct.idFavorite, {
            $pull: { listProducts: new Types.ObjectId(dataProduct.idProduct) },
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
}
