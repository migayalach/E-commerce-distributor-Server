import { DataSubs } from 'src/subscribe/interface/subscribe.interface';

export interface RespInfo {
  message: string;
  code: string;
  value: string;
  info: DataSubs;
}
