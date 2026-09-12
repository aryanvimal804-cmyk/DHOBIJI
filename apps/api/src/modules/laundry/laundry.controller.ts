import { Request, Response } from 'express';
import { Order } from '../order/order.model';
import { Laundry } from './laundry.model';

export const getPendingOrders = async (req: Request, res: Response) => {
  try {
    const partnerId = (req as any).user.id;
    let laundry = await Laundry.findOne({ partnerId });
    
    // Auto-assignment for MVP if no laundry found
    if (!laundry) {
      laundry = await Laundry.findOne();
      if (!laundry) return res.status(404).json({ message: 'No laundries exist in DB' });
      laundry.partnerId = partnerId;
      await laundry.save();
    }

    const orders = await Order.find({ laundryId: laundry._id, status: 'PLACED' }).populate('customerId', 'name phoneNumber');
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const partnerId = (req as any).user.id;
    const laundry = await Laundry.findOne({ partnerId });
    if (!laundry) return res.status(404).json({ message: 'Laundry not found' });

    const orders = await Order.find({ laundryId: laundry._id })
      .populate('customerId', 'name phoneNumber')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // In a real app, verify that this order belongs to this laundry partner
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    res.json({ message: 'Status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
