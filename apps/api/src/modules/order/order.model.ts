import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  customerId: mongoose.Types.ObjectId;
  laundryId: mongoose.Types.ObjectId;
  deliveryPartnerId?: mongoose.Types.ObjectId;
  services: Array<{
    name: string;
    price: number;
    qty: number;
  }>;
  totalAmount: number;
  paymentMethod: 'ONLINE' | 'COD';
  status: 'PLACED' | 'ACCEPTED' | 'PICKUP_ASSIGNED' | 'PICKED_UP' | 'PROCESSING' | 'READY_FOR_DELIVERY' | 'OUT_FOR_DELIVERY' | 'DELIVERED';
  pickupAddress: string;
}

const OrderSchema = new Schema<IOrder>({
  customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  laundryId: { type: Schema.Types.ObjectId, ref: 'Laundry', required: true },
  deliveryPartnerId: { type: Schema.Types.ObjectId, ref: 'User' },
  services: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['ONLINE', 'COD'], required: true },
  status: { 
    type: String, 
    enum: ['PLACED', 'ACCEPTED', 'PICKUP_ASSIGNED', 'PICKED_UP', 'PROCESSING', 'READY_FOR_DELIVERY', 'OUT_FOR_DELIVERY', 'DELIVERED'],
    default: 'PLACED'
  },
  pickupAddress: { type: String, required: true }
}, { timestamps: true });

export const Order = mongoose.model<IOrder>('Order', OrderSchema);
