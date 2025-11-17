import { ResponseInfo } from '@interface/response.interface';
import { QualificationModel } from '@model/qualification.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class QualificationResponse extends ResponseInfo {
  @Field(() => [QualificationModel])
  info: QualificationModel[];
}
