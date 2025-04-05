import { DataItem } from '../types/response.type';
import { info } from './info.util';
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
