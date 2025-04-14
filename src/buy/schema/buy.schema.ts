import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Buy extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  idUser: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  code: string;
}

export const BuySchema = SchemaFactory.createForClass(Buy);
