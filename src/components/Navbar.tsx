'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Menu, X, ArrowRight, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const pathname = usePathname();
    const router = useRouter();

    // Detect scroll status
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile drawer when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
    }, [pathname]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Sarees', path: '/products?category=Sarees' },
        { name: 'Kurtis', path: '/products?category=Kurtis' },
        { name: 'Salwars', path: '/products?category=Salwars' },
        { name: 'Dresses', path: '/products?category=Dresses' },
        { name: 'Ethnic Wear', path: '/products?category=Ethnic%20Wear' },
        { name: 'Browse All', path: '/products' },
    ];

    // If we are on the landing page, we want a transparent navbar that turns glassmorphic on scroll.
    // Otherwise, we want a sticky glassmorphic white navbar from the start.
    const isLandingPage = pathname === '/';
    const navbarBgClass = isScrolled
        ? 'glass border-b border-rose-pink/10 shadow-sm'
        : isLandingPage
            ? 'bg-transparent'
            : 'glass border-b border-rose-pink/10 shadow-sm';
    const textClass = isScrolled
        ? 'text-dark-gray'
        : isLandingPage
            ? 'text-white'
            : 'text-dark-gray';
    const linkHoverClass = isScrolled
        ? 'hover:text-rose-pink'
        : isLandingPage
            ? 'hover:text-gold'
            : 'hover:text-rose-pink';

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarBgClass}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center gap-2">
                                <span className={`font-serif text-2xl lg:text-3xl tracking-widest font-semibold transition-colors duration-300 ${textClass}`}>
                                    Anakh
                                </span>
                                <span className="text-gold text-xs tracking-wider uppercase font-sans mt-2">Fashions</span>
                            </Link>
                        </div>

                        {/* Desktop Navigation Links */}
                        <nav className="hidden md:flex space-x-8">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.path || (pathname === '/products' && link.path.startsWith('/products?'));
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.path}
                                        className={`text-sm tracking-wider uppercase font-medium transition-colors duration-350 ${isActive
                                            ? 'text-rose-pink border-b border-rose-pink font-semibold'
                                            : `${textClass} ${linkHoverClass}`
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Utility Icons */}
                        <div className="flex items-center gap-4">
                            {/* WhatsApp Link directly in navbar for premium service touch */}
                            <a
                                href="https://wa.me/918304845545"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden lg:flex items-center gap-2 px-4 py-2 border border-gold hover:bg-gold hover:shadow-glow text-xs uppercase tracking-widest font-semibold text-gold hover:text-white rounded-full transition-all duration-300"
                            >
                                <Phone className="w-3 h-3" />
                                <span>Enquire</span>
                            </a>

                            {/* Search Toggle Button */}
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className={`p-2 rounded-full transition-colors duration-300 hover:bg-rose-pink/10 ${textClass}`}
                                aria-label="Search items"
                            >
                                {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                            </button>

                            {/* Mobile Menu Toggle Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`p-2 rounded-full md:hidden transition-colors duration-300 hover:bg-rose-pink/10 ${textClass}`}
                                aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Slide-Down Search Overlay */}
                <AnimatePresence>
                    {isSearchOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-white border-b border-rose-pink/10 shadow-lg overflow-hidden absolute top-20 left-0 right-0 z-40"
                        >
                            <div className="max-w-3xl mx-auto px-4 py-6">
                                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Search for sarees, silk, kurtis, dresses..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-4 pr-12 py-3 bg-cream/50 text-dark-gray border border-gold/30 rounded-full focus:outline-none focus:border-rose-pink text-base"
                                        autoFocus
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-2 p-2 bg-gradient-to-r from-rose-pink to-gold text-white rounded-full shadow-md hover:opacity-90 transition-all"
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Mobile Drawer Navigation Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black z-50"
                        />
                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-cream shadow-2xl z-50 flex flex-col p-6 overflow-y-auto"
                        >
                            <div className="flex items-center justify-between border-b border-rose-pink/10 pb-4 mb-6">
                                <div>
                                    <span className="font-serif text-xl tracking-widest font-semibold text-rose-pink">Anakh</span>
                                    <span className="text-[10px] tracking-wider uppercase text-gold block">Fashions</span>
                                </div>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 text-dark-gray hover:text-rose-pink rounded-full hover:bg-rose-pink/5"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex-grow">
                                <p className="text-[10px] tracking-widest uppercase font-semibold text-gold mb-4">Categories</p>
                                <nav className="flex flex-col gap-4">
                                    {navLinks.map((link) => {
                                        const isActive = pathname === link.path;
                                        return (
                                            <Link
                                                key={link.name}
                                                href={link.path}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={`text-lg tracking-wider font-serif transition-colors py-1 ${isActive
                                                    ? 'text-rose-pink border-l-2 border-rose-pink pl-3'
                                                    : 'text-dark-gray hover:text-rose-pink'
                                                    }`}
                                            >
                                                {link.name}
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </div>

                            <div className="border-t border-rose-pink/10 pt-6 mt-6">
                                <p className="text-xs text-muted-gray mb-4">Want personalized designer consultation?</p>
                                <a
                                    href="https://wa.me/918304845545"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-[#25d366] hover:bg-[#20b857] text-white font-semibold rounded-full shadow-lg transition-transform active:scale-95"
                                >
                                    <Phone className="w-4 h-4" />
                                    <span className="text-xs uppercase tracking-widest">Connect on WhatsApp</span>
                                </a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
