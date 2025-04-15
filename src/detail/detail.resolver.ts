import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { DetailService } from './detail.service';
import { PagDetailResponse } from './dto/pag-detail-res.dto';
import { ResponseDetail } from '@interface/response.results.interface';

@Resolver('Detail')
export class DetailResolver {
  constructor(private readonly detailService: DetailService) {}

  @Query(() => PagDetailResponse)
  async getIdDetail(
    @Args('idBuy', { type: () => String, nullable: false }) idBuy: string,
    @Args('page', { type: () => Int, nullable: true }) page: number = 1,
  ): Promise<ResponseDetail> {
    return await this.detailService.getIdDetail(idBuy, page);
  }
}
