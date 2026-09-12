import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useCartStore } from '../../stores/cartStore';

export default function Cart() {
  const { items: cartItems, laundryName, updateQty, getTotal } = useCartStore();

  const subtotal = getTotal();
  const deliveryFee = subtotal > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-sm border border-white/20 sticky top-0 z-10">
        <Link to="/customer/home" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </Link>
        <h2 className="text-2xl font-bold text-slate-800">Your Cart</h2>
      </div>

      <Card className="glass overflow-hidden border-0">
        <CardContent className="p-4 space-y-4">
          <div className="border-b border-slate-100 pb-2">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">FROM</p>
            <p className="font-bold text-slate-800 text-lg">{laundryName || "No Laundry Selected"}</p>
          </div>
          
          <div className="space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-8 text-slate-500">Your cart is empty. Add some services!</div>
            ) : cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center group">
                <div>
                  <h4 className="font-semibold text-slate-900">{item.name}</h4>
                  <p className="text-sm text-slate-500 font-medium">₹{item.price} / unit</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-slate-100 rounded-lg p-1 shadow-inner">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-slate-600 hover:text-blue-600 font-bold shadow-sm transition-all">-</button>
                    <span className="w-8 text-center font-bold text-sm text-slate-800">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-slate-600 hover:text-blue-600 font-bold shadow-sm transition-all">+</button>
                  </div>
                  <div className="font-bold text-slate-900 min-w-[60px] text-right text-lg">
                    ₹{item.price * item.qty}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {cartItems.length > 0 && (
        <>
          <Card className="glass border-0">
            <CardContent className="p-5 space-y-4">
              <h3 className="font-bold text-slate-900 text-lg mb-2">Bill Details</h3>
              <div className="flex justify-between text-sm text-slate-600 font-medium">
                <span>Item Total</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600 font-medium">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="border-t border-slate-200 pt-4 flex justify-between font-bold text-xl text-slate-900">
                <span>Total to Pay</span>
                <span className="text-blue-600">₹{total}</span>
              </div>
            </CardContent>
          </Card>

          <Link to="/customer/checkout" className="block pb-8">
            <Button className="w-full text-lg py-6 shadow-xl shadow-blue-500/20 bg-blue-600 hover:bg-blue-700 transition-all rounded-xl font-bold">
              Proceed to Checkout
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
