import {
    User,
    BookOpen,
    GraduationCap,
    Calendar,
    FileText,
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

export default function DropDownMenuStudent() {
    const navigate = useNavigate();

    return (
        <DefaultDropDownMenu>
            <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => navigate('/student/courses')}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    My Courses
                    <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/student/assignments')}>
                    <FileText className="mr-2 h-4 w-4" />
                    Assignments
                    <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/student/grades')}>
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Grades & Progress
                    <DropdownMenuShortcut>⌘G</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/student/schedule')}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>

            </DropdownMenuGroup>


        </DefaultDropDownMenu>
    );
}
