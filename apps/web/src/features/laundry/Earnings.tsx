import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';

export default function LaundryEarnings() {
  const payouts = [
    { id: 'TXN-001', date: '2023-10-27', amount: 4500, status: 'PAID' },
    { id: 'TXN-002', date: '2023-10-20', amount: 3200, status: 'PAID' },
    { id: 'TXN-003', date: '2023-10-13', amount: 5100, status: 'PAID' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-indigo-600 rounded-xl p-6 text-white shadow-lg flex justify-between items-center">
        <div>
          <h2 className="text-xl font-medium text-indigo-100">Current Pending Balance</h2>
          <p className="text-4xl font-bold mt-2">₹1,250</p>
          <p className="text-sm text-indigo-200 mt-1">Next payout on Friday</p>
        </div>
        <div className="bg-white/20 p-4 rounded-full">
          💰
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Gross Revenue (This Month)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">₹14,050</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">DHOBIJI Commission (15%)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">-₹2,107</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payout Settings (UPI)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">
            Enter your UPI ID to receive weekly payouts directly to your bank account. Without a valid UPI ID, payouts will be put on hold.
          </p>
          <div className="flex gap-2 max-w-md">
            <input 
              type="text" 
              placeholder="e.g. 9876543210@ybl" 
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              defaultValue=""
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Save Details
            </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payout History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-y border-gray-100">
                <th className="p-4 font-semibold text-gray-600">Date</th>
                <th className="p-4 font-semibold text-gray-600">Txn ID</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Amount</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((p, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="p-4 text-gray-900 font-medium">{p.date}</td>
                  <td className="p-4 text-gray-500">{p.id}</td>
                  <td className="p-4 text-gray-900 font-bold text-right">₹{p.amount}</td>
                  <td className="p-4 text-right">
                    <span className="px-2 py-1 text-xs font-bold rounded-full bg-green-100 text-green-700">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
