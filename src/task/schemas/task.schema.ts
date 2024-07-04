import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../auth/schemas/user.schema';

@Schema({
  timestamps: true,
})
export class task {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const taskSchema = SchemaFactory.createForClass(task);
// {
//   "title":"liuuadeh",
//       "description": "liatdddhhhhakr33al28@gmail.com",
//       "author": "Liathakral@28",
//       "price":9,
//       "category":"Crime"

//   }
