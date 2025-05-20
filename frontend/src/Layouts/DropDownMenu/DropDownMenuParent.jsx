import {
  User,
  GraduationCap,
  Calendar,
  MessageSquare,
  Bell,
  Settings,
  HelpCircle,
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

export default function DropDownMenuParent() {
  const navigate = useNavigate();

  return (
    <DefaultDropDownMenu>
      <DropdownMenuGroup>
        <DropdownMenuItem onClick={() => navigate('/parent/child-profile')}>
          <User className="mr-2 h-4 w-4" />
          Child's Profile
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/parent/child-grades')}>
          <GraduationCap className="mr-2 h-4 w-4" />
          Child's Grades
          <DropdownMenuShortcut>⌘G</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/parent/child-attendance')}>
          <Calendar className="mr-2 h-4 w-4" />
          Attendance
          <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      
    </DefaultDropDownMenu>
  );
}
