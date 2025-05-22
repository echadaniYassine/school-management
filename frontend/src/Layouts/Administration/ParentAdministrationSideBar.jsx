import { cn } from "@/lib/utils"
import {
  ActivitySquare,
  Bell,
  BookOpen,
  CirclePlay,
  ClipboardList,
  Grid,
  MessageCircle,
  Newspaper,
  User
} from "lucide-react"
import { Button } from "../../components/ui/button.js"
import { TEACHER_DASHBOARD } from "../../router/index.jsx"
import { Link } from "react-router-dom"

export function ParentAdministrationSideBar({ className }) {
  return (
    <div className={cn("pb-12", className)}>
      <div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Parent Administration
          </h2>
          <div className="space-y-1">
            <Link to={TEACHER_DASHBOARD} className="flex items-center text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
              <Button variant="secondary" className="w-full justify-start">
                <CirclePlay className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start">
              <Grid className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Content Management
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <Bell className="mr-2 h-4 w-4" />
              Notification
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <MessageCircle className="mr-2 h-4 w-4" />
              Chat
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Courses
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <BookOpen className="mr-2 h-4 w-4" />
              Library
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <ActivitySquare className="mr-2 h-4 w-4" />
              Activities
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Newspaper className="mr-2 h-4 w-4" />
              Blog
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Child Manage
          </h2>
          <Button variant="ghost" className="w-full justify-start">
            <ClipboardList className="mr-2 h-4 w-4" />
            Child Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <ClipboardList className="mr-2 h-4 w-4" />
            Child Assignment
          </Button> <Button variant="ghost" className="w-full justify-start">
            <ClipboardList className="mr-2 h-4 w-4" />
            Attendance
          </Button>
        </div>
      </div>
    </div>
  )
}
