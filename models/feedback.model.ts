import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class FeedbackModel {
  @Field()
  idUser: string;

  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  profilePicture: string;

  @Field()
  feedback: string;
}
