import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BuyModelGQL {
  @Field(() => ID)
  _id: string;

  @Field()
  date: Date;

  @Field()
  code: string;
}
