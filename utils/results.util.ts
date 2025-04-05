import { elements } from '../constants';

export const results = (data: Array<object>, limit: number): Array<any> => {
  if (limit === 1) {
    return operation(data, 0, elements - 1);
  } else {
    return operation(data, elements * (limit - 1), elements * limit - 1);
  }
};

export const operation = <T>(data: T[], init: number, end: number): T[] => {
  const response: T[] = [];
  for (let i = init; i <= end; i++) {
    if (data[i]) {
      response.push(data[i]);
    }
  }
  return response;
};
