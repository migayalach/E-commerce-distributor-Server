import { DataCategory } from 'src/category/interface/category.interface';
import { DataLevel } from 'src/level/interface/level.interface';
import { DataSubs } from 'src/subscribe/interface/subscribe.interface';

export type DataItem = DataSubs[] | DataCategory[] | DataLevel[];
