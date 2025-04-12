import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
import { Model, Types } from 'mongoose';
import { CategoryService } from 'src/category/category.service';
import { CreateProductDto } from './dto/createProductos.dto';
import { UpdateProductDto } from './dto/updateProducts.dto';
import { ApolloError } from 'apollo-server-express';
import { response } from '@utils/response.util';
import {
  DataOriginProduct,
  DataProduct,
  DataProductRes,
} from './interface/product.interface';
import { ResProduct } from '@interface/data.info.interface';
import { clearDataProduct } from '../../helpers/clearData.helpers';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private categoryService: CategoryService,
  ) {}

  async getAllProduct(page: number) {
    try {
      const dataProduct: DataOriginProduct[] = await this.productModel
        .find()
        .select('-__v');
      const productInfo: DataProduct[] = [];
      for (let i = 0; i < dataProduct.length; i++) {
        const dataCategory = await this.categoryService.getIdCategory(
          dataProduct[i].idCategory.toString(),
        );
        const infoProduct = clearDataProduct(dataProduct[i], dataCategory);
        productInfo.push(infoProduct);
      }
      return response(productInfo, page);
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while loading the products.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async getIdProduct(idProduct: string): Promise<DataProductRes> {
    try {
      const dataProduct: DataOriginProduct | null = await this.productModel
        .findById(idProduct)
        .select('-__v');
      if (!dataProduct) {
        throw new ApolloError('This product does not exist.', 'NOT_FOUND');
      }
      const dataCategory = await this.categoryService.getIdCategory(
        dataProduct.idCategory.toString(),
      );
      return clearDataProduct(dataProduct, dataCategory);
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while searching the product.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async addProduct(dataProduct: CreateProductDto): Promise<ResProduct> {
    try {
      const existName = await this.productModel
        .find({
          nameProduct: dataProduct.nameProduct.trim(),
        })
        .select('-__v');
      if (existName.length) {
        throw new ApolloError(
          'This name is already registered, please enter another one',
          'CONFLICT',
        );
      }
      await this.categoryService.thereIsIdCategory(dataProduct.idCategory);
      const data = new this.productModel({
        ...dataProduct,
        idCategory: new Types.ObjectId(dataProduct.idCategory),
      });
      await data.save();
      const productData: DataProductRes = await this.getIdProduct(
        String(data._id),
      );
      return {
        message: 'Product create successfully.',
        code: '201',
        value: 'created-product',
        info: productData,
      };
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while creating the new product.',
        'INTERNAL_ERROR',
      );
    }
  }

  async updateProduct(dataProduct: UpdateProductDto): Promise<ResProduct> {
    try {
      await this.getIdProduct(dataProduct.idProduct);
      await this.categoryService.thereIsIdCategory(dataProduct.idCategory);
      await this.productModel.findByIdAndUpdate(dataProduct.idProduct, {
        idCategory: new Types.ObjectId(dataProduct.idCategory),
        nameProduct: dataProduct.nameProduct,
        price: dataProduct.price,
        stock: dataProduct.stock,
        state: dataProduct.state,
      });
      return {
        message: 'Product update successfully.',
        code: '200',
        value: 'update-product',
        info: await this.getIdProduct(dataProduct.idProduct),
      };
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while updating the product.',
        'INTERNAL_ERROR',
      );
    }
  }

  async removeProduct(idProduct: string): Promise<ResProduct> {
    try {
      const data = await this.getIdProduct(idProduct);
      await this.productModel.findByIdAndDelete(idProduct);
      return {
        message: 'Product delete successfully.',
        code: '200',
        value: 'delete-product',
        info: data,
      };
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while deleting the product.',
        'INTERNAL_ERROR',
      );
    }
  }
}
