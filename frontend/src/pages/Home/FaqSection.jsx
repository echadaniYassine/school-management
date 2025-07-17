import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// FAQ Item Component
const FaqItem = ({ q, a, isOpen, onClick }) => (
    <div className="border-b border-gray-200 dark:border-gray-700">
        <h3 
            onClick={onClick} 
            className="text-lg font-semibold flex justify-between items-center cursor-pointer text-gray-900 dark:text-white p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
            {q}
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                <ChevronDown className="w-5 h-5" />
            </motion.div>
        </h3>
        <motion.div
            initial={false}
            animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
            className="overflow-hidden"
        >
            <p className="text-gray-600 dark:text-gray-400 px-6 pb-6">{a}</p>
        </motion.div>
    </div>
);

export default function FaqSection() {
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    const faqs = [
        { 
            q: "How does the system streamline administrative tasks?", 
            a: "Our platform automates repetitive tasks like attendance tracking, grade management, and report generation, freeing up valuable time for educators." 
        },
        { 
            q: "Is the platform suitable for all school sizes?", 
            a: "Yes! Our system is fully scalable, designed to meet the needs of small individual schools as well as large educational districts." 
        },
        { 
            q: "What kind of support can we expect?", 
            a: "We provide comprehensive training and 24/7 technical support to ensure a smooth and successful transition to our platform." 
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-transparent filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-pink-500/20 to-transparent filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
            <div className="container mx-auto px-6 max-w-3xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Get answers to common questions about our platform</p>
                </div>
                <motion.div 
                    initial={{ opacity: 0, y: 40 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.7 }} 
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                    {faqs.map((faq, index) => (
                        <FaqItem 
                            key={index} 
                            q={faq.q} 
                            a={faq.a} 
                            isOpen={openFaqIndex === index} 
                            onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)} 
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}