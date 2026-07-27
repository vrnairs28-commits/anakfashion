'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import { Search, SlidersHorizontal, ArrowUpDown, Grid, List, RefreshCw, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductsClientProps {
    initialProducts: Product[];
    selectedCategoryFromParams?: string;
    searchFromParams?: string;
}

export default function ProductsClient({
    initialProducts,
    selectedCategoryFromParams = '',
    searchFromParams = ''
}: ProductsClientProps) {
    // Filters State
    const [searchQuery, setSearchQuery] = useState(searchFromParams);
    const [selectedCategory, setSelectedCategory] = useState(selectedCategoryFromParams);
    const [selectedFabric, setSelectedFabric] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedAvailability, setSelectedAvailability] = useState('');
    const [maxPrice, setMaxPrice] = useState(20000); // Max starting price bounds
    const [sortBy, setSortBy] = useState('newest'); // newest, price-asc, price-desc, name-asc

    // Layout State
    const [isGridMode, setIsGridMode] = useState(true);
    const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(8);

    // Derive filter options dynamically from data
    const categories = useMemo(() => {
        const set = new Set(initialProducts.map(p => p.category));
        return Array.from(set);
    }, [initialProducts]);

    const fabrics = useMemo(() => {
        const set = new Set(initialProducts.map(p => p.fabric));
        return Array.from(set);
    }, [initialProducts]);

    const colors = useMemo(() => {
        const allColors = initialProducts.flatMap(p => p.colors);
        return Array.from(new Set(allColors));
    }, [initialProducts]);

    const maxProductPrice = useMemo(() => {
        if (initialProducts.length === 0) return 20000;
        return Math.max(...initialProducts.map(p => p.price));
    }, [initialProducts]);

    // Handle resetting all filters
    const handleResetFilters = () => {
        setSearchQuery('');
        setSelectedCategory('');
        setSelectedFabric('');
        setSelectedColor('');
        setSelectedAvailability('');
        setMaxPrice(maxProductPrice);
        setSortBy('newest');
        setVisibleCount(8);
    };

    // Perform client-side filtering and sorting
    const filteredProducts = useMemo(() => {
        return initialProducts
            .filter(product => {
                // Search text filter
                if (searchQuery.trim()) {
                    const query = searchQuery.toLowerCase();
                    const matchName = product.name.toLowerCase().includes(query);
                    const matchDescription = product.description.toLowerCase().includes(query);
                    const matchFabric = product.fabric.toLowerCase().includes(query);
                    const matchCat = product.category.toLowerCase().includes(query);
                    if (!matchName && !matchDescription && !matchFabric && !matchCat) return false;
                }

                // Category filter
                if (selectedCategory && product.category !== selectedCategory) return false;

                // Fabric filter
                if (selectedFabric && product.fabric !== selectedFabric) return false;

                // Availability filter
                if (selectedAvailability && product.availability !== selectedAvailability) return false;

                // Color filter
                if (selectedColor && !product.colors.includes(selectedColor)) return false;

                // Price range filter
                if (product.price > maxPrice) return false;

                return true;
            })
            .sort((a, b) => {
                switch (sortBy) {
                    case 'price-asc':
                        return a.price - b.price;
                    case 'price-desc':
                        return b.price - a.price;
                    case 'name-asc':
                        return a.name.localeCompare(b.name);
                    case 'newest':
                    default:
                        // Settle on ID numeric sort as placeholder for newest
                        return b.id.localeCompare(a.id);
                }
            });
    }, [initialProducts, searchQuery, selectedCategory, selectedFabric, selectedColor, selectedAvailability, maxPrice, sortBy]);

    const productsToShow = filteredProducts.slice(0, visibleCount);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 min-h-screen">
            {/* Visual Breadcrumb navigation */}
            <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-gray mb-8">
                <Link href="/" className="hover:text-rose-pink transition-colors">Home</Link>
                <span>/</span>
                <span className="text-rose-pink font-semibold">Catalog</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* FILTERS PANEL (Desktop Sidebar & Responsive Mobile Drawer) */}
                <aside className={`w-full lg:w-64 shrink-0 lg:block ${isFilterSidebarOpen ? 'block' : 'hidden md:hidden lg:block'}`}>
                    <div className="bg-cream/40 border border-rose-pink/5 rounded-2xl p-6 sticky top-28">
                        <div className="flex items-center justify-between border-b border-rose-pink/10 pb-4 mb-6">
                            <h3 className="font-serif text-lg font-bold text-dark-gray flex items-center gap-2">
                                <SlidersHorizontal className="w-4 h-4 text-gold" />
                                <span>Filters</span>
                            </h3>
                            <button
                                onClick={handleResetFilters}
                                className="text-[10px] uppercase tracking-widest text-rose-pink hover:text-gold font-bold flex items-center gap-1 transition-colors"
                            >
                                <RefreshCw className="w-3 h-3" />
                                <span>Reset</span>
                            </button>
                        </div>

                        {/* Categories */}
                        <div className="mb-6">
                            <h4 className="text-xs uppercase tracking-widest font-bold text-gold mb-3">Categories</h4>
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => setSelectedCategory('')}
                                    className={`text-left text-sm py-1.5 px-3 rounded-lg transition-all ${selectedCategory === ''
                                        ? 'bg-rose-pink text-white font-medium shadow-sm'
                                        : 'text-dark-gray hover:bg-rose-pink/5 hover:text-rose-pink'
                                        }`}
                                >
                                    All Categories
                                </button>
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`text-left text-sm py-1.5 px-3 rounded-lg transition-all ${selectedCategory === cat
                                            ? 'bg-rose-pink text-white font-medium shadow-sm'
                                            : 'text-dark-gray hover:bg-rose-pink/5 hover:text-rose-pink'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Slider */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-3">
                                <h4 className="text-xs uppercase tracking-widest font-bold text-gold">Max Price</h4>
                                <span className="text-xs font-semibold text-rose-pink">₹{maxPrice.toLocaleString('en-IN')}</span>
                            </div>
                            <input
                                type="range"
                                min="1000"
                                max={maxProductPrice}
                                step="500"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                className="w-full h-1.5 bg-rose-pink/10 rounded-lg appearance-none cursor-pointer accent-rose-pink focus:outline-none"
                            />
                            <div className="flex justify-between text-[10px] text-muted-gray mt-1">
                                <span>₹1,000</span>
                                <span>₹{maxProductPrice.toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        {/* Fabrics */}
                        <div className="mb-6">
                            <h4 className="text-xs uppercase tracking-widest font-bold text-gold mb-3">Fabrics</h4>
                            <div className="flex flex-col gap-2">
                                <select
                                    value={selectedFabric}
                                    onChange={(e) => setSelectedFabric(e.target.value)}
                                    className="w-full bg-white border border-rose-pink/10 rounded-lg p-2 text-sm text-dark-gray focus:outline-none focus:border-rose-pink"
                                >
                                    <option value="">All Fabrics</option>
                                    {fabrics.map(fab => (
                                        <option key={fab} value={fab}>{fab}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Colors */}
                        <div className="mb-6">
                            <h4 className="text-xs uppercase tracking-widest font-bold text-gold mb-3">Colors</h4>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setSelectedColor('')}
                                    className={`text-xs px-2.5 py-1.5 rounded-full border transition-all ${selectedColor === ''
                                        ? 'border-gold bg-gold text-white font-medium shadow-sm'
                                        : 'border-rose-pink/15 text-dark-gray bg-white'
                                        }`}
                                >
                                    All Colors
                                </button>
                                {colors.map(col => (
                                    <button
                                        key={col}
                                        onClick={() => setSelectedColor(col)}
                                        className={`text-xs px-2.5 py-1.5 rounded-full border transition-all ${selectedColor === col
                                            ? 'border-gold bg-gold text-white font-medium shadow-sm'
                                            : 'border-rose-pink/15 text-dark-gray bg-white hover:border-gold/50'
                                            }`}
                                    >
                                        {col}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Availability */}
                        <div>
                            <h4 className="text-xs uppercase tracking-widest font-bold text-gold mb-3">Availability</h4>
                            <div className="flex flex-col gap-2">
                                {['', 'In Stock', 'Low Stock', 'Out of Stock'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setSelectedAvailability(status)}
                                        className={`text-left text-xs py-1.5 px-3 rounded-lg transition-all ${selectedAvailability === status
                                            ? 'bg-rose-pink/10 text-rose-pink font-semibold border-l-2 border-rose-pink pl-2.5'
                                            : 'text-dark-gray hover:bg-rose-pink/5 hover:text-rose-pink'
                                            }`}
                                    >
                                        {status === '' ? 'All Products' : status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* CATALOG RESULTS DISPLAY */}
                <main className="flex-grow">
                    {/* CONTROL STRIP (Search, sort, view toggler, mobile triggers) */}
                    <div className="bg-cream/40 border border-rose-pink/5 rounded-2xl p-5 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Search Input bar */}
                        <div className="relative flex-grow max-w-md">
                            <input
                                type="text"
                                placeholder="Search collection details..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-rose-pink/10 focus:outline-none focus:border-rose-pink text-sm text-dark-gray rounded-xl"
                            />
                            <Search className="w-4 h-4 text-gold absolute left-3 top-3.5" />
                        </div>

                        {/* Sort/Layout selectors */}
                        <div className="flex items-center gap-3 justify-between md:justify-end">
                            {/* Mobile Filter Toggle */}
                            <button
                                onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
                                className="flex lg:hidden items-center gap-2 px-4 py-2.5 border border-rose-pink/10 hover:border-rose-pink bg-white hover:bg-cream rounded-xl text-xs font-semibold uppercase tracking-widest text-dark-gray transition-all active:scale-95"
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                <span>Filters</span>
                            </button>

                            {/* Sort selector */}
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="appearance-none bg-white border border-rose-pink/10 hover:border-rose-pink rounded-xl pl-4 pr-10 py-2.5 text-xs font-semibold uppercase tracking-widest text-dark-gray focus:outline-none transition-colors"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                    <option value="name-asc">Alphabetical A-Z</option>
                                </select>
                                <ArrowUpDown className="w-3.5 h-3.5 text-gold absolute right-3 top-3.5 pointer-events-none" />
                            </div>

                            {/* Grid / List Toggler */}
                            <div className="hidden sm:flex border border-rose-pink/10 rounded-xl overflow-hidden bg-white p-1 shrink-0">
                                <button
                                    onClick={() => setIsGridMode(true)}
                                    className={`p-2 rounded-lg transition-colors ${isGridMode
                                        ? 'bg-rose-pink text-white shadow-sm'
                                        : 'text-muted-gray hover:text-dark-gray'
                                        }`}
                                    aria-label="Grid View"
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setIsGridMode(false)}
                                    className={`p-2 rounded-lg transition-colors ${!isGridMode
                                        ? 'bg-rose-pink text-white shadow-sm'
                                        : 'text-muted-gray hover:text-dark-gray'
                                        }`}
                                    aria-label="List View"
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ACTIVE FILTER BADGES */}
                    {(selectedCategory || selectedFabric || selectedColor || selectedAvailability || searchQuery) && (
                        <div className="flex flex-wrap gap-2 items-center mb-6">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-gold mr-2">Active:</span>
                            {searchQuery && (
                                <span className="text-xs bg-rose-pink/5 text-rose-pink border border-rose-pink/10 pl-2.5 pr-1.5 py-1 rounded-full flex items-center gap-1">
                                    <span>Search: &ldquo;{searchQuery}&rdquo;</span>
                                    <X className="w-3 h-3 cursor-pointer hover:text-dark-gray" onClick={() => setSearchQuery('')} />
                                </span>
                            )}
                            {selectedCategory && (
                                <span className="text-xs bg-rose-pink/5 text-rose-pink border border-rose-pink/10 pl-2.5 pr-1.5 py-1 rounded-full flex items-center gap-1">
                                    <span>Category: {selectedCategory}</span>
                                    <X className="w-3 h-3 cursor-pointer hover:text-dark-gray" onClick={() => setSelectedCategory('')} />
                                </span>
                            )}
                            {selectedFabric && (
                                <span className="text-xs bg-rose-pink/5 text-rose-pink border border-rose-pink/10 pl-2.5 pr-1.5 py-1 rounded-full flex items-center gap-1">
                                    <span>Fabric: {selectedFabric}</span>
                                    <X className="w-3 h-3 cursor-pointer hover:text-dark-gray" onClick={() => setSelectedFabric('')} />
                                </span>
                            )}
                            {selectedColor && (
                                <span className="text-xs bg-rose-pink/5 text-rose-pink border border-rose-pink/10 pl-2.5 pr-1.5 py-1 rounded-full flex items-center gap-1">
                                    <span>Color: {selectedColor}</span>
                                    <X className="w-3 h-3 cursor-pointer hover:text-dark-gray" onClick={() => setSelectedColor('')} />
                                </span>
                            )}
                            {selectedAvailability && (
                                <span className="text-xs bg-rose-pink/5 text-rose-pink border border-rose-pink/10 pl-2.5 pr-1.5 py-1 rounded-full flex items-center gap-1">
                                    <span>Availability: {selectedAvailability}</span>
                                    <X className="w-3 h-3 cursor-pointer hover:text-dark-gray" onClick={() => setSelectedAvailability('')} />
                                </span>
                            )}
                        </div>
                    )}

                    {/* CATALOG GRID LAYOUT */}
                    {filteredProducts.length === 0 ? (
                        /* EMPTY STATE */
                        <div className="flex flex-col items-center justify-center text-center py-24 bg-cream/10 border border-dashed border-rose-pink/20 rounded-3xl">
                            <div className="w-16 h-16 rounded-full bg-cream border border-gold/15 flex items-center justify-center mb-6">
                                <Search className="w-6 h-6 text-gold" />
                            </div>
                            <h3 className="font-serif text-xl font-bold text-dark-gray mb-2">No Ensembles Found</h3>
                            <p className="text-xs text-muted-gray max-w-sm leading-relaxed mb-6 font-light">
                                We couldn&apos;t find any products matching your selected criteria. Try adjusting your settings or search query.
                            </p>
                            <button
                                onClick={handleResetFilters}
                                className="px-6 py-2.5 bg-gradient-to-r from-rose-pink to-gold text-white text-xs font-semibold uppercase tracking-widest rounded-full transition-transform active:scale-95 shadow-md"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    ) : (
                        /* PRODUCT TILES */
                        <div>
                            {isGridMode ? (
                                /* GRID CARD VIEW */
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {productsToShow.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                /* LIST ITEM VIEW */
                                <div className="flex flex-col gap-4">
                                    {productsToShow.map((product) => (
                                        <div
                                            key={product.id}
                                            className="group flex flex-col sm:flex-row bg-white border border-rose-pink/5 rounded-2xl overflow-hidden hover:shadow-lg transition-all"
                                        >
                                            <div className="relative w-full sm:w-48 aspect-[3/4] sm:aspect-square shrink-0 bg-cream">
                                                <ProductCardImage src={product.image} name={product.name} />
                                            </div>
                                            <div className="p-6 flex-grow flex flex-col justify-between">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-[10px] uppercase font-bold tracking-widest text-rose-pink">
                                                            {product.category}
                                                        </span>
                                                        <span className="text-muted-gray text-xs">•</span>
                                                        <span className="text-xs text-muted-gray font-medium">
                                                            {product.fabric}
                                                        </span>
                                                    </div>
                                                    <h3 className="font-serif text-lg font-bold text-dark-gray group-hover:text-rose-pink transition-colors">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-xs text-muted-gray font-light line-clamp-2 mt-2 leading-relaxed">
                                                        {product.description}
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-between border-t border-rose-pink/5 pt-4 mt-4">
                                                    <span className="font-serif text-lg font-bold text-dark-gray">
                                                        ₹{product.price.toLocaleString('en-IN')}
                                                    </span>
                                                    <Link
                                                        href={`/products/${product.id}`}
                                                        className="text-xs font-bold uppercase tracking-widest text-gold hover:text-rose-pink transition-colors flex items-center gap-1"
                                                    >
                                                        <span>Inspect Ensembles</span>
                                                        <span>→</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* PAGINATION / LOAD MORE CAPABILITIES */}
                            {filteredProducts.length > visibleCount && (
                                <div className="mt-12 text-center">
                                    <button
                                        onClick={() => setVisibleCount(prev => prev + 6)}
                                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-cream/70 hover:bg-cream border border-gold/25 hover:border-rose-pink text-dark-gray text-xs font-semibold uppercase tracking-widest rounded-full shadow-sm hover:shadow-md transition-all active:scale-95"
                                    >
                                        <span>Load More Ensembles</span>
                                        <span>({filteredProducts.length - visibleCount} remaining)</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

// Internal small helper to enable clean SSR images lazy loading
function ProductCardImage({ src, name }: { src: string; name: string }) {
    return (
        <Image
            src={src}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, 20vw"
            className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
        />
    );
}
