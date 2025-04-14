import { PaginatedResponse } from '@interface/response.interface';
import { BuyModelGQL } from '@model/buy.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PagBuyResponse extends PaginatedResponse {
  @Field(() => [BuyModelGQL])
  results: BuyModelGQL[];
}
