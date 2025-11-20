import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApolloError } from 'apollo-server-express';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // if (process.env.SKIP_AUTH === 'true') {
    //   return true;
    // }

    // const ctx = context.getArgByIndex(2);
    // const request = ctx.req;
    // const token = this.extractTokenFromHeader(request);
    // if (!token) {
    //   throw new ApolloError('Unauthorized', 'UNAUTHORIZED');
    // }
    // try {
    //   const payload = await this.jwtService.verifyAsync(token, {
    //     secret: process.env.JWT_SECRET,
    //   });
    //   request['access'] = payload;
    // } catch {
    //   throw new ApolloError('Unauthorized', 'UNAUTHORIZED');
    // }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
