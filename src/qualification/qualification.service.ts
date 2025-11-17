import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApolloError } from 'apollo-server-express';
import { Model, Types } from 'mongoose';
import { ProductsService } from 'src/products/products.service';
import { Qualification } from 'src/products/schema/qualification.schema';
import { UserService } from 'src/user/user.service';
import { AddQualificationDto } from './dto/create-qualification.dto';
import { DeleteQualificationDto } from './dto/delete-qualification.dto';
import { DataQualification } from './interface/qualification.interface';
import { response } from '@utils/response.util';
import { RespInfoBase } from '@interface/data.info.interface';

@Injectable()
export class QualificationService {
  constructor(
    @InjectModel(Qualification.name)
    private qualificationModel: Model<Qualification>,
    @Inject(forwardRef(() => ProductsService))
    private productsService: ProductsService,
    private userService: UserService,
  ) {}

  async enableQualification(
    idQualification: string,
    idUser: string,
  ): Promise<void> {
    try {
      const data = await this.qualificationModel.findById(
        new Types.ObjectId(idQualification),
      );

      if (data) {
        const existQualification = data.listQualification.find((item) =>
          item.idUser.equals(idUser),
        );

        if (!existQualification) {
          const detailInfo = {
            idUser: new Types.ObjectId(idUser),
            enableQualification: true,
            value: 0,
          };

          await this.qualificationModel.findByIdAndUpdate(
            idQualification,
            { $push: { listQualification: detailInfo } },
            { new: true },
          );
        } else {
          throw new ApolloError(
            'Sorry, you could have an only qualification by product.',
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
        'An unexpected error occurred while the system was allowing you to add your qualification.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async createdQualificationToProduct(idProduct: string): Promise<string> {
    try {
      const data = new this.qualificationModel({
        idProduct: new Types.ObjectId(idProduct),
      });
      await data.save();
      return String(data._id);
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while created the qualification.',
        'INTERNAL_ERROR',
      );
    }
  }

  totalAverage(): number {
    // let current = 0;
    // let votesPeople = 0;
    // current += data.listQualification[i].value;
    // votesPeople++;
    // console.log(current / votesPeople);

    return 1;
  }

  async getAllQualifications(idQualification: string, page: number) {
    try {
      const data = await this.qualificationModel
        .findById(new Types.ObjectId(idQualification))
        .select('-_id listQualification');

      const information: DataQualification[] = [];

      if (data) {
        for (let i = 0; i < data?.listQualification.length; i++) {
          if (data.listQualification[i].value > 0) {
            const { name, lastName, email, profilePicture } =
              await this.userService.getIdUser(
                String(data.listQualification[i].idUser),
              );

            const item = {
              idUser: String(data.listQualification[i].idUser),
              name,
              lastName,
              email,
              profilePicture,
              value: data.listQualification[i].value,
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
        'An unexpected error occurred while loading the qualifications.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }
  async setQualification(
    dataQualification: AddQualificationDto,
  ): Promise<RespInfoBase> {
    try {
      const data = await this.qualificationModel
        .findById(new Types.ObjectId(dataQualification.idQualification))
        .select('-_id listQualification idProduct');

      if (data) {
        await this.productsService.getIdProduct(String(data.idProduct));
        await this.qualificationModel.updateOne(
          {
            _id: dataQualification.idQualification,
            'listQualification.idUser': new Types.ObjectId(
              dataQualification.idUser,
            ),
          },
          {
            $set: { 'listQualification.$.value': dataQualification.value },
          },
        );
      } else {
        throw new ApolloError(
          'Sorry, this product does not available to add your qualification.',
          'NOT_FOUND',
        );
      }
      return {
        message: 'Qualification adding successfully.',
        code: '201',
        value: 'created-qualification',
      };
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while adding your qualification.',
        'INTERNAL_ERROR',
      );
    }
  }

  async resetQualification(
    dataQualification: DeleteQualificationDto,
  ): Promise<RespInfoBase> {
    try {
      const data = await this.qualificationModel
        .findById(new Types.ObjectId(dataQualification.idQualification))
        .select('-_id listQualification idProduct');

      if (data) {
        await this.productsService.getIdProduct(String(data.idProduct));
        await this.qualificationModel.updateOne(
          {
            _id: dataQualification.idQualification,
            'listQualification.idUser': new Types.ObjectId(
              dataQualification.idUser,
            ),
          },
          {
            $set: { 'listQualification.$.value': 0 },
          },
        );
      } else {
        throw new ApolloError(
          'Sorry, this product does not available to add your qualification.',
          'NOT_FOUND',
        );
      }

      return {
        message: 'Qualification removed successfully.',
        code: '201',
        value: 'remove-qualification',
      };
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while deleting your qualification.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }
}
