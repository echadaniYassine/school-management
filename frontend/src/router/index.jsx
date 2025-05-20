import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Users from '../pages/users';
import NotFound from '../pages/Not Found';
import Layout from '../Layouts/Layout';
import UserLogin from '../components/Auth/UserLogin';
import StudentDashboardLayout from '../Layouts/StudentDashboardLayout';
import StudentDahboard from '../components/Student/StudentDahboard';
import GuestLayout from '../Layouts/GuestLayout';
import AdminDashboardLayout from '../Layouts/AdminDashboardLayout';
import AdminDashboard from '../components/Admin/Pages/AdminDashboard';
import TeacherDashboardLayout from '../Layouts/TeacherDashboardLayout';
import TeacherDahboard from '../components/Teacher/TeacherDahboard';
import ParentDashboardLayout from '../Layouts/ParentDashboardLayout';
import ParentDashboard from '../components/Parent/ParentDashboard';
import AdminManageParents from '../components/Admin/Pages/AdminManageParents';


export const ADMIN_BASE_ROUTE = '/admin/'
export const STUDENT_LOGIN = '/login'
export const STUDENT_DASHBOARD = '/Student/Dashboard'
export const ADMIN_DASHBOARD = ADMIN_BASE_ROUTE + 'Dashboard'
export const ADMIN_MANAGE_PARENTS = ADMIN_BASE_ROUTE + '/manage-parents'
export const TEACHER_DASHBOARD = '/teacher/Dashboard'
export const PARENT_DASHBOARD = '/parent/Dashboard'




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
            {
                path: ADMIN_MANAGE_PARENTS,
                element: <AdminManageParents />,
            },
        ]
    },
    {
        element: <TeacherDashboardLayout />,
        children: [
            {
                path: TEACHER_DASHBOARD,
                element: <TeacherDahboard />,
            },
        ]
    }
    ,
    // {
    //     element: <ParentDashboardLayout />,
    //     children: [
    //         {
    //             path: PARENT_DASHBOARD,
    //             element: <ParentDashboard />,
    //         },
    //     ]
    // }

]);