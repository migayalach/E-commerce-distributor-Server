import { Types } from 'mongoose';

export interface DataUser {
  idCart: string;
  idFavorite: string;
  idLevel: string;
  nameLevel: string;
  name: string;
  lastName: string;
  email: string;
  carnet: string;
  phone: number;
  profilePicture: string;
}

export interface DataOriginUser extends DataUser {
  _id: Types.ObjectId;
}

export interface DataUserRes extends DataUser {
  _id: string;
}
