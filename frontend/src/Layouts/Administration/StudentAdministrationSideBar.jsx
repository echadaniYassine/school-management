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
import { STUDENT_ACTIVITIES, STUDENT_ASSIGNMENTS, STUDENT_BLOGS, STUDENT_CHATS, STUDENT_COURSES, STUDENT_DASHBOARD, STUDENT_LIBRARY, STUDENT_NOTIFICATIONS, STUDENT_PROFIL } from "../../router/index.jsx"
import { Link } from "react-router-dom"

export function StudentAdministrationSideBar({ className }) {
  return (
    <div className={cn("pb-12", className)}>
      <div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Student Administration
          </h2>
          <div className="space-y-1">
            <Link to={STUDENT_DASHBOARD} className="flex items-center text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
              <Button variant="secondary" className="w-full justify-start">
                <CirclePlay className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link to={STUDENT_PROFIL }>
              <Button variant="ghost" className="w-full justify-start">
                <Grid className="mr-2 h-4 w-4" />
                Profile
              </Button>
            </Link>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Content Management
          </h2>
          <div className="space-y-1">
            <Link to={STUDENT_CHATS }>
              <Button variant="ghost" className="w-full justify-start">
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat
              </Button>
            </Link>
            <Link to={STUDENT_COURSES}>
              <Button variant="ghost" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Courses
              </Button>
            </Link>
            <Link to={STUDENT_LIBRARY }>
              <Button variant="ghost" className="w-full justify-start">
                <BookOpen className="mr-2 h-4 w-4" />
                Library
              </Button>
            </Link>
            <Link to={STUDENT_ACTIVITIES }>
              <Button variant="ghost" className="w-full justify-start">
                <ActivitySquare className="mr-2 h-4 w-4" />
                Activities
              </Button>
            </Link>
            <Link to={ STUDENT_BLOGS}>
              <Button variant="ghost" className="w-full justify-start">
                <Newspaper className="mr-2 h-4 w-4" />
                Blog
              </Button>
            </Link>
            <Link to={ STUDENT_ASSIGNMENTS}>
              <Button variant="ghost" className="w-full justify-start">
                <ClipboardList className="mr-2 h-4 w-4" />
                Assignments
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
