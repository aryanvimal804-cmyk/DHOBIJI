import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function CustomerLayout() {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-16">
      {/* Mobile Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 sticky top-0 z-50 flex items-center justify-between shadow-sm">
        <Link to="/customer/home" className="flex items-center gap-2 group">
          <div className="mr-3">
            <img src="/logo.jpg" alt="DHOBIJI" className="h-16 w-auto object-contain mix-blend-multiply" style={{ filter: 'brightness(1.1) contrast(1.2)' }} />
          </div>
        </Link>
        {isAuthenticated ? (
          <Link to="/customer/profile">
            <img src="https://i.pravatar.cc/150?img=68" alt="Profile" className="w-9 h-9 rounded-full border-2 border-blue-100 shadow-sm" />
          </Link>
        ) : (
          <Link to={`/login?returnUrl=${encodeURIComponent(location.pathname)}`} className="text-sm font-medium bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-100 transition">
            Login
          </Link>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around p-3 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <Link to="/customer/home" className="text-gray-500 hover:text-blue-600 flex flex-col items-center">
          <span className="text-xs font-medium mt-1">Home</span>
        </Link>
        {isAuthenticated && (
          <Link to="/customer/orders" className="text-gray-500 hover:text-blue-600 flex flex-col items-center">
            <span className="text-xs font-medium mt-1">Orders</span>
          </Link>
        )}
        <Link to="/customer/cart" className="text-gray-500 hover:text-blue-600 flex flex-col items-center">
          <span className="text-xs font-medium mt-1">Cart</span>
        </Link>
        {isAuthenticated && (
          <Link to="/customer/profile" className="text-gray-500 hover:text-blue-600 flex flex-col items-center">
            <span className="text-xs font-medium mt-1">Profile</span>
          </Link>
        )}
      </nav>
    </div>
  );
}
