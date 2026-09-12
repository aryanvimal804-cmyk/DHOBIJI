import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { DeliveryAPI } from '../../lib/api';

export default function ActiveDelivery() {
  const [activeJob, setActiveJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchActiveJob = () => {
    setLoading(true);
    DeliveryAPI.getActiveDelivery()
      .then(res => {
        if (res.data) {
          setActiveJob(res.data);
        } else {
          setActiveJob(null);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchActiveJob();
  }, []);

  const handleMarkDelivered = async () => {
    if (!activeJob) return;
    try {
      await DeliveryAPI.updateStatus(activeJob._id || activeJob.id, 'DELIVERED');
      alert('Order marked as DELIVERED!');
      navigate('/delivery');
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  if (loading) return <div className="text-center mt-10">Loading active delivery...</div>;
  if (!activeJob) return (
    <div className="text-center mt-10 p-8 border border-dashed rounded-xl border-gray-300">
      <h3 className="text-xl font-bold text-gray-500">No Active Delivery</h3>
      <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700" onClick={() => navigate('/delivery')}>Back to Dashboard</Button>
    </div>
  );

  return (
    <div className="space-y-6 h-[80vh] flex flex-col">
      <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm flex justify-between items-center z-10">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Active Delivery #{activeJob._id?.slice(-6).toUpperCase() || activeJob.id}</h2>
          <p className="text-sm text-green-600 font-medium">📍 Navigating...</p>
        </div>
        <Button className="bg-red-100 text-red-700 hover:bg-red-200 shadow-none">Emergency SOS</Button>
      </div>

      <div className="grid gap-4">
        <Card className="p-4 bg-blue-50/50 border border-blue-100 shadow-sm">
          <p className="text-xs text-gray-500 font-bold mb-1">PICKUP</p>
          <p className="font-semibold">{activeJob.laundryId?.name || 'Laundry'}</p>
          <p className="text-sm text-gray-600">{activeJob.laundryId?.address || 'Laundry Address'}</p>
        </Card>
        <Card className="p-4 bg-green-50/50 border border-green-100 shadow-sm">
          <p className="text-xs text-gray-500 font-bold mb-1">DROP-OFF</p>
          <p className="font-semibold">{activeJob.customerId?.name || 'Customer'}</p>
          <p className="text-sm text-gray-600">{activeJob.pickupAddress}</p>
          <p className="text-sm text-gray-600 font-medium mt-1">📞 {activeJob.customerId?.phoneNumber || 'N/A'}</p>
        </Card>
      </div>

      <Card className="flex-1 overflow-hidden relative shadow-inner border-0 bg-blue-50/50 mt-4 min-h-[200px]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-xl">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-2xl font-bold text-slate-800">Map Interface</h3>
            <p className="text-slate-500 mt-2">Live GPS tracking and routing will be rendered here.</p>
            <div className="mt-6 flex justify-center gap-4">
              <Button className="bg-green-600 hover:bg-green-700 font-bold text-lg py-6 px-8" onClick={handleMarkDelivered}>
                Mark as Delivered
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
