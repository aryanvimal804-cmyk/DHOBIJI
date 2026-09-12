import { Server, Socket } from 'socket.io';
import { DeliveryPartner } from '../modules/delivery/delivery.model';
import { Order } from '../modules/order/order.model';

export const handleSocketEvents = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`[SOCKET] Client connected: ${socket.id}`);

    // Join room for a specific order (for Customer/Admin tracking)
    socket.on('join:order', (orderId: string) => {
      socket.join(`order_${orderId}`);
      console.log(`[SOCKET] ${socket.id} joined room order_${orderId}`);
    });

    // Delivery Partner Online
    socket.on('delivery:partner:online', async (data: { partnerId: string }) => {
      try {
        await DeliveryPartner.findOneAndUpdate({ userId: data.partnerId }, { isActive: true });
        console.log(`[SOCKET] Partner ${data.partnerId} is ONLINE`);
        socket.broadcast.emit('admin:delivery:status', { partnerId: data.partnerId, status: 'ONLINE' });
      } catch (err) {
        console.error('Error updating partner status', err);
      }
    });

    // Delivery Partner Offline
    socket.on('delivery:partner:offline', async (data: { partnerId: string }) => {
      try {
        await DeliveryPartner.findOneAndUpdate({ userId: data.partnerId }, { isActive: false });
        console.log(`[SOCKET] Partner ${data.partnerId} is OFFLINE`);
        socket.broadcast.emit('admin:delivery:status', { partnerId: data.partnerId, status: 'OFFLINE' });
      } catch (err) {
        console.error('Error updating partner status', err);
      }
    });

    // Live GPS Update from Delivery App
    socket.on('delivery:location:update', async (data: { orderId: string, partnerId: string, lat: number, lng: number }) => {
      const { orderId, partnerId, lat, lng } = data;
      
      // Update DB with latest location (optional, but good for history)
      await DeliveryPartner.findOneAndUpdate(
        { userId: partnerId }, 
        { 
          currentLocation: { type: 'Point', coordinates: [lng, lat] } 
        }
      );

      // Stream to Customer/Admin listening to this order
      io.to(`order_${orderId}`).emit('order:location:update', { lat, lng });
    });

    // Delivery Status Update
    socket.on('delivery:status:update', async (data: { orderId: string, status: string }) => {
      await Order.findByIdAndUpdate(data.orderId, { status: data.status });
      io.to(`order_${data.orderId}`).emit('order:status:changed', { status: data.status });
    });

    socket.on('disconnect', () => {
      console.log(`[SOCKET] Client disconnected: ${socket.id}`);
    });
  });
};
