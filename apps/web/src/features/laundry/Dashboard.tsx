import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { LaundryAPI } from '../../lib/api';

export default function LaundryDashboard() {
  const [pendingOrders, setPendingOrders] = useState<any[]>([]);

  const fetchOrders = () => {
    LaundryAPI.getPendingOrders()
      .then(res => {
        // Backend returns { success: true, data: [...] }
        setPendingOrders(res.data.data || []);
      })
      .catch(err => {
        console.error("API failed, using fallback", err);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAccept = async (orderId: string) => {
    try {
      await LaundryAPI.updateStatus(orderId, 'ACCEPTED');
      // Refresh list
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert('Failed to accept order');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-indigo-900">Partner Dashboard</h2>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Today's Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-indigo-900">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">8</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Today's Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">₹2,450</div>
          </CardContent>
        </Card>
      </div>

      {/* New Orders Section */}
      <Card>
        <CardHeader>
          <CardTitle>Action Required: New Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {pendingOrders.length > 0 ? (
            <div className="space-y-4">
              {pendingOrders.map((order) => (
                <div key={order._id || order.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border border-indigo-100 bg-indigo-50/50 rounded-lg">
                  <div>
                    <h4 className="font-bold text-indigo-900">Order: {order._id?.slice(-6).toUpperCase() || order.id}</h4>
                    <p className="text-sm text-gray-600">
                      {order.services ? order.services.map((s: any) => `${s.name} (x${s.qty})`).join(', ') : order.items}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Amount: ₹{order.totalAmount || 0} | Placed: {new Date(order.createdAt).toLocaleTimeString()}</p>
                  </div>
                  <div className="mt-3 md:mt-0 flex gap-2 w-full md:w-auto">
                    <Button variant="outline" className="w-full md:w-auto text-red-600 border-red-200 hover:bg-red-50">Reject</Button>
                    <Button onClick={() => handleAccept(order._id || order.id)} className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700">Accept Order</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">No new orders right now.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
