import { ObjectType, Field } from '@nestjs/graphql';
import { PaginatedResponse } from '@interface/response.interface';
import { Category } from '../schema/category.schema';

@ObjectType()
export class PagCategoryResponse extends PaginatedResponse {
  @Field(() => [Category])
  results: Category[];
}
