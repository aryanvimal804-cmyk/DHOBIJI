import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

// Layouts
import CustomerLayout from '../layouts/CustomerLayout';
import LaundryLayout from '../layouts/LaundryLayout';
import DeliveryLayout from '../layouts/DeliveryLayout';
import AdminLayout from '../layouts/AdminLayout';

// Features (Actual Screens)
import RoleSelector from '../features/auth/RoleSelector';
import CustomerHome from '../features/customer/Home';
import LaundryListing from '../features/customer/LaundryListing';
import CustomerCart from '../features/customer/Cart';
import CustomerCheckout from '../features/customer/Checkout';
import CustomerOrders from '../features/customer/Orders';
import CustomerProfile from '../features/customer/Profile';

import AdminDashboard from '../features/admin/Dashboard';
import AdminOrders from '../features/admin/Orders';
import AdminLaundries from '../features/admin/Laundries';
import AdminDeliveryPartners from '../features/admin/DeliveryPartners';
import AdminCommissions from '../features/admin/Commissions';

import LaundryDashboard from '../features/laundry/Dashboard';
import LaundryOrders from '../features/laundry/Orders';
import LaundryServices from '../features/laundry/Services';
import LaundryEarnings from '../features/laundry/Earnings';

import DeliveryDashboard from '../features/delivery/Dashboard';
import ActiveDelivery from '../features/delivery/ActiveDelivery';
import LandingPage from '../features/public/LandingPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage /> // Premium Landing Page
  },
  {
    path: '/login',
    element: <RoleSelector /> // Main Login Screen
  },
  {
    path: '/customer',
    element: <CustomerLayout />,
    children: [
      { path: '', element: <Navigate to="home" replace /> },
      // Public routes
      { path: 'home', element: <CustomerHome /> },
      { path: 'laundries', element: <LaundryListing /> },
      { path: 'cart', element: <CustomerCart /> },
      
      // Protected routes
      { path: 'checkout', element: <ProtectedRoute allowedRoles={['CUSTOMER']}><CustomerCheckout /></ProtectedRoute> },
      { path: 'orders', element: <ProtectedRoute allowedRoles={['CUSTOMER']}><CustomerOrders /></ProtectedRoute> },
      { path: 'profile', element: <ProtectedRoute allowedRoles={['CUSTOMER']}><CustomerProfile /></ProtectedRoute> }
    ]
  },
  {
    path: '/laundry',
    element: <ProtectedRoute allowedRoles={['LAUNDRY_PARTNER']}><LaundryLayout /></ProtectedRoute>,
    children: [
      { path: '', element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <LaundryDashboard /> },
      { path: 'orders', element: <LaundryOrders /> },
      { path: 'services', element: <LaundryServices /> },
      { path: 'earnings', element: <LaundryEarnings /> }
    ]
  },
  {
    path: '/delivery',
    element: <ProtectedRoute allowedRoles={['DELIVERY_PARTNER']}><DeliveryLayout /></ProtectedRoute>,
    children: [
      { path: '', element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <DeliveryDashboard /> },
      { path: 'assignments', element: <DeliveryDashboard /> },
      { path: 'active', element: <ActiveDelivery /> }
    ]
  },
  {
    path: '/admin',
    element: <ProtectedRoute allowedRoles={['ADMIN']}><AdminLayout /></ProtectedRoute>,
    children: [
      { path: '', element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'orders', element: <AdminOrders /> },
      { path: 'laundries', element: <AdminLaundries /> },
      { path: 'delivery-partners', element: <AdminDeliveryPartners /> },
      { path: 'commissions', element: <AdminCommissions /> }
    ]
  }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
