import { Field, ObjectType } from '@nestjs/graphql';
import { Info } from './info.interface';
import { Subscribe } from 'src/subscribe/schema/subscribe.schema';

@ObjectType({ isAbstract: true })
export abstract class PaginatedResponse<T> {
  @Field(() => Info)
  info: Info;

  @Field(() => [Subscribe])
  results: T[];
}
