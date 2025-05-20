import {
  BookOpen,
  User,
  FileText,
  MessageSquare,
  Calendar,
  Settings,
  LogOut,
} from 'lucide-react';
import {
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import DefaultDropDownMenu from './DefaultDropDownMenu';
import { useNavigate } from 'react-router-dom';

export default function DropDownMenuTeacher() {
  const navigate = useNavigate();

  return (
    <DefaultDropDownMenu>
      <DropdownMenuGroup>
        <DropdownMenuItem onClick={() => navigate('/teacher/courses')}>
          <BookOpen className="mr-2 h-4 w-4" />
          My Courses
          <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/teacher/assignments')}>
          <FileText className="mr-2 h-4 w-4" />
          Assignments
          <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/teacher/schedule')}>
          <Calendar className="mr-2 h-4 w-4" />
          Schedule
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      
    </DefaultDropDownMenu>
  );
}
