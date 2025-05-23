import { createBrowserRouter } from 'react-router-dom';
import AdminDashboardLayout from '../Layouts/AdminDashboardLayout';
import GuestLayout from '../Layouts/GuestLayout';
import Layout from '../Layouts/Layout';
import ParentDashboardLayout from '../Layouts/ParentDashboardLayout';
import StudentDashboardLayout from '../Layouts/StudentDashboardLayout';
import TeacherDashboardLayout from '../Layouts/TeacherDashboardLayout';
import AdminDashboard from '../components/Admin/Pages/AdminDashboard';
import AdminManageAcitivities from '../components/Admin/Pages/AdminManageAcitivities';
import AdminManageAssignments from '../components/Admin/Pages/AdminManageAssignments';
import AdminManageBlogs from '../components/Admin/Pages/AdminManageBlogs';
import AdminManageCourses from '../components/Admin/Pages/AdminManageCourses';
import AdminManageNotification from '../components/Admin/Pages/AdminManageNotification';
import AdminManageParents from '../components/Admin/Pages/AdminManageParents';
import AdminManageStudents from '../components/Admin/Pages/AdminManageStudents';
import AdminManageTeachers from '../components/Admin/Pages/AdminManageTeachers';
import AdminProfil from '../components/Admin/Pages/AdminProfil';
import AdminSystemSetting from '../components/Admin/Pages/AdminSystemSetting';
import StudentDahboard from '../components/Student/StudentDahboard';
import TeacherDahboard from '../components/Teacher/TeacherDahboard';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/Not Found';


export const ADMIN_BASE_ROUTE = '/admin/'
export const STUDENT_LOGIN = '/login'
export const STUDENT_DASHBOARD = '/Student/Dashboard'
export const ADMIN_DASHBOARD = ADMIN_BASE_ROUTE + 'Dashboard'
export const ADMIN_MANAGE_PARENTS = ADMIN_BASE_ROUTE + 'manage-parents'
export const ADMIN_MANAGE_STUDENTS = ADMIN_BASE_ROUTE + 'manage-students'
export const ADMIN_PROFIL = ADMIN_BASE_ROUTE + 'profile'
export const ADMIN_NOTIFICATION = ADMIN_BASE_ROUTE + 'notification'
export const ADMIN_COURSES = ADMIN_BASE_ROUTE + 'courses'
export const ADMIN_BLOGS = ADMIN_BASE_ROUTE + 'blogs'
export const ADMIN_ACTIVITIES = ADMIN_BASE_ROUTE + 'activities'
export const ADMIN_ASSIGNMENTS = ADMIN_BASE_ROUTE + 'assignments-students'
export const ADMIN_SYSTEM_SETTING = ADMIN_BASE_ROUTE + 'system-settings'
export const ADMIN_MANAGE_TEACHERS = ADMIN_BASE_ROUTE + 'manage-teachers'

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
                element: <Login />,
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
            {
                path: ADMIN_MANAGE_STUDENTS,
                element: <AdminManageStudents />,
            },
            {
                path: ADMIN_MANAGE_STUDENTS,
                element: <AdminManageStudents />,
            },
            {
                path: ADMIN_PROFIL,
                element: <AdminProfil />,
            },
            {
                path: ADMIN_NOTIFICATION,
                element: <AdminManageNotification />,
            }, {
                path: ADMIN_COURSES,
                element: <AdminManageCourses />,
            }, {
                path: ADMIN_BLOGS,
                element: <AdminManageBlogs />,
            },
            {
                path: ADMIN_ACTIVITIES,
                element: <AdminManageAcitivities />,
            },
            {
                path: ADMIN_ASSIGNMENTS,
                element: <AdminManageAssignments />,
            },
            {
                path: ADMIN_SYSTEM_SETTING,
                element: <AdminSystemSetting />,
            },
               {
                path: ADMIN_MANAGE_TEACHERS,
                element: <AdminManageTeachers />,
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
    {
        element: <ParentDashboardLayout />,
        children: [
            {
                path: PARENT_DASHBOARD,
                element: <AdminDashboard />,
            },
        ]
    }

]);