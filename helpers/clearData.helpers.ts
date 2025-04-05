import { DataSubs } from 'src/subscribe/interface/subscribe.interface';
import { parseIdObject } from './auxFunction.helpers';

export const clearSubs = (data: DataSubs[]) => {
  const response = data.map(({ _id, email }) => ({
    _id: parseIdObject(_id),
    email,
  }));
  return response;
};
