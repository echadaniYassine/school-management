// src/components/layout/Sidebar

import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronsUpDown, LogOut, User as UserIcon } from 'lucide-react';

import { useUserContext } from '../context/UserContext';
import { sidebarConfig } from '../config/sidebarConfig'; // Adjust path
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import * as Routes from '../router/index';

// --- Sub-component for the user profile section ---
const UserProfileNav = () => {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(Routes.USER_LOGIN, { replace: true });
  };

  const getInitials = (name = '') => (name.match(/\b\w/g) || []).slice(0, 2).join('').toUpperCase() || 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-between p-2 h-auto text-left">
          <div className="flex items-center gap-2 overflow-hidden">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user?.avatar_url} alt={user?.name} />
              <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5">
              <p className="truncate text-sm font-medium leading-none">{user?.name || 'Loading...'}</p>
              <p className="truncate text-xs leading-none text-muted-foreground">{user?.email || '...'}</p>
            </div>
          </div>
          <ChevronsUpDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem onClick={() => navigate(`/${user?.role}/profile`)}>
          <UserIcon className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// --- The Main Sidebar Component ---
export default function Sidebar({ className, userRole }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const sidebarSections = sidebarConfig[userRole] || [];

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-full w-64 flex flex-col bg-muted/40 border-r",
        className
      )}
    >
      <div className="flex h-16 items-center border-b px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span>{userRole ? `${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Portal` : 'School Portal'}</span>
        </Link>
      </div>


      <nav className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-6">
          {sidebarSections.map((section) => (
            <div key={section.title}>
              <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                {section.title}
              </h2>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = currentPath.startsWith(item.to);
                  const IconComponent = item.Icon;

                  return (
                    <Button
                      key={item.label}
                      asChild
                      variant={isActive ? "secondary" : "ghost"}
                      className="w-full justify-start"
                    >
                      <Link to={item.to}>
                        {IconComponent && (
                          <IconComponent className="mr-2 h-5 w-5" />
                        )}
                        {item.label}
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>

      <div className="mt-auto border-t p-4">
        <UserProfileNav />
      </div>
    </aside>
  );
}