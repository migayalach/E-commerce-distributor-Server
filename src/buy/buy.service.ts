import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Buy } from './schema/buy.schema';
import { Model, Types } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { DetailService } from 'src/detail/detail.service';
import { CreateBuyDto } from './dto/createBuy.dto';
import { ApolloError } from 'apollo-server-express';
import { RespInfoBase } from '@interface/data.info.interface';
import { response } from '@utils/response.util';
import { PagBuyResponse } from './dto/pag-buy-res.dto';
import { clearListBuys } from 'helpers/clearData.helpers';
import { DataBuyRes } from './interface/buy.interface';

@Injectable()
export class BuyService {
  constructor(
    private userService: UserService,
    private detailService: DetailService,
    @InjectModel(Buy.name) private buyModel: Model<Buy>,
  ) {}

  async addBuy(shoppingCart: CreateBuyDto): Promise<RespInfoBase> {
    try {
      await this.userService.getIdUser(shoppingCart.idUser);
      const nowDate = new Date(
        new Date().toLocaleString('en-US', { timeZone: 'America/La_Paz' }),
      );
      const data = new this.buyModel({
        idUser: new Types.ObjectId(shoppingCart.idUser),
        date: nowDate,
        code: `C-BCA - ${(await this.buyModel.countDocuments()) + 1}`,
      });
      if (!data) {
        throw new ApolloError(
          'An unexpected error occurred while creating the buy.',
          'INTERNAL_SERVER_ERROR',
        );
      }
      await this.detailService.addDetail(String(data._id), shoppingCart.idCart);
      await data.save();
      return {
        message: 'Buy creating successfully.',
        code: '201',
        value: 'created-buy',
      };
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while creating the purchase.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async getIdBuyUserAll(idUser: string, page: number): Promise<PagBuyResponse> {
    try {
      await this.userService.getIdUser(idUser);
      const listBuys: DataBuyRes[] = await this.buyModel
        .find({
          idUser: new Types.ObjectId(idUser),
        })
        .select('-__v -idUser');
      return response(clearListBuys(listBuys), page);
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while searching for your shopping list.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }
}
