import { ResponseInfo } from '@interface/response.interface';
import { Field, ObjectType } from '@nestjs/graphql';
import { Subscribe } from '../schema/subscribe.schema';

@ObjectType()
export class SubscribeResponse extends ResponseInfo {
  @Field(() => Subscribe)
  info: Subscribe;
}
