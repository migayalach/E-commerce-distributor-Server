import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PasswordService } from './password.service';
import { ChangePasswordDto } from './dto/chengePassword.dto';
import { ResponseInfo } from '@interface/response.interface';
import { DataPassword } from './interface/password.interface';

@Resolver('Password')
export class PasswordResolver {
  constructor(private readonly passwordService: PasswordService) {}

  @Mutation(() => ResponseInfo)
  async changePassword(
    @Args('dataPassword') dataPassword: ChangePasswordDto,
  ): Promise<DataPassword> {
    return await this.passwordService.updatePassword(dataPassword);
  }
}
