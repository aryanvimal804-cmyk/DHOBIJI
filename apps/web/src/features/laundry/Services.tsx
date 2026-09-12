import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export default function LaundryServices() {
  const services = [
    { name: 'Wash & Fold', category: 'Standard', price: 40, unit: 'kg' },
    { name: 'Wash & Iron', category: 'Premium', price: 60, unit: 'kg' },
    { name: 'Dry Cleaning', category: 'Special', price: 150, unit: 'pc' },
    { name: 'Shoe Cleaning', category: 'Special', price: 250, unit: 'pair' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-indigo-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-indigo-900">Manage Services</h2>
          <p className="text-sm text-gray-500">Configure your catalog and pricing</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">+ Add New Service</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {services.map((svc, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-gray-900 text-lg">{svc.name}</h4>
                <p className="text-sm text-gray-500">{svc.category}</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-indigo-700 text-xl">₹{svc.price}</div>
                <div className="text-xs text-gray-400">per {svc.unit}</div>
                <div className="mt-2 flex gap-2 justify-end">
                  <button className="text-blue-600 text-sm hover:underline">Edit</button>
                  <button className="text-red-600 text-sm hover:underline">Delete</button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
