// src/Layouts/TeacherDashboardLayout.jsx

import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import DashboardHeader from '../Layouts/DashboardHeader';
import { USER_LOGIN } from '../router';

// Components
import { TeacherAdministrationSideBar } from './Administration/TeacherAdministrationSideBar';

export default function TeacherDashboardLayout() {
  const { user, authenticated, isLoading, logout } = useUserContext();

  if (isLoading) {
    return <div>Loading Session...</div>;
  }
  if (!authenticated) {
    return <Navigate to={USER_LOGIN} replace />;
  }
  if (user?.role !== 'teacher') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <DashboardHeader
        logoLink="/teacher/dashboard"
        title="Teacher Portal"
        onLogout={logout}
      />

      <main className="flex flex-1 overflow-hidden">
        <aside className="hidden md:block md:w-64 border-r bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm">
          <div className="h-full p-4 overflow-y-auto">
            <TeacherAdministrationSideBar />
          </div>
        </aside>

        <section className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
