import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CartModelGQL {
  @Field(() => ID)
  idProduct: string;

  @Field()
  nameProduct: string;

  @Field()
  price: number;

  @Field()
  imageProduct: string;

  @Field()
  stock: number;

  @Field()
  amount: number;
}
