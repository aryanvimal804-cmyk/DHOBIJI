import { useState, useEffect } from 'react';
import { Address, useAddressStore } from '../stores/addressStore';
import { Button } from './ui/Button';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  editAddress?: Address | null;
  onSuccess?: (address: Address) => void;
}

export default function AddressModal({
  isOpen,
  onClose,
  editAddress,
  onSuccess,
}: AddressModalProps) {
  const { addAddress, updateAddress } = useAddressStore();

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    houseNumber: '',
    street: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    tag: 'Home' as 'Home' | 'Work' | 'Other',
    isDefault: false,
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (editAddress) {
      setFormData({
        fullName: editAddress.fullName || '',
        phoneNumber: editAddress.phoneNumber || '',
        houseNumber: editAddress.houseNumber || '',
        street: editAddress.street || '',
        landmark: editAddress.landmark || '',
        city: editAddress.city || '',
        state: editAddress.state || '',
        pincode: editAddress.pincode || '',
        tag: editAddress.tag || 'Home',
        isDefault: Boolean(editAddress.isDefault),
      });
    } else {
      setFormData({
        fullName: '',
        phoneNumber: '',
        houseNumber: '',
        street: '',
        landmark: '',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '',
        tag: 'Home',
        isDefault: false,
      });
    }
    setError('');
  }, [editAddress, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setError('Please enter contact full name');
      return;
    }
    if (!formData.phoneNumber.trim()) {
      setError('Please enter a valid phone number');
      return;
    }
    if (!formData.houseNumber.trim()) {
      setError('Please enter Flat / House / Building details');
      return;
    }
    if (!formData.street.trim()) {
      setError('Please enter Street / Area / Locality');
      return;
    }
    if (!formData.city.trim()) {
      setError('Please enter City');
      return;
    }
    if (!formData.pincode.trim()) {
      setError('Please enter Pincode');
      return;
    }

    if (editAddress) {
      updateAddress(editAddress.id, formData);
      const updatedAddr: Address = { ...editAddress, ...formData };
      onSuccess?.(updatedAddr);
    } else {
      const created = addAddress(formData);
      onSuccess?.(created);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 text-white flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">
              {editAddress ? '✏️ Edit Address' : '📍 Add New Address'}
            </h3>
            <p className="text-xs text-blue-100 mt-0.5">
              Enter your complete pickup & delivery location details
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold transition text-sm"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Address Tag Selector */}
          <div>
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-2">
              Save Address As
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Home', 'Work', 'Other'] as const).map((tagOption) => (
                <button
                  type="button"
                  key={tagOption}
                  onClick={() => setFormData((prev) => ({ ...prev, tag: tagOption }))}
                  className={`py-2 px-3 rounded-lg border text-sm font-semibold flex items-center justify-center gap-2 transition ${
                    formData.tag === tagOption
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{tagOption === 'Home' ? '🏠' : tagOption === 'Work' ? '🏢' : '📍'}</span>
                  <span>{tagOption}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="e.g. 9876543210"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                required
              />
            </div>
          </div>

          {/* House / Flat details */}
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Flat / House No. / Building / Floor <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="houseNumber"
              value={formData.houseNumber}
              onChange={handleChange}
              placeholder="e.g. Flat 402, Tower B, Sunshine Apts"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />
          </div>

          {/* Street & Area */}
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Area / Street / Sector / Locality <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="e.g. 100ft Road, Indiranagar"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />
          </div>

          {/* Landmark */}
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Nearby Landmark <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              placeholder="e.g. Near Metro Station / Behind City Hospital"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          {/* City, State & Pincode */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Bengaluru"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Karnataka"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Pincode <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="560038"
                maxLength={6}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                required
              />
            </div>
          </div>

          {/* Default address checkbox */}
          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-xs text-gray-700 font-medium">
                Make this my default pickup & delivery address
              </span>
            </label>
          </div>

          {/* Footer buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 py-2.5 text-sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 py-2.5 text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md"
            >
              {editAddress ? 'Update Address' : 'Save Address'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
