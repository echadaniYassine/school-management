// src/config/sidebarConfig.js

import {
  ActivityIcon, BookOpenIcon, ClipboardListIcon, FileTextIcon,
  GaugeIcon, UsersIcon, UserIcon, NewspaperIcon
} from 'lucide-react';

// --- FIX: Import from the dedicated constants file ---
import * as Routes from '../router/routes';

// Define a consistent class for all icons
const iconClass = "mr-2 h-5 w-5";

export const sidebarConfig = {
  admin: [
    {
      title: "Administration",
      items: [
        { to: Routes.ADMIN_DASHBOARD, Icon: GaugeIcon, label: "Dashboard" },
      ],
    },
    {
      title: "Content Management",
      items: [
        { to: Routes.ADMIN_COURSES, Icon: BookOpenIcon, label: "Courses" },
        { to: Routes.ADMIN_ACTIVITIES, Icon: ActivityIcon, label: "Activities" },
        { to: Routes.ADMIN_BLOGS, Icon: FileTextIcon, label: "Blog Posts" },
        { to: Routes.ADMIN_ASSIGNMENTS, Icon: ClipboardListIcon, label: "Assignments" },
      ],
    },
    {
      title: "User Management",
      items: [
        { to: Routes.ADMIN_MANAGE_STUDENTS, Icon: UsersIcon, label: "Manage Students" },
        { to: Routes.ADMIN_MANAGE_TEACHERS, Icon: UsersIcon, label: "Manage Teachers" },
        { to: Routes.ADMIN_MANAGE_PARENTS, Icon: UsersIcon, label: "Manage Parents" },
      ],
    },
  ],
  teacher: [
    {
      title: "Teacher Dashboard",
      items: [
        { to: Routes.TEACHER_DASHBOARD, Icon: GaugeIcon, label: "Dashboard" },
      ],
    },
    {
      title: "My Content",
      items: [
        { to: Routes.TEACHER_COURSES, Icon: BookOpenIcon, label: "My Courses" },
        { to: Routes.TEACHER_ACTIVITIES, Icon: ActivityIcon, label: "My Activities" },
        { to: Routes.TEACHER_BLOGS, Icon: FileTextIcon, label: "My Blog Posts" },
        { to: Routes.TEACHER_ASSIGNMENTS, Icon: ClipboardListIcon, label: "My Assignments" },
      ],
    },
  ],
  student: [
    {
      title: "Student Portal",
      items: [
        { to: Routes.STUDENT_DASHBOARD, Icon: GaugeIcon, label: "Dashboard" },
      ],
    },
    {
      title: "Academics",
      items: [
        { to: Routes.STUDENT_COURSES, Icon: BookOpenIcon, label: "My Courses" },
        { to: Routes.STUDENT_ASSIGNMENTS, Icon: ClipboardListIcon, label: "My Assignments" },
        { to: Routes.STUDENT_ACTIVITIES, Icon: ActivityIcon, label: "School Activities" },
        { to: Routes.STUDENT_BLOGS, Icon: NewspaperIcon, label: "School Blog" },
      ],
    },
  ]
};