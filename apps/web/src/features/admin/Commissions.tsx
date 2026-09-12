import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';

export default function AdminCommissions() {
  const transactions = [
    { date: '2023-10-27', type: 'Customer Payment', orderId: 'ORD-501', amount: 450, comm: 67.5 },
    { date: '2023-10-28', type: 'Customer Payment', orderId: 'ORD-502', amount: 200, comm: 30.0 },
    { date: '2023-10-28', type: 'Customer Payment', orderId: 'ORD-503', amount: 850, comm: 127.5 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Commissions & Finances</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-blue-600 text-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-blue-100">Total Processed (Gross)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹1,500</div>
          </CardContent>
        </Card>
        <Card className="bg-green-600 text-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-green-100">DHOBIJI Revenue (Net)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹225</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 text-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-300">Pending Payouts to Partners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹1,275</div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass border-0 shadow-sm mt-8">
        <CardHeader>
          <CardTitle>Recent Ledger Entries</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-4 font-semibold text-slate-700">Date</th>
                <th className="p-4 font-semibold text-slate-700">Order ID</th>
                <th className="p-4 font-semibold text-slate-700">Transaction</th>
                <th className="p-4 font-semibold text-slate-700 text-right">Gross Amount</th>
                <th className="p-4 font-semibold text-slate-700 text-right">DHOBIJI Cut (15%)</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="p-4 text-slate-600">{txn.date}</td>
                  <td className="p-4 font-medium text-blue-600">{txn.orderId}</td>
                  <td className="p-4 text-slate-600">{txn.type}</td>
                  <td className="p-4 font-bold text-slate-900 text-right">₹{txn.amount}</td>
                  <td className="p-4 font-bold text-green-600 text-right">+₹{txn.comm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
