import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Building, Phone } from 'lucide-react';

export default function ContactSection() {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, you would handle form submission here,
        // e.g., send data to an API endpoint.
        alert("Demo request submitted! (This is a placeholder)");
    };

    return (
        <section id="contact" className="py-24 bg-gray-100 dark:bg-[#20123a]">
            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Ready to Transform Your School?</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Request a personalized demo and see how our platform can help. Our team is here to answer your questions and get you started.
                    </p>
                    <ul className="mt-8 space-y-4">
                        <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                            <Mail className="w-5 h-5 text-indigo-500" /> 
                            <a href="mailto:demo@edugate.com" className="hover:text-indigo-500">demo@edugate.com</a>
                        </li>
                        <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                            <Phone className="w-5 h-5 text-indigo-500" /> 
                            +1 (555) 123-4567
                        </li>
                        <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                            <Building className="w-5 h-5 text-indigo-500" /> 
                            123 Education Lane, Knowledge City
                        </li>
                    </ul>
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, y: 50 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.7 }} 
                    className="p-8 rounded-2xl shadow-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="fullName" className="sr-only">Full Name</label>
                            <input 
                                type="text" 
                                id="fullName"
                                name="fullName"
                                required
                                placeholder="Full Name" 
                                className="w-full p-4 bg-gray-100 dark:bg-[#2a1a47] text-gray-900 dark:text-white rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 dark:placeholder-gray-400" 
                            />
                        </div>
                        <div>
                            <label htmlFor="workEmail" className="sr-only">Work Email</label>
                            <input 
                                type="email" 
                                id="workEmail"
                                name="workEmail"
                                required
                                placeholder="Work Email" 
                                className="w-full p-4 bg-gray-100 dark:bg-[#2a1a47] text-gray-900 dark:text-white rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 dark:placeholder-gray-400" 
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="sr-only">Your Message (Optional)</label>
                            <textarea 
                                id="message"
                                name="message"
                                placeholder="Your Message (Optional)" 
                                rows="4" 
                                className="w-full p-4 bg-gray-100 dark:bg-[#2a1a47] text-gray-900 dark:text-white rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                            ></textarea>
                        </div>
                        <motion.button 
                            whileHover={{ scale: 1.03 }} 
                            whileTap={{ scale: 0.98 }} 
                            type="submit" 
                            className="w-full py-4 bg-indigo-600 text-white rounded-full text-lg font-bold hover:bg-indigo-700 shadow-md transition-colors"
                        >
                            Request a Demo
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}