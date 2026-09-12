import { Outlet, Link, useLocation } from 'react-router-dom';

export default function AdminLayout() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Orders', path: '/admin/orders' },
    { name: 'Laundries', path: '/admin/laundries' },
    { name: 'Delivery Partners', path: '/admin/delivery-partners' },
    { name: 'Commissions', path: '/admin/commissions' },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar Navigation */}
      <nav className="bg-white border-r border-gray-200 text-slate-800 w-full md:w-64 p-4 md:min-h-screen flex flex-row md:flex-col justify-between md:justify-start overflow-x-auto md:overflow-x-visible">
        <div className="mb-0 md:mb-8 flex-shrink-0 mr-4 md:mr-0">
          <Link to="/admin/dashboard" className="flex items-center gap-2 group px-2">
            <div className="mr-2">
              <img src="/logo.jpg" alt="DHOBIJI" className="h-14 w-auto object-contain mix-blend-multiply" style={{ filter: 'brightness(1.1) contrast(1.2)' }} />
            </div>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full mt-1 uppercase tracking-wider border border-blue-100 hidden md:block">Admin</span>
          </Link>
        </div>
        <div className="flex md:flex-col gap-1 w-full">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                location.pathname === item.path
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
}
