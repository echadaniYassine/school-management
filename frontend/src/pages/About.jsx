// src/pages/About.jsx

import React from 'react';
import { Link } from 'react-router-dom';
// --- FIX IS HERE: Changed 'UniversalAccess' to 'Accessibility' ---
import { Lightbulb, Users, ShieldCheck, Accessibility } from 'lucide-react';

export default function About() {
  const teamMembers = [
    {
      name: 'Dr. Evelyn Reed',
      role: 'Founder & Lead Educator',
      bio: 'With 20 years in education, Evelyn founded this platform to bridge the technology gap in modern classrooms.',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2788&auto=format&fit=crop',
    },
    {
      name: 'Marcus Chen',
      role: 'Chief Technology Officer',
      bio: 'A software architect passionate about building scalable and secure systems that empower users.',
      imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2787&auto=format&fit=crop',
    },
    {
      name: 'Aisha Khan',
      role: 'Head of User Experience',
      bio: 'Aisha ensures our platform is intuitive, accessible, and genuinely delightful for every user.',
      imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <main>
        {/* Page Header */}
        <section className="bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-6 py-20 md:py-28 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
              Our Mission to Reshape Education
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
              We believe in the power of technology to create a more connected, efficient, and inspiring learning environment for all.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Born from a collaboration between veteran educators and innovative technologists, our platform was created to solve the real-world challenges faced by schools every day. We saw fragmented systems, communication gaps, and administrative burdens that took time away from what's most important: teaching and learning.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Our goal was simple yet ambitious: to build a single, intuitive platform that brings every aspect of school life together. From lesson planning and assignment tracking to parent-teacher communication and administrative oversight, we are dedicated to streamlining processes and fostering a thriving educational community.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2940&auto=format&fit=crop"
                alt="Team collaborating"
                className="rounded-lg shadow-2xl w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="bg-gray-50 dark:bg-gray-800 py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Our Core Values</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md text-center">
                <Lightbulb className="h-10 w-10 text-indigo-500 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Innovation</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Constantly evolving to meet the future needs of education.</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md text-center">
                <Users className="h-10 w-10 text-indigo-500 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Collaboration</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Building tools that connect every member of the community.</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md text-center">
                <ShieldCheck className="h-10 w-10 text-indigo-500 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Integrity</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Ensuring data is secure, private, and handled responsibly.</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md text-center">
                {/* --- FIX IS HERE: Changed component name to 'Accessibility' --- */}
                <Accessibility className="h-10 w-10 text-indigo-500 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Accessibility</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Creating a platform that is easy to use for everyone, everywhere.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Meet the Leadership Team</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {teamMembers.map((member) => (
                <div key={member.name} className="text-center">
                  <img
                    className="w-32 h-32 rounded-full mx-auto object-cover object-center shadow-lg"
                    src={member.imageUrl}
                    alt={member.name}
                  />
                  <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium">{member.role}</p>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-xs mx-auto">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="bg-indigo-700">
          <div className="container mx-auto px-6 py-16 text-center">
            <h2 className="text-3xl font-bold text-white">Join Us on Our Journey</h2>
            <p className="mt-4 text-indigo-200 max-w-2xl mx-auto">
              Help us build the future of education. If you're passionate about making a difference, we'd love to hear from you.
            </p>
            <div className="mt-8">
              <Link
                to="/contact" // Assuming you have a contact page
                className="inline-block bg-white text-indigo-700 font-bold rounded-lg px-8 py-3 text-lg hover:bg-gray-100 transition-colors duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}