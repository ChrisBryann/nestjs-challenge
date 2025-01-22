import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Providers } from 'common/enums/provider.enum';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export class User {
  @Prop({
    type: SchemaTypes.ObjectId,
    auto: true,
  })
  _id: Types.ObjectId;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({
    type: String,
    enum: Providers,
    default: Providers.None,
  })
  provider: Providers;

  @Prop({
    default: 0,
  })
  tokenVersion: number;

  @Prop()
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
