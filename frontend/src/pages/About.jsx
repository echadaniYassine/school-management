import { motion } from 'framer-motion';
import { Accessibility, Lightbulb, ShieldCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Reusable Animated Components ---

const ValueCard = ({ icon, title, text, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg text-center h-full"
    >
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 dark:bg-[#2a1a47] mx-auto mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{text}</p>
    </motion.div>
);

const TeamMemberCard = ({ name, role, bio, imageUrl, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="text-center flex flex-col items-center"
    >
        <div className="relative w-40 h-40">
            <img
                className="w-full h-full rounded-full object-cover object-center shadow-lg"
                src={imageUrl}
                alt={name}
            />
            <div className="absolute inset-0 rounded-full border-4 border-indigo-500/50 transform scale-110 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">{name}</h3>
        <p className="text-indigo-500 dark:text-indigo-400 font-medium">{role}</p>
        <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-xs mx-auto text-sm">{bio}</p>
    </motion.div>
);

// --- Main About Page Component ---
export default function About() {
    const teamMembers = [
        { name: 'Dr. Evelyn Reed', role: 'Founder & Lead Educator', bio: 'With 20 years in education, Evelyn founded EduGate to bridge the technology gap in modern classrooms.', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2788&auto=format&fit=crop' },
        { name: 'Marcus Chen', role: 'Chief Technology Officer', bio: 'A software architect passionate about building scalable and secure systems that empower users.', imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2787&auto=format&fit=crop' },
        { name: 'Aisha Khan', role: 'Head of User Experience', bio: 'Aisha ensures our platform is intuitive, accessible, and genuinely delightful for every user.', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop' },
    ];

    const values = [
        { icon: <Lightbulb className="h-10 w-10 text-indigo-500" />, title: "Innovation", text: "Constantly evolving to meet the future needs of education." },
        { icon: <Users className="h-10 w-10 text-indigo-500" />, title: "Collaboration", text: "Building tools that connect every member of the community." },
        { icon: <ShieldCheck className="h-10 w-10 text-indigo-500" />, title: "Integrity", text: "Ensuring data is secure, private, and handled responsibly." },
        { icon: <Accessibility className="h-10 w-10 text-indigo-500" />, title: "Accessibility", text: "Creating a platform that is easy to use for everyone, everywhere." },
    ];

    return (
        <div className="bg-white dark:bg-[#1a0f2e] text-gray-800 dark:text-white font-sans">            <main>
                {/* Page Header */}
                <section className="relative bg-gray-50 dark:bg-gray-900/50 py-20 md:py-28 text-center overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] bg-gradient-to-tr from-purple-500/30 to-pink-500/20 rounded-full filter blur-3xl opacity-60 dark:opacity-80 animate-pulse" />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="relative container mx-auto px-6"
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
                            Our Mission to Reshape Education
                        </h1>
                        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
                            We believe in the power of technology to create a more connected, efficient, and inspiring learning environment for all.
                        </p>
                    </motion.div>
                </section>

                {/* Our Story Section */}
                <section className="py-24">
                    <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Born from a collaboration between veteran educators and innovative technologists, our platform was created to solve the real-world challenges faced by schools every day.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">
                                Our goal was simple: to build a single, intuitive platform that brings every aspect of school life together. We are dedicated to streamlining processes and fostering a thriving educational community.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="w-full h-80 md:h-full"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2940&auto=format&fit=crop"
                                alt="Team collaborating"
                                className="rounded-lg shadow-2xl w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Our Values Section */}
                <section className="bg-gray-100 dark:bg-[#20123a] py-24">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Our Core Values</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((value, index) => (
                                <ValueCard key={index} {...value} delay={index * 0.15} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Meet the Team Section */}
                <section className="py-24">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Meet the Leadership Team</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {teamMembers.map((member, index) => (
                                <TeamMemberCard key={member.name} {...member} delay={index * 0.15} />
                            ))}
                        </div>
                    </div>
                </section>
                
                 {/* Final CTA Section (Consistent with Home page) */}
                <section className="py-20 md:py-24 text-center overflow-hidden relative bg-indigo-600 dark:bg-[#1a0f2e]">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-70 mix-blend-multiply dark:mix-blend-lighten"></div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="relative z-10 px-6 text-white"
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold">Join Us on Our Journey</h2>
                        <p className="text-lg my-5 max-w-xl mx-auto">Help us build the future of education. If you're passionate about making a difference, we'd love to hear from you.</p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <Link
                                to="/contact"
                                className="inline-block bg-white text-indigo-700 font-bold rounded-full px-10 py-3 text-lg shadow-lg"
                            >
                                Contact Us
                            </Link>
                        </motion.div>
                    </motion.div>
                </section>
            </main>
        </div>
    );
}