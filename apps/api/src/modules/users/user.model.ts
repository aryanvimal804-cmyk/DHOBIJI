import mongoose, { Schema, Document } from 'mongoose';

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  LAUNDRY_PARTNER = 'LAUNDRY_PARTNER',
  DELIVERY_PARTNER = 'DELIVERY_PARTNER',
  ADMIN = 'ADMIN'
}

export interface IUser extends Document {
  phoneNumber?: string;
  email?: string;
  role: UserRole;
  name?: string;
  otp?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  phoneNumber: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true, sparse: true },
  role: { type: String, enum: Object.values(UserRole), required: true, default: UserRole.CUSTOMER },
  name: { type: String },
  otp: { type: String }, // Temporary field for storing generated OTP
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
