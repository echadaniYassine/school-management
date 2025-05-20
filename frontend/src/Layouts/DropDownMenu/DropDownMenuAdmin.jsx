import {
  UserCog,
  Users,
  Settings,
  Shield,
  BarChart2,
  LogOut
} from 'lucide-react';
import {
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut
} from "@/components/ui/dropdown-menu";
import DefaultDropDownMenu from './DefaultDropDownMenu';
import { useNavigate } from "react-router-dom";

export default function DropDownMenuAdmin() {
  const navigate = useNavigate();

  return (
    <DefaultDropDownMenu>
      <DropdownMenuGroup>
        <DropdownMenuItem onClick={() => navigate("/admin/dashboard")}>
          <BarChart2 className="mr-2 h-4 w-4" />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/admin/users")}>
          <Users className="mr-2 h-4 w-4" />
          Manage Users
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/admin/roles")}>
          <Shield className="mr-2 h-4 w-4" />
          Roles & Permissions
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/admin/settings")}>
          <Settings className="mr-2 h-4 w-4" />
          System Settings
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DefaultDropDownMenu>
  );
}
