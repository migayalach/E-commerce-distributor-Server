import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { FiltersService } from './filters.service';
import { PagProductResponse } from 'src/products/dto/pag-product-res.dto';
import { Response } from '@interface/response.results.interface';
import { OrderPrice } from 'enum/options.enum';

@Resolver('Filter')
export class FiltersResolver {
  constructor(private readonly filtersService: FiltersService) {}

  @Query(() => PagProductResponse)
  async findProduct(
    @Args('product', { type: () => String, nullable: true }) product: string,
    @Args('price', {
      type: () => OrderPrice,
      nullable: true,
    })
    price: OrderPrice,
    @Args('page', { type: () => Int, nullable: true }) page: number = 1,
  ): Promise<Response> {
    return await this.filtersService.searchProduct(product, price, page);
  }

  @Query(() => PagProductResponse)
  async findCategory(
    @Args('idCategory', { type: () => String, nullable: false })
    idCategory: string,
    @Args('price', {
      type: () => OrderPrice,
      nullable: true,
    })
    price: OrderPrice,
    @Args('page', { type: () => Int, nullable: true }) page: number = 1,
  ): Promise<Response> {
    return await this.filtersService.searchCategoryProduct(
      idCategory,
      price,
      page,
    );
  }
}
