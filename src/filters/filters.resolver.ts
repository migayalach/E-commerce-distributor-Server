import { Resolver } from '@nestjs/graphql';
import { FiltersService } from './filters.service';

@Resolver('Filter')
export class FiltersResolver {
  constructor(private readonly filtersService: FiltersService) {}
}
