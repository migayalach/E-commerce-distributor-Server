import { DataDatail, DataItem } from '../types/response.type';
import { info, infoDetail } from './info.util';
import { results } from './results.util';

export const response = (data: DataItem, page: number) => {
  if (!data.length) {
    return {
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
      results: [],
    };
  }

  return {
    info: info(data, page),
    results: results(data, page),
  };
};

export const responseDetail = (
  data: DataDatail,
  page: number,
  totalBuy: number,
) => {
  if (!data.length) {
    return {
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
      totalBuy: 0,
      results: [],
    };
  }

  return {
    info: infoDetail(data, page),
    totalBuy,
    results: results(data, page),
  };
};
