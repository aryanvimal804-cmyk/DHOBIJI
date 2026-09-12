import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AuthAPI } from '../../lib/api';
import { useAuthStore } from '../../stores/authStore';

type Role = 'CUSTOMER' | 'LAUNDRY_PARTNER' | 'DELIVERY_PARTNER' | 'ADMIN';

export default function RoleSelector() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get('returnUrl');
  const { login } = useAuthStore();

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'ROLE' | 'CREDENTIALS' | 'OTP'>('ROLE');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setStep('CREDENTIALS');
  };

  const handleRequestOtp = async () => {
    if (!identifier) {
      setError('Please enter a valid email or phone number');
      return;
    }

    // For Partners, enforce email
    if ((selectedRole === 'LAUNDRY_PARTNER' || selectedRole === 'DELIVERY_PARTNER') && !identifier.includes('@')) {
      setError('Partners MUST register/login using an Email Address for verification.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const isEmail = identifier.includes('@');
      const payload = isEmail ? { email: identifier, role: selectedRole } : { phoneNumber: identifier, role: selectedRole };

      const res = await AuthAPI.requestOtp(payload);
      if (res.data.success) {
        setStep('OTP');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to request OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const isEmail = identifier.includes('@');
      const payload = isEmail ? { email: identifier, otp } : { phoneNumber: identifier, otp };

      const res = await AuthAPI.verifyOtp(payload);
      if (res.data.success) {
        login(res.data.user, res.data.token);
        // Navigate based on returnUrl or role
        if (returnUrl) {
          navigate(returnUrl);
        } else if (selectedRole === 'CUSTOMER') {
          navigate('/customer/home');
        } else if (selectedRole === 'LAUNDRY_PARTNER') {
          navigate('/laundry/dashboard');
        } else if (selectedRole === 'DELIVERY_PARTNER') {
          navigate('/delivery/dashboard');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center flex flex-col items-center border-b border-gray-100 pb-6">
          <div className="mb-2">
            <img src="/logo.jpg" alt="DHOBIJI Logo" className="h-40 w-auto object-contain mix-blend-multiply" style={{ filter: 'brightness(1.1) contrast(1.2)' }} />
          </div>
          <p className="text-sm text-gray-500 mt-2 font-medium">
            {step === 'ROLE' ? 'Welcome to DHOBIJI' : step === 'CREDENTIALS' ? 'Enter your details' : 'Verify OTP'}
          </p>
        </CardHeader>

        <CardContent className="space-y-4 pt-6">
          {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">{error}</div>}

          {step === 'ROLE' && (
            <div className="space-y-3">

              <Button onClick={() => handleRoleSelect('CUSTOMER')} className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg">Login as Customer</Button>
              <Button onClick={() => handleRoleSelect('LAUNDRY_PARTNER')} className="w-full bg-indigo-600 hover:bg-indigo-700 py-6 text-lg">Login as Laundry Partner</Button>
              <Button onClick={() => handleRoleSelect('DELIVERY_PARTNER')} className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg">Login as Delivery Partner</Button>
              <Button onClick={() => handleRoleSelect('ADMIN')} variant="outline" className="w-full py-6 text-lg">Admin Login</Button>
            </div>
          )}

          {step === 'CREDENTIALS' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {selectedRole === 'CUSTOMER' ? 'Phone Number or Email' : 'Email Address (Required for Partners)'}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder={selectedRole === 'CUSTOMER' ? "e.g. 9876543210 or user@mail.com" : "e.g. partner@laundry.com"}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>
              <Button onClick={handleRequestOtp} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg">
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
              <button onClick={() => setStep('ROLE')} className="w-full text-sm text-gray-500 hover:text-gray-800">
                &larr; Back to roles
              </button>
            </div>
          )}

          {step === 'OTP' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Enter OTP sent to {identifier}</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-center tracking-widest text-2xl"
                  placeholder="1234"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <p className="text-xs text-gray-400 text-center">Hint: Use 1234 for testing</p>
              </div>
              <Button onClick={handleVerifyOtp} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg">
                {loading ? 'Verifying...' : 'Verify & Login'}
              </Button>
              <button onClick={() => setStep('CREDENTIALS')} className="w-full text-sm text-gray-500 hover:text-gray-800">
                &larr; Change {identifier.includes('@') ? 'email' : 'phone number'}
              </button>
            </div>
          )}
        </CardContent>
      </Card>


    </div>
  );
}
