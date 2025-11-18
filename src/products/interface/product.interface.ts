import { Types } from 'mongoose';

export interface DataProduct {
  idCategory: string;
  idFeatback: string;
  idQualification: string;
  nameCategory: string;
  nameProduct: string;
  price: number;
  stock: number;
  state: boolean;
  imageProduct: string[];
}

export interface DataOriginProduct extends DataProduct {
  _id: Types.ObjectId;
}

export interface DataProductRes extends DataProduct {
  _id: string;
}

export interface DataProductFavorite {
  idProduct: string;
  nameProduct: string;
  price: number;
  imageProduct: string;
  stock: number;
}
