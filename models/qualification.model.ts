import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class QualificationModel {
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
  value: string;
}
