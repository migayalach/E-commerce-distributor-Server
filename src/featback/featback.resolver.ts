import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FeatbackService } from './featback.service';
import { AddFeatbacktDto } from './dto/create-featback.dto';
// import { UpdateFeatbacktDto } from './dto/update-featback.dto';
// import { DeleteFeatbacktDto } from './dto/delete-featback.dto';
import { ResponseInfo } from '@interface/response.interface';
import { RespInfoBase } from '@interface/data.info.interface';

@Resolver('Featback')
export class FeatbackResolver {
  constructor(private readonly featbackService: FeatbackService) {}

  @Mutation(() => ResponseInfo)
  addFeatback(
    @Args('dataFeatback') dataFeatback: AddFeatbacktDto,
  ): Promise<RespInfoBase> {
    return this.featbackService.addFeactback(dataFeatback);
  }

  // @Mutation(() => ResponseInfo)
  // updateFeatbck(
  //   @Args('dataFeatback') dataFeatback: UpdateFeatbacktDto,
  // ): Promise<RespInfoBase> {
  //   return this.featbackService.updateFeatback(dataFeatback);
  // }

  // @Mutation(() => ResponseInfo)
  // deleteFeatback(
  //   @Args('dataFeatback') dataFeatback: DeleteFeatbacktDto,
  // ): Promise<RespInfoBase> {
  //   return this.featbackService.removeFeatback(dataFeatback);
  // }

  // @Query(() => ResponseInfo)
  // getAllFeedbacks() {
  // }
}
