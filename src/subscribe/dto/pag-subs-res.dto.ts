import { ObjectType, Field } from '@nestjs/graphql';
import { PaginatedResponse } from '@interface/response.interface';
import { Subscribe } from '../schema/subscribe.schema';

@ObjectType()
export class PagSubsResponse extends PaginatedResponse {
  @Field(() => [Subscribe])
  results: Subscribe[];
}
