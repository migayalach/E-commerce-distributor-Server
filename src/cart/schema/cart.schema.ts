import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ _id: false })
export class ProductDetail extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  idProduct: string;

  @Prop({ required: true })
  amount: number;
}

export const ProductDetailSchema = SchemaFactory.createForClass(ProductDetail);

@Schema()
export class Cart extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  idUser: string;

  @Prop({ type: [ProductDetailSchema], default: [] })
  listProducts: ProductDetail[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
