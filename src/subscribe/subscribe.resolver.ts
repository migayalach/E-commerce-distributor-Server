import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubscribeService } from './subscribe.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { PagSubsResponse } from './dto/pag-subs-res.dto';
import { Response } from '@interface/response.results.interface';
import { SubscribeResponse } from './interface/responseData.interface';
import { ResSubscription } from '@interface/data.info.interface';
import { AuthGuard } from 'src/sign/guard/auth.guard.guard.guard';
import { UseGuards } from '@nestjs/common';

@Resolver('Subscribe')
export class SubscribeResolver {
  constructor(private readonly subscribeService: SubscribeService) {}

  @UseGuards(AuthGuard)
  @Query(() => PagSubsResponse)
  async getSubscribe(
    @Args('page', { type: () => Int, nullable: true }) page: number = 1,
  ): Promise<Response> {
    return await this.subscribeService.getAllSubs(page);
  }

  @Mutation(() => SubscribeResponse)
  async createSubscribe(
    @Args('dataInput') dataInput: CreateSubscriptionDto,
  ): Promise<ResSubscription> {
    return await this.subscribeService.addSubEmail(dataInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => SubscribeResponse)
  async deleteSubscribe(
    @Args('email', { type: () => String, nullable: false })
    email: string,
  ): Promise<ResSubscription> {
    const data = await this.subscribeService.cancelSub(email);
    return data;
  }
}
