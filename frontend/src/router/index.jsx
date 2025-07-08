// src/router/index.jsx

import { createBrowserRouter, Navigate } from 'react-router-dom';

// --- CORE COMPONENTS ---
import AuthGuard from '../components/Auth/AuthGuard'; // Adjust path if needed

// --- LAYOUTS ---
// Layouts wrap groups of routes and provide shared UI and protection logic.
import AdminDashboardLayout from '../Layouts/AdminDashboardLayout';
import GuestLayout from '../Layouts/GuestLayout';
import Layout from '../Layouts/Layout';
import StudentDashboardLayout from '../Layouts/StudentDashboardLayout';
import TeacherDashboardLayout from '../Layouts/TeacherDashboardLayout';
// import ParentDashboardLayout from '../Layouts/ParentDashboardLayout';

// --- PUBLIC PAGES ---
import About from '../pages/About'; // <-- Import the new page
import Blog from '../pages/Blog'; // <-- Import the new page
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/Not Found';


// --- ADMIN PAGES ---
import AdminDashboard from '../components/admin/Pages/AdminDashboard';
import AdminManageParents from '../components/admin/Pages/AdminManageParents';
import AdminManageStudents from '../components/admin/Pages/AdminManageStudents';
import AdminManageTeachers from '../components/admin/Pages/AdminManageTeachers';
import AdminProfile from '../components/admin/Pages/AdminProfil';
import ManageActivitiesPage from '../components/Manage/ManageActivitiesPage';
import ManageAssignmentsPage from '../components/Manage/ManageAssignmentsPage';
import ManageCoursesPage from '../components/Manage/ManageCoursesPage'; // Adjust path
// import AdminSystemSetting from '../components/admin/Pages/AdminSystemSetting';

// --- STUDENT PAGES ---
import StudentActivities from '../components/student/Pages/StudentActivities';
import StudentAssignments from '../components/student/Pages/StudentAssignments';
import StudentBlog from '../components/student/Pages/StudentBlog';
import StudentChat from '../components/student/Pages/StudentChat';
import StudentCourses from '../components/student/Pages/StudentCourses';
import StudentDashboard from '../components/student/Pages/StudentDahboard';
import StudentProfile from '../components/student/Pages/StudentProfil';

// --- TEACHER PAGES ---
import ManageBlogPostsPage from '../components/Manage/ManageBlogPostsPage'; // Adjust path
import TeacherChat from '../components/teacher/TeacherChat';
import TeacherDashboard from '../components/teacher/TeacherDahboard';
import TeacherProfile from '../components/teacher/TeacherProfil';

import ForgotPassword from '../components/Auth/ForgotPassword';
import Register from '../components/Auth/Register';
import ResetPassword from '../components/Auth/ResetPassword';

// ========================================================================
//                           ROUTE CONSTANTS
// Using constants makes it easy to manage routes and avoid typos.
// ========================================================================


// --- ROUTE CONSTANTS ---
export const USER_LOGIN = '/login';
export const USER_REGISTER = '/register';
export const FORGOT_PASSWORD = '/forgot-password';

// Base Routes
const ADMIN_BASE = '/admin';
const STUDENT_BASE = '/student';
const TEACHER_BASE = '/teacher';
const PARENT_BASE = '/parent';

// Admin Routes
export const ADMIN_DASHBOARD = `${ADMIN_BASE}/dashboard`;
export const ADMIN_PROFILE = `${ADMIN_BASE}/profile`;
export const ADMIN_MANAGE_PARENTS = `${ADMIN_BASE}/manage-parents`;
export const ADMIN_MANAGE_STUDENTS = `${ADMIN_BASE}/manage-students`;
export const ADMIN_MANAGE_TEACHERS = `${ADMIN_BASE}/manage-teachers`;
export const ADMIN_COURSES = `${ADMIN_BASE}/courses`;
export const ADMIN_BLOGS = `${ADMIN_BASE}/blogs`;
export const ADMIN_ACTIVITIES = `${ADMIN_BASE}/activities`;
export const ADMIN_ASSIGNMENTS = `${ADMIN_BASE}/assignments`;
export const ADMIN_SYSTEM_SETTING = `${ADMIN_BASE}/system-settings`;

// Student Routes
export const STUDENT_DASHBOARD = `${STUDENT_BASE}/dashboard`;
export const STUDENT_PROFILE = `${STUDENT_BASE}/profile`;
export const STUDENT_CHATS = `${STUDENT_BASE}/chat`;
export const STUDENT_COURSES = `${STUDENT_BASE}/courses`;
export const STUDENT_ACTIVITIES = `${STUDENT_BASE}/activities`;
export const STUDENT_BLOGS = `${STUDENT_BASE}/blogs`;
export const STUDENT_ASSIGNMENTS = `${STUDENT_BASE}/assignments`;

// Teacher Routes
export const TEACHER_DASHBOARD = `${TEACHER_BASE}/dashboard`;
export const TEACHER_PROFILE = `${TEACHER_BASE}/profile`;
export const TEACHER_CHATS = `${TEACHER_BASE}/chat`;
export const TEACHER_COURSES = `${TEACHER_BASE}/courses`;
export const TEACHER_ACTIVITIES = `${TEACHER_BASE}/activities`;
export const TEACHER_BLOGS = `${TEACHER_BASE}/blogs`;
export const TEACHER_ASSIGNMENTS = `${TEACHER_BASE}/assignments`;

// Parent Routes (Placeholders)
export const PARENT_DASHBOARD = `${PARENT_BASE}/dashboard`;


// ========================================================================
//                         ROUTER CONFIGURATION
// ========================================================================

export const router = createBrowserRouter([
    // --- PROTECTED ROUTES ---
    {
        path: ADMIN_BASE,
        element: <AdminDashboardLayout />,
        children: [
            { path: '', element: <Navigate to={ADMIN_DASHBOARD} replace /> },
            { path: 'dashboard', element: <AdminDashboard /> },
            { path: 'profile', element: <AdminProfile /> },
            { path: 'manage-parents', element: <AdminManageParents /> },
            { path: 'manage-students', element: <AdminManageStudents /> },
            { path: 'manage-teachers', element: <AdminManageTeachers /> },
            { path: 'courses', element: <ManageCoursesPage userRole="admin" /> },
            { path: 'activities', element: <ManageActivitiesPage userRole="admin"/> },
            { path: 'blog-posts', element: <ManageBlogPostsPage userRole="admin" /> },
            { path: 'assignments', element: <ManageAssignmentsPage userRole="admin" /> },
        ]
    },
    {
        path: STUDENT_BASE,
        element: <StudentDashboardLayout />,
        children: [
            { path: '', element: <Navigate to={STUDENT_DASHBOARD} replace /> },
            { path: 'dashboard', element: <StudentDashboard /> },
            { path: 'profile', element: <StudentProfile /> },
            { path: 'chat', element: <StudentChat /> },
            { path: 'courses', element: <StudentCourses /> },
            { path: 'activities', element: <StudentActivities /> },
            { path: 'blogs', element: <StudentBlog /> },
            { path: 'assignments', element: <StudentAssignments /> },
        ],
    },
    {
        path: TEACHER_BASE,
        element: <TeacherDashboardLayout />,
        children: [
            { path: '', element: <Navigate to={TEACHER_DASHBOARD} replace /> },
            { path: 'dashboard', element: <TeacherDashboard /> },
            { path: 'profile', element: <TeacherProfile /> },
            { path: 'chat', element: <TeacherChat /> },
            { path: 'courses', element: <ManageCoursesPage userRole="teacher" /> },
            { path: 'activities', element: <ManageActivitiesPage userRole="teacher"/> },
            { path: 'blog-posts', element: <ManageBlogPostsPage userRole="teacher" /> },
            { path: 'assignments', element: <ManageAssignmentsPage userRole="teacher" /> },


        ],
    },

    // --- GUEST & PUBLIC ROUTES ---
    {
        element: <GuestLayout />,
        children: [
            { path: USER_LOGIN, element: <Login /> },
            { path: USER_REGISTER, element: <Register /> }, // <-- Add this
            { path: FORGOT_PASSWORD, element: <ForgotPassword /> }, // <-- Add this
            { path: '/reset-password', element: <ResetPassword /> }, // <-- Add this
        ],
    },
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: (
                    <AuthGuard>
                        <Home />
                    </AuthGuard>
                ),
            },
            { path: '/about', element: <About /> }, // <-- Add this route
            { path: '/blog', element: <Blog /> }, // <-- Add this route
            { path: '*', element: <NotFound /> },
        ],
    },
]);