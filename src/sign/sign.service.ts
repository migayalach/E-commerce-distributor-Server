import { Injectable } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/sign.dto';
import { ApolloError } from 'apollo-server-express';
import { LevelService } from 'src/level/level.service';
import { UserService } from 'src/user/user.service';
import { AccessUser } from 'enum/options.enum';
import { SignData } from './interface/sign.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { RequestWithCookies } from 'types/express/index.types';

@Injectable()
export class SignService {
  constructor(
    private levelService: LevelService,
    private userService: UserService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  private async _createTokenAccess(payload: { sub: string; email: string }) {
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });
  }

  private async _createRefreshToken(payload: { sub: string; email: string }) {
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
  }

  async _refreshToken(context: { req: RequestWithCookies }): Promise<string> {
    const refreshToken = context.req.cookies?.refresh_token;

    if (!refreshToken) {
      throw new ApolloError('No refresh token found', 'UNAUTHORIZED');
    }

    try {
      const payload: { sub: string; email: string } =
        await this.jwtService.verifyAsync(refreshToken, {
          secret: process.env.JWT_REFRESH_SECRET,
        });

      return this._createTokenAccess({
        sub: payload.sub,
        email: payload.email,
      });
    } catch (error: unknown) {
      if (error instanceof ApolloError) {
        throw error;
      }

      const message =
        error instanceof Error ? error.message : 'Invalid refresh token';

      throw new ApolloError(message, 'UNAUTHORIZED');
    }
  }

  async signIn(
    dataSignIn: SignInDto,
    context: { res: Response },
  ): Promise<SignData> {
    try {
      const userInfo = await this.userService.infoIdEmail(
        dataSignIn.email.trim(),
      );
      const userData = await this.userService.getIdUser(userInfo);
      const password = await this.userModel.findById(userData._id, 'password');

      if (!password) {
        throw new ApolloError('This user does not exist.', 'NOT_FOUND');
      }

      const isMatch = await bcrypt.compare(
        dataSignIn.password,
        password.password,
      );
      if (!isMatch) {
        throw new ApolloError('The password is incorrect.', 'NOT_FOUND');
      }

      const payload = { sub: userInfo, email: userData.email };

      const access_token = await this._createTokenAccess(payload);
      const refresh_token = await this._createRefreshToken(payload);

      context.res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return {
        message: `Welcome, ${userData.name}.`,
        code: '201',
        value: AccessUser.ALLOWED,
        info: {
          idUser: userInfo,
          idCart: userData.idCart,
          idFavorite: userData.idFavorite,
          nameLevel: userData.nameLevel,
          nameUser: userData.name,
          profilePicture: userData.profilePicture,
          access_token,
        },
      };
    } catch (error: unknown) {
      if (error instanceof ApolloError) {
        throw error;
      }
      if (error && typeof error === 'object' && 'message' in error) {
        const message = (error as { message: string }).message;
        throw new ApolloError(message, 'INTERNAL_ERROR');
      }
      throw new ApolloError(
        'An unexpected error occurred while logging in.',
        'INTERNAL_ERROR',
      );
    }
  }

  async signUp(
    dataSignUp: SignUpDto,
    context: { res: Response },
  ): Promise<SignData> {
    try {
      const infoLevel = await this.levelService.countLevelDim();
      const infoSign = await this.userService.addUserUp({
        idLevel: String(infoLevel?._id),
        ...dataSignUp,
      });

      if (!infoSign) {
        throw new ApolloError('Sorry, your registration failed.', 'CONFLICT');
      }

      const idUser = await this.userService.infoIdEmail(infoSign.info.email);

      const payload = { sub: idUser, email: infoSign.info.email };

      const access_token = await this._createTokenAccess(payload);
      const refresh_token = await this._createRefreshToken(payload);

      context.res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return {
        message: `Welcome, ${infoSign.info.name}!`,
        code: '201',
        value: AccessUser.ALLOWED,
        info: {
          idUser,
          idCart: infoSign.info.idCart,
          idFavorite: infoSign.info.idFavorite,
          nameLevel: infoSign.info.nameLevel,
          nameUser: infoSign.info.name,
          profilePicture: infoSign.info.profilePicture,
          access_token,
        },
      };
    } catch (error: unknown) {
      if (error instanceof ApolloError) {
        throw error;
      }
      if (error && typeof error === 'object' && 'message' in error) {
        const message = (error as { message: string }).message;
        throw new ApolloError(message, 'INTERNAL_ERROR');
      }
      throw new ApolloError(
        'An unexpected error occurred while registering the session.',
        'INTERNAL_ERROR',
      );
    }
  }
}
