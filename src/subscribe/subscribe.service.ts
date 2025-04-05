import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscribe } from './schema/subscribe.schema';
import { response } from '@utils/response.util';
import { clearSubs } from 'helpers/clearData.helpers';

@Injectable()
export class SubscribeService {
  constructor(
    @InjectModel(Subscribe.name) private subscribeModel: Model<Subscribe>,
  ) {}

  async getAllSubs(page: number) {
    try {
      const data = await this.subscribeModel.find().select('-__v');
      return response(clearSubs(data), page);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error:
            'An unexpected error occurred while loading the subscriptions list.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addSubEmail(dataInput): Promise<any> {
    const data = new this.subscribeModel(dataInput);
    return await data.save();
  }
}
