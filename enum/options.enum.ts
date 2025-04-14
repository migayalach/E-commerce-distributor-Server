import { registerEnumType } from '@nestjs/graphql';

export enum ActionAddDelete {
  add = 'add',
  delete = 'delete',
}

registerEnumType(ActionAddDelete, {
  name: 'ActionAddDelete',
});
