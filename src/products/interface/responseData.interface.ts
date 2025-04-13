import { ResponseInfo } from '@interface/response.interface';
import { Field, ObjectType } from '@nestjs/graphql';
import { ProductModel } from '@model/product.model';

@ObjectType()
export class ProductResponse extends ResponseInfo {
  @Field(() => ProductModel)
  info: ProductModel;
}
