import { Resolver } from '@nestjs/graphql';
import { SignService } from './sign.service';

@Resolver('Sign')
export class SignResolver {
  constructor(private readonly signService: SignService) {}
}
