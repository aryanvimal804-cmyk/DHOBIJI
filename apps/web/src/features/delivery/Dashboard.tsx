import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { DeliveryAPI } from '../../lib/api';

export default function DeliveryDashboard() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchAssignments = () => {
    DeliveryAPI.getAssignments().then(res => {
      // res.data is the array
      setAssignments(res.data || []);
    }).catch(console.error);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleAccept = async (id: string) => {
    try {
      await DeliveryAPI.acceptAssignment(id);
      navigate('/delivery/active');
    } catch (e) {
      console.error(e);
      alert('Failed to accept');
    }
  };
  return (
    <div className="space-y-6">
      <div className="bg-green-50 p-4 rounded-xl border border-green-200 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-green-900">You are Online</h3>
          <p className="text-sm text-green-700">Looking for nearby assignments...</p>
        </div>
        <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-100">
          Go Offline
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-2">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-sm text-gray-500 mb-1">Today's Earnings</div>
            <div className="text-2xl font-bold text-gray-900">₹450</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-sm text-gray-500 mb-1">Deliveries</div>
            <div className="text-2xl font-bold text-gray-900">9</div>
          </CardContent>
        </Card>
      </div>

      {assignments.length > 0 ? assignments.map((job) => (
        <Card key={job._id || job.id} className="mt-6 border-blue-200 shadow-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg text-blue-900">New Assignment</CardTitle>
              <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded">Near You</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <div className="text-blue-500 mt-1">📍</div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">PICKUP</p>
                  <p className="text-sm font-semibold text-gray-800">{job.laundryId?.name || "Sparkle Clean Laundry"}</p>
                  <p className="text-xs text-gray-500">{job.laundryId?.address || "123 Main St, Tech Park"}</p>
                </div>
              </div>
              
              <div className="w-0.5 h-4 bg-gray-200 ml-2"></div>
              
              <div className="flex gap-3 items-start">
                <div className="text-green-500 mt-1">🏠</div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">DROP-OFF</p>
                  <p className="text-sm font-semibold text-gray-800">Customer</p>
                  <p className="text-xs text-gray-500">{job.pickupAddress}</p>
                </div>
              </div>
              
              <div className="pt-4 flex justify-between items-center border-t border-gray-100 mt-4">
                <div>
                  <p className="text-xs text-gray-500">Est. Earning</p>
                  <p className="font-bold text-lg text-gray-900">₹40</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-gray-300">Reject</Button>
                  <Button onClick={() => handleAccept(job._id || job.id)} className="bg-green-600 hover:bg-green-700">Accept</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )) : (
        <div className="mt-6 text-center text-gray-500 p-8 border rounded-lg border-dashed">No assignments right now.</div>
      )}
    </div>
  );
}
