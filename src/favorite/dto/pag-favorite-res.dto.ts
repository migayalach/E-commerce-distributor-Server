import { PaginatedResponse } from '@interface/response.interface';
import { FavoriteModelGQL } from '@model/favorite.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PagFavoriteResponse extends PaginatedResponse {
  @Field(() => [FavoriteModelGQL])
  results: FavoriteModelGQL[] | [];
}
