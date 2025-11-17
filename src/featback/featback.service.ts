import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AddFeatbacktDto } from './dto/create-featback.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Featback } from 'src/products/schema/featback.schema';
import { Model, Types } from 'mongoose';
import { ApolloError } from 'apollo-server-express';
import { RespInfoBase } from '@interface/data.info.interface';
import { ProductsService } from 'src/products/products.service';
import { UserService } from 'src/user/user.service';
import { response } from '@utils/response.util';
import { DataFeedback } from './interface/feedback.interface';
import { DeleteFeatbacktDto } from './dto/delete-featback.dto';

@Injectable()
export class FeatbackService {
  constructor(
    @InjectModel(Featback.name) private feadbackModel: Model<Featback>,
    @Inject(forwardRef(() => ProductsService))
    private productsService: ProductsService,
    private userService: UserService,
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
        } else {
          throw new ApolloError(
            'Sorry, you could have an only feedback by product.',
            'NOT_FOUND',
          );
        }
      } else {
        throw new ApolloError(
          'Sorry, this product does not available.',
          'NOT_FOUND',
        );
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
        await this.productsService.getIdProduct(String(data.idProduct));
        await this.feadbackModel.updateOne(
          {
            _id: dataFeatback.idFeedback,
            'listFeedback.idUser': new Types.ObjectId(dataFeatback.idUser),
          },
          {
            $set: { 'listFeedback.$.featback': dataFeatback.featback },
          },
        );
      } else {
        throw new ApolloError(
          'Sorry, this product does not available to add your feedback.',
          'NOT_FOUND',
        );
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

  async getAllFeedback(idFeedback: string, page: number) {
    try {
      const data = await this.feadbackModel
        .findById(new Types.ObjectId(idFeedback))
        .select('-_id listFeedback');

      const information: DataFeedback[] = [];
      if (data) {
        for (let i = 0; i < data?.listFeedback.length; i++) {
          if (data.listFeedback[i].featback.length > 1) {
            const { name, lastName, email, profilePicture } =
              await this.userService.getIdUser(
                String(data.listFeedback[i].idUser),
              );

            const item = {
              idUser: String(data.listFeedback[i].idUser),
              name,
              lastName,
              email,
              profilePicture,
              feedback: data.listFeedback[i].featback,
            };

            information.push(item);
          }
        }
      }
      return response(information, page);
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while loading the feedback.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async deleteFeedbackByID(
    dataFeatback: DeleteFeatbacktDto,
  ): Promise<RespInfoBase> {
    try {
      const data = await this.feadbackModel
        .findById(new Types.ObjectId(dataFeatback.idFeedback))
        .select('-_id listFeedback idProduct');

      if (data) {
        await this.productsService.getIdProduct(String(data.idProduct));
        await this.feadbackModel.updateOne(
          {
            _id: dataFeatback.idFeedback,
            'listFeedback.idUser': new Types.ObjectId(dataFeatback.idUser),
          },
          {
            $set: { 'listFeedback.$.featback': '' },
          },
        );
      } else {
        throw new ApolloError(
          'Sorry, this product does not available to removed your feedback.',
          'NOT_FOUND',
        );
      }
      return {
        message: 'Featback removed successfully.',
        code: '201',
        value: 'remove-featback',
      };
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while deleting your feedback.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }
}
