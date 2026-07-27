'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, ArrowRight, Check, ShoppingBag, Phone, Share2 } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'One Size');
    const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
    const [activeImageIdx, setActiveImageIdx] = useState(0);
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        try {
            const shareUrl = `${window.location.origin}/products/${product.id}`;
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    // Format currency
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    // Availability badge colors
    const getAvailabilityClass = (status: string) => {
        switch (status) {
            case 'In Stock':
                return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'Low Stock':
                return 'bg-amber-50 text-amber-705 border-amber-200';
            case 'Out of Stock':
            default:
                return 'bg-rose-50 text-rose-700 border-rose-200';
        }
    };

    // Construct sharing link for WhatsApp enquiry
    const getWhatsAppLink = (prod: Product) => {
        const text = `Hi Anakh Fashions! I am interested in browsing/purchasing: *${prod.name}* (ID: ${prod.id}). \nPrice: ${formatPrice(prod.price)} \nCategory: ${prod.category} \nFabric: ${prod.fabric} \nSelected Size: ${selectedSize} \nSelected Color: ${selectedColor}. \nCould you please share details on availability? Thank you.`;
        return `https://wa.me/918304845545?text=${encodeURIComponent(text)}`;
    };

    return (
        <>
            <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="group flex flex-col bg-white border border-rose-pink/5 rounded-2xl shadow-sm hover:shadow-xl overflow-hidden hover:border-gold/20"
            >
                {/* Image Container with Zoom hover */}
                <div className="relative aspect-[3/4] overflow-hidden bg-cream">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        priority={product.id.includes('SAR-001') || product.id.includes('KRT-001')}
                    />
                    {/* Cover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Labels */}
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider text-rose-pink px-2.5 py-1 rounded-full shadow-sm">
                        {product.category}
                    </span>

                    <span className={`absolute top-3 right-3 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border shadow-sm backdrop-blur-sm bg-white/95 ${getAvailabilityClass(product.availability)}`}>
                        {product.availability}
                    </span>

                    {/* Quick Action Overlay on desktop */}
                    <div className="absolute inset-0 flex flex-col items-center justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                        <button
                            onClick={() => setIsQuickViewOpen(true)}
                            className="w-full flex items-center justify-center gap-2 bg-white text-dark-gray hover:bg-gold hover:text-white px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest shadow-md transition-all duration-300 mb-2"
                        >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Quick View</span>
                        </button>
                        <Link
                            href={`/products/${product.id}`}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-pink to-gold text-white px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest shadow-md hover:shadow-glow transition-all duration-300"
                        >
                            <span>View Details</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>

                {/* Info */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                        <p className="text-xs text-muted-gray uppercase tracking-widest font-medium mb-1.5">{product.fabric}</p>
                        <h3 className="font-serif text-base lg:text-lg text-dark-gray font-semibold line-clamp-1 group-hover:text-rose-pink transition-colors">
                            {product.name}
                        </h3>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <span className="font-serif text-lg font-bold text-dark-gray">
                            {formatPrice(product.price)}
                        </span>

                        {/* Mobile Actions (Visible on small screens since hover overlay is hidden) */}
                        <div className="flex gap-2 md:hidden">
                            <button
                                onClick={() => setIsQuickViewOpen(true)}
                                className="p-2 border border-gold/30 hover:border-gold hover:bg-cream text-gold rounded-full transition-all"
                                aria-label="Quick View"
                            >
                                <Eye className="w-4 h-4" />
                            </button>
                            <Link
                                href={`/products/${product.id}`}
                                className="p-2 bg-gradient-to-r from-rose-pink to-gold text-white rounded-full shadow-md"
                                aria-label="View Details"
                            >
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* QUICK VIEW SCREEN OVERLAY */}
            <AnimatePresence>
                {isQuickViewOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsQuickViewOpen(false)}
                            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
                        />
                        {/* Modal Box */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                            className="fixed inset-4 md:inset-auto md:top-[50%] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-50%] md:w-[850px] md:max-w-full md:h-auto max-h-[90vh] bg-white rounded-3xl z-50 shadow-2xl overflow-y-auto flex flex-col md:flex-row p-6 md:p-8 gap-8"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsQuickViewOpen(false)}
                                className="absolute top-4 right-4 p-2 bg-cream text-dark-gray hover:text-rose-pink transition-colors rounded-full z-10 hover:shadow-md"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Gallery Panel (Left side) */}
                            <div className="flex flex-col gap-3 w-full md:w-[45%]">
                                <div className="relative aspect-[3/4] bg-cream rounded-2xl overflow-hidden shadow-sm">
                                    <Image
                                        src={product.images[activeImageIdx] || product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover object-center"
                                        priority
                                    />
                                </div>
                                {product.images && product.images.length > 1 && (
                                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                                        {product.images.map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setActiveImageIdx(idx)}
                                                className={`relative w-16 h-20 rounded-lg overflow-hidden bg-cream shrink-0 border-2 transition-all ${idx === activeImageIdx ? 'border-rose-pink shadow-md scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                                                    }`}
                                            >
                                                <Image
                                                    src={img}
                                                    alt={`${product.name} thumbnail ${idx}`}
                                                    fill
                                                    className="object-cover object-center"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Details Panel (Right side) */}
                            <div className="flex flex-col justify-between w-full md:w-[55%] pt-2 md:pt-0">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="bg-rose-pink/10 text-rose-pink text-xxs font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded">
                                            {product.category}
                                        </span>
                                        <span className={`text-xxs uppercase font-semibold tracking-wider border px-2 py-0.5 rounded ${getAvailabilityClass(product.availability)}`}>
                                            {product.availability}
                                        </span>
                                    </div>

                                    <h2 className="font-serif text-2xl lg:text-3xl text-dark-gray font-bold leading-tight mb-2">
                                        {product.name}
                                    </h2>

                                    <div className="font-serif text-xl font-bold text-rose-pink mb-4">
                                        {formatPrice(product.price)}
                                    </div>

                                    <div className="border-t border-rose-pink/5 pt-4 mb-4">
                                        <p className="text-xs text-muted-gray uppercase tracking-widest font-semibold mb-2">Material</p>
                                        <p className="text-sm font-medium text-dark-gray">{product.fabric}</p>
                                    </div>

                                    <p className="text-sm font-light text-muted-gray leading-relaxed mb-6">
                                        {product.description}
                                    </p>

                                    {/* Size Selector */}
                                    {product.sizes && product.sizes.length > 0 && product.sizes[0] !== 'One Size' && (
                                        <div className="mb-4">
                                            <p className="text-xs text-muted-gray uppercase tracking-widest font-semibold mb-2">Select Size</p>
                                            <div className="flex gap-2 flex-wrap">
                                                {product.sizes.map((size) => (
                                                    <button
                                                        key={size}
                                                        onClick={() => setSelectedSize(size)}
                                                        className={`w-10 h-10 rounded-full border text-xs font-semibold flex items-center justify-center transition-all ${size === selectedSize
                                                            ? 'border-rose-pink bg-rose-pink text-white shadow-sm'
                                                            : 'border-rose-pink/20 hover:border-rose-pink/70 text-dark-gray'
                                                            }`}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Color Selector */}
                                    {product.colors && product.colors.length > 0 && (
                                        <div className="mb-6">
                                            <p className="text-xs text-muted-gray uppercase tracking-widest font-semibold mb-2">Available Colors</p>
                                            <div className="flex gap-2 flex-wrap">
                                                {product.colors.map((color) => (
                                                    <button
                                                        key={color}
                                                        onClick={() => setSelectedColor(color)}
                                                        className={`px-3 py-1.5 rounded-full border text-xs font-medium flex items-center gap-1.5 transition-all ${color === selectedColor
                                                            ? 'border-gold bg-gold text-white shadow-sm'
                                                            : 'border-rose-pink/10 hover:border-gold/50 text-dark-gray bg-cream'
                                                            }`}
                                                    >
                                                        {color === selectedColor && <Check className="w-3 h-3" />}
                                                        <span>{color}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col gap-3 border-t border-rose-pink/5 pt-6 mt-4">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        {/* WhatsApp Quick Enquiry */}
                                        <a
                                            href={getWhatsAppLink(product)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-grow flex items-center justify-center gap-3 px-6 py-3.5 bg-[#25d366] hover:bg-[#20b857] text-white font-semibold rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer"
                                        >
                                            <Phone className="w-4 h-4" />
                                            <span className="text-xs uppercase tracking-widest text-center">Enquire via WhatsApp</span>
                                        </a>

                                        {/* View Full Product Details Link */}
                                        <Link
                                            href={`/products/${product.id}`}
                                            onClick={() => setIsQuickViewOpen(false)}
                                            className="flex items-center justify-center gap-2 px-6 py-3.5 border border-gold text-gold hover:bg-gold hover:text-white font-semibold rounded-full tracking-widest text-xs uppercase transition-all duration-300 cursor-pointer"
                                        >
                                            <span className="text-center">Full Details</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                    <button
                                        onClick={handleShare}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-rose-pink/25 hover:border-gold text-muted-gray hover:text-gold bg-cream/45 hover:bg-cream font-semibold rounded-full tracking-widest text-xs uppercase transition-all duration-300 active:scale-95 cursor-pointer"
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="w-4 h-4 text-emerald-500" />
                                                <span>Copied Link!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Share2 className="w-4 h-4" />
                                                <span>Share Product Link</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
