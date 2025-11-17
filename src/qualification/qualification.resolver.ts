import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { QualificationService } from './qualification.service';
import { ResponseInfo } from '@interface/response.interface';
import { PagQualificationResponse } from './dto/pag-qualification-res.dto';
import { AddQualificationDto } from './dto/create-qualification.dto';
import { RespInfoBase } from '@interface/data.info.interface';
import { DeleteQualificationDto } from './dto/delete-qualification.dto';
import { Response } from '@interface/response.results.interface';

@Resolver('Qualification')
export class QualificationResolver {
  constructor(private readonly qualificationService: QualificationService) {}

  @Mutation(() => ResponseInfo)
  async setQualification(
    @Args('dataQualification') dataQualification: AddQualificationDto,
  ): Promise<RespInfoBase> {
    return await this.qualificationService.setQualification(dataQualification);
  }

  @Mutation(() => ResponseInfo)
  async resetQualification(
    @Args('dataQualification') dataQualification: DeleteQualificationDto,
  ): Promise<RespInfoBase> {
    return await this.qualificationService.resetQualification(
      dataQualification,
    );
  }

  @Query(() => PagQualificationResponse)
  async getAllQualification(
    @Args('idQualification', { type: () => String, nullable: false })
    idQualification: string,
    @Args('page', { type: () => Int, nullable: true }) page: number = 1,
  ): Promise<Response> {
    return await this.qualificationService.getAllQualifications(
      idQualification,
      page,
    );
  }
}
