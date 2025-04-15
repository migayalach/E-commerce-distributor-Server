import { PaginatedResponse } from '@interface/response.interface';
import { DetailModelGQL } from '@model/detail.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PagDetailResponse extends PaginatedResponse {
  @Field()
  totalBuy: number;

  @Field(() => [DetailModelGQL])
  results: DetailModelGQL[];
}
