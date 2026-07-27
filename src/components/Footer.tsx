'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, Send, Loader2 } from 'lucide-react';
import Image from 'next/image';
import ContactUsModal from './ContactUsModal';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    const links = {
        collections: [
            { name: 'Sarees', href: '/products?category=Sarees' },
            { name: 'Kurtis', href: '/products?category=Kurtis' },
            { name: 'Salwars & Suit Sets', href: '/products?category=Salwars' },
            { name: 'Dresses', href: '/products?category=Dresses' },
            { name: 'Ethnic Gowns', href: '/products?category=Ethnic Wear' },
            { name: 'Tops', href: '/products?category=Tops' },
        ],
        boutique: [
            { name: 'Our Story', href: '/story' },
            { name: 'Featured Collection', href: '/products' },
            { name: 'Why Choose Anakh Fashions', href: '/story#why-choose-us' },
            { name: 'Browse Catalog', href: '/products' },
        ],
        contact: {
            phone: '+91 83048 45545',
            whatsapp: 'https://wa.me/918304845545',
            email: 'akhils1504.2@gmail.com',
            address: '12, Luxury Arcade, Commercial Street, Bangalore - 560001',
        }
    };

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        setMessage('');

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage('Thank you for joining the Anakh Club!');
                setEmail('');
            } else {
                setStatus('error');
                setMessage(data.error || 'Failed to subscribe. Please try again.');
            }
        } catch (error) {
            console.error('Subscription error:', error);
            setStatus('error');
            setMessage('Something went wrong. Please check your connection and try again.');
        }
    };

    return (
        <footer className="bg-dark-gray text-white pt-16 pb-8 border-t border-gold/15">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Image
                                src="/logo.png"
                                alt="Anakh Fashions Logo"
                                width={72}
                                height={72}
                                className="w-18 h-18 object-contain brightness-0 invert"
                            />
                            <div className="flex items-baseline gap-1.5">
                                <span className="font-serif text-3xl tracking-widest font-bold text-white block">ANAKH</span>
                                <span className="text-xs uppercase tracking-widest text-gold block">Fashions</span>
                            </div>
                        </div>
                        <p className="text-sm text-light-gray/70 leading-relaxed mb-6 font-light">
                            Crafting premium luxury fashion for the modern woman. Anakh Fashions combines classic Indian tradition with contemporary global aesthetics, offering a curated selection of sarees, kurtis, and ethnic ensembles.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://instagram.com/anakhfashion9"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-gold/30 hover:border-gold hover:bg-gold/10 flex items-center justify-center transition-all duration-300 group"
                                aria-label="Instagram"
                            >
                                <svg
                                    className="w-4 h-4 text-gold group-hover:text-white transition-colors"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a
                                href="https://m.facebook.com/?next=https%3A%2F%2Fm.facebook.com%2F1194564637063618%3Fwtsid%3Drdr_0GMDAdaALc724eHQD%23"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-gold/30 hover:border-gold hover:bg-gold/10 flex items-center justify-center transition-all duration-300 group"
                                aria-label="Facebook"
                            >
                                <svg
                                    className="w-4 h-4 text-gold group-hover:text-white transition-colors"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm uppercase tracking-widest text-[#d1a25d] mb-6 font-semibold">Collections</h4>
                        <ul className="space-y-3">
                            {links.collections.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-light-gray/70 hover:text-white transition-colors font-light"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Boutique Information */}
                    <div>
                        <h4 className="text-sm uppercase tracking-widest text-[#d1a25d] mb-6 font-semibold">Boutique</h4>
                        <ul className="space-y-3">
                            {links.boutique.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-light-gray/70 hover:text-white transition-colors font-light"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info & Newsletter */}
                    <div>
                        <h4 className="text-sm uppercase tracking-widest text-[#d1a25d] mb-6 font-semibold">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-gold shrink-0" />
                                <a
                                    href={links.contact.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-light-gray/70 hover:text-white transition-colors font-light"
                                >
                                    {links.contact.phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-gold shrink-0" />
                                <a
                                    href={`mailto:${links.contact.email}`}
                                    className="text-sm text-light-gray/70 hover:text-white transition-colors font-light break-all"
                                >
                                    {links.contact.email}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg
                                    className="w-4 h-4 text-gold shrink-0"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                                <button
                                    onClick={() => setIsContactModalOpen(true)}
                                    className="text-sm text-light-gray/70 hover:text-white transition-colors font-light cursor-pointer focus:outline-none text-left"
                                >
                                    Write to Us (Form)
                                </button>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg
                                    className="w-4 h-4 text-gold shrink-0"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                                <a
                                    href="https://chat.whatsapp.com/KBmmvFDvVVl4rr809cVGkP?s=cl&p=a&ilr=2&amv=0"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-light-gray/70 hover:text-white transition-colors font-light"
                                >
                                    Join WhatsApp Community
                                </a>
                            </li>
                        </ul>

                        {/* Newsletter Form */}
                        <div className="mt-8">
                            <h5 className="text-xs uppercase tracking-widest text-[#d1a25d] mb-3 font-semibold">Join The Anakh Club</h5>
                            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                                <div className="flex">
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={status === 'loading'}
                                        required
                                        className="bg-zinc-800 text-white text-xs border border-zinc-700 px-4 py-2.5 w-full focus:outline-none focus:border-gold rounded-l disabled:opacity-50"
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="bg-[#d1a25d] hover:bg-gold text-dark-gray hover:text-white px-4 rounded-r transition-colors flex items-center justify-center disabled:opacity-50 min-w-[48px]"
                                        aria-label="Subscribe"
                                    >
                                        {status === 'loading' ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Send className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                                {message && (
                                    <p className={`text-[11px] mt-1 ${status === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                        {message}
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>

                {/* Bottom Credits */}
                <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-light-gray/40">
                    <p>&copy; {currentYear} Anakh Fashions. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/shipping" className="hover:text-white transition-colors">Shipping & Returns info</Link>
                    </div>
                </div>
            </div>

            {/* Custom Contact Us modal */}
            <ContactUsModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
        </footer>
    );
}
