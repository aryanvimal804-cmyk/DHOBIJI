import { useEffect, useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AdminAPI } from '../../lib/api';

export default function AdminLaundries() {
  const [laundries, setLaundries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AdminAPI.getLaundries()
      .then(res => setLaundries(res.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Manage Laundries</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">Add New Partner</Button>
      </div>

      <Card className="glass border-0 shadow-sm">
        <CardContent className="p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-4 font-semibold text-slate-700">Shop ID</th>
                <th className="p-4 font-semibold text-slate-700">Name</th>
                <th className="p-4 font-semibold text-slate-700">Owner</th>
                <th className="p-4 font-semibold text-slate-700">Rating</th>
                <th className="p-4 font-semibold text-slate-700">Status</th>
                <th className="p-4 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="p-4 text-center">Loading laundries...</td></tr>
              ) : laundries.length === 0 ? (
                <tr><td colSpan={6} className="p-4 text-center">No laundries found.</td></tr>
              ) : laundries.map((laundry) => (
                <tr key={laundry._id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="p-4 font-medium text-slate-500">{laundry._id.slice(-6).toUpperCase()}</td>
                  <td className="p-4 font-bold text-slate-900">{laundry.name}</td>
                  <td className="p-4 text-slate-600">{laundry.partnerId?.name || 'Unassigned'}</td>
                  <td className="p-4 font-bold text-slate-900">⭐ {laundry.rating || 0}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${laundry.isOpen ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {laundry.isOpen ? 'VERIFIED' : 'PENDING'}
                    </span>
                  </td>
                  <td className="p-4">
                    {!laundry.isOpen ? (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 h-7 text-xs">Verify</Button>
                    ) : (
                      <Button size="sm" variant="outline" className="h-7 text-xs text-red-600 border-red-200 hover:bg-red-50">Suspend</Button>
                    )}
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
