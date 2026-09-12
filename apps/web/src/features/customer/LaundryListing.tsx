import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { CustomerAPI } from '../../lib/api';
import { Input } from '../../components/ui/Input';

export default function LaundryListing() {
  const [laundries, setLaundries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    CustomerAPI.getLaundries()
      .then(res => setLaundries(res.data))
      .catch(err => {
        console.error("API failed, falling back to mock", err);
        import('../../mock/laundries').then(mock => setLaundries(mock.mockLaundries));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 bg-white/70 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h1 className="text-xl font-bold text-slate-800">Nearby Laundries</h1>
      </div>

      <div className="px-1">
        <Input placeholder="Search by name or service..." className="bg-white/50 backdrop-blur-sm border-blue-100 focus:border-blue-300 transition-all shadow-sm rounded-xl py-6" />
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : laundries.length === 0 ? (
          <div className="p-8 text-center text-gray-500 bg-white/50 rounded-xl border border-dashed border-gray-300">
            No laundries found matching your criteria.
          </div>
        ) : (
          laundries.map((laundry, index) => (
            <Link key={laundry.id || laundry._id} to={`/customer/laundries/${laundry.id || laundry._id}`}>
              <Card className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden bg-white/80 backdrop-blur-sm border-white/40" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex flex-col sm:flex-row h-auto sm:h-40">
                  <div className="w-full sm:w-2/5 bg-gray-200 h-32 sm:h-full relative overflow-hidden">
                    <img src={laundry.image} alt={laundry.name} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-800 shadow-sm">
                      {laundry.distance || '2.5 km'}
                    </div>
                  </div>
                  <div className="w-full sm:w-3/5 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-lg text-slate-900">{laundry.name}</h4>
                        <span className="flex items-center text-sm font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-md">
                          ★ {laundry.rating || '4.5'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                        <span>🕒</span> Pickup by {laundry.estimatedPickup || 'Tomorrow, 9 AM'}
                      </p>
                    </div>
                    <div className="flex justify-between items-end mt-4">
                      <div className="flex gap-2 flex-wrap flex-1">
                        {laundry.services?.slice(0, 2).map((s: string, i: number) => (
                          <span key={i} className="text-[10px] font-semibold tracking-wider uppercase bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-100">
                            {s}
                          </span>
                        ))}
                      </div>
                      <div className="text-right ml-2">
                        <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Starts from</p>
                        <p className="text-lg font-bold text-blue-600">₹{laundry.startingPrice || '49'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
