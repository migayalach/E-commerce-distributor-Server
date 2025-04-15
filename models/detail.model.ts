import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DetailModelGQL {
  @Field(() => ID)
  idProduct: string;

  @Field()
  nameProduct: string;

  @Field()
  price: number;

  @Field()
  imageProduct: string;

  @Field()
  amount: number;

  @Field()
  total: number;
}
