import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schema/category.schema';
import { Model } from 'mongoose';
import { response } from '@utils/response.util';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { ApolloError } from 'apollo-server-express';
import { ResCategory } from '@interface/data.info.interface';
import { clearCategory, clearObjCategory } from 'helpers/clearData.helpers';
import { DataCategory } from './interface/category.interface';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { Product } from 'src/products/schema/product.schema';
import { Types } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async thereIsCategory(nameCategory: string): Promise<void> {
    const data = await this.categoryModel
      .findOne({ nameCategory })
      .select('-__v');
    if (data) {
      throw new ApolloError('This category does exist.');
    }
  }

  async thereIsIdCategory(idCategory: string): Promise<DataCategory> {
    const data = await this.categoryModel
      .findById(idCategory)
      .select('-__v')
      .lean();
    if (!data) {
      throw new ApolloError('This category does not exist.');
    }
    return clearObjCategory(data);
  }

  async getAllCategories(page: number, stateCategory: boolean) {
    try {
      const data = await this.categoryModel
        .find({ stateCategory })
        .select('-__v');
      return response(clearCategory(data), page);
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while loading the categories.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async getIdCategory(idCategory: string): Promise<DataCategory> {
    try {
      const data = await this.thereIsIdCategory(idCategory);
      return data;
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while searching the category.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async addCategory(dataCategory: CreateCategoryDto): Promise<ResCategory> {
    try {
      await this.thereIsCategory(dataCategory.nameCategory);
      const data = new this.categoryModel(dataCategory);
      const newCategory = await data.save();
      return {
        message: 'Category create successfully.',
        code: '201',
        value: 'create-category',
        info: newCategory,
      };
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while creating the new category.',
        'INTERNAL_ERROR',
      );
    }
  }

  async refreshCategory(dataCategory: UpdateCategoryDto): Promise<ResCategory> {
    try {
      await this.thereIsIdCategory(dataCategory.idCategory);
      await this.categoryModel.findByIdAndUpdate(dataCategory.idCategory, {
        nameCategory: dataCategory.nameCategory,
      });
      const data = await this.getIdCategory(dataCategory.idCategory);
      return {
        message: 'Category update successfully.',
        code: '200',
        value: 'update-category',
        info: clearObjCategory(data),
      };
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while updating the new category.',
        'INTERNAL_ERROR',
      );
    }
  }

  async deleteCategory(idCategory: string): Promise<ResCategory> {
    try {
      await this.thereIsIdCategory(idCategory);
      const stateCategoryAndProduct = await this.productModel.find({
        idCategory: new Types.ObjectId(idCategory),
      });

      if (!stateCategoryAndProduct.length) {
        await this.categoryModel.findByIdAndDelete(
          new Types.ObjectId(idCategory),
        );
      } else {
        await this.categoryModel.updateOne(
          {
            _id: new Types.ObjectId(idCategory),
          },
          { stateCategory: false },
        );
        await this.productModel.updateMany(
          {
            idCategory: new Types.ObjectId(idCategory),
          },
          { $set: { state: false } },
        );
      }
      const data = await this.thereIsIdCategory(idCategory);
      return {
        message:
          'The category has been successfully deactivated and will be removed in 30 days.',
        code: '200',
        value: 'delete-category',
        info: clearObjCategory(data),
      };
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while delete the ca11tegory.',
        'INTERNAL_ERROR',
      );
    }
  }

  async restoreCategory(idCategory: string): Promise<ResCategory> {
    try {
      await this.thereIsIdCategory(idCategory);
      await this.categoryModel.updateOne(
        {
          _id: new Types.ObjectId(idCategory),
        },
        { stateCategory: true },
      );
      await this.productModel.updateMany(
        {
          idCategory: new Types.ObjectId(idCategory),
        },
        { $set: { state: true } },
      );
      const data = await this.thereIsIdCategory(idCategory);
      return {
        message: 'The category has been successfully activated and restored.',
        code: '200',
        value: 'restored-category',
        info: clearObjCategory(data),
      };
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while restored the ca11tegory.',
        'INTERNAL_ERROR',
      );
    }
  }
}
