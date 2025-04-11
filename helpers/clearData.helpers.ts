import { DataSubs } from 'src/subscribe/interface/subscribe.interface';
import { DataCategory } from 'src/category/interface/category.interface';
import { parseIdObject } from './auxFunction.helpers';
import { DataLevel } from 'src/level/interface/level.interface';
import {
  DataOriginProduct,
  DataProductRes,
} from 'src/products/interface/product.interface';

export const clearSubs = (data: DataSubs[]) => {
  const response = data.map(({ _id, email }) => ({
    _id: parseIdObject(_id),
    email,
  }));
  return response;
};

export const clearCategory = (data: DataCategory[]) => {
  const response = data.map(({ _id, nameCategory }) => ({
    _id: parseIdObject(_id),
    nameCategory,
  }));
  return response;
};

export const clearObjCategory = ({
  _id,
  nameCategory,
}: {
  _id: string;
  nameCategory: string;
}) => {
  const obj = {
    _id: parseIdObject(_id),
    nameCategory,
  };
  return obj;
};

export const clearLevel = (data: DataLevel[]) => {
  const response = data.map(({ _id, nameLevel }) => ({
    _id: parseIdObject(_id),
    nameLevel,
  }));
  return response;
};

export const clearDataProduct = (
  product: DataOriginProduct,
  category: DataCategory,
): DataProductRes => {
  const data = {
    _id: product._id.toString(),
    idCategory: category._id,
    nameCategory: category.nameCategory,
    nameProduct: product.nameProduct,
    price: product.price,
    stock: product.stock,
    state: product.state,
  };
  return data;
};
