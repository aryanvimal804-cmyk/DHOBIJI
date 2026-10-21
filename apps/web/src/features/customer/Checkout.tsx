import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { CustomerAPI } from '../../lib/api';
import { useCartStore } from '../../stores/cartStore';
import { useAddressStore, Address } from '../../stores/addressStore';
import AddressModal from '../../components/AddressModal';
import AddressSelectorModal from '../../components/AddressSelectorModal';

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState<'ONLINE' | 'COD'>('ONLINE');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'DETAILS' | 'PROCESSING' | 'SUCCESS'>('DETAILS');
  const [paymentMode, setPaymentMode] = useState<'UPI' | 'CARD'>('UPI');

  // Address Modals State
  const [isAddressSelectorOpen, setIsAddressSelectorOpen] = useState(false);
  const [isAddressEditorOpen, setIsAddressEditorOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  // Direct Inline Edit State
  const [showInlineForm, setShowInlineForm] = useState(false);

  const navigate = useNavigate();
  const { laundryId, items, getTotal, clearCart } = useCartStore();
  const { getSelectedAddress, updateAddress, addAddress } = useAddressStore();

  const currentAddress = getSelectedAddress();

  // Inline form state initialized from currentAddress
  const [inlineData, setInlineData] = useState({
    fullName: currentAddress?.fullName || 'Rahul Sharma',
    phoneNumber: currentAddress?.phoneNumber || '+91 9876543210',
    houseNumber: currentAddress?.houseNumber || 'Apt 4B, Sunflower Residency',
    street: currentAddress?.street || 'Residency Road, Ashok Nagar',
    landmark: currentAddress?.landmark || '',
    city: currentAddress?.city || 'Bengaluru',
    state: currentAddress?.state || 'Karnataka',
    pincode: currentAddress?.pincode || '560025',
    tag: currentAddress?.tag || ('Home' as 'Home' | 'Work' | 'Other'),
  });

  const subtotal = getTotal();
  const deliveryFee = subtotal > 0 ? 40 : 0;
  const totalAmount = subtotal + deliveryFee;

  const getFormattedAddressString = (): string => {
    if (showInlineForm) {
      const parts = [
        inlineData.houseNumber,
        inlineData.street,
        inlineData.landmark ? `Near ${inlineData.landmark}` : null,
        `${inlineData.city}, ${inlineData.state} - ${inlineData.pincode}`,
        `(Contact: ${inlineData.fullName} - ${inlineData.phoneNumber})`,
      ].filter(Boolean);
      return parts.join(', ');
    }

    if (currentAddress) {
      const parts = [
        currentAddress.houseNumber,
        currentAddress.street,
        currentAddress.landmark ? `Near ${currentAddress.landmark}` : null,
        `${currentAddress.city}, ${currentAddress.state} - ${currentAddress.pincode}`,
        `(Contact: ${currentAddress.fullName} - ${currentAddress.phoneNumber})`,
      ].filter(Boolean);
      return parts.join(', ');
    }

    return 'Apt 4B, Residency Road, Bangalore';
  };

  const executeOrderAPI = async () => {
    setIsProcessing(true);
    try {
      // If inline form was edited, save it to the store
      if (showInlineForm) {
        if (currentAddress) {
          updateAddress(currentAddress.id, inlineData);
        } else {
          addAddress({ ...inlineData, isDefault: true });
        }
      }

      const finalPickupAddress = getFormattedAddressString();

      await CustomerAPI.placeOrder({
        laundryId,
        services: items.map((i) => ({ name: i.name, price: i.price, qty: i.qty })),
        totalAmount,
        paymentMethod,
        pickupAddress: finalPickupAddress,
      });

      alert(`Order Placed Successfully!\n\nPickup Address: ${finalPickupAddress}`);
      clearCart();
      setShowPaymentGateway(false);
      navigate('/customer/orders');
    } catch (error) {
      console.error(error);
      alert('Failed to place order');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePlaceOrderClick = () => {
    if (!laundryId || items.length === 0) return alert('Your cart is empty!');

    if (paymentMethod === 'ONLINE') {
      setShowPaymentGateway(true);
      setPaymentStep('DETAILS');
    } else {
      executeOrderAPI();
    }
  };

  const simulatePayment = () => {
    setPaymentStep('PROCESSING');
    setTimeout(() => {
      setPaymentStep('SUCCESS');
      setTimeout(() => {
        executeOrderAPI();
      }, 1500);
    }, 2500);
  };

  const openEditModal = () => {
    setEditingAddress(currentAddress);
    setIsAddressEditorOpen(true);
  };

  const openAddNewModal = () => {
    setEditingAddress(null);
    setIsAddressEditorOpen(true);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto relative pb-10">
      {/* Payment Gateway Modal Overlay */}
      {showPaymentGateway && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-sm">Amount to Pay</p>
                <h3 className="text-3xl font-bold">₹{totalAmount}</h3>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">🔒</span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              {paymentStep === 'DETAILS' && (
                <div className="space-y-6">
                  <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button
                      onClick={() => setPaymentMode('UPI')}
                      className={`flex-1 py-2 text-sm font-bold rounded-md transition ${
                        paymentMode === 'UPI' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'
                      }`}
                    >
                      UPI
                    </button>
                    <button
                      onClick={() => setPaymentMode('CARD')}
                      className={`flex-1 py-2 text-sm font-bold rounded-md transition ${
                        paymentMode === 'CARD' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'
                      }`}
                    >
                      Card
                    </button>
                  </div>

                  {paymentMode === 'UPI' ? (
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-slate-700">Enter UPI ID</label>
                      <input
                        type="text"
                        placeholder="username@upi"
                        className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      />
                      <p className="text-xs text-slate-500">A payment request will be sent to your UPI app.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700">Card Number</label>
                        <input
                          type="text"
                          placeholder="4111 1111 1111 1111"
                          className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition mt-1"
                        />
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="text-sm font-medium text-slate-700">Expiry</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500 mt-1"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-sm font-medium text-slate-700">CVV</label>
                          <input
                            type="password"
                            placeholder="***"
                            className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500 mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" className="flex-1 text-slate-600" onClick={() => setShowPaymentGateway(false)}>
                      Cancel
                    </Button>
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 font-bold" onClick={simulatePayment}>
                      Pay ₹{totalAmount}
                    </Button>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">
                      Secured by DummyPay (MVP)
                    </span>
                  </div>
                </div>
              )}

              {paymentStep === 'PROCESSING' && (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
                  <h4 className="text-lg font-bold text-slate-800">Processing Payment...</h4>
                  <p className="text-sm text-slate-500">Please do not refresh or close this page.</p>
                </div>
              )}

              {paymentStep === 'SUCCESS' && (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl animate-bounce">
                    ✓
                  </div>
                  <h4 className="text-2xl font-bold text-green-600">Payment Successful!</h4>
                  <p className="text-sm text-slate-500">Redirecting to your order...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/customer/cart" className="text-gray-500 hover:text-blue-600 font-medium transition">
          ← Back to Cart
        </Link>
        <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
      </div>

      {/* Address Section */}
      <Card className="border border-blue-100 shadow-sm overflow-hidden">
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/30 flex flex-row items-center justify-between border-b border-blue-50">
          <div>
            <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
              <span>📍</span> Pickup & Delivery Address
            </CardTitle>
            <p className="text-xs text-slate-500 mt-0.5">
              Clothes will be picked up & delivered to this address
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAddressSelectorOpen(true)}
              className="bg-white text-blue-600 border-blue-200 hover:bg-blue-50 text-xs font-semibold"
            >
              🔄 Change
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={openAddNewModal}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
            >
              + New Address
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          {/* Selected Address Display Card */}
          {currentAddress ? (
            <div className="p-4 border border-blue-200 bg-blue-50/70 rounded-xl flex flex-col md:flex-row justify-between md:items-center gap-4 transition shadow-sm">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
                  {currentAddress.tag === 'Home' ? '🏠' : currentAddress.tag === 'Work' ? '🏢' : '📍'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-blue-900 text-base">{currentAddress.tag}</p>
                    {currentAddress.isDefault && (
                      <span className="bg-blue-200 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-slate-800 mt-1">
                    {currentAddress.houseNumber}, {currentAddress.street}
                  </p>
                  {currentAddress.landmark && (
                    <p className="text-xs text-slate-600 mt-0.5">
                      Landmark: <span className="font-medium text-slate-700">{currentAddress.landmark}</span>
                    </p>
                  )}
                  <p className="text-xs text-slate-600 mt-0.5">
                    {currentAddress.city}, {currentAddress.state} - <span className="font-bold text-slate-800">{currentAddress.pincode}</span>
                  </p>
                  <p className="text-xs font-medium text-blue-700 mt-1 flex items-center gap-2">
                    <span>👤 {currentAddress.fullName}</span>
                    <span>•</span>
                    <span>📞 {currentAddress.phoneNumber}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={openEditModal}
                  className="bg-white text-slate-700 border-slate-300 hover:text-blue-600 hover:border-blue-400 text-xs font-medium shadow-sm"
                >
                  ✏️ Edit
                </Button>
                <button
                  type="button"
                  onClick={() => setShowInlineForm(!showInlineForm)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline px-2 py-1"
                >
                  {showInlineForm ? 'Hide Form' : 'Fill / Edit Here'}
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 border-2 border-dashed border-blue-300 rounded-xl text-center bg-blue-50/30">
              <span className="text-3xl block mb-2">📍</span>
              <p className="font-bold text-slate-800">No Address Added Yet</p>
              <p className="text-xs text-slate-500 mt-1">Please enter your address to receive pickup & delivery</p>
              <Button
                type="button"
                onClick={openAddNewModal}
                className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm"
              >
                + Fill Address Now
              </Button>
            </div>
          )}

          {/* Direct Address Input Fields (Always Open / Expandable so user can directly fill in any field!) */}
          {showInlineForm && (
            <div className="p-4 border border-blue-200 bg-white rounded-xl shadow-sm space-y-3 animate-in fade-in duration-200">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  📝 Fill / Update Address Details
                </p>
                <span className="text-xs text-slate-400">All fields are editable</span>
              </div>

              {/* Tag Selection */}
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Address Type</label>
                <div className="flex gap-2">
                  {(['Home', 'Work', 'Other'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setInlineData((prev) => ({ ...prev, tag: t }))}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition ${
                        inlineData.tag === t
                          ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {t === 'Home' ? '🏠 Home' : t === 'Work' ? '🏢 Work' : '📍 Other'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Contact Person Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={inlineData.fullName}
                    onChange={(e) => setInlineData({ ...inlineData, fullName: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={inlineData.phoneNumber}
                    onChange={(e) => setInlineData({ ...inlineData, phoneNumber: e.target.value })}
                    placeholder="e.g. 9876543210"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* House / Flat details */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Flat / House / Floor / Building <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={inlineData.houseNumber}
                  onChange={(e) => setInlineData({ ...inlineData, houseNumber: e.target.value })}
                  placeholder="e.g. Apt 4B, Sunflower Residency"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Street & Area */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Area / Street / Sector <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={inlineData.street}
                  onChange={(e) => setInlineData({ ...inlineData, street: e.target.value })}
                  placeholder="e.g. Residency Road, Ashok Nagar"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Landmark */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Landmark <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={inlineData.landmark}
                  onChange={(e) => setInlineData({ ...inlineData, landmark: e.target.value })}
                  placeholder="e.g. Near City Mall"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* City, State & Pincode */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={inlineData.city}
                    onChange={(e) => setInlineData({ ...inlineData, city: e.target.value })}
                    placeholder="Bengaluru"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">State</label>
                  <input
                    type="text"
                    value={inlineData.state}
                    onChange={(e) => setInlineData({ ...inlineData, state: e.target.value })}
                    placeholder="Karnataka"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={inlineData.pincode}
                    onChange={(e) => setInlineData({ ...inlineData, pincode: e.target.value })}
                    placeholder="560025"
                    maxLength={6}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowInlineForm(false)}
                >
                  Done
                </Button>
                <Button
                  type="button"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    if (currentAddress) {
                      updateAddress(currentAddress.id, inlineData);
                    } else {
                      addAddress({ ...inlineData, isDefault: true });
                    }
                    setShowInlineForm(false);
                  }}
                >
                  Save to Profile
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Time Slot */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Pickup Slot</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <div className="flex-1 p-3 border-2 border-blue-600 bg-blue-50 rounded-lg text-center cursor-pointer">
              <p className="font-bold text-blue-900">Today</p>
              <p className="text-sm text-blue-700">In 45 mins</p>
            </div>
            <div className="flex-1 p-3 border border-gray-200 rounded-lg text-center cursor-pointer hover:border-blue-300 hover:bg-gray-50">
              <p className="font-medium text-gray-700">Tomorrow</p>
              <p className="text-sm text-gray-500">10:00 AM</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <label
            className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${
              paymentMethod === 'ONLINE' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
            }`}
          >
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === 'ONLINE'}
              onChange={() => setPaymentMethod('ONLINE')}
              className="w-5 h-5 text-blue-600"
            />
            <div className="flex-1">
              <p className="font-bold text-gray-900">Pay Online</p>
              <p className="text-xs text-gray-500">UPI, Cards, Netbanking</p>
            </div>
            <span className="text-2xl">💳</span>
          </label>

          <label
            className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${
              paymentMethod === 'COD' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
            }`}
          >
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === 'COD'}
              onChange={() => setPaymentMethod('COD')}
              className="w-5 h-5 text-blue-600"
            />
            <div className="flex-1">
              <p className="font-bold text-gray-900">Cash on Delivery</p>
              <p className="text-xs text-gray-500">Pay when clothes are delivered</p>
            </div>
            <span className="text-2xl">💵</span>
          </label>
        </CardContent>
      </Card>

      {/* Place Order CTA */}
      <div className="pt-4">
        <Button
          className="w-full text-lg py-6 shadow-lg bg-green-600 hover:bg-green-700 font-bold"
          onClick={handlePlaceOrderClick}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing Order...' : `Place Order (₹${totalAmount})`}
        </Button>
      </div>

      {/* Modal for Selecting From Saved Addresses */}
      <AddressSelectorModal
        isOpen={isAddressSelectorOpen}
        onClose={() => setIsAddressSelectorOpen(false)}
        onSelect={(selected) => {
          setInlineData({
            fullName: selected.fullName,
            phoneNumber: selected.phoneNumber,
            houseNumber: selected.houseNumber,
            street: selected.street,
            landmark: selected.landmark || '',
            city: selected.city,
            state: selected.state,
            pincode: selected.pincode,
            tag: selected.tag,
          });
        }}
      />

      {/* Modal for Adding / Editing Address */}
      <AddressModal
        isOpen={isAddressEditorOpen}
        onClose={() => setIsAddressEditorOpen(false)}
        editAddress={editingAddress}
        onSuccess={(saved) => {
          setInlineData({
            fullName: saved.fullName,
            phoneNumber: saved.phoneNumber,
            houseNumber: saved.houseNumber,
            street: saved.street,
            landmark: saved.landmark || '',
            city: saved.city,
            state: saved.state,
            pincode: saved.pincode,
            tag: saved.tag,
          });
        }}
      />
    </div>
  );
}
