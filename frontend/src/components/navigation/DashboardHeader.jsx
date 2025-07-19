// src/components/layout/DashboardHeader.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from "@/theme/mode-toggle";
import NotificationBell from '../Notification/NotificationBell';
import ChatPanel from '../Chat/ChatPanel';

/**
 * A dynamic header for the dashboard that transforms on scroll.
 * It is positioned as 'fixed' to work with the fixed sidebar layout.
 */
export default function DashboardHeader({ title, onLogout, onMenuToggle }) {
  const [isScrolled, setIsScrolled] = useState(false);

  // This effect detects page scroll to trigger animations.
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Dynamic Classes for Smooth Transitions ---

  const headerContainerClasses = `
  fixed right-0 z-30 transition-all duration-500 ease-in-out
  left-0 lg:left-64
  ${isScrolled ? 'top-5' : 'top-0'}
`;

  const headerElementClasses = `
  mx-auto transition-all duration-500 ease-in-out
  ${isScrolled
      ? 'max-w-4xl rounded-full shadow-lg bg-card/60 backdrop-blur-lg animated-border border'
      : 'max-w-full rounded-none border-t border-border bg-white/80 dark:bg-background/50 backdrop-blur-md py-4'
    }
`;

  const navClasses = `
  w-[95%] mx-auto flex items-center justify-between transition-all duration-300
  ${isScrolled ? 'h-16 px-4' : 'h-10 px-6'}
`;


  return (
    <div className={headerContainerClasses}>
      <header className={headerElementClasses}>
        <nav className={navClasses}>
          {/* Left Section: Mobile Menu Toggle and Desktop Title/Logo */}
          <div className="flex items-center gap-4">
            <div className="lg:hidden">
              <Button variant="outline" size="icon" onClick={onMenuToggle} aria-label="Toggle Navigation Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
            <div className="hidden lg:flex">
              <motion.div
                key={isScrolled ? 'logo' : 'title'}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {isScrolled ? (
                  <Link to="/" className="flex items-center">
                    <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" className="h-7 w-auto" alt="Logo" />
                  </Link>
                ) : (
                  <h1 className="text-lg font-semibold text-foreground">{title}</h1>
                )}
              </motion.div>
            </div>
          </div>

          {/* Right Section: Actions */}
          <div className="flex items-center gap-2">
            <ChatPanel />
            <NotificationBell />
            <ModeToggle />
            <Button variant="ghost" size="icon" onClick={onLogout} aria-label="Logout">
              <LogOut className="h-5 w-5 text-destructive" />
            </Button>
          </div>
        </nav>
      </header>
    </div>
  );
}