import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { SignService } from './sign.service';
import { SignInDto, SignUpDto } from './dto/sign.dto';
import { SignResponse } from './interface/responseSing.interface';
import { SignData } from './interface/sign.interface';
import { Response } from 'express';
import { RequestWithCookies } from 'types/express/index.types';

@Resolver('Sign')
export class SignResolver {
  constructor(private readonly signService: SignService) {}

  @Mutation(() => SignResponse, { name: 'in' })
  async signIn(
    @Args('dataSignIn') dataSignIn: SignInDto,
    @Context() context: { res: Response },
  ): Promise<SignData> {
    return await this.signService.signIn(dataSignIn, context);
  }

  @Mutation(() => SignResponse, { name: 'up' })
  async signUp(
    @Args('dataSignUp') dataSignUp: SignUpDto,
    @Context() context: { res: Response },
  ): Promise<SignData> {
    return await this.signService.signUp(dataSignUp, context);
  }

  @Mutation(() => String)
  async refreshToken(
    @Context() context: { req: RequestWithCookies },
  ): Promise<string> {
    return await this.signService._refreshToken(context);
  }
}
