import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, BookOpen, BarChart3, Users, ChevronDown } from 'lucide-react';


// Animated Feature Card
const FeatureCard = ({ icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="text-center p-8 rounded-xl shadow-md dark:shadow-2xl bg-white/50 dark:bg-gray-800/50 hover:shadow-xl hover:-translate-y-2"
    >
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 dark:bg-[#2a1a47] mx-auto mb-6">
            {icon}
        </div>
        <h3 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{desc}</p>
    </motion.div>
);

// Interactive FAQ Item
const FaqItem = ({ q, a, isOpen, onClick }) => (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4">
        <h3 onClick={onClick} className="text-lg font-semibold flex justify-between items-center cursor-pointer text-gray-900 dark:text-white">
            {q}
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown />
            </motion.div>
        </h3>
        <motion.div
            initial={false}
            animate={{ height: isOpen ? 'auto' : 0, marginTop: isOpen ? '16px' : '0px' }}
            className="overflow-hidden"
        >
            <p className="text-gray-600 dark:text-gray-400">{a}</p>
        </motion.div>
    </div>
);

// Partner Logo Component
const PartnerLogos = () => (
    <section className="py-16">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold mb-10 text-gray-500 dark:text-gray-400">Trusted By Leading Educational Partners</h2>
            <div className="flex justify-center items-center gap-10 md:gap-16 flex-wrap grayscale opacity-60">
                {/* For better results, use actual SVG logos */}
                <svg className="h-8 text-current" viewBox="0 0 125 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M110.795 3.996h-3.832v16.148h3.832V3.996zM96.967 4.708c-3.15 0-5.88 2.54-5.88 5.66s2.73 5.66 5.88 5.66c3.15 0 5.88-2.54 5.88-5.66s-2.73-5.66-5.88-5.66zm0 8.94c-1.785 0-3.255-1.455-3.255-3.28s1.47-3.28 3.255-3.28c1.785 0 3.255 1.455 3.255 3.28s-1.47 3.28-3.255 3.28zM82.837 4.708c-3.15 0-5.88 2.54-5.88 5.66s2.73 5.66 5.88 5.66c3.15 0 5.88-2.54 5.88-5.66s-2.73-5.66-5.88-5.66zm0 8.94c-1.785 0-3.255-1.455-3.255-3.28s1.47-3.28 3.255-3.28c1.785 0 3.255 1.455 3.255 3.28s-1.47 3.28-3.255 3.28zM65.418 4.708c-2.94 0-5.46 2.058-5.775 4.83h11.445c.03-2.772-2.415-4.83-5.67-4.83zm-5.715 6.93c.345 1.545 1.845 2.73 3.63 2.73 1.62 0 3.12-1.005 3.72-2.49h-7.35v-.24zM54.757 4.026l-3.09 16.118h-3.87l3.09-16.118h3.87zM42.277 4.026l5.22 12.06 5.25-12.06h4.5l-7.425 16.118h-4.65L37.777 4.026h4.5zM29.077 4.026h8.88v2.37h-5.22v4.5h4.92v2.37h-4.92v4.53h5.22v2.37h-8.88V4.026zM15.938 12.336c0-4.59-3.39-8.31-7.98-8.31S0 7.746 0 12.336c0 4.59 3.39 8.31 7.95 8.31s7.98-3.72 7.98-8.31zm-7.98 5.94c-2.97 0-5.34-2.4-5.34-5.94s2.37-5.94 5.34-5.94c2.97 0 5.34 2.4 5.34 5.94s-2.37 5.94-5.34 5.94z" fill="currentColor"/></svg>
                <span className="text-2xl font-semibold">Google</span>
                <span className="text-2xl font-semibold">Coursera</span>
                <span className="text-2xl font-semibold">EdX</span>
            </div>
        </div>
    </section>
);


// --- Main Home Page Component ---
export default function Home() {
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    const features = [
        { icon: <BookOpen className="h-8 w-8 text-indigo-500" />, title: "Course Management", desc: "Easily manage courses, assignments, and materials in one centralized location." },
        { icon: <BarChart3 className="h-8 w-8 text-indigo-500" />, title: "Track Progress", desc: "Get real-time analytics on student performance and engagement." },
        { icon: <Users className="h-8 w-8 text-indigo-500" />, title: "Unified Communication", desc: "Built-in chat and announcements to keep everyone connected." }
    ];

    const faqs = [
        { q: "How does the system streamline administrative tasks?", a: "Our platform automates repetitive tasks like attendance tracking, grade management, and report generation, freeing up valuable time for educators." },
        { q: "Is the platform suitable for all school sizes?", a: "Yes! Our system is fully scalable, designed to meet the needs of small individual schools as well as large educational districts." },
        { q: "What kind of support can we expect?", a: "We provide comprehensive training and 24/7 technical support to ensure a smooth and successful transition to our platform." }
    ];

    return (
        <div className="bg-white dark:bg-[#1a0f2e] text-gray-800 dark:text-white font-sans transition-colors duration-300">

            <main>
                {/* Hero Section */}
                <section className="relative text-center py-20 md:py-32 px-6 overflow-hidden">
                    {/* Background decorative shape */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-gradient-to-tr from-purple-500/50 to-pink-500/40 rounded-full filter blur-3xl opacity-50 dark:opacity-70 animate-pulse" />
                    </div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white"
                    >
                        The Future of School Management is{' '}
                        <span className="bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500 bg-clip-text text-transparent">
                            Here
                        </span>.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative mt-6 text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300"
                    >
                        A unified platform connecting students, teachers, and admins for a seamless education journey.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative mt-10"
                    >
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(99, 102, 241, 0.5)" }}
                            className="inline-block bg-indigo-600 text-white font-bold rounded-full px-10 py-4 text-lg shadow-lg"
                        >
                            Get Started Now
                        </motion.a>
                    </motion.div>
                </section>

                {/* Features Section */}
                <section className="container mx-auto px-6 py-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <FeatureCard key={index} {...feature} delay={index * 0.2} />
                        ))}
                    </div>
                </section>

                <PartnerLogos />

                {/* Contact Form Section */}
                <section id="contact" className="container mx-auto px-6 py-24">
                    <div className="max-w-xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Ready to Transform Your School?</h2>
                        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">Request a personalized demo and see how EduGate can help.</p>
                    </div>
                    <motion.form
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="max-w-xl mx-auto mt-12 p-8 border border-gray-200 dark:border-gray-700 bg-white/30 dark:bg-gray-800/30 rounded-lg space-y-6 shadow-lg backdrop-blur-sm"
                    >
                        <input type="text" placeholder="Full Name" className="w-full p-3 bg-gray-100 dark:bg-[#2a1a47] rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        <input type="email" placeholder="Work Email" className="w-full p-3 bg-gray-100 dark:bg-[#2a1a47] rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full py-3 bg-indigo-600 text-white rounded-full text-lg font-bold hover:bg-indigo-700 shadow-md"
                        >
                            Request a Demo
                        </motion.button>
                    </motion.form>
                </section>

                {/* FAQ Section */}
                <section className="bg-gray-50 dark:bg-[#20123a] py-24">
                    <div className="container mx-auto px-6 max-w-3xl">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
                        </div>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <FaqItem key={index} {...faq} isOpen={openFaqIndex === index} onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)} />
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* Final CTA Section */}
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
                        <h2 className="text-4xl md:text-5xl font-extrabold">Elevate Your Presence.</h2>
                        <p className="text-lg my-6 max-w-xl mx-auto">Join thousands of users already transforming their education experience.</p>
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.1, backgroundColor: '#ffffff', color: '#4f46e5' }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="inline-block bg-white/20 backdrop-blur-sm border border-white/50 text-white font-bold rounded-full px-10 py-4 text-lg shadow-lg"
                        >
                            Contact Us!
                        </motion.a>
                    </motion.div>
                </section>

            </main>
        </div>
    );
}