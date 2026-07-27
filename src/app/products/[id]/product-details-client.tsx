'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import Testimonials from '@/components/Testimonials';
import { Phone, ChevronRight, Check, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductDetailsClientProps {
    product: Product;
    relatedProducts: Product[];
}

export default function ProductDetailsClient({ product, relatedProducts }: ProductDetailsClientProps) {
    const [activeImageIdx, setActiveImageIdx] = useState(0);
    const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'One Size');
    const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
    const [isZoomed, setIsZoomed] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    const getWhatsAppLink = () => {
        const text = `Hi Anakh Fashions! I am interested in details regarding: *${product.name}* (ID: ${product.id}). \nPrice: ${formatPrice(product.price)} \nFabric: ${product.fabric} \nSelected Size: ${selectedSize} \nSelected Color: ${selectedColor}. \nCould you please let me know when it would be available? Thank you.`;
        return `https://wa.me/918304845545?text=${encodeURIComponent(text)}`;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setMousePos({ x, y });
    };

    return (
        <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
            {/* 1. Breadcrumbs */}
            <nav className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-gray mb-8 flex-wrap">
                <Link href="/" className="hover:text-rose-pink transition-colors">Home</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link href="/products" className="hover:text-rose-pink transition-colors">Products</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link
                    href={`/products?category=${encodeURIComponent(product.category)}`}
                    className="hover:text-rose-pink transition-colors"
                >
                    {product.category}
                </Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-rose-pink font-semibold truncate max-w-[200px]">{product.name}</span>
            </nav>

            {/* 2. Main Details Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                {/* Left Side: Sticky Image Gallery Panel */}
                <div className="lg:col-span-7 flex flex-col md:flex-row-reverse gap-4 lg:sticky lg:top-28">

                    {/* Main Display Image with Hover Zoom */}
                    <div
                        className="relative aspect-[3/4] w-full rounded-2xl bg-cream overflow-hidden border border-rose-pink/5 cursor-zoom-in"
                        onMouseEnter={() => setIsZoomed(true)}
                        onMouseLeave={() => setIsZoomed(false)}
                        onMouseMove={handleMouseMove}
                    >
                        <Image
                            src={product.images[activeImageIdx] || product.image}
                            alt={product.name}
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className={`object-cover object-center transition-transform duration-200 ${isZoomed ? 'scale-175' : 'scale-100'
                                }`}
                            style={
                                isZoomed
                                    ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` }
                                    : undefined
                            }
                        />
                        {/* Visual indicators */}
                        <span className="absolute bottom-4 right-4 bg-dark-gray/60 backdrop-blur-sm text-[10px] text-white tracking-widest uppercase px-3 py-1 rounded-full pointer-events-none">
                            Hover to Zoom
                        </span>
                    </div>

                    {/* Thumbnails list */}
                    {product.images && product.images.length > 1 && (
                        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 shrink-0 select-none">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImageIdx(idx)}
                                    className={`relative w-16 h-20 md:w-20 md:h-24 rounded-xl overflow-hidden bg-cream shrink-0 border-2 transition-all ${idx === activeImageIdx
                                        ? 'border-rose-pink scale-95 shadow-md'
                                        : 'border-transparent opacity-80 hover:opacity-100'
                                        }`}
                                >
                                    <Image
                                        src={img}
                                        alt={`${product.name} gallery image ${idx + 1}`}
                                        fill
                                        sizes="80px"
                                        className="object-cover object-center"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Side: Specifications and Info Panel */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="bg-rose-pink/15 text-rose-pink text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                                {product.category}
                            </span>
                            <span className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border bg-white ${product.availability === 'In Stock'
                                ? 'border-emerald-200 text-emerald-700 bg-emerald-50'
                                : product.availability === 'Low Stock'
                                    ? 'border-amber-200 text-amber-700 bg-amber-50'
                                    : 'border-rose-200 text-rose-700 bg-rose-50'
                                }`}>
                                {product.availability}
                            </span>
                        </div>

                        <h1 className="font-serif text-3xl sm:text-4xl text-dark-gray font-bold leading-tight mb-2">
                            {product.name}
                        </h1>

                        <p className="font-serif text-2xl font-bold bg-gradient-to-r from-rose-pink to-gold bg-clip-text text-transparent">
                            {formatPrice(product.price)}
                        </p>
                    </div>

                    {/* Description Block */}
                    <div className="border-t border-rose-pink/10 pt-6">
                        <h3 className="text-xs uppercase tracking-widest font-bold text-gold mb-3">Overview</h3>
                        <p className="text-sm font-light text-muted-gray leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    {/* Specifications Highlight Table */}
                    <div className="bg-cream/45 border border-rose-pink/5 rounded-2xl p-5">
                        <h3 className="text-xs uppercase tracking-widest font-bold text-gold mb-3 border-b border-rose-pink/10 pb-2">
                            Fabric & Details
                        </h3>
                        <dl className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                            <dt className="text-muted-gray uppercase tracking-widest">Fabric Material</dt>
                            <dd className="text-dark-gray font-semibold">{product.fabric}</dd>

                            <dt className="text-muted-gray uppercase tracking-widest font-normal">Authentic Drape</dt>
                            <dd className="text-dark-gray">Premium Quality Threads</dd>

                            <dt className="text-muted-gray uppercase tracking-widest font-normal">Maintenance</dt>
                            <dd className="text-dark-gray">Dry Clean Recommended</dd>
                        </dl>
                    </div>

                    {/* Selector: Sizes */}
                    {product.sizes && product.sizes.length > 0 && product.sizes[0] !== 'One Size' && (
                        <div>
                            <h3 className="text-xs uppercase tracking-widest font-bold text-gold mb-3">Select Size</h3>
                            <div className="flex gap-3">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-11 h-11 rounded-full border text-xs font-bold flex items-center justify-center transition-all ${size === selectedSize
                                            ? 'border-rose-pink bg-rose-pink text-white shadow-sm'
                                            : 'border-rose-pink/20 text-dark-gray hover:border-rose-pink/60 bg-white'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Selector: Colors */}
                    {product.colors && product.colors.length > 0 && (
                        <div>
                            <h3 className="text-xs uppercase tracking-widest font-bold text-gold mb-3">Color Options</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.colors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`px-4 py-2 border rounded-full text-xs font-semibold flex items-center gap-2 transition-all ${color === selectedColor
                                            ? 'border-gold bg-gold text-white shadow-sm'
                                            : 'border-rose-pink/10 text-dark-gray bg-cream hover:border-gold/50'
                                            }`}
                                    >
                                        {color === selectedColor && <Check className="w-3 h-3" />}
                                        <span>{color}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA WhatsApp & Share Buttons */}
                    <div className="border-t border-rose-pink/10 pt-6 mt-4">
                        <p className="text-xs text-muted-gray mb-3 italic">
                            Notice something you love? Connect with our personal stylist directly via WhatsApp or share the product layout options.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href={getWhatsAppLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-grow flex items-center justify-center gap-3 px-6 py-4 bg-[#25d366] hover:bg-[#20b857] text-white font-bold rounded-full transition-transform active:scale-98 shadow-lg hover:shadow-xl cursor-pointer"
                            >
                                <Phone className="w-5 h-5 fill-white text-[#25d366]" />
                                <span className="text-xs uppercase tracking-widest">Inquire Sizing</span>
                            </a>
                            <button
                                onClick={handleShare}
                                className="flex items-center justify-center gap-2 px-6 py-4 border border-gold hover:bg-gold text-gold hover:text-white font-bold rounded-full transition-all active:scale-98 cursor-pointer"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-5 h-5" />
                                        <span className="text-xs uppercase tracking-widest">Copied Link!</span>
                                    </>
                                ) : (
                                    <>
                                        <Share2 className="w-5 h-5" />
                                        <span className="text-xs uppercase tracking-widest">Share Product</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Related Products Panel */}
            {relatedProducts && relatedProducts.length > 0 && (
                <section className="border-t border-rose-pink/10 pt-20 mt-20">
                    <div className="text-center mb-12">
                        <span className="text-gold text-xs uppercase tracking-widest font-semibold mb-2 block">
                            Complete The Look
                        </span>
                        <h2 className="font-serif text-3xl font-bold text-dark-gray">
                            Highly Recommended Set
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            )}

            <div className="border-t border-rose-pink/10 pt-20 mt-20">
                <Testimonials />
            </div>
        </article>
    );
}
