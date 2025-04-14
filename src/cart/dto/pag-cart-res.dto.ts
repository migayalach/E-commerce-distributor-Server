import { PaginatedResponse } from '@interface/response.interface';
import { CartModelGQL } from '@model/cart.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PagCartResponse extends PaginatedResponse {
  @Field(() => [CartModelGQL])
  results: CartModelGQL[] | [];
}
