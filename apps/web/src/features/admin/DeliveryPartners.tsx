import { useEffect, useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AdminAPI } from '../../lib/api';

export default function AdminDeliveryPartners() {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AdminAPI.getDeliveryPartners()
      .then(res => setPartners(res.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Delivery Partners</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">Invite Partner</Button>
      </div>

      <Card className="glass border-0 shadow-sm">
        <CardContent className="p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-4 font-semibold text-slate-700">Partner ID</th>
                <th className="p-4 font-semibold text-slate-700">Name</th>
                <th className="p-4 font-semibold text-slate-700">Vehicle</th>
                <th className="p-4 font-semibold text-slate-700">Total Deliveries</th>
                <th className="p-4 font-semibold text-slate-700">Current Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="p-4 text-center">Loading delivery partners...</td></tr>
              ) : partners.length === 0 ? (
                <tr><td colSpan={5} className="p-4 text-center">No delivery partners found.</td></tr>
              ) : partners.map((partner) => (
                <tr key={partner._id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="p-4 font-medium text-slate-500">{partner._id.slice(-6).toUpperCase()}</td>
                  <td className="p-4 font-bold text-slate-900">{partner.userId?.name || 'Unassigned'}</td>
                  <td className="p-4 text-slate-600 font-mono text-sm">{partner.vehicleDetails?.licensePlate || 'N/A'}</td>
                  <td className="p-4 font-bold text-slate-900">{partner.totalDeliveries || 0}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full flex w-fit items-center gap-1 ${partner.isOnline ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${partner.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                      {partner.isOnline ? 'ONLINE' : 'OFFLINE'}
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
