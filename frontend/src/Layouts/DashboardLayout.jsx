// src/Layouts/DashboardLayout.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

// Import shared components
import Sidebar from './Sidebar';
import DashboardHeader from '../components/navigation/DashboardHeader';
import LoadingSpinner from './LoadingSpinner';

// Import route constants
import { USER_LOGIN } from '../router/routes'; // <-- Import from dedicated routes file

// This config object is a great pattern, no changes needed.
const layoutConfig = {
  admin: { title: "Admin Portal" },
  teacher: { title: "Teacher Portal" },
  student: { title: "Student Portal" },
};

/**
 * A single, reusable layout for all authenticated user dashboards.
 * @param {{ allowedRole: 'admin' | 'teacher' | 'student' }} props
 */
export default function DashboardLayout({ allowedRole }) {
  const { user, authenticated, isLoading, logout } = useUserContext();

  if (isLoading) {
    return <LoadingSpinner text="Verifying Session..." />;
  }

  if (!authenticated) {
    return <Navigate to={USER_LOGIN} replace />;
  }

  // This robust role check is excellent.
  if (user?.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  const config = layoutConfig[user.role] || {};

  // --- FIX: Use CSS Grid for a modern and stable app shell ---
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
      
      {/* 1. Sidebar Column (hidden on mobile) */}
      <aside className="hidden border-r bg-muted/40 md:block">
        {/* The Sidebar no longer needs to be 'fixed' because the grid holds it in place */}
        <Sidebar userRole={user.role} />
      </aside>

      {/* 2. Main Content Column */}
      <div className="flex flex-col">
        <DashboardHeader
          title={config.title || "Dashboard"}
          onLogout={logout}
          // The logoLink is now handled by the Sidebar's home link
        />
        
        <main className="flex-1 overflow-y-auto bg-background/95 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}