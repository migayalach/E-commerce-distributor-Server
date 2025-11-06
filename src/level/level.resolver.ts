import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LevelService } from './level.service';
import { LevelResponse } from './interface/responseData.interface';
import { CreateLevelDto } from './dto/createLevel.dto';
import { ResLevel } from '@interface/data.info.interface';
import { PagLevelResponse } from './dto/pag-level-res.dto';
import { Response } from '@interface/response.results.interface';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/sign/guard/auth.guard.guard.guard';
import { UpdateLevelDto } from './dto/updateLevel.dto';

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

  @Mutation(() => LevelResponse)
  async updateLevel(
    @Args('dataLevel') dataLevel: UpdateLevelDto,
  ): Promise<ResLevel> {
    return await this.levelService.updateLevel(dataLevel);
  }

  @Mutation(() => LevelResponse)
  async removeLevel(
    @Args('idLevel', { type: () => String, nullable: false }) idLevel: string,
  ): Promise<any> {
    return await this.levelService.deleteLevel(idLevel);
  }
}
