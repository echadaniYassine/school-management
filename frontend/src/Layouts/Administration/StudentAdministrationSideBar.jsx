import { cn } from "@/lib/utils";
import {
  ActivityIcon, // For Chat
  BookOpenIcon, // For Blog
  ClipboardListIcon,
  GaugeIcon, // For Profile
  MessageSquareIcon, // For Activities
  NewspaperIcon, // For Dashboard
  UserIcon, // For Profile
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../components/ui/button.js";
import {
  STUDENT_ACTIVITIES,
  STUDENT_ASSIGNMENTS,
  STUDENT_BLOGS,
  // STUDENT_CHATS,
  STUDENT_COURSES,
  STUDENT_DASHBOARD,
  // STUDENT_LIBRARY, // Assuming STUDENT_COURSES is the library for students
  // STUDENT_NOTIFICATIONS, // No corresponding UI element in the original code
  STUDENT_PROFILE,
} from "../../router/index.jsx";

export function StudentAdministrationSideBar({ className }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const sidebarSections = [
    {
      title: "Student Administration",
      items: [
        {
          to: STUDENT_DASHBOARD,
          icon: <GaugeIcon className="mr-2 h-5 w-5" />,
          label: "Dashboard",
        },
        {
          to: STUDENT_PROFILE,
          icon: <UserIcon className="mr-2 h-5 w-5" />,
          label: "Profile",
        },
      ],
    },
    {
      title: "Content & Activities",
      items: [
        {
          to: STUDENT_COURSES, // Assuming this is the "Library"
          icon: <BookOpenIcon className="mr-2 h-5 w-5" />,
          label: "Courses",
        },
        {
          to: STUDENT_ACTIVITIES,
          icon: <ActivityIcon className="mr-2 h-5 w-5" />,
          label: "Activities",
        },
        {
          to: STUDENT_BLOGS,
          icon: <NewspaperIcon className="mr-2 h-5 w-5" />,
          label: "Blog",
        },
        {
          to: STUDENT_ASSIGNMENTS,
          icon: <ClipboardListIcon className="mr-2 h-5 w-5" />,
          label: "Assignments",
        },
        // {
        //   to: STUDENT_CHATS,
        //   icon: <MessageSquareIcon className="mr-2 h-5 w-5" />,
        //   label: "Chat",
        // },
        // Add Notifications if you have a route and UI for it
        // {
        //   to: STUDENT_NOTIFICATIONS,
        //   icon: <BellIcon className="mr-2 h-5 w-5" />,
        //   label: "Notifications",
        // },
      ],
    },
  ];

  return (
    <div className={cn("pb-12", className)}>
      <div>
        {sidebarSections.map((section) => (
          <div className="px-3 py-2" key={section.title}>
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              {section.title}
            </h2>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = currentPath === item.to;
                return (
                  <Link to={item.to} key={item.to} aria-label={item.label}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.icon}
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}