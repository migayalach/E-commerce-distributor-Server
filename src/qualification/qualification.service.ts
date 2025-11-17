import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApolloError } from 'apollo-server-express';
import { Model, Types } from 'mongoose';
import { ProductsService } from 'src/products/products.service';
import { Qualification } from 'src/products/schema/qualification.schema';
import { UserService } from 'src/user/user.service';

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

  totalAverage() {}

  getAllQualifications() {}

  setQualification() {}

  resetQualification() {}
}
