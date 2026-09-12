import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { CustomerAPI } from '../../lib/api';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export default function CustomerHome() {
  const [laundries, setLaundries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch real data from backend
    CustomerAPI.getLaundries()
      .then(res => setLaundries(res.data))
      .catch(err => {
        console.error("API failed, falling back to mock", err);
        // Fallback to mock for UI demonstration if backend isn't running
        import('../../mock/laundries').then(mock => setLaundries(mock.mockLaundries));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header / Location */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div>
          <p className="text-xs text-gray-500 font-medium">Deliver to</p>
          <p className="text-sm font-bold text-gray-800 flex items-center gap-1">
            <span className="text-blue-600">📍</span> Home - Tech Park, Blr
          </p>
        </div>
        <img src="https://i.pravatar.cc/150?img=68" alt="Profile" className="w-10 h-10 rounded-full border-2 border-blue-100" />
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <Input placeholder="Search for laundries or services..." className="flex-1 bg-white shadow-sm" />
        <Button size="icon">🔍</Button>
      </div>

      {/* Offers Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-1">50% OFF</h2>
          <p className="text-sm text-blue-100 mb-4">On your first dry cleaning order</p>
          <Button variant="outline" className="text-blue-600 border-white bg-white hover:bg-gray-50">Claim Now</Button>
        </div>
        <div className="absolute top-0 right-0 opacity-20 text-9xl leading-none transform translate-x-4 -translate-y-4">👔</div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-bold text-lg mb-3 text-gray-800">Categories</h3>
        <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
          {['Wash & Fold', 'Dry Clean', 'Ironing', 'Shoe Cleaning'].map((cat, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[80px]">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl shadow-sm border border-blue-200">
                {['🧺', '👔', '✨', '👟'][i]}
              </div>
              <span className="text-xs font-medium text-gray-700 text-center">{cat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Laundries */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg text-gray-800">Nearby Laundries</h3>
          <Link to="/customer/laundries" className="text-sm font-medium text-blue-600 hover:underline">See All</Link>
        </div>
        
        <div className="space-y-4">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading laundries...</div>
          ) : laundries.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No laundries available right now.</div>
          ) : (
            laundries.map(laundry => (
              <Link key={laundry.id || laundry._id} to={`/customer/laundries/${laundry.id || laundry._id}`}>
                <Card className="hover:shadow-md transition-shadow overflow-hidden">
                <div className="flex h-32">
                  <div className="w-1/3 bg-gray-200">
                    <img src={laundry.image} alt={laundry.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="w-2/3 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-gray-900 line-clamp-1">{laundry.name}</h4>
                        <span className="flex items-center text-xs font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                          ★ {laundry.rating}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <span>📍</span> {laundry.distance} • {laundry.estimatedPickup}
                      </p>
                    </div>
                    <div className="flex gap-1 flex-wrap mt-2">
                      {laundry.services.slice(0, 2).map((s: string, i: number) => (
                        <span key={i} className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full border border-gray-200">
                          {s}
                        </span>
                      ))}
                      {laundry.services.length > 2 && (
                        <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full border border-gray-200">
                          +{laundry.services.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))
          )}
        </div>
      </div>
    </div>
  );
}
