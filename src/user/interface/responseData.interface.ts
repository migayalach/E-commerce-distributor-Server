import { ResponseInfo } from '@interface/response.interface';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserIdModelGQL } from '@model/user.model';

@ObjectType()
export class UserResponse extends ResponseInfo {
  @Field(() => UserIdModelGQL)
  info: UserIdModelGQL;
}
