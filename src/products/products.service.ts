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
import { EmailService } from 'src/email/email.service';
import { UserService } from 'src/user/user.service';
import { ActionAddDelete } from 'enum/options.enum';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private categoryService: CategoryService,
    private emailService: EmailService,
    private userService: UserService,
  ) {}

  async actionProductFav(
    idProduct: string,
    action: ActionAddDelete,
    idUser: string,
  ): Promise<void> {
    if (action === ActionAddDelete.add) {
      await this.productModel.findByIdAndUpdate(idProduct, {
        $push: {
          usersFavorite: new Types.ObjectId(idUser),
        },
      });
    } else if (action === ActionAddDelete.delete) {
      await this.productModel.findByIdAndUpdate(idProduct, {
        $pull: { usersFavorite: new Types.ObjectId(idUser) },
      });
    }
  }

  async actionProductCart(
    idProduct: string,
    action: ActionAddDelete,
    idUser: string,
  ): Promise<void> {
    if (action === ActionAddDelete.add) {
      await this.productModel.findByIdAndUpdate(idProduct, {
        $push: {
          usersCart: new Types.ObjectId(idUser),
        },
      });
    } else if (action === ActionAddDelete.delete) {
      await this.productModel.findByIdAndUpdate(idProduct, {
        $pull: { usersCart: new Types.ObjectId(idUser) },
      });
    }
  }

  async getAllListProducts(): Promise<Types.ObjectId[]> {
    const dataProduct: DataOriginProduct[] = await this.productModel
      .find()
      .select('_id');
    return dataProduct.map(({ _id }) => _id);
  }

  async discountStock(idProduct: string, amount: number): Promise<void> {
    const productStock = await this.getIdProduct(idProduct);
    const newStock = productStock.stock - amount;
    await this.productModel.findByIdAndUpdate(idProduct, {
      stock: newStock,
    });
    const dataStock = await this.getIdProduct(idProduct);
    if (dataStock.stock > 0 && dataStock.stock <= 10) {
      const listAdmins = await this.userService.getAllUsersAdmins();
      await Promise.all(
        listAdmins.map(async ({ name, email }) => {
          return await this.emailService.sendEmailItemMin(
            email,
            name,
            productStock.nameProduct,
            productStock.stock,
          );
        }),
      );
    } else if (dataStock.stock === 0) {
      await this.productModel.findByIdAndUpdate(idProduct, { state: false });
      const listAdmins = await this.userService.getAllUsersAdmins();
      await Promise.all(
        listAdmins.map(async ({ name, email }) => {
          return await this.emailService.sendEmailItemCero(
            email,
            name,
            productStock.nameProduct,
          );
        }),
      );
    }
    return;
  }

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
        if (existName[0].nameProduct === dataProduct.nameProduct) {
          throw new ApolloError(
            'This name is already registered, please enter another one',
            'CONFLICT',
          );
        }
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
        imageProduct: dataProduct.imageProduct,
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
