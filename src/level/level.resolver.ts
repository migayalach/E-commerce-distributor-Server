import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LevelService } from './level.service';
import { LevelResponse } from './interface/responseData.interface';
import { CreateLevelDto } from './dto/createLevel.dto';
import { ResLevel } from '@interface/data.info.interface';
import { PagLevelResponse } from './dto/pag-level-res.dto';
import { Response } from '@interface/response.results.interface';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/sign/guard/auth.guard.guard.guard';

@Resolver('Level')
export class LevelResolver {
  constructor(private readonly levelService: LevelService) {}

  @UseGuards(AuthGuard)
  @Query(() => PagLevelResponse)
  async getAllLevel(
    @Args('page', { type: () => Int, nullable: true }) page: number = 1,
  ): Promise<Response> {
    return await this.levelService.getAllLevel(page);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => LevelResponse)
  async createLevel(
    @Args('dataLevel') dataLevel: CreateLevelDto,
  ): Promise<ResLevel> {
    return await this.levelService.addLevel(dataLevel);
  }
}
