import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';

export default function TestimonialsSection() {
    const [testimonialIndex, setTestimonialIndex] = useState(0);

    const testimonials = [
        { 
            quote: "This platform has revolutionized how we operate. Communication has never been easier, and our teachers have more time to focus on teaching.", 
            author: "Jane Doe", 
            role: "Principal, Springfield High", 
            rating: 5 
        },
        { 
            quote: "An indispensable tool for modern education. The analytics are insightful and the user interface is incredibly intuitive for both staff and students.", 
            author: "John Smith", 
            role: "Technology Director", 
            rating: 5 
        },
        { 
            quote: "As a teacher, EduGate has saved me countless hours per week on administrative tasks. It's a game-changer for classroom management.", 
            author: "Emily White", 
            role: "Lead Teacher", 
            rating: 5 
        }
    ];

    const paginateTestimonials = (newDirection) => {
        setTestimonialIndex(prevIndex => (prevIndex + newDirection + testimonials.length) % testimonials.length);
    };

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 text-center">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Loved by Educators Worldwide</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Don't just take our word for it. Here's what leaders in education are saying about our platform.
                    </p>
                </motion.div>
                <div className="relative mt-12 max-w-3xl mx-auto h-80 flex items-center justify-center">
                    <AnimatePresence initial={false} mode="wait">
                        <motion.div 
                            key={testimonialIndex} 
                            initial={{ x: 200, opacity: 0 }} 
                            animate={{ x: 0, opacity: 1 }} 
                            exit={{ x: -200, opacity: 0 }} 
                            transition={{ type: 'spring', stiffness: 200, damping: 25 }} 
                            className="absolute w-full p-8 rounded-2xl shadow-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700"
                        >
                            <div className="flex mb-4 text-yellow-400 justify-center">
                                {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                                    <Star key={i} className="fill-current w-5 h-5" />
                                ))}
                            </div>
                            <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
                                "{testimonials[testimonialIndex].quote}"
                            </blockquote>
                            <footer className="text-center">
                                <p className="font-bold text-gray-900 dark:text-white">{testimonials[testimonialIndex].author}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonials[testimonialIndex].role}</p>
                            </footer>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="mt-8 flex justify-center gap-4">
                    <button 
                        onClick={() => paginateTestimonials(-1)}
                        aria-label="Previous testimonial"
                        className="p-3 rounded-full bg-white dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 transition shadow-md text-gray-700 dark:text-gray-300"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={() => paginateTestimonials(1)} 
                        aria-label="Next testimonial"
                        className="p-3 rounded-full bg-white dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 transition shadow-md text-gray-700 dark:text-gray-300"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
}