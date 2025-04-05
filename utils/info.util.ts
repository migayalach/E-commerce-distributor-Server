import { HttpException, HttpStatus } from '@nestjs/common';
import { navegation } from './navegation.util';
import { elements } from '../constants';
import { InfoData } from '@interface/response.results.interface';
import { DataItem } from '../types/response.type';

export const countPages = (array: Array<object>): number => {
  return Math.ceil(array.length / elements);
};

export const info = (data: DataItem, page: number): InfoData => {
  const pages = countPages(data);
  if (page < 0) {
    page = 1;
  } else if (page > pages) {
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'There is nothing here.',
      },
      HttpStatus.NOT_FOUND,
    );
  }
  return {
    count: data.length,
    pages,
    ...navegation(pages, page),
  };
};
