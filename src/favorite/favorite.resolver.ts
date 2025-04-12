import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/createFavorite.dto';
import { ResponseInfo } from '@interface/response.interface';

@Resolver()
export class FavoriteResolver {
  constructor(private readonly favoriteService: FavoriteService) {}

  getAllIdFavorite() {}

  @Mutation(() => ResponseInfo)
  createFavorite(@Args('dataFavorite') dataFavorite: CreateFavoriteDto) {
    return;
  }

  @Mutation(() => ResponseInfo)
  removeFavorite(
    @Args('idFavorite', { type: () => String, nullable: false })
    idFavorite: string,
    @Args('idProduct', { type: () => String, nullable: false })
    idProduct: string,
  ) {
    return;
  }
}
