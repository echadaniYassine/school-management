// src/components/layout/Sidebar.jsx

import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronsUpDown, LogOut, User as UserIcon, Home } from 'lucide-react';

// Import hooks and configs
import { useUserContext } from '../context/UserContext';
import { sidebarConfig } from '../config/sidebarConfig';
import { cn } from "@/lib/utils";

// Import UI components from shadcn/ui
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import * as Routes from '../router/index';

/**
 * Reusable User Profile navigation dropdown.
 */
const UserProfileNav = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const getInitials = (name = '') =>
    (name.match(/\b\w/g) || []).slice(0, 2).join('').toUpperCase() || 'U';

  const handleNavigate = () => {
    navigate(`/${user?.role}/profile`);
  };
  return (
    <Button
      variant="ghost"
      className="w-full justify-start p-2 h-auto text-left"
      onClick={handleNavigate}
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <Avatar className="h-9 w-9">
          <AvatarImage src={user?.avatar_url} alt={user?.name} />
          <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
        </Avatar>
        <div className="grid gap-0.5">
          <p className="truncate text-sm font-medium">
            {user?.name || 'Loading...'}
          </p>
          <p className="truncate text-xs leading-none text-muted-foreground pb-1">
            {user?.email || '...'}
          </p>
        </div>
      </div>
    </Button>
  );
};

/**
 * Renders the main navigation sections and links.
 */
const NavSections = ({ userRole, onLinkClick }) => {
  const location = useLocation();
  const sidebarSections = sidebarConfig[userRole] || [];

  return (
    <nav className="flex-1 overflow-y-auto px-4 py-4">
      {sidebarSections.map((section) => (
        <div key={section.title} className="space-y-2 mb-6">
          <h2 className="mb-2 px-2 text-base font-semibold tracking-tight text-muted-foreground">{section.title}</h2>
          {section.items.map((item) => {
            const isActive = location.pathname.startsWith(item.to);
            return (
              <Button key={item.label} asChild variant={isActive ? "secondary" : "ghost"} className="w-full justify-start text-base h-11" onClick={onLinkClick}>
                <Link to={item.to}><item.Icon className="mr-3 h-5 w-5" />{item.label}</Link>
              </Button>
            );
          })}
        </div>
      ))}
    </nav>
  );
};

/**
 * The main Sidebar component for DESKTOP view.
 * It is positioned as 'fixed' to remain on screen independent of scroll.
 */
export default function Sidebar({ userRole }) {
  return (
    <aside className="hidden lg:flex fixed top-0 left-0 z-40 h-full w-64 flex-col border-r bg-muted/40">
      <div className="flex h-16 items-center border-b px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
          <Home className="h-6 w-6" />
          <span>{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</span>
        </Link>
      </div>
      <NavSections userRole={userRole} />
      <div className="mt-auto border-t p-4">
        <UserProfileNav />
      </div>
    </aside>
  );
}

/**
 * A compound component for the MOBILE sidebar, using a Sheet.
 */
Sidebar.MobileSheet = function MobileSheet({ userRole, isOpen, onClose }) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="flex flex-col p-0 w-64" closeButtonPosition="top-4 right-4">
        <SheetHeader className="p-6 pb-2">
          <SheetTitle>
            <Link to="/" className="flex items-center gap-2 font-semibold text-lg" onClick={onClose}>
              <Home className="h-6 w-6" />
              <span>{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <NavSections userRole={userRole} onLinkClick={onClose} />
        <div className="mt-auto border-t p-4">
          <UserProfileNav />
        </div>
      </SheetContent>
    </Sheet>
  );
};