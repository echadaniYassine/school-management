import React from 'react';
import HeroSection from './Home/HeroSection';
import FeaturesSection from './Home/FeaturesSection';
import PartnersSection from './Home/PartnersSection';
import TestimonialsSection from './Home/TestimonialsSection';
import ContactSection from './Home/ContactSection';
import FaqSection from './Home/FaqSection';
import FinalCtaSection from './Home/FinalCtaSection';

export default function Home() {
    return (
        <div className="bg-white dark:bg-[#1a0f2e] text-gray-800 dark:text-white font-sans transition-colors duration-300">
             <main>
                <HeroSection />
                <PartnersSection />
                <FeaturesSection />
                <TestimonialsSection />
                <FaqSection />
                <ContactSection />
                <FinalCtaSection />
            </main>
        </div>
    );
}