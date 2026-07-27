import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import Testimonials from '@/components/Testimonials';
import InstagramGallery from '@/components/InstagramGallery';
import { getProducts } from '@/utils/excelParser';
import { ArrowRight } from 'lucide-react';

export const revalidate = 3600; // Revalidate page hourly

export default async function Home() {
  const products = getProducts();

  // Get 4 products for New Arrivals (e.g. Sarees or any category first items)
  const newArrivals = products.slice(0, 4);

  const categories = [
    {
      name: 'Sarees',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
      description: 'Elegant Banarasi, Kanjeevaram, and Organza weaves',
      href: '/products?category=Sarees'
    },
    {
      name: 'Kurtis',
      image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=600&q=80',
      description: 'Comfortable organic cottons & festive straight cuts',
      href: '/products?category=Kurtis'
    },
    {
      name: 'Salwars',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80',
      description: 'Stunning sharara, palazzo, and Patiala sets',
      href: '/products?category=Salwars'
    },
    {
      name: 'Dresses',
      image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80',
      description: 'Modern luxury maxi and evening satin dresses',
      href: '/products?category=Dresses'
    },
    {
      name: 'Tops',
      image: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=600&q=80',
      description: 'Embroidered chiffon, peplum tunics, and lace blouses',
      href: '/products?category=Tops'
    },
    {
      name: 'Ethnic Wear',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
      description: 'Exquisite silk lehengas and hand-painted gowns',
      href: '/products?category=Ethnic%20Wear'
    }
  ];

  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.071 18.071L6 21l3.071-3.071m5.858 0L18 21l-3.071-3.071" />
        </svg>
      ),
      title: "Premium Quality",
      description: "Directly sourced handlooms and premium mulberry silks crafted by traditional artisans."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l-.813-5.096L3 15l5.096-.813L9 9l.813 5.096L15 15l-5.187.904zM19.071 4.929l-.39.975-.975.39.975.39.39.975.39-.975.975-.39-.975-.39-.39-.975z" />
        </svg>
      ),
      title: "Latest Designs",
      description: "Constantly updated catalog reflecting pure boutique freshness and emerging runways."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 8.25l-5.5 5.5v5.25H9.25l5.5-5.5M9.5 8.25L14.75 3L20 8.25l-5.25 5.25M9.5 8.25l5.25 5.25" />
        </svg>
      ),
      title: "Affordable Pricing",
      description: "Luxury custom garments made accessible through zero middleman distribution schemas."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
      title: "Trusted Boutique",
      description: "Highly rated personalized assistance on sizing configurations and details via WhatsApp."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Featured Categories */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold text-xs uppercase tracking-widest font-semibold mb-2 block">
              Curated Collections
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-dark-gray font-bold">
              Shop by Category
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group relative h-[380px] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-rose-pink/5 block bg-zinc-950 transition-all duration-350"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center scale-100 group-hover:scale-105 opacity-65 group-hover:opacity-75 transition-all duration-700"
                />

                {/* Visual content overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8">
                  <h3 className="font-serif text-2xl md:text-3xl text-white font-bold mb-2 group-hover:text-gold transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-cream/80 text-xs font-light tracking-wide line-clamp-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. New Arrivals */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-gold text-xs uppercase tracking-widest font-semibold mb-2 block">
                Fresh Off The Loom
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-dark-gray font-bold">
                New Arrivals
              </h2>
            </div>
            <Link
              href="/products"
              className="group flex items-center md:justify-end gap-2 text-xs font-bold uppercase tracking-widest text-rose-pink hover:text-gold transition-colors mt-4 md:mt-0"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Collection (Large Banner) */}
      <section className="relative py-32 overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1920&q=80"
            alt="Royal Heritage Banner Decor"
            fill
            className="object-cover object-center opacity-30 transform hover:scale-102 transition-transform duration-10000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-zinc-950 z-1" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="text-gold text-xs uppercase tracking-widest font-bold mb-4 block">
            Signature Design Edition
          </span>
          <h2 className="font-serif text-3xl md:text-6xl font-bold tracking-wide leading-tight mb-6">
            The Royal Heritage <br />
            Embroidery
          </h2>
          <p className="text-sm md:text-base text-cream/70 font-light max-w-xl mx-auto leading-relaxed mb-10">
            A premium collection utilizing centuries-old Zardozi and intricate handloom techniques. Created with genuine gold and silver metallic wire embellishments on plush pure silk bases.
          </p>
          <Link
            href="/products?category=Ethnic%20Wear"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-dark-gray hover:bg-gold hover:text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg transition-all duration-300"
          >
            <span>Browse Heritage Edition</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold text-xs uppercase tracking-widest font-semibold mb-2 block">
              The Aura Distinction
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-dark-gray font-bold">
              Why Shop With Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-8 bg-cream/30 hover:bg-cream/60 border border-rose-pink/5 hover:border-gold/15 rounded-2xl transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-cream border border-gold/25 flex items-center justify-center mb-6 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-dark-gray mb-3">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-gray leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <Testimonials />

      {/* 7. Instagram Style Gallery */}
      <InstagramGallery />
    </div>
  );
}

