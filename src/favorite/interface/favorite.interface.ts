import { Types } from 'mongoose';

export interface DataFavorite {
  idProduct: string;
  nameProduct: string;
  price: number;
  stock: number;
}

export interface DataOriginFavorite extends DataFavorite {
  _id: Types.ObjectId;
}

export interface DataFavoriteRes extends DataFavorite {
  _id: string;
}

export interface FavoriteUserList {
  _id: Types.ObjectId;
  listProducts: Types.ObjectId[];
}

export interface DataProductCart {
  idProduct: string;
  nameProduct: string;
  price: number;
  imageProduct: string;
  stock: number;
}
