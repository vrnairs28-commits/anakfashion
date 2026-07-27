import Image from 'next/image';

interface InstaPost {
    id: number;
    image: string;
    likes: string;
    comments: string;
}

const instaPosts: InstaPost[] = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
        likes: "1.2k",
        comments: "45"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80",
        likes: "940",
        comments: "28"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
        likes: "2.1k",
        comments: "98"
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
        likes: "850",
        comments: "32"
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
        likes: "1.8k",
        comments: "74"
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80",
        likes: "3.2k",
        comments: "155"
    }
];

export default function InstagramGallery() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="text-gold text-xs uppercase tracking-widest font-semibold mb-2 block">
                        Follow Our Journey
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl text-dark-gray font-bold mb-4">
                        @anakhfashion9
                    </h2>
                    <p className="text-sm text-muted-gray max-w-md mx-auto font-light">
                        Stay updated with our latest design launches, behind-the-scenes stories, and community events on Instagram.
                    </p>
                </div>

                {/* Masonry Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {instaPosts.map((post) => (
                        <a
                            key={post.id}
                            href="https://instagram.com/anakhfashion9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg bg-cream"
                        >
                            <Image
                                src={post.image}
                                alt={`Instagram style post ${post.id}`}
                                fill
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                                className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                            />

                            {/* Glassmorphic hover details overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 text-white text-xs font-semibold">
                                <div className="flex items-center gap-1">
                                    <span>❤️</span> <span>{post.likes}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span>💬</span> <span>{post.comments}</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
