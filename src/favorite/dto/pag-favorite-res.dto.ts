import { PaginatedResponse } from '@interface/response.interface';
import { FavoriteModelGQL } from '@model/favorite.model';
import { Field } from '@nestjs/graphql';

export class PagFavoriteResponse extends PaginatedResponse {
  @Field(() => [FavoriteModelGQL])
  results: FavoriteModelGQL[];
}
