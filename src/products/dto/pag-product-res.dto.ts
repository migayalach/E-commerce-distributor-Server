import { ObjectType, Field } from '@nestjs/graphql';
import { PaginatedResponse } from '@interface/response.interface';
import { ProductModel } from '@model/product.model';

@ObjectType()
export class PagProductResponse extends PaginatedResponse {
  @Field(() => [ProductModel])
  results: ProductModel[];
}
