import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Newspaper, Info, LogIn } from 'lucide-react';
import { ModeToggle } from "@/theme/mode-toggle";

// --- Reusable NavLink Components ---
const MobileNavLink = ({ to, children, onClick }) => (
    <NavLink 
        to={to} 
        onClick={onClick}
        className="flex items-center p-4 text-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-md"
    >
        {children}
    </NavLink>
);

const DesktopNavLink = ({ to, children }) => (
    <NavLink 
        to={to}
        className={({ isActive }) => 
            `flex items-center px-3 py-3 rounded-full text-base font-medium transition-colors ${
                isActive 
                ? 'text-gray-900 dark:text-white' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`
        }
    >
        {children}
    </NavLink>
);

// --- Main Header Component ---
export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // --- DYNAMIC CLASSES ---
    // Controls the header's shape, background, and max-width
    const headerClasses = `
        mx-auto transition-all duration-500 ease-in-out
        ${isScrolled 
            ? 'max-w-4xl rounded-full shadow-lg bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg animated-border' 
            : 'max-w-7xl rounded-none'
        }
    `;

    // Controls the header's height via padding
    const navClasses = `
        px-4 sm:px-6 lg:px-4 flex justify-between items-center transition-all duration-500 ease-in-out
        ${isScrolled ? 'py-2' : 'py-5'}
    `;

    return (
        <>
            {/* The fixed container that holds and positions the header */}
            <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled ? 'top-4' : 'top-0'}`}>
                <header className={headerClasses}>
                    <nav className={navClasses}>
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 flex-shrink-0" onClick={() => setIsMenuOpen(false)}>
                            <img
                                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                                className="h-7 w-auto"
                                alt="EduGate Logo"
                            />
                            <AnimatePresence>
                                {!isScrolled && (
                                    <motion.span 
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: 'auto' }}
                                        exit={{ opacity: 0, width: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="font-bold text-lg text-indigo-600 dark:text-indigo-400 overflow-hidden whitespace-nowrap"
                                    >
                                        EduGate
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-2 items-center">
                            <DesktopNavLink to='/'>Home</DesktopNavLink>
                            <DesktopNavLink to='/about'>About</DesktopNavLink>
                            <DesktopNavLink to='/blog'>Blog</DesktopNavLink>
                        </div>

                        {/* Right side actions */}
                        <div className="flex items-center gap-2">
                             <div className="hidden md:block">
                                <DesktopNavLink to="/login"><LogIn className="mr-1.5 h-4 w-4" />Login</DesktopNavLink>
                            </div>
                            <ModeToggle />
                            <div className="md:hidden">
                                <button
                                    onClick={toggleMenu}
                                    className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                                    aria-label="Toggle menu"
                                >
                                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                                </button>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>

            {/* Mobile Menu (No changes made here) */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/30 z-40 md:hidden"
                            onClick={toggleMenu}
                        />
                        <motion.div
                            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-800 shadow-lg z-50 md:hidden p-6 flex flex-col"
                        >
                            <nav className="flex flex-col space-y-4">
                                <MobileNavLink to='/' onClick={toggleMenu}><Home className="mr-3 h-5 w-5" /> Home</MobileNavLink>
                                <MobileNavLink to='/about' onClick={toggleMenu}><Info className="mr-3 h-5 w-5" /> About</MobileNavLink>
                                <MobileNavLink to='/blog' onClick={toggleMenu}><Newspaper className="mr-3 h-5 w-5" /> Blog</MobileNavLink>
                                <hr className="border-gray-200 dark:border-gray-700 my-4"/>
                                <MobileNavLink to="/login" onClick={toggleMenu}><LogIn className="mr-3 h-5 w-5" /> Login</MobileNavLink>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}