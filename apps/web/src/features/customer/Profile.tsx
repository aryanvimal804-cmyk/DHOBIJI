import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../stores/authStore';
import { useAddressStore, Address } from '../../stores/addressStore';
import AddressModal from '../../components/AddressModal';

export default function CustomerProfile() {
  const { user, logout } = useAuthStore();
  const { addresses, selectedAddressId, selectAddress, deleteAddress, updateAddress } = useAddressStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleAddNew = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleEdit = (addr: Address) => {
    setEditingAddress(addr);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      deleteAddress(id);
    }
  };

  const handleSetDefault = (id: string) => {
    updateAddress(id, { isDefault: true });
    selectAddress(id);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Profile Header */}
      <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/40 text-center">
        <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-500/30">
          {user?.name?.[0] || 'C'}
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{user?.name || 'Rahul Sharma'}</h2>
        <p className="text-slate-500 font-medium">{user?.phoneNumber || '+91 9876543210'}</p>
        {user?.email && <p className="text-xs text-slate-400 mt-1">{user.email}</p>}
      </div>

      {/* Saved Addresses Section */}
      <Card className="glass border-0 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-slate-100 flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
              <span>📍</span> Saved Addresses
            </CardTitle>
            <p className="text-xs text-slate-500 mt-0.5">Manage your delivery and pickup locations</p>
          </div>
          <Button
            size="sm"
            onClick={handleAddNew}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1 shadow-sm"
          >
            <span>+</span> Add Address
          </Button>
        </CardHeader>

        <CardContent className="p-4 space-y-3">
          {addresses.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <span className="text-3xl block mb-2">🏠</span>
              <p className="font-semibold text-slate-700">No saved addresses</p>
              <p className="text-xs text-slate-400 mt-1">Add an address to make checkout faster</p>
            </div>
          ) : (
            addresses.map((addr) => {
              const isSelected = addr.id === selectedAddressId;
              return (
                <div
                  key={addr.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col gap-2 ${
                    isSelected
                      ? 'border-blue-400 bg-blue-50/50 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">
                        {addr.tag === 'Home' ? '🏠' : addr.tag === 'Work' ? '🏢' : '📍'}
                      </span>
                      <span className="font-bold text-slate-800 text-sm">{addr.tag}</span>
                      {addr.isDefault && (
                        <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                          Default
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      {!addr.isDefault && (
                        <button
                          type="button"
                          onClick={() => handleSetDefault(addr.id)}
                          className="px-2 py-1 text-xs text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition font-medium"
                        >
                          Set as Default
                        </button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(addr)}
                        className="h-7 text-xs text-slate-600 hover:text-blue-600"
                      >
                        ✏️ Edit
                      </Button>
                      {addresses.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(addr.id)}
                          className="h-7 text-xs text-red-500 border-red-100 hover:bg-red-50 hover:text-red-700"
                        >
                          🗑️
                        </Button>
                      )}
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-slate-800">
                    {addr.houseNumber}, {addr.street}
                  </p>
                  {addr.landmark && (
                    <p className="text-xs text-slate-500">
                      Landmark: <span className="text-slate-700 font-medium">{addr.landmark}</span>
                    </p>
                  )}
                  <p className="text-xs text-slate-500">
                    {addr.city}, {addr.state} - <span className="font-bold text-slate-700">{addr.pincode}</span>
                  </p>
                  <div className="pt-1 flex items-center gap-4 text-xs text-slate-600 border-t border-slate-100 mt-1">
                    <span>👤 {addr.fullName}</span>
                    <span>📞 {addr.phoneNumber}</span>
                  </div>
                </div>
              );
            })
          )}

          <Button
            variant="outline"
            onClick={handleAddNew}
            className="w-full border-dashed border-2 text-blue-600 border-blue-200 bg-blue-50/50 hover:bg-blue-50 font-semibold py-3 flex items-center justify-center gap-2 rounded-xl mt-2"
          >
            <span className="text-lg font-bold">+</span> Add New Address
          </Button>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card className="glass border-0 shadow-sm">
        <CardContent className="p-4 space-y-2">
          <Button variant="outline" className="w-full justify-start text-slate-700 font-medium">
            💳 Payment Methods
          </Button>
          <Button variant="outline" className="w-full justify-start text-slate-700 font-medium">
            💬 Support & Help
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 font-medium"
            onClick={logout}
          >
            🚪 Logout
          </Button>
        </CardContent>
      </Card>

      {/* Address Form Modal */}
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editAddress={editingAddress}
      />
    </div>
  );
}
