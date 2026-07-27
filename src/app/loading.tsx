export default function Loading() {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 min-h-screen">
            {/* Skeleton Breadcrumbs */}
            <div className="h-4 w-40 bg-zinc-200 rounded animate-pulse mb-8" />

            {/* Main Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Skeleton Sidebar - 3 cols */}
                <div className="lg:col-span-3 space-y-6 hidden lg:block">
                    <div className="h-8 w-24 bg-zinc-200 rounded animate-pulse mb-4" />
                    <div className="space-y-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-6 w-full bg-zinc-100 rounded animate-pulse" />
                        ))}
                    </div>
                    <div className="h-10 w-full bg-zinc-100 rounded animate-pulse mt-6" />
                </div>

                {/* Skeleton Catalog Grid - 9 cols */}
                <div className="lg:col-span-9 flex-grow">
                    {/* Skeleton Strip */}
                    <div className="h-16 w-full bg-cream border border-rose-pink/5 rounded-2xl animate-pulse mb-8" />

                    {/* Skeleton Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="bg-white border border-rose-pink/5 rounded-2xl p-4 space-y-4 shadow-sm"
                            >
                                {/* Image display placeholder */}
                                <div className="aspect-[3/4] bg-zinc-100 rounded-xl animate-pulse" />
                                {/* Details placeholders */}
                                <div className="space-y-2">
                                    <div className="h-4 w-1/3 bg-zinc-100 rounded animate-pulse" />
                                    <div className="h-6 w-3/4 bg-zinc-200 rounded animate-pulse" />
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <div className="h-6 w-20 bg-zinc-100 rounded animate-pulse" />
                                    <div className="h-8 w-8 rounded-full bg-zinc-200 animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    );
}
