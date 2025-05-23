import { cn } from "@/lib/utils"
import { Button } from "../../components/ui/button.js"
import { ADMIN_ACTIVITIES, ADMIN_ASSIGNMENTS, ADMIN_BLOGS, ADMIN_COURSES, ADMIN_DASHBOARD, ADMIN_MANAGE_PARENTS, ADMIN_MANAGE_STUDENTS, ADMIN_NOTIFICATION, ADMIN_PROFIL, ADMIN_SYSTEM_SETTING } from "../../router/index.jsx"
import { Link } from "react-router-dom"
import {
  GaugeIcon,
  UserIcon,
  BellIcon,
  MessageSquareIcon,
  BookOpenIcon,
  ActivityIcon,
  FileTextIcon,
  ClipboardListIcon,
  UsersIcon,
  SettingsIcon,
  BarChart2Icon,
} from "lucide-react"

export function AdminAdministrationSideBar({ className }) {
  return (
    <div className={cn("pb-12", className)}>
      <div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Admin Administration
          </h2>
          <div className="space-y-1">
            <Link to={ADMIN_DASHBOARD} className="flex items-center text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
              <Button variant="secondary" className="w-full justify-start">
                <GaugeIcon className="mr-2 h-5 w-5" />
                Dashboard
              </Button>
            </Link>
            <Link to={ADMIN_PROFIL}>
              <Button variant="ghost" className="w-full justify-start">
                <UserIcon className="mr-2 h-5 w-5" />
                Profil
              </Button>
            </Link>
          </div>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Content Management
          </h2>
          <div className="space-y-1">
            <Link to={ADMIN_NOTIFICATION}>
              <Button variant="ghost" className="w-full justify-start">
                <BellIcon className="mr-2 h-5 w-5" />
                Notification
              </Button>
            </Link>

            <Link to={ADMIN_COURSES}>
              <Button variant="ghost" className="w-full justify-start">
                <BookOpenIcon className="mr-2 h-5 w-5" />
                Courses
              </Button>
            </Link>

            <Link to={ADMIN_ACTIVITIES}>
              <Button variant="ghost" className="w-full justify-start">
                <ActivityIcon className="mr-2 h-5 w-5" />
                Activities
              </Button>
            </Link>

            <Link to={ADMIN_BLOGS}>
              <Button variant="ghost" className="w-full justify-start">
                <FileTextIcon className="mr-2 h-5 w-5" />
                Blog
              </Button>
            </Link>

            <Link to={ADMIN_ASSIGNMENTS}>
              <Button variant="ghost" className="w-full justify-start">
                <ClipboardListIcon className="mr-2 h-5 w-5" />
                Assignments Students
              </Button>
            </Link>
          </div>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            User & Settings
          </h2>
          <div className="space-y-1">
            <Link to={ADMIN_MANAGE_STUDENTS}>
              <Button variant="ghost" className="w-full justify-start">
                <UsersIcon className="mr-2 h-5 w-5" />
                Manage Users
              </Button>
            </Link>
            <Link to={ADMIN_MANAGE_PARENTS}>
              <Button variant="ghost" className="w-full justify-start">
                <UsersIcon className="mr-2 h-5 w-5" />
                Manage Parents
              </Button>
            </Link>

            {/* <Link to={''}>
              <Button variant="ghost" className="w-full justify-start">
                <MessageSquareIcon className="mr-2 h-5 w-5" />
                Chat manage
              </Button>
            </Link> */}

            <Link to={ADMIN_SYSTEM_SETTING}>
              <Button variant="ghost" className="w-full justify-start">
                <SettingsIcon className="mr-2 h-5 w-5" />
                System Settings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
