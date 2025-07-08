// src/Layouts/GuestLayout.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../context/UserContext'; // Adjust path if needed
import Header from '../components/Header'

export default function GuestLayout() {
  const { authenticated, isLoading } = useUserContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (authenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}