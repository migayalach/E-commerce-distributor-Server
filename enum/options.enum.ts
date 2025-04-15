import { registerEnumType } from '@nestjs/graphql';

export enum ActionAddDelete {
  add = 'add',
  delete = 'delete',
}

registerEnumType(ActionAddDelete, {
  name: 'ActionAddDelete',
});

export enum ActionAddUpdate {
  add = 'add',
  update = 'update',
}

registerEnumType(ActionAddUpdate, {
  name: 'ActionAddUpdate',
});
