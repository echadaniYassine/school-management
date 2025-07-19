import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        q: "How does the system streamline administrative tasks?",
        a: "Our platform automates repetitive tasks like attendance tracking, grade management, and report generation, freeing up valuable time for educators to focus on what they do best: teaching."
    },
    {
        q: "Is the platform suitable for all school sizes?",
        a: "Absolutely. Our system is fully scalable, meticulously designed to meet the unique needs of small individual schools as well as large, multi-campus educational districts with thousands of users."
    },
    {
        q: "What kind of support can we expect?",
        a: "We provide comprehensive 24/7 technical support from a dedicated team. This includes live onboarding sessions, extensive documentation, and video tutorials to ensure a smooth and successful transition."
    },
    {
        q: "How secure is our data on your platform?",
        a: "Data security is our top priority. We use end-to-end encryption, regular security audits, and comply with global data protection standards like GDPR and FERPA to ensure your information is always safe and secure."
    }
];

const FaqButton = ({ question, isActive, onClick }) => {
    const buttonClasses = `
        w-full text-left p-5 rounded-xl transition-all duration-300
        relative overflow-hidden group backdrop-blur-sm border border-border
        ${isActive
            ? 'bg-card/80 text-card-foreground animated-border shadow-lg'
            : 'bg-muted/50 text-muted-foreground hover:bg-muted'
        }
    `;

    return (
        <motion.button
            onClick={onClick}
            className={buttonClasses}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <span className="font-semibold relative z-10">{question}</span>
            <div className={`absolute top-1/2 right-4 -translate-y-1/2 ${isActive ? 'text-accent-foreground' : 'text-muted-foreground'}`}>
                <AnimatePresence initial={false} mode="wait">
                    <motion.div
                        key={isActive ? 'minus' : 'plus'}
                        initial={{ opacity: 0, rotate: -45 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 45 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isActive ? <Minus size={20} /> : <Plus size={20} />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.button>
    );
};

export default function FaqSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        // --- THIS IS THE UPDATED LINE ---
        // Added a subtle gradient from the base background to a semi-transparent muted color.
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background to-muted/20 blurred-bg">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500 bg-clip-text text-transparent animate-gradient">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-4"
                    >
                        {faqs.map((faq, index) => (
                            <FaqButton
                                key={index}
                                question={faq.q}
                                isActive={activeIndex === index}
                                onClick={() => setActiveIndex(index)}
                            />
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                        className="relative min-h-[200px] bg-card/50 backdrop-blur-md p-8 rounded-2xl shadow-lg border-border"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <p className="text-card-foreground leading-relaxed">
                                    {faqs[activeIndex].a}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}