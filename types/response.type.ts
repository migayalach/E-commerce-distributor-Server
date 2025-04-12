import { DataCategory } from 'src/category/interface/category.interface';
import { DataLevel } from 'src/level/interface/level.interface';
import { DataProduct } from 'src/products/interface/product.interface';
import { DataSubs } from 'src/subscribe/interface/subscribe.interface';
import { DataUser } from 'src/user/interface/user.interface';

export type DataItem =
  | DataSubs[]
  | DataCategory[]
  | DataLevel[]
  | DataProduct[]
  | DataUser[];
