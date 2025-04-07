import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { PagCategoryResponse } from './dto/pag-category-res.dto';
import { CategoryResponse } from './interface/responseData.interface';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { ResCategory } from '@interface/data.info.interface';
import { Response } from '@interface/response.results.interface';
import { Category } from './schema/category.schema';
import { DataCategory } from './interface/category.interface';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => CategoryResponse)
  async createCategory(
    @Args('infoCategory') infoCategory: CreateCategoryDto,
  ): Promise<ResCategory> {
    return await this.categoryService.addCategory(infoCategory);
  }

  @Query(() => PagCategoryResponse)
  async getCategory(
    @Args('page', { type: () => Int, nullable: true }) page: number = 1,
  ): Promise<Response> {
    return await this.categoryService.getAllCategories(page);
  }

  @Query(() => Category)
  async getIdCategory(
    @Args('idCategory', { type: () => String, nullable: false })
    idCategory: string,
  ): Promise<DataCategory> {
    return await this.categoryService.getIdCategory(idCategory);
  }

  @Mutation(() => CategoryResponse)
  async updateCategory(
    @Args('infoCategory') infoCategory: UpdateCategoryDto,
  ): Promise<ResCategory> {
    return await this.categoryService.refreshCategory(infoCategory);
  }

  @Mutation(() => CategoryResponse)
  async removeCategory(
    @Args('idCategory', { type: () => String, nullable: false })
    idCategory: string,
  ): Promise<ResCategory> {
    return await this.categoryService.deleteCategory(idCategory);
  }
}
