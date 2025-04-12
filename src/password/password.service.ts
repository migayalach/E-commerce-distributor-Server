import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { ChangePasswordDto } from './dto/chengePassword.dto';
import { ApolloError } from 'apollo-server-express';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from '../../constants';
import { DataPassword } from './interface/password.interface';

@Injectable()
export class PasswordService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async updatePassword(dataPassword: ChangePasswordDto): Promise<DataPassword> {
    try {
      const password = await this.userModel.findById(
        dataPassword._id,
        'password',
      );

      if (!password) {
        throw new ApolloError('This user does not exist.', 'NOT_FOUND');
      }

      if (
        !(await bcrypt.compare(dataPassword.oldPassword, password.password))
      ) {
        throw new ApolloError(
          'The password is not the same as the previous one.',
          'NOT_FOUND',
        );
      }
      await this.userModel.findByIdAndUpdate(dataPassword._id, {
        password: await bcrypt.hash(dataPassword.newPassword, saltOrRounds),
      });

      return {
        message: 'Change successfully.',
        code: '201',
        value: 'update-password',
      };
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while updating the password.',
        'INTERNAL_ERROR',
      );
    }
  }
}
