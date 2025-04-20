import { Field, ObjectType } from '@nestjs/graphql';
import { AccessUser } from 'enum/options.enum';

@ObjectType()
class UserAccess {
  @Field()
  idUser: string;

  @Field()
  idFavorite: string;

  @Field()
  idCart: string;

  @Field()
  nameUser: string;

  @Field()
  nameLevel: string;

  @Field()
  profilePicture: string;
}

@ObjectType()
export class SignResponse {
  @Field()
  code: string;

  @Field()
  message: string;

  @Field(() => AccessUser)
  value: AccessUser;

  @Field(() => UserAccess)
  info: UserAccess;
}
