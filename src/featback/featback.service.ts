import { Injectable } from '@nestjs/common';
import { DeleteFeatbacktDto } from './dto/delete-featback.dto';
import { UpdateFeatbacktDto } from './dto/update-featback.dto';
import { AddFeatbacktDto } from './dto/create-featback.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Featback } from 'src/products/schema/featback.schema';
import { Model, Types } from 'mongoose';
import { ApolloError } from 'apollo-server-express';
import { RespInfoBase } from '@interface/data.info.interface';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class FeatbackService {
  constructor(
    @InjectModel(Featback.name) private feadbackModel: Model<Featback>,
    // private productService: ProductsService,
  ) {}

  async enableFeadback(idFeedback: string, idUser: string): Promise<void> {
    try {
      const data = await this.feadbackModel.findById(
        new Types.ObjectId(idFeedback),
      );

      if (data) {
        const existFeedback = data.listFeedback.find((item) =>
          item.idUser.equals(idUser),
        );

        if (!existFeedback) {
          const detailInfo = {
            idUser: new Types.ObjectId(idUser),
            enableFeedback: true,
          };

          await this.feadbackModel.findByIdAndUpdate(
            idFeedback,
            { $push: { listFeedback: detailInfo } },
            { new: true },
          );
        }
      }
      return;
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while the system was allowing you to add your comments.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async createdFeedbackToProduct(idProduct: string): Promise<string> {
    try {
      const data = new this.feadbackModel({
        idProduct: new Types.ObjectId(idProduct),
      });
      await data.save();
      return String(data._id);
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while created the feedback.',
        'INTERNAL_ERROR',
      );
    }
  }

  async addFeactback(dataFeatback: AddFeatbacktDto): Promise<RespInfoBase> {
    try {
      const data = await this.feadbackModel
        .findById(new Types.ObjectId(dataFeatback.idFeedback))
        .select('-_id listFeedback idProduct');

      if (data) {
        const productID = 1;
      }
      return {
        message: 'Featback adding successfully.',
        code: '201',
        value: 'created-featback',
      };
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while adding the feedback.',
        'INTERNAL_ERROR',
      );
    }
  }

  // async updateFeatback(
  //   dataFeatback: UpdateFeatbacktDto,
  // ): Promise<RespInfoBase> {
  //   try {
  //     // const data = await this.productModel.updateOne(
  //     //   {
  //     //     _id: dataFeatback.idProduct,
  //     //     'featback._id': dataFeatback.idFeatback,
  //     //   },
  //     //   {
  //     //     $set: {
  //     //       'featback.$.featback': dataFeatback.featback,
  //     //     },
  //     //   },
  //     // );
  //     // if (data.modifiedCount === 0) {
  //     //   throw new ApolloError(
  //     //     'Feedback not found or nothing was updated.',
  //     //     'NOT_FOUND',
  //     //   );
  //     // }
  //     return {
  //       message: 'Feedback updated successfully.',
  //       code: '200',
  //       value: 'updated-feedback',
  //     };
  //   } catch (error) {
  //     if (error instanceof ApolloError) {
  //       throw error;
  //     }
  //     throw new ApolloError(
  //       'An unexpected error occurred while updating the feedback.',
  //       'INTERNAL_ERROR',
  //     );
  //   }
  // }

  // async removeFeatback(
  //   dataFeatback: DeleteFeatbacktDto,
  // ): Promise<RespInfoBase> {
  //   try {
  //     // const data = await this.productModel.updateOne(
  //     //   { _id: dataFeatback.idProduct },
  //     //   {
  //     //     $pull: {
  //     //       featback: {
  //     //         _id: dataFeatback.idFeatback,
  //     //       },
  //     //     },
  //     //   },
  //     // );

  //     // if (data.modifiedCount === 0) {
  //     //   throw new ApolloError(
  //     //     'Feedback not found or already removed.',
  //     //     'NOT_FOUND',
  //     //   );
  //     // }

  //     return {
  //       message: 'Feedback deleted successfully.',
  //       code: '200',
  //       value: 'delete-feedback',
  //     };
  //   } catch (error) {
  //     if (error instanceof ApolloError) throw error;

  //     throw new ApolloError(
  //       'An unexpected error occurred while deleting the feedback.',
  //       'INTERNAL_ERROR',
  //     );
  //   }
  // }

  // getFeedbacksAll() {}
}
