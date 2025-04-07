import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscribe } from './schema/subscribe.schema';
import { response } from '@utils/response.util';
import { clearSubs } from 'helpers/clearData.helpers';
import { ApolloError } from 'apollo-server-express';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { DataSubs } from './interface/subscribe.interface';
import { ResSubscription } from '@interface/data.info.interface';

@Injectable()
export class SubscribeService {
  constructor(
    @InjectModel(Subscribe.name) private subscribeModel: Model<Subscribe>,
  ) {}

  async getEmailSubs(email: string): Promise<DataSubs | null> {
    const data = await this.subscribeModel.findOne({
      email,
    });
    return data;
  }

  async getAllSubs(page: number) {
    try {
      const data = await this.subscribeModel.find().select('-__v');
      return response(clearSubs(data), page);
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while loading the subscription.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async addSubEmail(
    dataInput: CreateSubscriptionDto,
  ): Promise<ResSubscription> {
    try {
      const existingUser = await this.getEmailSubs(dataInput.email);
      if (existingUser) {
        throw new ApolloError('This email is already subscribed', 'CONFLICT');
      }
      const data = new this.subscribeModel(dataInput);
      const newsubs = await data.save();
      return {
        message: 'Subscription created successfully.',
        code: '201',
        value: 'created-subscription',
        info: newsubs,
      };
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while creating the new subscription.',
        'INTERNAL_ERROR',
      );
    }
  }

  async cancelSub(email: string): Promise<ResSubscription> {
    try {
      const existEmail = await this.getEmailSubs(email);
      if (!existEmail) {
        throw new ApolloError(
          "This email doesn't currently exist",
          'EMAIL_DOES_NOT_EXIST',
        );
      }
      await this.subscribeModel.findByIdAndDelete(existEmail._id);
      return {
        message: `Subscription successfully canceled.`,
        code: '200',
        value: 'deleted-subscription',
        info: existEmail,
      };
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while deleting the subscription',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }
}
