import { useEffect, useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { LaundryAPI } from '../../lib/api';

export default function LaundryOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    setLoading(true);
    LaundryAPI.getAllOrders()
      .then(res => setOrders(res.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    if (!newStatus) return;
    try {
      await LaundryAPI.updateStatus(orderId, newStatus);
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-indigo-100 shadow-sm">
        <h2 className="text-2xl font-bold text-indigo-900">Manage Orders</h2>
        <div className="flex gap-2">
          <input type="text" placeholder="Search Order ID..." className="px-3 py-2 border border-gray-300 rounded-md text-sm" />
          <Button className="bg-indigo-600 hover:bg-indigo-700">Search</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-50 border-b border-indigo-100">
                <th className="p-4 font-semibold text-indigo-900">Order ID</th>
                <th className="p-4 font-semibold text-indigo-900">Customer</th>
                <th className="p-4 font-semibold text-indigo-900">Items</th>
                <th className="p-4 font-semibold text-indigo-900">Status</th>
                <th className="p-4 font-semibold text-indigo-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="p-4 text-center">Loading...</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={5} className="p-4 text-center">No orders found.</td></tr>
              ) : orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">{order._id.slice(-6).toUpperCase()}</td>
                  <td className="p-4 text-gray-600">
                    {order.customerId?.name || 'Customer'}<br/>
                    <span className="text-xs text-gray-400">{order.customerId?.phoneNumber}</span>
                  </td>
                  <td className="p-4 text-gray-600">{order.services?.reduce((acc: number, curr: any) => acc + curr.qty, 0)} pcs</td>
                  <td className="p-4">
                    <span className="px-2 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800">
                      {order.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="p-4">
                    <select 
                      className="text-sm border border-gray-300 rounded p-1 bg-white"
                      value=""
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      <option value="">Update Status...</option>
                      <option value="ACCEPTED">ACCEPTED</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="READY_FOR_DELIVERY">READY FOR DELIVERY</option>
                    </select>
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
