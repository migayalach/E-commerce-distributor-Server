import { DataCategory } from 'src/category/interface/category.interface';
import { DataLevel } from 'src/level/interface/level.interface';
import { DataSubs } from 'src/subscribe/interface/subscribe.interface';

export interface RespInfoBase {
  message: string;
  code: string;
  value: string;
}

export interface ResSubscription extends RespInfoBase {
  info: DataSubs;
}

export interface ResCategory extends RespInfoBase {
  info: DataCategory;
}

export interface ResLevel extends RespInfoBase {
  info: DataLevel;
}
