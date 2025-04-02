import { Resolver } from '@nestjs/graphql';
import { SubscribeService } from './subscribe.service';

@Resolver()
export class SubscribeResolver {
  constructor(private readonly subscribeService: SubscribeService) {}
}
