import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <main className="flex-grow flex items-center justify-center bg-cream/30 min-h-[70vh] py-24 px-4">
            <div className="max-w-md w-full text-center bg-white border border-rose-pink/5 p-10 rounded-3xl shadow-xl flex flex-col items-center">
                <span className="text-gold font-serif text-7xl font-bold mb-4 block">404</span>
                <h1 className="font-serif text-2xl font-bold text-dark-gray mb-3">Ensemble Not Found</h1>
                <p className="text-xs text-muted-gray leading-relaxed mb-8 max-w-xs font-light">
                    The luxury collections page or product you are looking for has been moved, removed, or is temporarily unavailable.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-rose-pink to-gold text-white text-xs font-semibold uppercase tracking-widest rounded-full shadow-md hover:shadow-glow transition-transform active:scale-95"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Return to Boutique</span>
                </Link>
            </div>
        </main>
    );
}
