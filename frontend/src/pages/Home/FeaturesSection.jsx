import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, BarChart3, Users } from 'lucide-react';

export default function FeaturesSection() {
    const features = [
        { 
            icon: <BookOpen className="h-8 w-8 text-indigo-500" />, 
            title: "Course Management", 
            desc: "Easily manage courses, assignments, and materials in one centralized location." 
        },
        { 
            icon: <BarChart3 className="h-8 w-8 text-indigo-500" />, 
            title: "Track Progress", 
            desc: "Get real-time analytics on student performance and engagement." 
        },
        { 
            icon: <Users className="h-8 w-8 text-indigo-500" />, 
            title: "Unified Communication", 
            desc: "Built-in chat and announcements to keep everyone connected." 
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 opacity-40">
                <div className="absolute -top-1/2 left-0 w-full h-[500px] bg-gradient-to-r from-purple-600/30 to-transparent filter blur-3xl transform -rotate-12" />
                <div className="absolute -bottom-1/2 right-0 w-full h-[500px] bg-gradient-to-l from-pink-500/20 to-transparent filter blur-3xl transform rotate-12" />
            </div>
            <div className="container mx-auto px-6 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.7 }} 
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Why Choose Our Platform?</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Everything your institution needs, all in one place.</p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <motion.div 
                            key={index} 
                            initial={{ opacity: 0, y: 50 }} 
                            whileInView={{ opacity: 1, y: 0 }} 
                            viewport={{ once: true }} 
                            transition={{ duration: 0.5, delay: index * 0.15 }} 
                            whileHover={{ scale: 1.05, y: -8 }} 
                            className="text-center p-8 rounded-2xl shadow-lg dark:shadow-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300"
                        >
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 dark:bg-[#2a1a47] mx-auto mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}