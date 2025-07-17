// src/Layouts/GuestLayout.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../context/UserContext'; // Adjust path if needed
import Header from '../components/navigation/Header'
import Footer from '../components/navigation/Footer';

export default function GuestLayout() {
  const { authenticated, isLoading } = useUserContext();

  if (isLoading) {
    return <div>Loadinmg...</div>;
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
      {/* <Footer /> */}
    </div>
  );
}