import React from 'react';
import { motion } from 'framer-motion';

export default function FinalCtaSection() {
    return (
        <section className="py-20 md:py-32 text-center overflow-hidden relative">
            <div className="absolute inset-0 w-full h-full bg-indigo-600 dark:bg-[#1a0f2e] transform-gpu" style={{ clipPath: 'polygon(0 0, 100% 25%, 100% 100%, 0 75%)' }}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-70 mix-blend-multiply dark:mix-blend-lighten" style={{ clipPath: 'polygon(0 0, 100% 25%, 100% 100%, 0 75%)' }}></div>
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.7, ease: 'easeOut' }} 
                className="relative z-10 px-6 text-white"
            >
                <h2 className="text-4xl md:text-5xl font-extrabold">Elevate Your Education Experience</h2>
                <p className="text-lg my-6 max-w-xl mx-auto">Join thousands of educators already transforming their teaching experience.</p>
                <motion.a 
                    href="#contact" 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 300 }} 
                    className="inline-block bg-white/20 backdrop-blur-sm border border-white/50 text-white font-bold rounded-full px-10 py-4 text-lg shadow-lg hover:bg-white hover:text-indigo-600 transition-all duration-300"
                >
                    Contact Us Today!
                </motion.a>
            </motion.div>
        </section>
    );
}