import { Outlet, Link } from 'react-router-dom';

export default function DeliveryLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <Link to="/delivery/dashboard" className="flex items-center gap-2 group">
          <div className="mr-3">
            <img src="/logo.jpg" alt="DHOBIJI" className="h-16 w-auto object-contain mix-blend-multiply" style={{ filter: 'brightness(1.1) contrast(1.2)' }} />
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">Delivery</span>
        </Link>
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="w-3 h-3 rounded-full bg-green-300 animate-pulse"></span>
          Online
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around p-3 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <Link to="/delivery/dashboard" className="text-gray-500 hover:text-green-600 flex flex-col items-center">
          <span className="text-xs font-medium mt-1">Dashboard</span>
        </Link>
        <Link to="/delivery/assignments" className="text-gray-500 hover:text-green-600 flex flex-col items-center">
          <span className="text-xs font-medium mt-1">Assignments</span>
        </Link>
        <Link to="/delivery/active" className="text-gray-500 hover:text-green-600 flex flex-col items-center">
          <span className="text-xs font-medium mt-1">Active</span>
        </Link>
      </nav>
    </div>
  );
}
