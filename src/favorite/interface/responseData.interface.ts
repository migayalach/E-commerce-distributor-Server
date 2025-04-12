import { ResponseInfo } from '@interface/response.interface';
import { FavoriteModelGQL } from '@model/favorite.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FavoriteResponse extends ResponseInfo {
  @Field(() => FavoriteModelGQL)
  info: FavoriteModelGQL;
}
