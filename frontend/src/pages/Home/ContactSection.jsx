import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Building, Phone } from 'lucide-react';

export default function ContactSection() {
    return (
        <section id="contact" className="py-24 bg-gray-50 dark:bg-[#20123a]">
            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Ready to Transform Your School?</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Request a personalized demo and see how EduGate can help. Our team is here to answer your questions and get you started.
                    </p>
                    <div className="mt-8 space-y-4">
                        <p className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                            <Mail className="w-5 h-5 text-indigo-500" /> 
                            demo@edugate.com
                        </p>
                        <p className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                            <Phone className="w-5 h-5 text-indigo-500" /> 
                            +1 (555) 123-4567
                        </p>
                        <p className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                            <Building className="w-5 h-5 text-indigo-500" /> 
                            123 Education Lane, Knowledge City
                        </p>
                    </div>
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, y: 50 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.7 }} 
                    className="p-8 space-y-6 rounded-2xl shadow-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700"
                >
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        className="w-full p-4 bg-gray-100 dark:bg-[#2a1a47] text-gray-900 dark:text-white rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 dark:placeholder-gray-400" 
                    />
                    <input 
                        type="email" 
                        placeholder="Work Email" 
                        className="w-full p-4 bg-gray-100 dark:bg-[#2a1a47] text-gray-900 dark:text-white rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 dark:placeholder-gray-400" 
                    />
                    <textarea 
                        placeholder="Your Message (Optional)" 
                        rows="4" 
                        className="w-full p-4 bg-gray-100 dark:bg-[#2a1a47] text-gray-900 dark:text-white rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                    ></textarea>
                    <motion.button 
                        whileHover={{ scale: 1.03 }} 
                        whileTap={{ scale: 0.98 }} 
                        type="submit" 
                        className="w-full py-4 bg-indigo-600 text-white rounded-full text-lg font-bold hover:bg-indigo-700 shadow-md transition-colors"
                    >
                        Request a Demo
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}