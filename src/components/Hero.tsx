'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative w-full min-h-[95vh] flex items-center justify-center overflow-hidden bg-zinc-950">
            {/* Background Image with elegant dark gradient overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1920&q=80"
                    alt="Aura Boutique Premium Banner"
                    fill
                    priority
                    className="object-cover object-center opacity-40 scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-900/60 to-transparent z-1" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-zinc-950/30 z-1" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col justify-center text-left">
                <div className="max-w-2xl">
                    {/* Subheader */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <span className="h-[1px] w-12 bg-gold" />
                        <span className="text-gold text-xs sm:text-sm uppercase tracking-widest font-semibold">
                            The Royal Heritage & Modern Era
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="font-serif text-4xl sm:text-5xl lg:text-7xl text-white font-extrabold tracking-wide leading-tight mb-6"
                    >
                        Redefining <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-pink via-gold to-white">
                            Elegance & Grace
                        </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-sm sm:text-base md:text-lg text-cream/80 font-light leading-relaxed tracking-wide mb-10 max-w-lg"
                    >
                        Discover our curated handloom sarees, bespoke straight kurtis, suit sets, and western gowns tailored for the modern connoisseur of luxury ethnic fashion.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link
                            href="/products"
                            className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-pink to-gold text-white text-sm font-semibold uppercase tracking-widest rounded-full shadow-lg hover:shadow-glow hover:opacity-95 transition-all duration-300 transform active:scale-98"
                        >
                            <span>Explore Collection</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>

                        <Link
                            href="/products?category=Sarees"
                            className="flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white hover:border-gold hover:text-gold text-sm font-semibold uppercase tracking-widest rounded-full transition-all duration-350"
                        >
                            <span>View Sarees</span>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Elegant scroll indicator */}
            <div className="absolute bottom-6 left-[50%] -translate-x-[50%] z-10 flex flex-col items-center gap-1.5 opacity-60">
                <span className="text-[10px] uppercase text-cream tracking-widest font-light">Scroll Down</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-1 h-3 bg-gold rounded-full"
                />
            </div>
        </section>
    );
}
