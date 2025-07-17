// src/router/routes.js

// This file is the single source of truth for all application paths.
// It should not import any React components.

// --- Base Routes for Roles ---
export const ADMIN_BASE = '/admin';
export const STUDENT_BASE = '/student';
export const TEACHER_BASE = '/teacher';
export const PARENT_BASE = '/parent'; // Placeholder

// --- Guest & Public Routes ---
export const USER_LOGIN = '/login';
export const USER_REGISTER = '/register';
export const FORGOT_PASSWORD = '/forgot-password';
export const RESET_PASSWORD = '/reset-password';
export const HOME_PAGE = '/';
export const ABOUT_PAGE = '/about';
export const BLOG_PAGE = '/blog';

// --- Admin-Specific Routes ---
export const ADMIN_DASHBOARD = `${ADMIN_BASE}/dashboard`;
export const ADMIN_PROFILE = `${ADMIN_BASE}/profile`;
export const ADMIN_COURSES = `${ADMIN_BASE}/courses`;
export const ADMIN_ACTIVITIES = `${ADMIN_BASE}/activities`;
export const ADMIN_BLOGS = `${ADMIN_BASE}/blog-posts`;
export const ADMIN_ASSIGNMENTS = `${ADMIN_BASE}/assignments`;
export const ADMIN_MANAGE_STUDENTS = `${ADMIN_BASE}/manage-students`;
export const ADMIN_MANAGE_TEACHERS = `${ADMIN_BASE}/manage-teachers`;
export const ADMIN_MANAGE_PARENTS = `${ADMIN_BASE}/manage-parents`;
export const ADMIN_SETTINGS = `${ADMIN_BASE}/settings`; // Example

// --- Teacher-Specific Routes ---
export const TEACHER_DASHBOARD = `${TEACHER_BASE}/dashboard`;
export const TEACHER_PROFILE = `${TEACHER_BASE}/profile`;
export const TEACHER_COURSES = `${TEACHER_BASE}/courses`;
export const TEACHER_ACTIVITIES = `${TEACHER_BASE}/activities`;
export const TEACHER_BLOGS = `${TEACHER_BASE}/blog-posts`;
export const TEACHER_ASSIGNMENTS = `${TEACHER_BASE}/assignments`;

// --- Student-Specific Routes ---
export const STUDENT_DASHBOARD = `${STUDENT_BASE}/dashboard`;
export const STUDENT_PROFILE = `${STUDENT_BASE}/profile`;
export const STUDENT_COURSES = `${STUDENT_BASE}/courses`;
export const STUDENT_ACTIVITIES = `${STUDENT_BASE}/activities`;
export const STUDENT_BLOGS = `${STUDENT_BASE}/blogs`;
export const STUDENT_ASSIGNMENTS = `${STUDENT_BASE}/assignments`;