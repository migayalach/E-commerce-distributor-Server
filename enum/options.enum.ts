import { registerEnumType } from '@nestjs/graphql';

export enum ActionAddDelete {
  add = 'add',
  delete = 'delete',
}

registerEnumType(ActionAddDelete, {
  name: 'ActionAddDelete',
});

export enum ActionComplete {
  add = 'add',
  delete = 'delete',
  update = 'update',
}

registerEnumType(ActionComplete, {
  name: 'ActionComplete',
});

export enum ActionAddUpdate {
  add = 'add',
  update = 'update',
}

registerEnumType(ActionAddUpdate, {
  name: 'ActionAddUpdate',
});

export enum AccessUser {
  ALLOWED = 'allowed',
  DENIED = 'denied',
}

registerEnumType(AccessUser, {
  name: 'AccessUser',
});

export enum OrderPrice {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(OrderPrice, {
  name: 'OrderPrice',
});

export enum OrderName {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(OrderName, {
  name: 'OrderName',
});
