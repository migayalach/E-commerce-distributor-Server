import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscribe } from './schema/subscribe.schema';

@Injectable()
export class SubscribeService {
  constructor(
    @InjectModel(Subscribe.name) private subscribeModel: Model<Subscribe>,
  ) {}

  async getAllSubs(): Promise<any> {
    const data = await this.subscribeModel.find();
    return data;
  }

  async addSubEmail(dataInput): Promise<any> {
    try {
      const data = new this.subscribeModel(dataInput);
      return await data.save();
    } catch (error) {}
  }
}
