import { ObjectType, Field } from '@nestjs/graphql';
import { PaginatedResponse } from '@interface/response.interface';
import { Level } from '../schema/level.schema';

@ObjectType()
export class PagLevelResponse extends PaginatedResponse {
  @Field(() => [Level])
  results: Level[];
}
