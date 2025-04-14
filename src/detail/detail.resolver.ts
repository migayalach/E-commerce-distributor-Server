import { Resolver } from '@nestjs/graphql';
import { DetailService } from './detail.service';

@Resolver('Detail')
export class DetailResolver {
  constructor(private readonly detailService: DetailService) {}
}
