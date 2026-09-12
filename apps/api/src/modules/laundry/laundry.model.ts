import mongoose, { Schema, Document } from 'mongoose';

export interface ILaundry extends Document {
  name: string;
  partnerId: mongoose.Types.ObjectId;
  address: string;
  location: {
    type: string;
    coordinates: number[];
  };
  rating: number;
  isOpen: boolean;
  services: string[];
  startingPrice: number;
  estimatedPickup: string;
  image: string;
  upiId?: string;
}

const LaundrySchema = new Schema<ILaundry>({
  name: { type: String, required: true },
  partnerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  address: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  rating: { type: Number, default: 0 },
  isOpen: { type: Boolean, default: false },
  services: [{ type: String }],
  startingPrice: { type: Number, required: true },
  estimatedPickup: { type: String, required: true },
  image: { type: String },
  upiId: { type: String, required: false }
}, { timestamps: true });

LaundrySchema.index({ location: '2dsphere' });

export const Laundry = mongoose.model<ILaundry>('Laundry', LaundrySchema);
