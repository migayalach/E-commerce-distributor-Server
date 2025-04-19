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
import { FavoriteService } from 'src/favorite/favorite.service';
import { CartService } from 'src/cart/cart.service';
import { BuyService } from 'src/buy/buy.service';
import { Types } from 'mongoose';
import { ActionAddDelete, ActionAddUpdate } from 'enum/options.enum';

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
    private favoriteService: FavoriteService,
    private cartService: CartService,
    private buyService: BuyService,
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

  async addFavorites(idFavorite: string, listProducts: Types.ObjectId[]) {
    const elements = Math.floor(Math.random() * 15) + 1;
    const listElements: Types.ObjectId[] = [];
    let count = 0;
    while (count < elements) {
      const position = Math.floor(Math.random() * 74) + 1;
      if (!listElements.includes(listProducts[position])) {
        listElements.push(listProducts[position]);
        await this.favoriteService.actionFavorite({
          idFavorite,
          idProduct: listProducts[position].toString(),
          action: ActionAddDelete.add,
        });
        count++;
      }
    }
  }

  async addCart(idCart: string, listProducts: Types.ObjectId[]) {
    const elements = Math.floor(Math.random() * 15) + 1;
    const listElements: Types.ObjectId[] = [];
    let count = 0;
    while (count < elements) {
      const position = Math.floor(Math.random() * 74) + 1;
      const amount = Math.floor(Math.random() * 10) + 1;
      if (!listElements.includes(listProducts[position])) {
        listElements.push(listProducts[position]);
        await this.cartService.actionCart({
          idCart,
          idProduct: listProducts[position].toString(),
          action: ActionAddUpdate.add,
          amount,
        });

        count++;
      }
    }
  }

  async actionFavoriteCart(): Promise<void> {
    const listUsers = await this.userService.getAllListUsers();
    const listProducts = await this.productService.getAllListProducts();
    //* ADD FAVORITES
    for (let index = 0; index < listUsers.length; index++) {
      if ((Math.random() > 0.5 ? 1 : 0) === 1) {
        await this.addFavorites(
          listUsers[index].idFavorite.toString(),
          listProducts,
        );
      }
    }
    //* ADD CART
    for (let index = 0; index < listUsers.length; index++) {
      if ((Math.random() > 0.5 ? 1 : 0) === 1) {
        await this.addCart(listUsers[index].idCart.toString(), listProducts);
      }
    }
  }

  async addBuy(): Promise<void> {
    const listUsers = await this.userService.getAllListUsers();
    for (let index = 0; index < listUsers.length; index++) {
      const userCart = await this.cartService.getAllListCartUser(
        listUsers[index].idCart.toString(),
      );
      if (
        userCart?.listProducts.length &&
        (Math.random() > 0.5 ? 1 : 0) === 1
      ) {
        await this.buyService.addBuy({
          idUser: listUsers[index].idUser.toString(),
          idCart: listUsers[index].idCart.toString(),
        });
      }
    }
  }

  async run() {
    try {
      await this.addSubscribeData(subscribe);
      await this.addLevelUsers(level, listUsers);
      await this.addCategyProductsData(category);
      await this.actionFavoriteCart();
      await this.addBuy();
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
