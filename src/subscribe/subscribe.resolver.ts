import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SubscribeService } from './subscribe.service';
import { Subscribe } from './schema/subscribe.schema';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Resolver()
export class SubscribeResolver {
  constructor(private readonly subscribeService: SubscribeService) {}

  @Query(() => [Subscribe])
  async getSubscribe(): Promise<any> {
    return await this.subscribeService.getAllSubs();
  }

  @Mutation(() => Subscribe)
  async createSubscribe(
    @Args('dataInput') dataInput: CreateSubscriptionDto,
  ): Promise<any> {
    return this.subscribeService.addSubEmail(dataInput);
  }
}
