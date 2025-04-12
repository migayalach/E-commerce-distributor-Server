import { Resolver } from '@nestjs/graphql';
import { PasswordService } from './password.service';

@Resolver('Password')
export class PasswordResolver {
  constructor(private readonly passwordService: PasswordService) {}
}
