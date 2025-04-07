import { ResponseInfo } from '@interface/response.interface';
import { Field, ObjectType } from '@nestjs/graphql';
import { Level } from '../schema/level.schema';

@ObjectType()
export class LevelResponse extends ResponseInfo {
  @Field(() => Level)
  info: Level;
}
