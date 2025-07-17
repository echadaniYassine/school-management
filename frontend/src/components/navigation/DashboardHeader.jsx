// src/Layouts/DashboardHeader.jsx

import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ModeToggle } from "@/theme/mode-toggle";
import NotificationBell from '../Notification/NotificationBell';

// --- IMPORT THE NEW CHAT COMPONENT ---
import ChatPanel from '../Chat/ChatPanel';

export default function DashboardHeader({
  logoLink = '/',
  title = 'Dashboard',
  onLogout,
}) {
  return (
    <header className="bg-white shadow-md dark:bg-gray-800 dark:border-gray-700">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to={logoLink} className="flex items-center">
          <img
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="h-8 w-auto"
            alt="Logo"
          />
          <span className="ml-2 font-bold text-xl text-indigo-600 dark:text-indigo-400">
            {title}
          </span>
        </Link>

        <div className="hidden md:flex space-x-2 md:space-x-4 items-center">
          {/* --- REPLACE THE OLD BUTTON WITH THE NEW COMPONENT --- */}
          <ChatPanel />

          <NotificationBell />

          <ModeToggle />

          <Button variant="ghost" size="icon" onClick={onLogout}>
            <LogOut className="h-5 w-5 text-destructive" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </nav>
    </header>
  );
}