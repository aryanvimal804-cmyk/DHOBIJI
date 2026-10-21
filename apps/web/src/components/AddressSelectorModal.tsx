import { useState } from 'react';
import { Address, useAddressStore } from '../stores/addressStore';
import AddressModal from './AddressModal';
import { Button } from './ui/Button';

interface AddressSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (address: Address) => void;
}

export default function AddressSelectorModal({
  isOpen,
  onClose,
  onSelect,
}: AddressSelectorModalProps) {
  const { addresses, selectedAddressId, selectAddress, deleteAddress } = useAddressStore();
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  if (!isOpen) return null;

  const handleSelect = (addr: Address) => {
    selectAddress(addr.id);
    onSelect?.(addr);
    onClose();
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setIsEditorOpen(true);
  };

  const handleEdit = (e: React.MouseEvent, addr: Address) => {
    e.stopPropagation();
    setEditingAddress(addr);
    setIsEditorOpen(true);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this address?')) {
      deleteAddress(id);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div 
          className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">Select Delivery Address</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Choose where you want your laundry picked up & delivered
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition text-sm font-bold"
            >
              ✕
            </button>
          </div>

          {/* List of addresses */}
          <div className="p-6 overflow-y-auto space-y-3 flex-1">
            {addresses.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <span className="text-4xl block mb-2">📍</span>
                <p className="font-semibold text-gray-700">No saved addresses found</p>
                <p className="text-xs text-gray-400 mt-1">Add your first address to proceed with order</p>
              </div>
            ) : (
              addresses.map((addr) => {
                const isSelected = addr.id === selectedAddressId;
                return (
                  <div
                    key={addr.id}
                    onClick={() => handleSelect(addr)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col gap-2 relative ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/60 shadow-sm ring-2 ring-blue-500/20'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50/70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {addr.tag === 'Home' ? '🏠' : addr.tag === 'Work' ? '🏢' : '📍'}
                        </span>
                        <span className="font-bold text-gray-900 text-sm">{addr.tag}</span>
                        {addr.isDefault && (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                            Default
                          </span>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={(e) => handleEdit(e, addr)}
                          className="px-2 py-1 text-xs text-blue-600 hover:bg-blue-100 rounded transition font-medium"
                        >
                          Edit
                        </button>
                        {addresses.length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => handleDelete(e, addr.id)}
                            className="px-2 py-1 text-xs text-red-500 hover:bg-red-100 rounded transition font-medium"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-sm font-medium text-gray-800 leading-snug">
                      {addr.houseNumber}, {addr.street}
                      {addr.landmark ? `, Near ${addr.landmark}` : ''}
                    </p>
                    <p className="text-xs text-gray-500">
                      {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                    <div className="pt-1 flex items-center justify-between text-xs text-gray-600 border-t border-gray-100 mt-1">
                      <span>👤 {addr.fullName}</span>
                      <span>📞 {addr.phoneNumber}</span>
                    </div>

                    {isSelected && (
                      <div className="absolute top-3 right-3 text-blue-600 font-bold text-sm">
                        ✓ Selected
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {/* Add new address button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleAddNew}
              className="w-full py-3.5 border-dashed border-2 border-blue-400 text-blue-600 hover:bg-blue-50 font-semibold flex items-center justify-center gap-2 rounded-xl mt-4"
            >
              <span className="text-lg font-bold">+</span> Add New Address
            </Button>
          </div>
        </div>
      </div>

      {/* Editor Modal for Adding / Editing */}
      <AddressModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        editAddress={editingAddress}
        onSuccess={(saved) => {
          selectAddress(saved.id);
          onSelect?.(saved);
        }}
      />
    </>
  );
}
