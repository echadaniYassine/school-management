// src/Layouts/DashboardLayout.jsx

import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

// Import the final, refactored components
import Sidebar from './Sidebar';
import DashboardHeader from '../components/navigation/DashboardHeader';
import LoadingSpinner from './LoadingSpinner';
import { USER_LOGIN } from '../router/routes';

// Configuration object for titles based on user role
const layoutConfig = {
  admin: { title: "Admin Portal" },
  teacher: { title: "Teacher Portal" },
  student: { title: "Student Portal" },
};

/**
 * The main application shell for all authenticated users.
 * This layout establishes the relationship between the fixed sidebar,
 * the fixed header, and the main scrollable content area.
 */
export default function DashboardLayout({ allowedRole }) {
  const { user, authenticated, isLoading, logout } = useUserContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Display a loading state while verifying the user session
  if (isLoading) {
    return <LoadingSpinner text="Verifying Session..." />;
  }

  // Redirect to login if the user is not authenticated
  if (!authenticated) {
    return <Navigate to={USER_LOGIN} replace />;
  }

  // Redirect to a safe page if the user's role doesn't match
  if (user?.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  // Get the specific configuration for the current user's role
  const config = layoutConfig[user.role] || {};

  return (
    <div className="min-h-screen w-full bg-background">
      {/* 
        The Sidebar is rendered here. Its internal styling makes it fixed.
        It is only visible on large screens (desktop-first approach).
      */}
      <Sidebar userRole={user.role} />

      {/*
        The Mobile Sidebar Sheet is rendered here. It is controlled by state
        and appears as an overlay on small screens.
      */}
      <Sidebar.MobileSheet 
          userRole={user.role} 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)}
      />
      
      {/*
        This div wraps the main content. The KEY is the left padding on large screens,
        which must match the sidebar's width (w-64 -> pl-64).
      */}
      <div className="lg:pl-64">
        {/* The Header is also fixed internally and will position itself correctly within this padded container. */}
        <DashboardHeader
          title={config.title || "Dashboard"}
          onLogout={logout}
          onMenuToggle={() => setIsMobileMenuOpen(true)}
        />
        
        {/*
          The main content for each page. The top padding prevents content
          from being hidden underneath the fixed header. (h-16 + top-5 margin = ~21, pt-28 is safe)
        */}
        <main className="flex-1 bg-background/95 p-4 pt-20 sm:pt-24 lg:pt-15">
          <Outlet />
        </main>
      </div>
    </div>
  );
}