import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Schema()
@ObjectType()
export class Category extends Document {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field()
  nameCategory: string;

  @Prop({ default: true })
  @Field()
  stateCategory: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
