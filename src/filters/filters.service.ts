import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { response } from '@utils/response.util';
import { ApolloError } from 'apollo-server-express';
import { clearDataProduct } from 'helpers/clearData.helpers';
import { Model, Types } from 'mongoose';
import { CategoryService } from 'src/category/category.service';
import {
  DataOriginProduct,
  DataProduct,
} from 'src/products/interface/product.interface';
import { Product } from 'src/products/schema/product.schema';

@Injectable()
export class FiltersService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private categoryService: CategoryService,
  ) {}

  async searchProduct(product: string, price: string, page: number) {
    try {
      const dataProduct: DataOriginProduct[] = await this.productModel
        .find({
          nameProduct: { $regex: `^${product}`, $options: 'i' },
          state: true,
        })
        .select('-__v');

      if (!dataProduct.length) {
        throw new ApolloError(
          'Please enter the name of the product you are looking for?',
          'NOT_FOUND',
        );
      }
      const productInfo: DataProduct[] = [];
      for (let i = 0; i < dataProduct.length; i++) {
        const dataCategory = await this.categoryService.getIdCategory(
          dataProduct[i].idCategory.toString(),
        );
        const infoProduct = clearDataProduct(dataProduct[i], dataCategory);
        productInfo.push(infoProduct);
      }

      if (price) {
        const sortedProducts = productInfo.sort((a, b) => {
          if (price === 'DESC') {
            return b.price - a.price;
          }
          return a.price - b.price;
        });

        return response(sortedProducts, page);
      } else {
        return response(productInfo, page);
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while searching for the product.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async searchCategoryProduct(idCategory: string, price: string, page: number) {
    try {
      const dataProduct: DataOriginProduct[] = await this.productModel
        .find({
          idCategory: new Types.ObjectId(idCategory),
          state: true,
        })
        .select('-__v');

      if (!dataProduct.length) {
        throw new ApolloError(
          'Please enter the name of the product you are looking for?',
          'NOT_FOUND',
        );
      }
      const productInfo: DataProduct[] = [];

      for (let i = 0; i < dataProduct.length; i++) {
        const dataCategory = await this.categoryService.getIdCategory(
          dataProduct[i].idCategory.toString(),
        );
        const infoProduct = clearDataProduct(dataProduct[i], dataCategory);
        productInfo.push(infoProduct);
      }

      if (price) {
        const sortedProducts = productInfo.sort((a, b) => {
          if (price === 'DESC') {
            return b.price - a.price;
          }
          return a.price - b.price;
        });

        return response(sortedProducts, page);
      } else {
        return response(productInfo, page);
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while searching for the product.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }
}
