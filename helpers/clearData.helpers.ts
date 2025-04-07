import { DataSubs } from 'src/subscribe/interface/subscribe.interface';
import { DataCategory } from 'src/category/interface/category.interface';
import { parseIdObject } from './auxFunction.helpers';

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
