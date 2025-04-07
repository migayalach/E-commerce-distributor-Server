import { ResponseInfo } from '@interface/response.interface';
import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from '../schema/category.schema';

@ObjectType()
export class CategoryResponse extends ResponseInfo {
  @Field(() => Category)
  info: Category;
}
