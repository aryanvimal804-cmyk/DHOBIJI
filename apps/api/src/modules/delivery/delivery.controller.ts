import { Request, Response } from 'express';
import { Order } from '../order/order.model';

export const getAssignments = async (req: Request, res: Response) => {
  try {
    // Delivery partners see orders that are ACCEPTED or READY_FOR_DELIVERY but have no partner yet
    const assignments = await Order.find({ 
      status: { $in: ['ACCEPTED', 'READY_FOR_DELIVERY'] },
      deliveryPartnerId: { $exists: false }
    }).populate('laundryId');
    
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const acceptAssignment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const partnerId = (req as any).user.id;
    
    const order = await Order.findByIdAndUpdate(
      id, 
      { deliveryPartnerId: partnerId, status: 'OUT_FOR_DELIVERY' }, 
      { new: true }
    );
    res.json({ message: 'Assignment accepted', order });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const getActiveDelivery = async (req: Request, res: Response) => {
  try {
    const partnerId = (req as any).user.id;
    const activeOrder = await Order.findOne({ 
      deliveryPartnerId: partnerId, 
      status: { $ne: 'DELIVERED' } 
    }).populate('laundryId').populate('customerId', 'name phoneNumber');
    
    res.json(activeOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const updateDeliveryStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    res.json({ message: 'Status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
