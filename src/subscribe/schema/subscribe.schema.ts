import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Schema()
@ObjectType()
export class Subscribe extends Document {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true, unique: true })
  @Field()
  email: string;
}

export const SubscribeSchema = SchemaFactory.createForClass(Subscribe);
