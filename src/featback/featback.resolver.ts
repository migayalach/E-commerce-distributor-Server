import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FeatbackService } from './featback.service';
import { AddFeatbacktDto } from './dto/create-featback.dto';
import { ResponseInfo } from '@interface/response.interface';
import { RespInfoBase } from '@interface/data.info.interface';
import { PagFeatbackResponse } from './interface/pag-feedback-res.dto';
import { Response } from '@interface/response.results.interface';
import { DeleteFeatbacktDto } from './dto/delete-featback.dto';

@Resolver('Featback')
export class FeatbackResolver {
  constructor(private readonly featbackService: FeatbackService) {}

  @Mutation(() => ResponseInfo)
  async addFeatback(
    @Args('dataFeatback') dataFeatback: AddFeatbacktDto,
  ): Promise<RespInfoBase> {
    return await this.featbackService.addFeactback(dataFeatback);
  }

  @Mutation(() => ResponseInfo)
  async deleteFeedbackByID(
    @Args('dataFeatback') dataFeatback: DeleteFeatbacktDto,
  ): Promise<RespInfoBase> {
    return await this.featbackService.deleteFeedbackByID(dataFeatback);
  }

  @Query(() => PagFeatbackResponse)
  async getAllFeedback(
    @Args('idFeedback', { type: () => String, nullable: false })
    idFeedback: string,
    @Args('page', { type: () => Int, nullable: true }) page: number = 1,
  ): Promise<Response> {
    return await this.featbackService.getAllFeedback(idFeedback, page);
  }
}
