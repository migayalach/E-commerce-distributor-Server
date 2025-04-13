import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductModel {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  idCategory: string;

  @Field()
  nameCategory: string;

  @Field()
  nameProduct: string;

  @Field()
  price: number;

  @Field()
  stock: number;

  @Field()
  imageProduct: string;

  @Field(() => Boolean, { nullable: true })
  state: boolean;
}
