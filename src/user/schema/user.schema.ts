import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Level', required: true })
  idLevel: string;

  @Prop({ type: Types.ObjectId, ref: 'Favorite' })
  idFavorite: string;

  @Prop({ type: Types.ObjectId, ref: 'Cart' })
  idCart: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  carnet: string;

  @Prop({ required: true })
  phone: number;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  profilePicture: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
