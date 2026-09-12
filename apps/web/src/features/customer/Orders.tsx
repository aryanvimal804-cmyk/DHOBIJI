import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { CustomerAPI } from '../../lib/api';

export default function CustomerOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CustomerAPI.getOrders()
      .then(res => setOrders(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-10">Loading orders...</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-sm border border-white/20">
        <h2 className="text-2xl font-bold text-slate-800">My Orders</h2>
      </div>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-10 text-slate-500">You haven't placed any orders yet.</div>
        ) : orders.map(order => (
          <Card key={order._id} className="glass border-0 overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
            <CardHeader className="bg-slate-50/50 pb-3 border-b border-slate-100">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg text-slate-900">{order.laundryId?.name || 'Unknown Laundry'}</CardTitle>
                  <p className="text-sm text-slate-500 font-medium mt-1">Order #{order._id.slice(-6).toUpperCase()} • {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                  {order.status.replace(/_/g, ' ')}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-600 text-sm font-medium">
                    {order.services.reduce((acc: number, curr: any) => acc + curr.qty, 0)} Items
                  </p>
                  <p className="font-bold text-lg text-slate-900 mt-1">₹{order.totalAmount}</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="text-slate-600 border-slate-200 hover:bg-slate-100">View Invoice</Button>
                  {order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && (
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">Track</Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
