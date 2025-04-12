import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Level } from './schema/level.schema';
import { Model } from 'mongoose';
import { CreateLevelDto } from './dto/createLevel.dto';
import { ApolloError } from 'apollo-server-express';
import { response } from '@utils/response.util';
import { clearLevel, clearObjLevel } from 'helpers/clearData.helpers';
import { Response } from '@interface/response.results.interface';
import { ResLevel } from '@interface/data.info.interface';
import { DataLevel } from './interface/level.interface';

@Injectable()
export class LevelService {
  constructor(@InjectModel(Level.name) private levelModel: Model<Level>) {}

  async addLevel(dataLevel: CreateLevelDto): Promise<ResLevel> {
    try {
      const thereLevel = await this.levelModel.findOne({
        nameLevel: dataLevel.nameLevel,
      });
      if (thereLevel) {
        throw new ApolloError('This level is already exist.', 'CONFLICT');
      }
      const data = new this.levelModel(dataLevel);
      const newLevel = await data.save();
      return {
        message: 'Level create successfully.',
        code: '201',
        value: 'created-level',
        info: newLevel,
      };
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while creating the new level.',
        'INTERNAL_ERROR',
      );
    }
  }

  async getAllLevel(page: number): Promise<Response> {
    try {
      const data = await this.levelModel.find().select('-__v');
      return response(clearLevel(data), page);
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while loading the levels.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async getIdLevel(idLevel: string): Promise<DataLevel> {
    try {
      const data = await this.levelModel.findById(idLevel).select('-__v');
      if (!data) {
        throw new ApolloError(
          'Sorry this level does not exist.',
          'INTERNAL_SERVER_ERROR',
        );
      }
      return clearObjLevel(data);
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while searching the level.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }
}
