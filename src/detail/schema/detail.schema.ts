import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ _id: false })
export class ProductDetail extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  idProduct: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  total: number;
}

export const ProductDetailSchema = SchemaFactory.createForClass(ProductDetail);

@Schema()
export class Detail extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Buy', required: true })
  idBuy: string;

  @Prop({ type: [ProductDetailSchema], required: true })
  listProduct: ProductDetail[];

  @Prop({ required: true })
  totalBuy: number;
}

export const DetailSchema = SchemaFactory.createForClass(Detail);
