import mongoose, { Schema, Document } from 'mongoose';

export interface IDeliveryPartner extends Document {
  userId: mongoose.Types.ObjectId; // User ID with role DELIVERY_PARTNER
  vehicle: {
    type: string; // e.g. "Bike", "Van"
    registrationNumber: string;
  };
  isActive: boolean;
  currentLocation?: {
    type: string;
    coordinates: number[]; // [lng, lat]
  };
  isVerified: boolean;
  rating: number;
}

const DeliveryPartnerSchema = new Schema<IDeliveryPartner>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  vehicle: {
    type: { type: String, required: true },
    registrationNumber: { type: String, required: true }
  },
  isActive: { type: Boolean, default: false },
  currentLocation: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number] }
  },
  isVerified: { type: Boolean, default: false },
  rating: { type: Number, default: 0 }
}, { timestamps: true });

DeliveryPartnerSchema.index({ currentLocation: '2dsphere' });

export const DeliveryPartner = mongoose.model<IDeliveryPartner>('DeliveryPartner', DeliveryPartnerSchema);
