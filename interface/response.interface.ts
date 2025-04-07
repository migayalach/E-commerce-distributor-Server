import { Field, ObjectType } from '@nestjs/graphql';
import { Info } from './info.interface';

@ObjectType({ isAbstract: true })
export abstract class PaginatedResponse {
  @Field(() => Info)
  info: Info;
}

@ObjectType()
export class ResponseInfo {
  @Field()
  message: string;

  @Field()
  code: string;

  @Field()
  value: string;
}
