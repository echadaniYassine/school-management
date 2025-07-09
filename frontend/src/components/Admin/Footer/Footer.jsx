// src/components/layout/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Linkedin, Send } from 'lucide-react';

// Data for the footer links - clean and easy to manage
const footerSections = [
  {
    title: 'Platform',
    links: [
      { name: 'How it works', href: '#' },
      { name: 'Pricing', href: '#' },
      { name: 'Use Cases', href: '#' },
      { name: 'Integrations', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About us', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Community', href: '#' },
      { name: 'Help Center', href: '#' },
      { name: 'Partners', href: '#' },
      { name: 'Status', href: '#' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { name: 'API', href: '#' },
      { name: 'Documentation', href: '#' },
      { name: 'Guides', href: '#' },
      { name: 'Tools', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    // --- Light/Dark Mode Base Colors ---
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        
        {/* --- Newsletter Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Subscribe to our newsletter</h2>
            <p className="mt-2">
              Get the latest updates, articles, and resources sent straight to your inbox. No spam, unsubscribe at any time.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full md:w-80 px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="flex items-center justify-center bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-semibold px-4 py-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
              >
                <span>Subscribe</span>
                <Send className="h-4 w-4 ml-2" />
              </button>
            </form>
          </div>
        </div>

        <hr className="my-10 border-gray-200 dark:border-gray-700" />

        {/* --- Main Links Section --- */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="col-span-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Your Company</h3>
            <p className="mt-4 text-sm max-w-xs">
              Empowering the next generation of creators and innovators.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-gray-800 dark:text-white">{section.title}</h4>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="my-10 border-gray-200 dark:border-gray-700" />

        {/* --- Bottom Bar --- */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Your Company, Inc. All rights reserved.</p>
          <div className="flex mt-4 sm:mt-0 space-x-6">
            <Link to="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms</Link>
            <Link to="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}