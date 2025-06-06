import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { FiltersService } from './filters.service';
import { PagProductResponse } from 'src/products/dto/pag-product-res.dto';
import { Response } from '@interface/response.results.interface';

@Resolver('Filter')
export class FiltersResolver {
  constructor(private readonly filtersService: FiltersService) {}

  @Query(() => PagProductResponse)
  async findProduct(
    @Args('product', { type: () => String, nullable: true }) product: string,
    @Args('page', { type: () => Int, nullable: true }) page: number = 1,
  ): Promise<Response> {
    return await this.filtersService.searchProduct(product, page);
  }

  @Query(() => PagProductResponse)
  async findCategory(
    @Args('idCategory', { type: () => String, nullable: false })
    idCategory: string,
    @Args('page', { type: () => Int, nullable: true }) page: number = 1,
  ): Promise<Response> {
    return await this.filtersService.searchCategoryProduct(idCategory, page);
  }
}
