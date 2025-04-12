import { ObjectType, Field } from '@nestjs/graphql';
import { PaginatedResponse } from '@interface/response.interface';
import { UserModelGQL } from '@model/user.model';

@ObjectType()
export class PagUserResponse extends PaginatedResponse {
  @Field(() => [UserModelGQL])
  results: UserModelGQL[];
}
