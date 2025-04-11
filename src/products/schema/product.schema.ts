import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  idCategory: Types.ObjectId;

  @Prop({ required: true })
  nameProduct: string;

  @Prop()
  price: number;

  @Prop()
  stock: number;

  @Prop({ default: true })
  state: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
