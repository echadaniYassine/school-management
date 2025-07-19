import React from 'react';
import { motion } from 'framer-motion';

// Reusable Animated UI Element (Improved)
const AnimatedUiElement = ({ className, delay, floatDuration }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -12, 0], // Floating effect
        }}
        transition={{
            opacity: { delay, duration: 0.7, ease: 'easeOut' },
            scale: { delay, duration: 0.7, ease: 'easeOut' },
            y: { // Transition for the floating animation
                duration: floatDuration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
            }
        }}
        className={`absolute bg-white/5 dark:bg-gray-800/20 backdrop-blur-sm border border-white/10 dark:border-gray-700/50 rounded-lg shadow-xl ${className}`}
    />
);

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center px-6 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 filter blur-3xl" />
                <AnimatedUiElement className="w-1/3 h-1/4 top-[15%] left-[10%]" delay={0.1} floatDuration={5} />
                <AnimatedUiElement className="w-1/4 h-1/3 top-[50%] left-[25%]" delay={0.3} floatDuration={8} />
                <AnimatedUiElement className="w-1/5 h-1/5 top-[20%] right-[15%]" delay={0.2} floatDuration={2} />
                <AnimatedUiElement className="w-1/2 h-1/4 bottom-[15%] right-[10%]" delay={0.4} floatDuration={6} />
            </div>
            
            {/* Foreground Content */}
            <div className="relative z-10 container mx-auto">
                <div className="max-w-2xl">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }} // Fixed: Start hidden
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.8, delay: 0.5 }} 
                        className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white"
                    >
                        The Future of School Management is <span className="bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500 bg-clip-text text-transparent">Here</span>.
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }} // Fixed: Start hidden
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.8, delay: 0.7 }} 
                        className="mt-6 text-lg text-gray-600 dark:text-gray-300"
                    >
                        A unified platform connecting students, teachers, and admins for a seamless education journey.
                    </motion.p>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} // Fixed: Start hidden
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.8, delay: 0.9 }} 
                        className="mt-10"
                    >
                        <motion.a 
                            href="#contact" 
                            whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(99, 102, 241, 0.5)" }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-block bg-indigo-600 text-white font-bold rounded-full px-10 py-4 text-lg shadow-lg hover:bg-indigo-700 transition-colors"
                        >
                            Get Started Now
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}