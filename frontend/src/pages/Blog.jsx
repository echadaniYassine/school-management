import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Moon, ArrowRight } from 'lucide-react';

// --- MOCK DATA ---
const mockBlogPosts = [
  { id: 1, title: 'Welcome Back! A Guide to the New School Year', excerpt: 'A warm welcome to all students! Here’s everything you need to know about the upcoming semester, new facilities, and key dates.', author: 'Principal Sarah Adams', date: 'August 15, 2025', imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aaa?q=80&w=2946&auto=format&fit=crop', category: 'School News', slug: '/blog/welcome-back-2025' },
  { id: 2, title: 'Our New Science Lab & STEM Initiatives', excerpt: 'We are thrilled to unveil our state-of-the-art science laboratory! Learn more about our expanded STEM program.', author: 'Mr. David Chen', date: 'August 10, 2025', imageUrl: 'https://images.unsplash.com/photo-1576014131541-0607313a7728?q=80&w=2800&auto=format&fit=crop', category: 'Academics', slug: '/blog/new-science-lab' },
  { id: 3, title: 'Tips for Effective Parent-Teacher Communication', excerpt: 'Building a strong partnership between home and school is key to student success. Here are some tips.', author: 'Ms. Emily Carter', date: 'August 5, 2025', imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2940&auto=format&fit=crop', category: 'Community', slug: '/blog/parent-teacher-communication' },
  { id: 4, title: 'Annual Sports Day: Highlights and Winners', excerpt: 'Relive the excitement of our annual Sports Day! A huge congratulations to all participants and champions.', author: 'Coach Mike Roberts', date: 'July 28, 2025', imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2835&auto=format&fit=crop', category: 'Events', slug: '/blog/sports-day-2025' },
];

const featuredPost = mockBlogPosts[0]; // Use the first post as the featured one
const regularPosts = mockBlogPosts.slice(1); // The rest are regular posts


const CategoryBadge = ({ category }) => (
    <span className="inline-block bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide">
        {category}
    </span>
);

const PostCard = ({ post, delay }) => (
    <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="bg-white dark:bg-gray-800/80 rounded-xl shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
    >
        <Link to={post.slug} className="block overflow-hidden">
            <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
        </Link>
        <div className="p-6 flex flex-col flex-grow">
            <div className="mb-4">
                <CategoryBadge category={post.category} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex-grow">
                <Link to={post.slug} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{post.title}</Link>
            </h2>
            <div className="mt-4 flex items-center">
                <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{post.author}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{post.date}</p>
                </div>
            </div>
        </div>
    </motion.article>
);


// --- MAIN BLOG PAGE COMPONENT ---
export default function Blog() {
    return (
        <div className="bg-gray-50 dark:bg-[#1a0f2e]">
            <main>
                {/* Page Header */}
                <section className="py-20 text-center relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1000px] max-h-[400px] bg-gradient-to-tr from-purple-500/20 to-pink-500/10 filter blur-3xl" />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="container mx-auto px-6 relative"
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">The School Journal</h1>
                        <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                            News, stories, and updates from our vibrant school community.
                        </p>
                    </motion.div>
                </section>

                {/* Featured Post */}
                <section className="pb-20">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative rounded-xl shadow-2xl overflow-hidden group"
                        >
                            <img src={featuredPost.imageUrl} alt={featuredPost.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
                            <div className="relative p-8 md:p-12 flex flex-col justify-end h-[500px] text-white">
                                <CategoryBadge category={featuredPost.category} />
                                <h2 className="text-3xl md:text-4xl font-bold mt-4">
                                    {featuredPost.title}
                                </h2>
                                <p className="mt-2 max-w-2xl text-gray-200">{featuredPost.excerpt}</p>
                                <Link to={featuredPost.slug} className="flex items-center gap-2 font-semibold mt-6 group/link">
                                    Read More <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
                
                {/* Blog Grid Section */}
                <section className="py-20 bg-white dark:bg-gray-900/50">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-white">Latest Posts</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {regularPosts.map((post, index) => (
                                <PostCard key={post.id} post={post} delay={index * 0.15} />
                            ))}
                        </div>
                        <div className="mt-16 text-center">
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-indigo-600 text-white font-bold rounded-full px-8 py-3 hover:bg-indigo-700 transition-colors shadow-lg"
                            >
                                Load More Posts
                            </motion.button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}