'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Decorators */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-screen filter blur-[120px] animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container mx-auto px-6 z-10 text-center flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-8"
                >
                    <Terminal size={14} className="text-secondary" />
                    <span className="text-xs font-medium tracking-wide text-gray-300 uppercase">Available for new opportunities</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6"
                >
                    Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-gradient-x">Digital</span><br />Experiences
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10"
                >
                    I'm a full-stack developer dedicated to building scalable,
                    performant, and visually stunning web applications. Integrating AI
                    and 3D technologies to push the boundaries of what's possible.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Link href="#projects" className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-105">
                        <span className="relative z-10 flex items-center gap-2">
                            View Work <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </span>
                    </Link>
                    <Link href="#contact" className="px-8 py-4 font-semibold rounded-full glass glass-hover transition-all text-white">
                        Get in Touch
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
