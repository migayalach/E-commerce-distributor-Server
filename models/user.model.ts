import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModelGQL {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  idLevel: string;

  @Field()
  nameLevel: string;

  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  carnet: string;

  @Field()
  phone: number;

  @Field()
  profilePicture: string;
}

@ObjectType()
export class UserIdModelGQL {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  idLevel: string;

  @Field(() => ID)
  idFavorite: string;

  @Field(() => ID)
  idCart: string;

  @Field()
  nameLevel: string;

  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  carnet: string;

  @Field()
  phone: number;

  @Field()
  profilePicture: string;
}
