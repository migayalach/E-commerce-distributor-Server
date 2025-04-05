import { NextPrev } from '@interface/response.results.interface';

const nextRequest = (pages: number, page: number): number | null => {
  if (page < pages) {
    return +page + 1;
  }
  return null;
};

const prevRequest = (page: number): number | null => {
  if (+page === 1) {
    return null;
  }
  return +page - 1;
};

export const navegation = (pages: number, page: number): NextPrev => {
  return {
    next: nextRequest(pages, page),
    prev: prevRequest(page),
  };
};
