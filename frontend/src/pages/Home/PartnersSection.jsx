import React from 'react';
import { motion } from 'framer-motion';

export default function PartnersSection() {
    const partners = ["Google", "Coursera", "edX", "Microsoft", "Slack", "Notion", "Figma"];

    return (
        <section className="py-20 bg-gray-50 dark:bg-[#20123a]">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-2xl font-bold mb-10 text-gray-600 dark:text-gray-400">
                    Trusted By Leading Educational Partners
                </h2>
                <div className="relative overflow-hidden py-4">
                    <motion.div 
                        className="flex gap-16" 
                        animate={{ x: ['0%', '-50%'] }} 
                        transition={{ ease: 'linear', duration: 20, repeat: Infinity }}
                    >
                        {[...partners, ...partners].map((partner, i) => (
                            <span key={i} className="text-3xl font-semibold text-gray-500 dark:text-gray-400 flex-shrink-0">
                                {partner}
                            </span>
                        ))}
                    </motion.div>
                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-50 dark:from-[#20123a] to-transparent"></div>
                    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50 dark:from-[#20123a] to-transparent"></div>
                </div>
            </div>
        </section>
    );
}