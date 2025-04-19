import { Injectable } from '@nestjs/common';
import { SubscribeService } from 'src/subscribe/subscribe.service';
import { ApolloError } from 'apollo-server-express';
import { CategoryService } from 'src/category/category.service';
import { ProductsService } from 'src/products/products.service';
import { LevelService } from 'src/level/level.service';
import { UserService } from 'src/user/user.service';
import {
  subscribe,
  category,
  products,
  level,
  listUsers,
} from './initialData.seeders';

interface DataSubscriptions {
  email: string;
}

interface DataCategory {
  nameCategory: string;
}

interface DataLevel {
  nameLevel: string;
}

interface DataUsers {
  name: string;
  lastName: string;
  email: string;
  carnet: string;
  phone: number;
  password: string;
  profilePicture: string;
}

@Injectable()
export class SeedersService {
  constructor(
    private subscribeService: SubscribeService,
    private categoryService: CategoryService,
    private productService: ProductsService,
    private levelService: LevelService,
    private userService: UserService,
  ) {}

  async addSubscribeData(data: DataSubscriptions[]) {
    for (let i = 0; i < data.length; i++) {
      await this.subscribeService.addSubEmail(data[i]);
    }
  }

  async addCategyProductsData(categoriesList: DataCategory[]) {
    let c = 0;
    let dimention = 25;
    let current = 0;
    while (c < categoriesList.length) {
      const information = await this.categoryService.addCategory(
        categoriesList[c],
      );
      for (let i = 0; i < dimention; i++) {
        await this.productService.addProduct({
          idCategory: information.info._id,
          ...products[current],
        });
        current++;
      }
      c++;
      dimention -= 5;
    }
  }

  async addLevelUsers(level: DataLevel[], listUsers: DataUsers[]) {
    let c = 0;
    let dimention = 5;
    let current = 0;
    while (c < level.length) {
      const information = await this.levelService.addLevel(level[c]);
      for (let i = 0; i < dimention; i++) {
        await this.userService.addUser({
          idLevel: information.info._id,
          ...listUsers[current],
        });
        current++;
      }
      dimention = dimention * 4;
      c++;
    }
  }

  async run() {
    try {
      await this.addSubscribeData(subscribe);
      await this.addCategyProductsData(category);
      await this.addLevelUsers(level, listUsers);
      console.log('Loading data...');
    } catch (error) {
      console.log(error);
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while loading the data.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }
}
