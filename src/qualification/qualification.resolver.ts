import { Mutation, Resolver } from '@nestjs/graphql';
import { QualificationService } from './qualification.service';
import { ResponseInfo } from '@interface/response.interface';

@Resolver('Qualification')
export class QualificationResolver {
  constructor(private readonly qualificationService: QualificationService) {}

  @Mutation(() => ResponseInfo)
  addQualification() {}

  @Mutation(() => ResponseInfo)
  updateQualification() {}
}
