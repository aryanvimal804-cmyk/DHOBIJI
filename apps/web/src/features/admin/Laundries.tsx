import { useEffect, useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AdminAPI } from '../../lib/api';

export default function AdminLaundries() {
  const [laundries, setLaundries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Bengaluru',
    pincode: '',
  });

  useEffect(() => {
    AdminAPI.getLaundries()
      .then(res => setLaundries(res.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleAddPartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.address) {
      alert('Please fill in shop name and address');
      return;
    }

    const newPartner = {
      _id: `lnd-${Date.now()}`,
      name: formData.name,
      partnerId: { name: formData.ownerName || 'Partner Owner', email: formData.email, phone: formData.phone },
      address: `${formData.address}, ${formData.city} - ${formData.pincode}`,
      rating: 5.0,
      isOpen: true,
    };

    setLaundries([newPartner, ...laundries]);
    setIsAddModalOpen(false);
    setFormData({
      name: '',
      ownerName: '',
      email: '',
      phone: '',
      address: '',
      city: 'Bengaluru',
      pincode: '',
    });
    alert('Laundry Partner added successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Manage Laundries</h2>
          <p className="text-sm text-slate-500">View and onboard verified laundry partners</p>
        </div>
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 font-semibold shadow-sm"
        >
          + Add New Partner
        </Button>
      </div>

      <Card className="glass border-0 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-4 font-semibold text-slate-700">Shop ID</th>
                <th className="p-4 font-semibold text-slate-700">Name</th>
                <th className="p-4 font-semibold text-slate-700">Owner</th>
                <th className="p-4 font-semibold text-slate-700">Address</th>
                <th className="p-4 font-semibold text-slate-700">Rating</th>
                <th className="p-4 font-semibold text-slate-700">Status</th>
                <th className="p-4 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="p-4 text-center text-slate-500">Loading laundries...</td></tr>
              ) : laundries.length === 0 ? (
                <tr><td colSpan={7} className="p-4 text-center text-slate-500">No laundries found.</td></tr>
              ) : laundries.map((laundry) => (
                <tr key={laundry._id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="p-4 font-medium text-slate-500">{laundry._id.slice(-6).toUpperCase()}</td>
                  <td className="p-4 font-bold text-slate-900">{laundry.name}</td>
                  <td className="p-4 text-slate-600">{laundry.partnerId?.name || 'Unassigned'}</td>
                  <td className="p-4 text-xs text-slate-500 max-w-xs truncate">{laundry.address || 'Tech Park, Bangalore'}</td>
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

      {/* Add Laundry Partner Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">Add Laundry Partner</h3>
                <p className="text-xs text-slate-400 mt-0.5">Register a new laundry store location</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddPartner} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Shop / Business Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Express Clean Laundromat"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Owner Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Suresh Kumar"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Partner Email</label>
                <input
                  type="email"
                  placeholder="partner@dhobigo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Full Shop Address *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shop #14, Main Road, Koramangala 4th Block"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="560034"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  Register Partner
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
