import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { AdminAPI } from '../../lib/api';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    AdminAPI.getStats()
      .then(res => setData(res.data.data))
      .catch(console.error);
  }, []);

  const stats = data ? [
    { title: "Total Orders", value: data.totalOrders, trend: "Overall" },
    { title: "Active Users", value: data.activeUsers, trend: "Customers" },
    { title: "Total Revenue", value: `₹${data.totalRevenue}`, trend: "From Delivered" },
    { title: "Platform Commission", value: `₹${data.platformCommission}`, trend: "15% Cut" },
  ] : [
    { title: "Loading...", value: "-", trend: "" },
    { title: "Loading...", value: "-", trend: "" },
    { title: "Loading...", value: "-", trend: "" },
    { title: "Loading...", value: "-", trend: "" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h2>
        <div className="text-sm text-gray-500 font-medium">Last updated: Just now</div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs text-gray-500 font-medium flex items-center mt-1`}>
                {stat.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex flex-col items-center justify-center border-t border-gray-100 bg-gray-50">
            <span className="text-gray-400 text-sm font-medium">[Chart Placeholder: Revenue vs Commission]</span>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Live Deliveries</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex flex-col items-center justify-center border-t border-gray-100 bg-gray-50">
            <span className="text-gray-400 text-sm font-medium">[Map Placeholder: Active Riders]</span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
