import { ObjectType, Field } from '@nestjs/graphql';
import { PaginatedResponse } from '@interface/response.interface';
import { QualificationModel } from '@model/qualification.model';

@ObjectType()
export class PagQualificationResponse extends PaginatedResponse {
  @Field(() => [QualificationModel])
  results: QualificationModel[];
}
