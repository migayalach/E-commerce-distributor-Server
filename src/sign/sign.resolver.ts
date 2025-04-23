import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SignService } from './sign.service';
import { SignInDto, SignUpDto } from './dto/sign.dto';
import { SignResponse } from './interface/responseSing.interface';
import { SignData } from './interface/sign.interface';

@Resolver('Sign')
export class SignResolver {
  constructor(private readonly signService: SignService) {}

  @Mutation(() => SignResponse, { name: 'in' })
  async signIn(@Args('dataSignIn') dataSignIn: SignInDto): Promise<SignData> {
    return await this.signService.signIn(dataSignIn);
  }

  @Mutation(() => SignResponse, { name: 'up' })
  async signUp(@Args('dataSignUp') dataSignUp: SignUpDto): Promise<SignData> {
    return await this.signService.signUp(dataSignUp);
  }

  @Mutation(() => String)
  async refreshToken(
    @Args('refreshToken') refreshToken: string,
  ): Promise<string> {
    return await this.signService._refreshToken(refreshToken);
  }
}
