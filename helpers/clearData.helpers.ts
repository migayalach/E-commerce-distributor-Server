import { DataSubs } from 'src/subscribe/interface/subscribe.interface';
import { DataCategory } from 'src/category/interface/category.interface';
import { parseIdObject } from './auxFunction.helpers';
import { DataLevel } from 'src/level/interface/level.interface';
import {
  DataOriginProduct,
  DataProductRes,
} from 'src/products/interface/product.interface';
import { DataOriginUser, DataUserRes } from 'src/user/interface/user.interface';

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

export const clearObjLevel = ({
  _id,
  nameLevel,
}: {
  _id: string;
  nameLevel: string;
}) => {
  const obj = {
    _id: parseIdObject(_id),
    nameLevel,
  };
  return obj;
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
    imageProduct: product.imageProduct,
    state: product.state,
  };
  return data;
};

export const clearDataUser = (
  user: DataOriginUser,
  level: DataLevel,
): DataUserRes => {
  const data = {
    _id: user._id.toString(),
    idFavorite: user.idFavorite,
    idCart: user.idCart,
    idLevel: level._id,
    nameLevel: level.nameLevel,
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    carnet: user.carnet,
    phone: user.phone,
    profilePicture: user.profilePicture,
  };
  return data;
};

export const clearlistFavProduct = (product: DataProductRes) => {
  const data = {
    idProduct: product._id.toString(),
    nameProduct: product.nameProduct,
    price: product.price,
    imageProduct: product.imageProduct,
    stock: product.stock,
  };
  return data;
};
