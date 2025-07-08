// src/components/Auth/AuthGuard.jsx

import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { ADMIN_DASHBOARD, PARENT_DASHBOARD, STUDENT_DASHBOARD, TEACHER_DASHBOARD } from '../../router';

/**
 * This component guards public routes (like the homepage).
 * If a user is already authenticated, it redirects them to their
 * appropriate dashboard instead of showing the child component.
 */
export default function AuthGuard({ children }) {
  const { user, authenticated, isLoading } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Wait for the context to finish its initial check
    if (isLoading) {
      return;
    }

    // If the user is logged in and has a role, figure out where they should go
    if (authenticated && user?.role) {
      const dashboards = {
        admin: ADMIN_DASHBOARD,
        teacher: TEACHER_DASHBOARD,
        student: STUDENT_DASHBOARD,
        parent: PARENT_DASHBOARD,
      };
      const targetDashboard = dashboards[user.role];

      // Redirect them if they aren't already at their dashboard
      if (targetDashboard && location.pathname !== targetDashboard) {
        navigate(targetDashboard, { replace: true });
      }
    }
  }, [user, authenticated, isLoading, navigate, location]);

  // --- IMPROVEMENT ---
  // If the user is authenticated, show a loading message while the redirect happens.
  // This prevents a "flash" of the homepage before navigating away.
  if (authenticated) {
    return <div>Loading your experience...</div>;
  }

  // If the user is not authenticated, show the component this guard is protecting (e.g., the Homepage).
  return children;
}