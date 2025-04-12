import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model, Types } from 'mongoose';
import { LevelService } from 'src/level/level.service';
import { ApolloError } from 'apollo-server-express';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import {
  DataOriginUser,
  DataUser,
  DataUserRes,
} from './interface/user.interface';
import { clearDataUser } from 'helpers/clearData.helpers';
import { response } from '@utils/response.util';
import { ResUser } from '@interface/data.info.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private levelService: LevelService,
  ) {}

  async existEmail(email: string): Promise<void> {
    const existEmail = await this.userModel.find({ email }).select('-__v');
    if (existEmail.length) {
      throw new ApolloError(
        'This email is already registered, please enter another one',
        'CONFLICT',
      );
    }
    return;
  }

  async existCarnet(carnet: string): Promise<void> {
    const existCarnet = await this.userModel.find({ carnet }).select('-__v');
    if (existCarnet.length) {
      throw new ApolloError(
        'This carnet is already registered, please enter another one',
        'CONFLICT',
      );
    }
    return;
  }

  async getAllUsers(page: number) {
    try {
      const dataUser: DataOriginUser[] = await this.userModel
        .find()
        .select('-__v');
      const userInfo: DataUser[] = [];
      for (let i = 0; i < dataUser.length; i++) {
        const dataLevel = await this.levelService.getIdLevel(
          dataUser[i].idLevel.toString(),
        );
        const infoLevel = clearDataUser(dataUser[i], dataLevel);
        userInfo.push(infoLevel);
      }
      return response(userInfo, page);
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while loading the users.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async getIdUser(idUser: string): Promise<DataUserRes> {
    try {
      const dataUser: DataOriginUser | null = await this.userModel
        .findById(idUser)
        .select('-__v');
      if (!dataUser) {
        throw new ApolloError('This user does not exist.', 'NOT_FOUND');
      }
      const dataLevel = await this.levelService.getIdLevel(
        dataUser.idLevel.toString(),
      );
      return clearDataUser(dataUser, dataLevel);
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while searching the user.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async addUser(dataUser: CreateUserDto): Promise<ResUser> {
    try {
      await this.existEmail(dataUser.email.trim());
      await this.existCarnet(dataUser.carnet.trim());
      await this.levelService.getIdLevel(dataUser.idLevel);
      const data = new this.userModel({
        ...dataUser,
        idLevel: new Types.ObjectId(dataUser.idLevel),
      });
      await data.save();
      const userData: DataUserRes = await this.getIdUser(String(data._id));
      return {
        message: 'User create successfully.',
        code: '201',
        value: 'created-user',
        info: userData,
      };
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while creating the new user.',
        'INTERNAL_ERROR',
      );
    }
  }

  async updateUser(dataUser: UpdateUserDto): Promise<ResUser> {
    try {
      await this.getIdUser(dataUser.idUser);
      await this.levelService.getIdLevel(dataUser.idLevel);
      await this.userModel.findByIdAndUpdate(dataUser.idUser, {
        idLevel: new Types.ObjectId(dataUser.idLevel),
        name: dataUser.name,
        lastName: dataUser.lastName,
        email: dataUser.email,
        carnet: dataUser.carnet,
        phone: dataUser.phone,
        profilePicture: dataUser.profilePicture,
      });
      return {
        message: 'User update successfully.',
        code: '200',
        value: 'update-user',
        info: await this.getIdUser(dataUser.idUser),
      };
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while updating the user.',
        'INTERNAL_ERROR',
      );
    }
  }

  async removeUser(idUser: string): Promise<ResUser> {
    try {
      const data = await this.getIdUser(idUser);
      await this.userModel.findByIdAndDelete(idUser);
      return {
        message: 'User delete successfully.',
        code: '200',
        value: 'delete-user',
        info: data,
      };
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while deleting the user.',
        'INTERNAL_ERROR',
      );
    }
  }
}
