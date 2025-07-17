import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    // Main wrapper with branded background and flex centering
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white dark:bg-[#1a0f2e] text-center px-4">
      
      {/* Background decorative shape */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-[90vw] h-[90vw] max-w-[1000px] max-h-[1000px] bg-gradient-to-tr from-purple-600/40 to-pink-600/30 rounded-full filter blur-3xl opacity-50 dark:opacity-60 animate-pulse" />
      </div>

      {/* Content Container */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2, // This will make the children animate in sequence
            },
          },
        }}
        className="relative z-10"
      >
        {/* Animated "404" with Gradient */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: -50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-8xl md:text-9xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          404
        </motion.h1>
        
        {/* Animated Message */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
          className="mt-4 text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-200"
        >
          Oops! Page Not Found.
        </motion.p>
        <motion.p
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-2 text-gray-500 dark:text-gray-400 max-w-sm mx-auto"
        >
          It seems the page you are looking for has been moved or never existed.
        </motion.p>

        {/* Animated "Go Home" Button */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-3 font-bold text-white shadow-lg transition-colors hover:bg-indigo-700"
            >
              <Home size={20} />
              <span>Go Back Home</span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}