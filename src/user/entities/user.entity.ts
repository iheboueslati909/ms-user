import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../enums/role.enum';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop()
    name: string;
    @Prop({ unique: true })
    email: string;
    @Prop()
    password: string;
    @Prop({ type: [String], enum: Role, default: [Role.User] })
    roles: Role[];
}
export const UserSchema = SchemaFactory.createForClass(User);