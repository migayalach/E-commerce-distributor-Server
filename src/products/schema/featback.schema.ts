import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ _id: false })
export class FeedbackDetail {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  idUser: Types.ObjectId;

  @Prop({ required: true, default: false })
  enableFeedback: boolean;

  @Prop({ required: false, default: '' })
  featback: string;
}

export const FeedbackDetailSchema =
  SchemaFactory.createForClass(FeedbackDetail);

@Schema()
export class Featback {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  idProduct: Types.ObjectId;

  @Prop({ type: [FeedbackDetailSchema], default: [] })
  listFeedback: FeedbackDetail[];
}

export const FeatbackSchema = SchemaFactory.createForClass(Featback);
