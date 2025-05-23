import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BuyService } from './buy.service';
import { CreateBuyDto } from './dto/createBuy.dto';
import { ResponseInfo } from '@interface/response.interface';
import { PagBuyResponse } from './dto/pag-buy-res.dto';
import { RespInfoBase } from '@interface/data.info.interface';
import { Response } from '@interface/response.results.interface';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/sign/guard/auth.guard.guard.guard';

@Resolver('Buy')
export class BuyResolver {
  constructor(private readonly buyService: BuyService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => ResponseInfo)
  async createBuy(
    @Args('shoppingList') shoppingList: CreateBuyDto,
  ): Promise<RespInfoBase> {
    return await this.buyService.addBuy(shoppingList);
  }

  @UseGuards(AuthGuard)
  @Query(() => PagBuyResponse)
  async getAllBuy(
    @Args('idUser', { type: () => String, nullable: false }) idUser: string,
    @Args('page', { type: () => Int, nullable: true }) page: number = 1,
  ): Promise<Response> {
    return this.buyService.getIdBuyUserAll(idUser, page);
  }
}
