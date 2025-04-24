import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FavoriteService } from './favorite.service';
import { ActionFavoriteDto } from './dto/actionFavorite.dto';
import { ResponseInfo } from '@interface/response.interface';
import { PagFavoriteResponse } from './dto/pag-favorite-res.dto';
import { RespInfoBase } from '@interface/data.info.interface';
import { Response } from '@interface/response.results.interface';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/sign/guard/auth.guard.guard.guard';

@Resolver('Favorite')
export class FavoriteResolver {
  constructor(private readonly favoriteService: FavoriteService) {}

  @UseGuards(AuthGuard)
  @Query(() => PagFavoriteResponse)
  async getAllIdFavorite(
    @Args('idFavorite', { type: () => String, nullable: false })
    idFavorite: string,
    @Args('page', { type: () => Int, nullable: true })
    page: number = 1,
  ): Promise<Response> {
    return await this.favoriteService.getListFavorites(idFavorite, page);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ResponseInfo)
  async actionFavorite(
    @Args('dataFavorite') dataFavorite: ActionFavoriteDto,
  ): Promise<RespInfoBase> {
    return await this.favoriteService.actionFavorite(dataFavorite);
  }
}
