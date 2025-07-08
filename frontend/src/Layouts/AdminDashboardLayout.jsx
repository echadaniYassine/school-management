// src/Layouts/AdminDashboardLayout.jsx

import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { USER_LOGIN } from '../router';
import DashboardHeader from '../Layouts/DashboardHeader';
import { AdminAdministrationSideBar } from './Administration/AdminAdministrationSideBar';

export default function AdminDashboardLayout() {
  // === AUTHENTICATION & ROLE GUARD ===
  const { user, authenticated, isLoading, logout } = useUserContext();

  if (isLoading) {
    return <div>Loading Session...</div>;
  }

  if (!authenticated) {
    return <Navigate to={USER_LOGIN} replace />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // === MAIN ADMIN LAYOUT ===
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <DashboardHeader
        logoLink="/admin/dashboard"
        title="Admin Portal"
        onLogout={logout}
      />

      <main className="flex flex-1 overflow-hidden">
        <aside className="hidden md:block md:w-64 border-r bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm">
          <div className="h-full p-4 overflow-y-auto">
            <AdminAdministrationSideBar />
          </div>
        </aside>

        <section className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
