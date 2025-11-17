import { ResponseInfo } from '@interface/response.interface';
import { Field, ObjectType } from '@nestjs/graphql';
import { FeedbackModel } from '@model/feedback.model';

@ObjectType()
export class FeedbackResponse extends ResponseInfo {
  @Field(() => [FeedbackModel])
  info: FeedbackModel[];
}
