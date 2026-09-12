import { Request, Response } from 'express';
import { Order } from '../order/order.model';
import User from '../users/user.model';
import { Laundry } from '../laundry/laundry.model';
import { DeliveryPartner } from '../delivery/delivery.model';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalRevenueResult = await Order.aggregate([
      { $match: { status: 'DELIVERED' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = totalRevenueResult[0]?.total || 0;
    
    // DhobiGo standard platform commission is 15% (mock logic)
    const platformCommission = totalRevenue * 0.15; 

    const activeUsers = await User.countDocuments({ role: 'CUSTOMER' });
    const activeLaundries = await Laundry.countDocuments({ isOpen: true });

    res.json({
      success: true,
      data: {
        totalOrders,
        totalRevenue,
        platformCommission,
        activeUsers,
        activeLaundries
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error retrieving stats' });
  }
};

export const getLaundries = async (req: Request, res: Response) => {
  try {
    const laundries = await Laundry.find().populate('partnerId', 'name phoneNumber');
    res.json({ success: true, data: laundries });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getDeliveryPartners = async (req: Request, res: Response) => {
  try {
    const partners = await DeliveryPartner.find().populate('userId', 'name phoneNumber');
    res.json({ success: true, data: partners });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate('customerId', 'name phoneNumber')
      .populate('laundryId', 'name')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
