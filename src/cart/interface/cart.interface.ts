import { Types } from 'mongoose';
import { DataProductCart } from 'src/favorite/interface/favorite.interface';
import { DataProduct } from 'src/products/interface/product.interface';

export interface DataCart {
  _id: string;
}

export interface DataCartProduct {
  idProduct: Types.ObjectId;
  amount: number;
}

export interface CartUserList {
  _id: Types.ObjectId;
  idUser: string;
  listProducts: DataCartProduct[];
}

export interface DataProductsCart extends DataProductCart {
  amount: number;
}

export interface DataProductCartRes extends DataProduct {
  _id: string;
  amount: number;
}
