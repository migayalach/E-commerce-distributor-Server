import { Types } from 'mongoose';

export const parseIdObject = (id: string): string => {
  const data = id.toString();
  return data;
};

export const parseTypeIdMongo = (id: string) => {
  if (Types.ObjectId.isValid(id)) {
    return new Types.ObjectId(id);
  }
  throw new Error('Invalid ObjectId');
};
