import { Resolver } from '@nestjs/graphql';
import { QuealificationService } from './quealification.service';

@Resolver('Quealification')
export class QuealificationResolver {
  constructor(private readonly quealificationService: QuealificationService) {}
}
