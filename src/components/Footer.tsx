import Link from 'next/link';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

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

    return (
        <footer className="bg-dark-gray text-white pt-16 pb-8 border-t border-gold/15">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div>
                        <span className="font-serif text-3xl tracking-widest font-bold text-white block mb-2">ANAKH</span>
                        <span className="text-xs uppercase tracking-widest text-gold block mb-6">Fashions</span>
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
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                            </a>
                            <a
                                href="https://www.facebook.com/share/1E6j26n7Mo/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-gold/30 hover:border-gold hover:bg-gold/10 flex items-center justify-center transition-all duration-300 group"
                                aria-label="Facebook"
                            >
                                <svg
                                    className="w-4 h-4 text-gold group-hover:text-white transition-colors"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </a>
                            <a
                                href={links.contact.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-gold/30 hover:border-gold hover:bg-gold/10 flex items-center justify-center transition-all duration-300 group"
                                aria-label="WhatsApp"
                            >
                                <Phone className="w-4 h-4 text-gold group-hover:text-white transition-colors" />
                            </a>
                            <a
                                href={`mailto:${links.contact.email}`}
                                className="w-10 h-10 rounded-full border border-gold/30 hover:border-gold hover:bg-gold/10 flex items-center justify-center transition-all duration-300 group"
                                aria-label="Email"
                            >
                                <Mail className="w-4 h-4 text-gold group-hover:text-white transition-colors" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Shop Links */}
                    <div>
                        <h4 className="font-serif text-lg text-gold font-semibold tracking-wider mb-6">Collections</h4>
                        <ul className="space-y-3">
                            {links.collections.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-light-gray/70 hover:text-rose-pink transition-colors font-light"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Boutique Informative Links */}
                    <div>
                        <h4 className="font-serif text-lg text-gold font-semibold tracking-wider mb-6">Boutique</h4>
                        <ul className="space-y-3">
                            {links.boutique.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-light-gray/70 hover:text-rose-pink transition-colors font-light"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div>
                        <h4 className="font-serif text-lg text-gold font-semibold tracking-wider mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            {/* Address commented out
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                                <span className="text-sm text-light-gray/70 leading-relaxed font-light">
                                    {links.contact.address}
                                </span>
                            </li>
                            */}
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-gold shrink-0" />
                                <a
                                    href={links.contact.whatsapp}
                                    className="text-sm text-light-gray/70 hover:text-gold transition-colors font-light"
                                >
                                    {links.contact.phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-gold shrink-0" />
                                <a
                                    href={`mailto:${links.contact.email}`}
                                    className="text-sm text-light-gray/70 hover:text-gold transition-colors font-light"
                                >
                                    {links.contact.email}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg
                                    className="w-5 h-5 text-gold shrink-0"
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
                                    className="text-sm text-light-gray/70 hover:text-gold transition-colors font-light"
                                >
                                    Join WhatsApp Community
                                </a>
                            </li>
                        </ul>

                        {/* Newsletter Placeholder */}
                        <div className="mt-8">
                            <h5 className="text-xs uppercase tracking-widest text-gold mb-3 font-semibold">Join The Anakh Club</h5>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="bg-zinc-800 text-white text-xs border border-zinc-700 px-4 py-2.5 w-full focus:outline-none focus:border-gold rounded-l"
                                />
                                <button
                                    className="bg-gold hover:bg-gold-hover text-dark-gray hover:text-white px-4 rounded-r transition-colors flex items-center justify-center"
                                    aria-label="Subscribe"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Credits */}
                <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-light-gray/40">
                    <p>&copy; {currentYear} Anakh Fashions. All rights reserved.</p>
                    <div className="flex gap-6 pb-2">
                        <span className="hover:text-gold cursor-default transition-colors">Privacy Policy</span>
                        <span className="hover:text-gold cursor-default transition-colors">Terms of Service</span>
                        <span className="hover:text-gold cursor-default transition-colors">Shipping & Returns info</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
