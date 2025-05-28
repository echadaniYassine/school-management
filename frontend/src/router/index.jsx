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
import AdminManageParents from '../components/Admin/Pages/AdminManageParents';
import AdminManageStudents from '../components/Admin/Pages/AdminManageStudents';
import AdminManageTeachers from '../components/Admin/Pages/AdminManageTeachers';
import AdminProfil from '../components/Admin/Pages/AdminProfil';
import AdminSystemSetting from '../components/Admin/Pages/AdminSystemSetting';
import StudentActivities from '../components/Student/Pages/StudentActivities';
import StudentAssignments from '../components/Student/Pages/StudentAssignments';
import StudentBlog from '../components/Student/Pages/StudentBlog';
import StudentChat from '../components/Student/Pages/StudentChat';
import StudentCourses from '../components/Student/Pages/StudentCourses';
import StudentDahboard from '../components/Student/Pages/StudentDahboard';
import StudentLibrary from '../components/Student/Pages/StudentLibrary';
import StudentProfil from '../components/Student/Pages/StudentProfil';
import TeacherActivities from '../components/Teacher/TeacherActivities';
import TeacherAssignment from '../components/Teacher/TeacherAssignment';
import TeacherBlog from '../components/Teacher/TeacherBlog';
import TeacherCourses from '../components/Teacher/TeacherCourses';
import TeacherDahboard from '../components/Teacher/TeacherDahboard';
import TeacherLibrary from '../components/Teacher/TeacherLibrary';
import TeacherProfil from '../components/Teacher/TeacherProfil';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/Not Found';


export const ADMIN_BASE_ROUTE = '/admin/'
export const STUDENT_BASE_ROUTE = '/student/'
export const TEACHER_BASE_ROUTE = '/teacher/'

export const USER_LOGIN = '/login'
export const STUDENT_DASHBOARD = STUDENT_BASE_ROUTE + 'Dashboard'
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

export const STUDENT_PROFIL = STUDENT_BASE_ROUTE + 'profil'
export const STUDENT_NOTIFICATIONS = STUDENT_BASE_ROUTE + 'notification'
export const STUDENT_CHATS = STUDENT_BASE_ROUTE + 'chat'
export const STUDENT_COURSES = STUDENT_BASE_ROUTE + 'courses'
export const STUDENT_LIBRARY = STUDENT_BASE_ROUTE + 'library'
export const STUDENT_ACTIVITIES = STUDENT_BASE_ROUTE + 'activities'
export const STUDENT_BLOGS = STUDENT_BASE_ROUTE + 'blogs'
export const STUDENT_ASSIGNMENTS = STUDENT_BASE_ROUTE + 'assignments'

export const TEACHER_PROFIL = TEACHER_BASE_ROUTE + 'profil'
export const TEACHER_NOTIFICATIONS = TEACHER_BASE_ROUTE + 'notification'
export const TEACHER_CHATS = TEACHER_BASE_ROUTE + 'chat'
export const TEACHER_COURSES = TEACHER_BASE_ROUTE + 'courses'
export const TEACHER_LIBRARY = TEACHER_BASE_ROUTE + 'library'
export const TEACHER_ACTIVITIES = TEACHER_BASE_ROUTE + 'activities'
export const TEACHER_BLOGS = TEACHER_BASE_ROUTE + 'blogs'
export const TEACHER_ASSIGNMENTS = TEACHER_BASE_ROUTE + 'assignments'



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
                path: USER_LOGIN,
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
            {
                path: STUDENT_PROFIL,
                element: < StudentProfil />,
            },
            {
                path: STUDENT_CHATS,
                element: <StudentChat />,
            },
            {
                path: STUDENT_COURSES,
                element: <StudentCourses />,
            },
            {
                path: STUDENT_LIBRARY,
                element: <StudentLibrary />,
            },
            {
                path: STUDENT_ACTIVITIES,
                element: <StudentActivities />,
            },
            {
                path: STUDENT_BLOGS,
                element: <StudentBlog />,
            },
            {
                path: STUDENT_ASSIGNMENTS,
                element: <StudentAssignments />,
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
                path: ADMIN_PROFIL,
                element: <AdminProfil />,
            },
            {
                path: ADMIN_COURSES,
                element: <AdminManageCourses />,
            },
            {
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
            {
                path: TEACHER_PROFIL,
                element: <TeacherProfil />,
            },
            {
                path: TEACHER_CHATS,
                element: <TeacherCourses />,
            },
            {
                path: TEACHER_COURSES,
                element: <TeacherCourses />,
            },
            {
                path: TEACHER_LIBRARY,
                element: <TeacherLibrary />,
            },
            {
                path: TEACHER_ACTIVITIES,
                element: <TeacherActivities />,
            },
            {
                path: TEACHER_BLOGS,
                element: <TeacherBlog />,
            },
            {
                path: TEACHER_ASSIGNMENTS,
                element: <TeacherAssignment />,
            }
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