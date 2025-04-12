import { ResponseInfo } from '@interface/response.interface';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserModelGQL } from '@model/user.model';

@ObjectType()
export class UserResponse extends ResponseInfo {
  @Field(() => UserModelGQL)
  info: UserModelGQL;
}
