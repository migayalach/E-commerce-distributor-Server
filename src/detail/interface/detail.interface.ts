import { Types } from 'mongoose';

export interface objProductData {
  idProduct: Types.ObjectId;
  price: number;
  amount: number;
  total: number;
}

export interface DataDetailProduct {
  idProduct: string;
  nameProduct: string;
  imageProduct: string;
  price: number;
  amount: number;
  total: number;
}

export interface ListProduct {
  listProduct: objProductData[];
  totalBuy: number;
}
