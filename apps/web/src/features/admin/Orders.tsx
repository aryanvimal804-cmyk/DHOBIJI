import { useEffect, useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { AdminAPI } from '../../lib/api';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AdminAPI.getOrders()
      .then(res => setOrders(res.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">All Orders</h2>
      </div>

      <Card className="glass border-0 shadow-sm">
        <CardContent className="p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-4 font-semibold text-slate-700">Order ID</th>
                <th className="p-4 font-semibold text-slate-700">Date</th>
                <th className="p-4 font-semibold text-slate-700">Customer</th>
                <th className="p-4 font-semibold text-slate-700">Laundry</th>
                <th className="p-4 font-semibold text-slate-700">Amount</th>
                <th className="p-4 font-semibold text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="p-4 text-center">Loading orders...</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={6} className="p-4 text-center">No orders found.</td></tr>
              ) : orders.map((order) => (
                <tr key={order._id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900">{order._id.slice(-6).toUpperCase()}</td>
                  <td className="p-4 text-slate-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-slate-600">{order.customerId?.name || 'Unknown'}</td>
                  <td className="p-4 text-blue-600 font-medium">{order.laundryId?.name || 'Unknown'}</td>
                  <td className="p-4 font-bold text-slate-900">₹{order.totalAmount}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800">
                      {order.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
