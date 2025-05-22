import React from "react";
import { Link } from "react-router-dom";
// import { Home, Newspaper, Info, LogIn } from 'lucide-react';
import { ModeToggle } from "../components/mode-toggle";

export default function Header() {
  return (

    <header className="bg-white shadow-md dark:bg-gray-800 dark:border-gray-700">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="#" className="flex items-center">
          <img
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="h-8 w-auto"
            alt="Logo"
          />
          <span className="ml-2 font-bold text-xl text-indigo-600 dark:text-indigo-400">
            School-management
          </span>
        </Link>
        <div className="hidden md:flex space-x-6 items-center">
          <Link to='/' className="flex items-center text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
            {/* <Home className="mr-2 h-5 w-5" /> */}
            Home
          </Link>
          <Link to='/' className="flex items-center text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
            {/* <Info className="mr-2 h-5 w-5" /> */}
            About
          </Link>
          <Link to='/' className="flex items-center text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
            {/* <Newspaper className="mr-2 h-5 w-5" /> */}
            Blog
          </Link>
          <Link to="/login" className="flex items-center text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
            {/* <LogIn className="mr-2 h-5 w-5" /> */}
            Login
          </Link>

          <ModeToggle />

        </div>
      </nav>
    </header>
  );
}
