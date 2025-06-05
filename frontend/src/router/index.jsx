import { createBrowserRouter } from 'react-router-dom';

// Layouts
import AdminDashboardLayout from '../Layouts/AdminDashboardLayout';
import GuestLayout from '../Layouts/GuestLayout';
import Layout from '../Layouts/Layout'; // General public layout
import ParentDashboardLayout from '../Layouts/ParentDashboardLayout';
import StudentDashboardLayout from '../Layouts/StudentDashboardLayout';
import TeacherDashboardLayout from '../Layouts/TeacherDashboardLayout';

// Public Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/Not Found';

// Admin Pages
import AdminDashboard from '../components/Admin/Pages/AdminDashboard';
import AdminManageActivities from '../components/Admin/Pages/AdminManageAcitivities'; // Corrected typo from Acitivities
import AdminManageAssignments from '../components/Admin/Pages/AdminManageAssignments';
import AdminManageBlogs from '../components/Admin/Pages/AdminManageBlogs';
import AdminManageCourses from '../components/Admin/Pages/AdminManageCourses';
import AdminManageParents from '../components/Admin/Pages/AdminManageParents';
import AdminManageStudents from '../components/Admin/Pages/AdminManageStudents';
import AdminManageTeachers from '../components/Admin/Pages/AdminManageTeachers';
import AdminProfile from '../components/Admin/Pages/AdminProfil'; // Renamed AdminProfil to AdminProfile for consistency
import AdminSystemSetting from '../components/Admin/Pages/AdminSystemSetting';
// AdminNotifications component would be needed if ADMIN_NOTIFICATION route is used

// Student Pages
import StudentActivities from '../components/Student/Pages/StudentActivities';
import StudentAssignments from '../components/Student/Pages/StudentAssignments';
import StudentBlog from '../components/Student/Pages/StudentBlog';
import StudentChat from '../components/Student/Pages/StudentChat';
import StudentCourses from '../components/Student/Pages/StudentCourses';
import StudentDashboardPage from '../components/Student/Pages/StudentDahboard'; // Renamed StudentDahboard for clarity
import StudentProfilePage from '../components/Student/Pages/StudentProfil'; // Renamed StudentProfil for clarity
// StudentNotifications component would be needed if STUDENT_NOTIFICATIONS route is used

// Teacher Pages
import TeacherActivities from '../components/Teacher/TeacherActivities';
import TeacherAssignment from '../components/Teacher/TeacherAssignment';
import TeacherBlog from '../components/Teacher/TeacherBlog';
import TeacherCourses from '../components/Teacher/TeacherCourses';
import TeacherDashboardPage from '../components/Teacher/TeacherDahboard'; // Renamed TeacherDahboard for clarity
import TeacherProfilePage from '../components/Teacher/TeacherProfil'; // Renamed TeacherProfil for clarity
// TeacherChat and TeacherNotifications components would be needed if their routes are used

// Parent Pages (Assuming these components will be created)
// import ParentDashboardPage from '../components/Parent/Pages/ParentDashboard';
// import ParentProfilePage from '../components/Parent/Pages/ParentProfile';
// import ParentChatPage from '../components/Parent/Pages/ParentChat';
// import ParentViewLibraryPage from '../components/Parent/Pages/ParentViewLibrary';
// import ParentViewActivitiesPage from '../components/Parent/Pages/ParentViewActivities';
// import ParentViewBlogPage from '../components/Parent/Pages/ParentViewBlog';
// import ParentChildProfilePage from '../components/Parent/Pages/ParentChildProfile';
// import ParentChildAssignmentsPage from '../components/Parent/Pages/ParentChildAssignments';
// import ParentChildAttendancePage from '../components/Parent/Pages/ParentChildAttendance';


// --- ROUTE CONSTANTS ---

// Base Routes
export const ADMIN_BASE_ROUTE = '/admin';
export const STUDENT_BASE_ROUTE = '/student';
export const TEACHER_BASE_ROUTE = '/teacher';
export const PARENT_BASE_ROUTE = '/parent';

// Auth Routes
export const USER_LOGIN = '/login';

// Admin Routes
export const ADMIN_DASHBOARD = `${ADMIN_BASE_ROUTE}/dashboard`;
export const ADMIN_PROFILE = `${ADMIN_BASE_ROUTE}/profile`;
export const ADMIN_MANAGE_PARENTS = `${ADMIN_BASE_ROUTE}/manage-parents`;
export const ADMIN_MANAGE_STUDENTS = `${ADMIN_BASE_ROUTE}/manage-students`;
export const ADMIN_MANAGE_TEACHERS = `${ADMIN_BASE_ROUTE}/manage-teachers`;
export const ADMIN_COURSES = `${ADMIN_BASE_ROUTE}/courses`;
export const ADMIN_BLOGS = `${ADMIN_BASE_ROUTE}/blogs`;
export const ADMIN_ACTIVITIES = `${ADMIN_BASE_ROUTE}/activities`;
export const ADMIN_ASSIGNMENTS = `${ADMIN_BASE_ROUTE}/assignments`;
export const ADMIN_SYSTEM_SETTING = `${ADMIN_BASE_ROUTE}/system-settings`;
export const ADMIN_NOTIFICATIONS = `${ADMIN_BASE_ROUTE}/notifications`; // Defined, but ensure component exists if used

// Student Routes
export const STUDENT_DASHBOARD = `${STUDENT_BASE_ROUTE}/dashboard`;
export const STUDENT_PROFILE = `${STUDENT_BASE_ROUTE}/profile`;
export const STUDENT_NOTIFICATIONS = `${STUDENT_BASE_ROUTE}/notifications`; // Defined, but ensure component exists if used
export const STUDENT_CHATS = `${STUDENT_BASE_ROUTE}/chat`;
export const STUDENT_COURSES = `${STUDENT_BASE_ROUTE}/courses`;
// export const STUDENT_LIBRARY = `${STUDENT_BASE_ROUTE}/library`; // Often same as COURSES for students
export const STUDENT_ACTIVITIES = `${STUDENT_BASE_ROUTE}/activities`;
export const STUDENT_BLOGS = `${STUDENT_BASE_ROUTE}/blogs`;
export const STUDENT_ASSIGNMENTS = `${STUDENT_BASE_ROUTE}/assignments`;

// Teacher Routes
export const TEACHER_DASHBOARD = `${TEACHER_BASE_ROUTE}/dashboard`;
export const TEACHER_PROFILE = `${TEACHER_BASE_ROUTE}/profile`;
export const TEACHER_NOTIFICATIONS = `${TEACHER_BASE_ROUTE}/notifications`; // Defined, but ensure component exists if used
export const TEACHER_CHATS = `${TEACHER_BASE_ROUTE}/chat`;
export const TEACHER_COURSES = `${TEACHER_BASE_ROUTE}/courses`;
// export const TEACHER_LIBRARY = `${TEACHER_BASE_ROUTE}/library`; // Often same as COURSES
export const TEACHER_ACTIVITIES = `${TEACHER_BASE_ROUTE}/activities`;
export const TEACHER_BLOGS = `${TEACHER_BASE_ROUTE}/blogs`;
export const TEACHER_ASSIGNMENTS = `${TEACHER_BASE_ROUTE}/assignments`;

// Parent Routes (Define these as needed)
export const PARENT_DASHBOARD = `${PARENT_BASE_ROUTE}/dashboard`;
export const PARENT_PROFILE = `${PARENT_BASE_ROUTE}/profile`;
export const PARENT_CHAT = `${PARENT_BASE_ROUTE}/chat`;
export const PARENT_VIEW_LIBRARY = `${PARENT_BASE_ROUTE}/library`;
export const PARENT_VIEW_ACTIVITIES = `${PARENT_BASE_ROUTE}/activities`;
export const PARENT_VIEW_BLOG = `${PARENT_BASE_ROUTE}/blog`;
export const PARENT_CHILD_PROFILE = `${PARENT_BASE_ROUTE}/child/profile`;
export const PARENT_CHILD_ASSIGNMENTS = `${PARENT_BASE_ROUTE}/child/assignments`;
export const PARENT_CHILD_ATTENDANCE = `${PARENT_BASE_ROUTE}/child/attendance`;
export const PARENT_NOTIFICATIONS = `${PARENT_BASE_ROUTE}/notifications`; // Added for completeness


// --- ROUTER CONFIGURATION ---
export const router = createBrowserRouter([
    // Public Routes
    {
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '*', element: <NotFound /> }, // Catch-all should ideally be last in this group or overall
        ],
    },
    // Guest Routes (Not Logged In)
    {
        element: <GuestLayout />,
        children: [
            { path: USER_LOGIN, element: <Login /> },
        ],
    },
    // Student Routes
    {
        element: <StudentDashboardLayout />,
        children: [
            { path: STUDENT_DASHBOARD, element: <StudentDashboardPage /> },
            { path: STUDENT_PROFILE, element: <StudentProfilePage /> },
            { path: STUDENT_CHATS, element: <StudentChat /> },
            { path: STUDENT_COURSES, element: <StudentCourses /> },
            { path: STUDENT_ACTIVITIES, element: <StudentActivities /> },
            { path: STUDENT_BLOGS, element: <StudentBlog /> },
            { path: STUDENT_ASSIGNMENTS, element: <StudentAssignments /> },
            // { path: STUDENT_NOTIFICATIONS, element: <StudentNotificationsPage /> }, // Add if component exists
        ],
    },
    // Admin Routes
    {
        element: <AdminDashboardLayout />,
        children: [
            { path: ADMIN_DASHBOARD, element: <AdminDashboard /> },
            { path: ADMIN_PROFILE, element: <AdminProfile /> },
            { path: ADMIN_MANAGE_PARENTS, element: <AdminManageParents /> },
            { path: ADMIN_MANAGE_STUDENTS, element: <AdminManageStudents /> },
            { path: ADMIN_MANAGE_TEACHERS, element: <AdminManageTeachers /> },
            { path: ADMIN_COURSES, element: <AdminManageCourses /> },
            { path: ADMIN_BLOGS, element: <AdminManageBlogs /> },
            { path: ADMIN_ACTIVITIES, element: <AdminManageActivities /> },
            { path: ADMIN_ASSIGNMENTS, element: <AdminManageAssignments /> },
            { path: ADMIN_SYSTEM_SETTING, element: <AdminSystemSetting /> },
            // { path: ADMIN_NOTIFICATIONS, element: <AdminNotificationsPage /> }, // Add if component exists
        ],
    },
    // Teacher Routes
    {
        element: <TeacherDashboardLayout />,
        children: [
            { path: TEACHER_DASHBOARD, element: <TeacherDashboardPage /> },
            { path: TEACHER_PROFILE, element: <TeacherProfilePage /> },
            { path: TEACHER_CHATS, element: <TeacherCourses /> }, // Original had TeacherCourses here, verify if it should be TeacherChat component
            { path: TEACHER_COURSES, element: <TeacherCourses /> },
            { path: TEACHER_ACTIVITIES, element: <TeacherActivities /> },
            { path: TEACHER_BLOGS, element: <TeacherBlog /> },
            { path: TEACHER_ASSIGNMENTS, element: <TeacherAssignment /> },
            // { path: TEACHER_NOTIFICATIONS, element: <TeacherNotificationsPage /> }, // Add if component exists
        ],
    },
    // Parent Routes
    {
        element: <ParentDashboardLayout />,
        children: [
            // Replace AdminDashboard with actual ParentDashboardPage when created
            { path: PARENT_DASHBOARD, element: <AdminDashboard /> /* <ParentDashboardPage /> */ },
            // { path: PARENT_PROFILE, element: <ParentProfilePage /> },
            // { path: PARENT_CHAT, element: <ParentChatPage /> },
            // { path: PARENT_VIEW_LIBRARY, element: <ParentViewLibraryPage /> },
            // { path: PARENT_VIEW_ACTIVITIES, element: <ParentViewActivitiesPage /> },
            // { path: PARENT_VIEW_BLOG, element: <ParentViewBlogPage /> },
            // { path: PARENT_CHILD_PROFILE, element: <ParentChildProfilePage /> },
            // { path: PARENT_CHILD_ASSIGNMENTS, element: <ParentChildAssignmentsPage /> },
            // { path: PARENT_CHILD_ATTENDANCE, element: <ParentChildAttendancePage /> },
            // { path: PARENT_NOTIFICATIONS, element: <ParentNotificationsPage /> }, // Add if component exists
        ],
    },
]);