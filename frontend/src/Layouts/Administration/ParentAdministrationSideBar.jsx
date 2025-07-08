import { cn } from "@/lib/utils";
import {
  ActivityIcon, // For Chat
  BookOpenIcon, // For Child Assignments
  CalendarCheckIcon, // For Child Profile
  ClipboardListIcon,
  GaugeIcon, // For Profile
  MessageSquareIcon, // For Activities
  NewspaperIcon, // For Dashboard
  UserIcon, // For Blog
  UsersIcon, // For Child Profile
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../components/ui/button.js";
import {
  // PARENT_CHAT,
  PARENT_CHILD_ASSIGNMENTS,
  PARENT_CHILD_ATTENDANCE,
  PARENT_CHILD_PROFILE,
  // Assuming you will create these Parent-specific routes in your router/index.jsx
  PARENT_DASHBOARD,
  PARENT_PROFILE, // Or courses
  PARENT_VIEW_ACTIVITIES,
  PARENT_VIEW_BLOG,
  PARENT_VIEW_LIBRARY, // Or courses
} from "../../router/index.jsx"; // Make sure to define and export these routes

export function ParentAdministrationSideBar({ className }) {
  const location = useLocation();
  const currentPath = location.pathname;

  // **IMPORTANT**: Replace placeholder routes (e.g., PARENT_DASHBOARD)
  // with your actual defined route constants.
  const sidebarSections = [
    {
      title: "Parent Administration",
      items: [
        {
          to: PARENT_DASHBOARD, // Example: Replace with actual route
          icon: <GaugeIcon className="mr-2 h-5 w-5" />,
          label: "Dashboard",
        },
        {
          to: PARENT_PROFILE, // Example: Replace with actual route
          icon: <UserIcon className="mr-2 h-5 w-5" />,
          label: "Profile",
        },
      ],
    },
    {
      title: "Content & Communication",
      items: [
        {
          to: PARENT_VIEW_LIBRARY, // Example: Replace with actual route
          icon: <BookOpenIcon className="mr-2 h-5 w-5" />,
          label: "Library",
        },
        {
          to: PARENT_VIEW_ACTIVITIES, // Example: Replace with actual route
          icon: <ActivityIcon className="mr-2 h-5 w-5" />,
          label: "Activities",
        },
        {
          to: PARENT_VIEW_BLOG, // Example: Replace with actual route
          icon: <NewspaperIcon className="mr-2 h-5 w-5" />,
          label: "Blog",
        },
        // {
        //   to: PARENT_CHAT, // Example: Replace with actual route
        //   icon: <MessageSquareIcon className="mr-2 h-5 w-5" />,
        //   label: "Chat",
        // },
      ],
    },
    {
      title: "Child Management",
      items: [
        {
          to: PARENT_CHILD_PROFILE, // Example: Replace with actual route
          icon: <UsersIcon className="mr-2 h-5 w-5" />,
          label: "Child Profile",
        },
        {
          to: PARENT_CHILD_ASSIGNMENTS, // Example: Replace with actual route
          icon: <ClipboardListIcon className="mr-2 h-5 w-5" />,
          label: "Child Assignments",
        },
        {
          to: PARENT_CHILD_ATTENDANCE, // Example: Replace with actual route
          icon: <CalendarCheckIcon className="mr-2 h-5 w-5" />,
          label: "Attendance",
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
                // Ensure item.to is defined before rendering Link
                if (!item.to) {
                  console.warn(`Sidebar item "${item.label}" is missing a 'to' route.`);
                  return (
                     <Button
                        variant={"ghost"}
                        className="w-full justify-start text-muted-foreground"
                        aria-label={item.label + " (Route not configured)"}
                        disabled
                      >
                        {item.icon}
                        {item.label}
                      </Button>
                  );
                }
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