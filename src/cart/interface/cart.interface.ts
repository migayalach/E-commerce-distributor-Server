import { Types } from 'mongoose';

export interface DataCart {
  _id: string;
}

export interface CartUserList {
  _id: Types.ObjectId;
  listProducts: Types.ObjectId[];
}
