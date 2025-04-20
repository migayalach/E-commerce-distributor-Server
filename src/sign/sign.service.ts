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

@Injectable()
export class SignService {
  constructor(
    private levelService: LevelService,
    private userService: UserService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async signIn(dataSignIn: SignInDto): Promise<SignData> {
    try {
      // Check Email
      const userInfo = await this.userService.infoIdEmail(
        dataSignIn.email.trim(),
      );
      const userData = await this.userService.getIdUser(userInfo);
      const password = await this.userModel.findById(userData._id, 'password');
      if (!password) {
        throw new ApolloError('This user does not exist.', 'NOT_FOUND');
      }
      // Check Password
      if (!(await bcrypt.compare(dataSignIn.password, password?.password))) {
        throw new ApolloError('The password is incorrect.', 'NOT_FOUND');
      }
      return {
        message: `Wellcome, ${userData.name}.`,
        code: '201',
        value: AccessUser.ALLOWED,
        info: {
          idUser: userInfo,
          idCart: userData.idCart,
          idFavorite: userData.idFavorite,
          nameLevel: userData.nameLevel,
          nameUser: userData.name,
          profilePicture: userData.profilePicture,
        },
      };
    } catch (error) {
      console.log(error);
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while logging in.',
        'INTERNAL_ERROR',
      );
    }
  }

  async signUp(dataSignUp: SignUpDto): Promise<SignData> {
    try {
      const infoLevel = await this.levelService.countLevelDim();
      const infoSign = await this.userService.addUser({
        idLevel: String(infoLevel?._id),
        ...dataSignUp,
      });
      if (!infoSign) {
        throw new ApolloError('Sorry, your registration failed.', 'CONFLICT');
      }
      return {
        message: `Wellcome, ${infoSign.info.name}!`,
        code: '201',
        value: AccessUser.ALLOWED,
        info: {
          idUser: await this.userService.infoIdEmail(infoSign.info.email),
          idCart: infoSign.info.idCart,
          idFavorite: infoSign.info.idFavorite,
          nameLevel: infoSign.info.nameLevel,
          nameUser: infoSign.info.name,
          profilePicture: infoSign.info.profilePicture,
        },
      };
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while registering the session.',
        'INTERNAL_ERROR',
      );
    }
  }
}
