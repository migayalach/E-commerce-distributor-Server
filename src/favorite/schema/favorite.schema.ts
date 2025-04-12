import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Favorite extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  idUser: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }], default: [] })
  listProducts: Types.ObjectId[];
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
