import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  idCategory: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Featback', required: true })
  idFeatback: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Qualification', required: true })
  idQualification: Types.ObjectId;

  @Prop({ required: true })
  nameProduct: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  stock: number;

  @Prop({ type: [String], required: true })
  imageProduct: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  usersFavorite: Array<Types.ObjectId>;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  usersCart: Array<Types.ObjectId>;

  @Prop({ default: true })
  state: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
