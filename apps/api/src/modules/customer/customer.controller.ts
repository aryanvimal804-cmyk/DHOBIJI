import { Request, Response } from 'express';
import { Laundry } from '../laundry/laundry.model';
import { Order } from '../order/order.model';

export const getNearbyLaundries = async (req: Request, res: Response) => {
  try {
    // For now, return all laundries. (Later: add geo-query using req.query.lat / lng)
    const laundries = await Laundry.find({ isOpen: true });
    res.json(laundries);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const { laundryId, services, totalAmount, paymentMethod, pickupAddress } = req.body;
    
    // Assumes req.user is populated by AuthMiddleware
    const customerId = (req as any).user.id; 

    const order = new Order({
      customerId,
      laundryId,
      services,
      totalAmount,
      paymentMethod,
      pickupAddress,
      status: 'PLACED'
    });

    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const customerId = (req as any).user.id;
    const orders = await Order.find({ customerId })
      .populate('laundryId', 'name')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
