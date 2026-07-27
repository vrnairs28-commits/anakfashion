'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Compass, Sparkles, ShieldCheck, ArrowRight, CornerRightDown } from 'lucide-react';

const whyUsItems = [
    {
        icon: <Compass className="w-6 h-6 text-gold" />,
        title: "Heritage Craftsmanship",
        description: "Every ensemble is created in collaboration with authentic weaver clusters and master artisans, preserving age-old indian textile heritage."
    },
    {
        icon: <Sparkles className="w-6 h-6 text-gold" />,
        title: "Bespoke Tailoring",
        description: "We offer tailored measurements adjustments and customized sleeve length or neck cut modifications for a perfectly contoured silhouette."
    },
    {
        icon: <ShieldCheck className="w-6 h-6 text-gold" />,
        title: "Certified Pure Fabrics",
        description: "From certified Banarasi silks to pure handloom linens and organically sourced cottons, we never compromise on quality."
    },
    {
        icon: (
            <svg
                className="w-6 h-6 text-gold fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
        ),
        title: "Stylist Consultancy",
        description: "Enjoy direct styling assistance on WhatsApp. Our designers guide you through fabrics, draping styles, sizing, and styling advice."
    }
];

export default function StoryPage() {
    return (
        <div className="bg-white min-h-screen">


            {/* Page Header */}
            <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden bg-zinc-950">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1920&q=80"
                        alt="Anakh Fashions Story Banner"
                        fill
                        priority
                        className="object-cover object-center opacity-30 scale-102"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-zinc-950/40 to-zinc-950/90 z-1" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-3xl">
                    <motion.span
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-gold text-xs uppercase tracking-widest font-semibold mb-3 block"
                    >
                        Our Heritage & Journey
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-extrabold tracking-wide mb-6"
                    >
                        The Soul of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-pink via-gold to-white">
                            Anakh Fashions
                        </span>
                    </motion.h1>
                </div>
            </section>

            {/* Narrative Story Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Narrative Left */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-gold text-xs uppercase tracking-widest font-bold mb-3 block">
                                The Genesis
                            </span>
                            <h2 className="font-serif text-3xl sm:text-4xl text-dark-gray font-bold mb-6 leading-tight">
                                Crafting Timeless Traditions for the Modern Woman
                            </h2>
                            <div className="space-y-6 text-sm text-muted-gray font-light leading-relaxed">
                                <p>
                                    Anakh Fashions was born out of a profound passion for preserving classic Indian draperies while adapting them to the stylistic preferences of the contemporary global citizen. Each saree, kurti, and ethnic ensemble in our catalog represents months of custom curation.
                                </p>
                                <p>
                                    We work directly with certified artisan clusters to select premium handloom yarns, pure organic cottons, and masterfully woven Banarasi and Tussar silks. By bypassing margins and third-party brokers, we support weavers while delivering authentic, premium attire.
                                </p>
                                <p>
                                    At Anakh Fashions, we believe luxury isn't about the price tag—it is found in the texture of hand-woven thread, the precision of a stitched edge, and the confidence of custom sizing tailored for you.
                                </p>
                            </div>
                        </motion.div>

                        {/* Image Right */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-cream border border-gold/10"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80"
                                alt="Artisan weaving silk"
                                fill
                                className="object-cover object-center hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-gray/30 to-transparent" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section id="why-choose-us" className="py-24 bg-cream scroll-mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-royal-pink text-xs uppercase tracking-widest font-semibold text-gold mb-3 block">
                            The Anakh Distinction
                        </span>
                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-dark-gray font-bold mb-4">
                            Why Choose Anakh Fashions
                        </h2>
                        <p className="text-sm text-muted-gray font-light">
                            Discover how our commitment to materials, custom fitting, design rarity, and weaver collaborations defines our signature aesthetic.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {whyUsItems.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="flex gap-5 p-8 bg-white border border-rose-pink/5 hover:border-gold/15 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-350"
                            >
                                <div className="w-12 h-12 shrink-0 rounded-2xl bg-cream flex items-center justify-center shadow-inner border border-gold/10">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="font-serif text-lg font-bold text-dark-gray mb-2.5">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-muted-gray leading-relaxed font-light">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Collections Navigation CTA */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h3 className="font-serif text-2xl sm:text-3xl text-dark-gray font-bold mb-6">
                        Ready to Explore the Catalog?
                    </h3>
                    <p className="text-sm text-muted-gray max-w-md mx-auto font-light mb-10 leading-relaxed">
                        Step inside and browse through our handpicked ensembles of Sarees, Kurtis, and ethnic coordinate sets styled for absolute grace.
                    </p>
                    <Link
                        href="/products"
                        className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-[#d1707d] to-[#bb9b69] text-white text-sm font-semibold uppercase tracking-widest rounded-full shadow-lg hover:shadow-glow hover:scale-105 active:scale-98 transition-all duration-300 cursor-pointer"
                    >
                        <span>Browse Collections</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* <Footer /> */}
        </div>
    );
}
