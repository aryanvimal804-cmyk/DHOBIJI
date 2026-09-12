import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../stores/authStore';

export default function CustomerProfile() {
  const { user, logout } = useAuthStore();

  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-sm border border-white/20 text-center">
        <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-500/30">
          {user?.name?.[0] || 'C'}
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{user?.name || 'Guest User'}</h2>
        <p className="text-slate-500 font-medium">{user?.phoneNumber || '+91 9876543210'}</p>
      </div>

      <Card className="glass border-0">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-lg">Saved Addresses</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
            <div className="text-xl">🏠</div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-800">Home</h4>
              <p className="text-sm text-slate-500 mt-1">A-102, Tech Park Residency, Koramangala, Bengaluru</p>
            </div>
            <Button variant="outline" size="sm" className="text-slate-500 hover:text-blue-600">Edit</Button>
          </div>
          <Button variant="outline" className="w-full border-dashed border-2 text-blue-600 border-blue-200 bg-blue-50/50 hover:bg-blue-50">+ Add New Address</Button>
        </CardContent>
      </Card>

      <Card className="glass border-0">
        <CardContent className="p-4 space-y-2">
          <Button variant="outline" className="w-full justify-start text-slate-700">💳 Payment Methods</Button>
          <Button variant="outline" className="w-full justify-start text-slate-700">💬 Support & Help</Button>
          <Button variant="outline" className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700" onClick={logout}>
            🚪 Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
