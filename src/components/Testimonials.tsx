'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    quote: string;
    rating: number;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Aparna Sharma",
        role: "Regular Customer",
        quote: "The Banarasi Silk Saree I ordered from Anakh Fashions was breathtaking. The weave was flawless, and the drape felt incredibly luxurious. I received so many compliments at my daughter's wedding!",
        rating: 5
    },
    {
        id: 2,
        name: "Meera Krishnan",
        role: "Bridal Wear Client",
        quote: "Finding authentic patterns that speak to modern aesthetics was hard until I found Anakh Fashions. Their custom sizing options and help on WhatsApp made buying stress-free. Absolutely recommend the Anarkali sets!",
        rating: 5
    },
    {
        id: 3,
        name: "Priyanka Sen",
        role: "Fashion Blogger",
        quote: "Anakh Fashions is a hidden gem. The quality of fabric matches premium designer labels at a fraction of the cost. The organic linen collections are my absolute favorite for summer styling.",
        rating: 5
    },
    {
        id: 4,
        name: "Anjali Gupta",
        role: "Premium Club Member",
        quote: "Pure elegance! The product pictures on the site represent the actual colors accurately, and the customer assistance was superb. Will definitely purchase again for the upcoming festival season.",
        rating: 5
    }
];

export default function Testimonials() {
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIdx((prev) => (prev + 1) % testimonials.length);
        }, 6000);

        return () => clearInterval(timer);
    }, []);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: 'easeInOut' }
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 100 : -100,
            opacity: 0,
            transition: { duration: 0.5, ease: 'easeInOut' }
        })
    };

    return (
        <section className="py-20 bg-cream relative overflow-hidden">
            {/* Decorative background embellishment */}
            <div className="absolute top-10 left-10 w-44 h-44 rounded-full border border-gold/10 pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full border border-gold/10 pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                <span className="text-royal-pink text-xs uppercase tracking-widest font-semibold text-gold mb-3 block">
                    Client Diaries
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-dark-gray font-bold mb-12">
                    Loved by Our Patrons
                </h2>

                {/* Carousel Window */}
                <div className="relative min-h-[250px] flex items-center justify-center">
                    <Quote className="w-16 h-16 text-rose-pink/10 absolute -top-8 left-[50%] -translate-x-[50%] z-0" />

                    <div className="relative z-10 w-full max-w-2xl px-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIdx}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                className="flex flex-col items-center"
                            >
                                {/* Rating */}
                                <div className="flex gap-1.5 justify-center mb-6">
                                    {Array.from({ length: testimonials[activeIdx].rating }).map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="font-serif text-lg md:text-xl lg:text-2xl text-dark-gray italic font-medium leading-relaxed mb-6">
                                    &ldquo;{testimonials[activeIdx].quote}&rdquo;
                                </p>

                                {/* Profile */}
                                <div>
                                    <h4 className="text-xs uppercase tracking-widest font-bold text-dark-gray">
                                        {testimonials[activeIdx].name}
                                    </h4>
                                    <p className="text-xs text-muted-gray mt-1">
                                        {testimonials[activeIdx].role}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Inline Navigation Indicators */}
                <div className="flex gap-3 justify-center mt-10 relative z-20">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIdx(idx)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-350 ${idx === activeIdx
                                ? 'bg-rose-pink w-6 shadow-sm scale-110'
                                : 'bg-rose-pink/20 hover:bg-rose-pink/40'
                                }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
