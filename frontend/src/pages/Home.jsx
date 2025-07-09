// src/pages/Home.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, BarChart3, Users, MessageSquare, GraduationCap, ShieldCheck } from 'lucide-react';
import { USER_LOGIN } from '../router'; // Adjust path if needed

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <main>
        {/* Hero Section */}
        <section className="bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-6 py-20 md:py-32 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
              The Future of School Management is{' '}
              <span className="text-indigo-600 dark:text-indigo-400">Here</span>.
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
              A unified platform designed to connect students, teachers, and administrators for a seamless educational experience.
            </p>
            <div className="mt-10">
              <Link
                to={USER_LOGIN}
                className="inline-block bg-indigo-600 text-white font-bold rounded-lg px-8 py-3 text-lg hover:bg-indigo-700 transition-colors duration-300 shadow-lg"
              >
                Access Your Portal
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Why Choose Our Platform?</h2>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Everything you need, all in one place.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center p-6">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/50 mx-auto">
                  <BookOpen className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">Course Management</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Easily create, manage, and track courses, assignments, and materials.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/50 mx-auto">
                  <BarChart3 className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">Track Progress</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Real-time insights into student performance and attendance records.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/50 mx-auto">
                  <Users className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">Unified Communication</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Seamless chat and announcements connecting the entire school community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Role-Based Benefits Section */}
        <section className="bg-gray-50 dark:bg-gray-800 py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">A Platform for Everyone</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <GraduationCap className="h-10 w-10 text-indigo-500 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">For Students</h3>
                <p className="mt-3 text-gray-600 dark:text-gray-400">Access your courses, submit assignments, and stay connected with teachers and classmates from anywhere.</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <MessageSquare className="h-10 w-10 text-indigo-500 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">For Teachers</h3>
                <p className="mt-3 text-gray-600 dark:text-gray-400">Manage your classroom, grade assignments, and communicate with students and parents efficiently.</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <ShieldCheck className="h-10 w-10 text-indigo-500 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">For Administrators</h3>
                <p className="mt-3 text-gray-600 dark:text-gray-400">Oversee school operations, manage user roles, and gain valuable insights from school-wide data.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <blockquote className="text-center">
                    <p className="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200">
                        “This platform has revolutionized how we operate. Communication has never been easier, and our teachers have more time to focus on what truly matters: teaching.”
                    </p>
                    <footer className="mt-8">
                        <div className="font-bold text-gray-900 dark:text-white">Jane Doe</div>
                        <div className="text-gray-500 dark:text-gray-400">Principal, Springfield High</div>
                    </footer>
                </blockquote>
            </div>
        </section>

      </main>
    </div>
  );
}