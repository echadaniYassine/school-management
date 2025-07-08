import { cn } from "@/lib/utils";
import {
  ActivityIcon,
  BookOpenIcon,
  ClipboardListIcon,
  FileTextIcon,
  GaugeIcon,
  SettingsIcon,
  UserIcon,
  UsersIcon
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../components/ui/button.js";
import {
  ADMIN_ACTIVITIES,
  ADMIN_ASSIGNMENTS,
  ADMIN_BLOGS,
  ADMIN_COURSES,
  ADMIN_DASHBOARD,
  ADMIN_MANAGE_PARENTS,
  ADMIN_MANAGE_STUDENTS,
  ADMIN_MANAGE_TEACHERS,
  ADMIN_PROFILE,
  // ADMIN_SYSTEM_SETTING
} from "../../router/index.jsx";

// NO LONGER DEFINED HERE AT THE TOP LEVEL

export function AdminAdministrationSideBar({ className }) {
  const location = useLocation();
  const currentPath = location.pathname;

  // DEFINE sidebarSections INSIDE THE COMPONENT
  const sidebarSections = [
    {
      title: "Admin Administration",
      items: [
        {
          to: ADMIN_DASHBOARD, // Now it's guaranteed ADMIN_DASHBOARD is initialized
          icon: <GaugeIcon className="mr-2 h-5 w-5" />,
          label: "Dashboard",
        },
        {
          to: ADMIN_PROFILE,
          icon: <UserIcon className="mr-2 h-5 w-5" />,
          label: "Profil",
        },
      ],
    },
    {
      title: "Content Management",
      items: [
        {
          to: ADMIN_COURSES,
          icon: <BookOpenIcon className="mr-2 h-5 w-5" />,
          label: "Library",
        },
        {
          to: ADMIN_ACTIVITIES,
          icon: <ActivityIcon className="mr-2 h-5 w-5" />,
          label: "Activities",
        },
        {
          to: ADMIN_BLOGS,
          icon: <FileTextIcon className="mr-2 h-5 w-5" />,
          label: "Blog",
        },
        {
          to: ADMIN_ASSIGNMENTS,
          icon: <ClipboardListIcon className="mr-2 h-5 w-5" />,
          label: "Assignments Students",
        },
      ],
    },
    {
      title: "User & Settings",
      items: [
        {
          to: ADMIN_MANAGE_STUDENTS,
          icon: <UsersIcon className="mr-2 h-5 w-5" />,
          label: "Manage Users",
        },
        {
          to: ADMIN_MANAGE_PARENTS,
          icon: <UsersIcon className="mr-2 h-5 w-5" />,
          label: "Manage Parents",
        },
        {
          to: ADMIN_MANAGE_TEACHERS,
          icon: <UsersIcon className="mr-2 h-5 w-5" />,
          label: "Manage Teachers",
        },
        
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