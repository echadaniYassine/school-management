import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
//import Login from '../pages/login';
//import Registre from '../pages/Registre';
import Users from '../pages/users';
import NotFound from '../pages/Not Found';
import Layout from '../Layouts/Layout';
import UserLogin from '../components/Auth/UserLogin';
//import Register from '../components/Student/StudentRegister';
import StudentDashboardLayout from '../Layouts/StudentDashboardLayout';
import StudentDahboard from '../components/Student/StudentDahboard';
import GuestLayout from '../Layouts/GuestLayout';
import AdminDashboardLayout from '../Layouts/AdminDashboardLayout';
import AdminDashboard from '../components/Admin/AdminDashboard';

export const STUDENT_LOGIN = '/login'
export const STUDENT_DASHBOARD = '/Student/Dashboard'
export const ADMIN_DASHBOARD = '/admin/Dashboard'


export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },

            {
                path: '/users',
                element: <Users />,
            },

            {
                path: '*',
                element: <NotFound />,
            },
        ]
    },
    {
        element: <GuestLayout />,
        children: [
            {
                path: STUDENT_LOGIN,
                element: <UserLogin />,
            },
        ]
    },
    {
        element: <StudentDashboardLayout />,
        children: [
            {
                path: STUDENT_DASHBOARD,
                element: <StudentDahboard />,
            },
        ]
    },
    {
        element: <AdminDashboardLayout />,
        children: [
            {
                path: ADMIN_DASHBOARD,
                element: <AdminDashboard />,
            },
        ]
    }

]);
