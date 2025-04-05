import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubscribeService } from './subscribe.service';
import { Subscribe } from './schema/subscribe.schema';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { PagSubsResponse } from './dto/pag-subs-res.dto';
import { Response } from '@interface/response.results.interface';

@Resolver()
export class SubscribeResolver {
  constructor(private readonly subscribeService: SubscribeService) {}

  @Query(() => PagSubsResponse)
  async getSubscribe(
    @Args('page', { type: () => Int, nullable: true }) page: number = 1,
  ): Promise<Response> {
    return await this.subscribeService.getAllSubs(page);
  }

  @Mutation(() => Subscribe)
  async createSubscribe(
    @Args('dataInput') dataInput: CreateSubscriptionDto,
  ): Promise<any> {
    return this.subscribeService.addSubEmail(dataInput);
  }
}
