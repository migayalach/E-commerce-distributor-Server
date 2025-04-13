import { registerEnumType } from '@nestjs/graphql';

export enum ActionFavorite {
  add = 'add',
  delete = 'delete',
}

registerEnumType(ActionFavorite, {
  name: 'ActionFavorite',
});
