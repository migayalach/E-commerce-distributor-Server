import { ObjectType, Field } from '@nestjs/graphql';
import { PaginatedResponse } from '@interface/response.interface';
import { FeedbackModel } from '@model/feedback.model';

@ObjectType()
export class PagFeatbackResponse extends PaginatedResponse {
  @Field(() => [FeedbackModel])
  results: FeedbackModel[];
}
