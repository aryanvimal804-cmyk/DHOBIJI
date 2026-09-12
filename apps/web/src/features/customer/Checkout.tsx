import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { CustomerAPI } from '../../lib/api';
import { useCartStore } from '../../stores/cartStore';

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState<'ONLINE' | 'COD'>('ONLINE');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'DETAILS' | 'PROCESSING' | 'SUCCESS'>('DETAILS');
  const [paymentMode, setPaymentMode] = useState<'UPI' | 'CARD'>('UPI');
  
  const navigate = useNavigate();
  const { laundryId, items, getTotal, clearCart } = useCartStore();

  const subtotal = getTotal();
  const deliveryFee = subtotal > 0 ? 40 : 0;
  const totalAmount = subtotal + deliveryFee;

  const executeOrderAPI = async () => {
    setIsProcessing(true);
    try {
      await CustomerAPI.placeOrder({
        laundryId,
        services: items.map(i => ({ name: i.name, price: i.price, qty: i.qty })),
        totalAmount,
        paymentMethod,
        pickupAddress: "Apt 4B, Residency Road, Bangalore" // MVP Hardcoded
      });
      alert(`Order Placed Successfully!`);
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

  return (
    <div className="space-y-6 max-w-2xl mx-auto relative">
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
                      className={`flex-1 py-2 text-sm font-bold rounded-md transition ${paymentMode === 'UPI' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
                    >
                      UPI
                    </button>
                    <button 
                      onClick={() => setPaymentMode('CARD')} 
                      className={`flex-1 py-2 text-sm font-bold rounded-md transition ${paymentMode === 'CARD' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
                    >
                      Card
                    </button>
                  </div>

                  {paymentMode === 'UPI' ? (
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-slate-700">Enter UPI ID</label>
                      <input type="text" placeholder="username@upi" className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
                      <p className="text-xs text-slate-500">A payment request will be sent to your UPI app.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700">Card Number</label>
                        <input type="text" placeholder="4111 1111 1111 1111" className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition mt-1" />
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="text-sm font-medium text-slate-700">Expiry</label>
                          <input type="text" placeholder="MM/YY" className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500 mt-1" />
                        </div>
                        <div className="flex-1">
                          <label className="text-sm font-medium text-slate-700">CVV</label>
                          <input type="password" placeholder="***" className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500 mt-1" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" className="flex-1 text-slate-600" onClick={() => setShowPaymentGateway(false)}>Cancel</Button>
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 font-bold" onClick={simulatePayment}>
                      Pay ₹{totalAmount}
                    </Button>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">Secured by DummyPay (MVP)</span>
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

      <div className="flex items-center gap-4">
        <Link to="/customer/cart" className="text-gray-500 hover:text-blue-600">← Back to Cart</Link>
        <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
      </div>

      {/* Address */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Pickup & Delivery Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-3 border border-blue-200 bg-blue-50 rounded-lg flex justify-between items-start">
            <div className="flex gap-3">
              <span className="text-xl">📍</span>
              <div>
                <p className="font-bold text-blue-900">Home</p>
                <p className="text-sm text-blue-800 mt-1">Apt 4B, Residency Road, Bangalore</p>
                <p className="text-xs text-blue-600 mt-1">Contact: +91 9876543210</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="bg-white">Change</Button>
          </div>
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
          <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${paymentMethod === 'ONLINE' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>
            <input type="radio" name="payment" checked={paymentMethod === 'ONLINE'} onChange={() => setPaymentMethod('ONLINE')} className="w-5 h-5 text-blue-600" />
            <div className="flex-1">
              <p className="font-bold text-gray-900">Pay Online</p>
              <p className="text-xs text-gray-500">UPI, Cards, Netbanking</p>
            </div>
            <span className="text-2xl">💳</span>
          </label>
          
          <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${paymentMethod === 'COD' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>
            <input type="radio" name="payment" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="w-5 h-5 text-blue-600" />
            <div className="flex-1">
              <p className="font-bold text-gray-900">Cash on Delivery</p>
              <p className="text-xs text-gray-500">Pay when clothes are delivered</p>
            </div>
            <span className="text-2xl">💵</span>
          </label>
        </CardContent>
      </Card>

      <div className="pt-4">
        <Button 
          className="w-full text-lg py-6 shadow-lg bg-green-600 hover:bg-green-700"
          onClick={handlePlaceOrderClick}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing Order...' : `Place Order (₹${totalAmount})`}
        </Button>
      </div>
    </div>
  );
}
