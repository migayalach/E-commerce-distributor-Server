import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FavoriteModelGQL {
  @Field(() => ID)
  idProduct: string;

  @Field()
  nameProduct: string;

  @Field()
  price: number;

  @Field()
  stock: number;
}
