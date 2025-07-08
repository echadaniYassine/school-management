// src/pages/Blog.jsx

import React from 'react';
import { Link } from 'react-router-dom';

// Mock data for the blog posts. In a real application, you would fetch this
// from your API using useEffect and useState.
const mockBlogPosts = [
  {
    id: 1,
    title: 'Welcome Back! A Guide to the New School Year',
    excerpt: 'A warm welcome to all new and returning students! Here’s everything you need to know about the upcoming semester, new facilities, and key dates for your calendar.',
    author: 'Principal Sarah Adams',
    authorRole: 'Principal',
    date: 'August 15, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aaa?q=80&w=2946&auto=format&fit=crop',
    category: 'School News',
    slug: '/blog/welcome-back-2025',
  },
  {
    id: 2,
    title: 'Our New Science Lab & STEM Initiatives',
    excerpt: 'We are thrilled to unveil our state-of-the-art science laboratory! Learn more about our expanded STEM program and how it will empower the next generation of innovators.',
    author: 'Mr. David Chen',
    authorRole: 'Head of Science Dept.',
    date: 'August 10, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1576014131541-0607313a7728?q=80&w=2800&auto=format&fit=crop',
    category: 'Academics',
    slug: '/blog/new-science-lab',
  },
  {
    id: 3,
    title: 'Tips for Effective Parent-Teacher Communication',
    excerpt: 'Building a strong partnership between home and school is key to student success. Here are some tips for making the most of your parent-teacher interactions.',
    author: 'Ms. Emily Carter',
    authorRole: 'Guidance Counselor',
    date: 'August 5, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2940&auto=format&fit=crop',
    category: 'Community',
    slug: '/blog/parent-teacher-communication',
  },
  {
    id: 4,
    title: 'Annual Sports Day: Highlights and Winners',
    excerpt: 'Relive the excitement of our annual Sports Day! A huge congratulations to all participants and a look at the champions who made this year unforgettable.',
    author: 'Coach Mike Roberts',
    authorRole: 'Athletics Director',
    date: 'July 28, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2835&auto=format&fit=crop',
    category: 'Events',
    slug: '/blog/sports-day-2025',
  },
  // Add more mock posts as needed
];

// A small component for the category badge for cleaner code
const CategoryBadge = ({ category }) => (
  <span className="inline-block bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide">
    {category}
  </span>
);

export default function Blog() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <main>
        {/* Page Header */}
        <section className="bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-6 py-20 md:py-28 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
              The School Journal
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
              News, stories, and updates from our vibrant school community.
            </p>
          </div>
        </section>

        {/* Blog Grid Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {mockBlogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col group transition-transform duration-300 hover:-translate-y-2"
                >
                  <Link to={post.slug} className="block">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-56 object-cover"
                    />
                  </Link>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <CategoryBadge category={post.category} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      <Link to={post.slug}>{post.title}</Link>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="mt-6 flex items-center">
                      {/* You can add author avatars here if you have them */}
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{post.author}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{post.date}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            {/* Future Pagination */}
            <div className="mt-16 text-center">
                <button className="bg-indigo-600 text-white font-bold rounded-lg px-6 py-3 hover:bg-indigo-700 transition-colors duration-300">
                    Load More Posts
                </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}