import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // Pass the returnUrl as a query parameter
    return <Navigate to={`/login?returnUrl=${encodeURIComponent(location.pathname + location.search)}`} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // If logged in but wrong role, redirect to appropriate home
    if (user.role === 'CUSTOMER') return <Navigate to="/customer/home" replace />;
    if (user.role === 'LAUNDRY_PARTNER') return <Navigate to="/laundry/dashboard" replace />;
    if (user.role === 'DELIVERY_PARTNER') return <Navigate to="/delivery/dashboard" replace />;
    if (user.role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
