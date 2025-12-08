import FeaturedGrid from '../components/FeaturedGrid'
import Hero from '../components/Hero'
import Newsletter from '../components/Newsletter'

function Home() {
    return (
        <main className="relative overflow-hidden">
            {/* Abstract Art Background Elements */}
            <div className="pointer-events-none fixed inset-0 z-0 opacity-40">
                {/* Large floating circle - top right */}
                <div className="from-accent/20 via-accent-2/10 absolute -top-32 -right-32 h-96 w-96 animate-[float_8s_ease-in-out_infinite] rounded-full bg-linear-to-br to-transparent blur-3xl" />

                {/* Medium floating circle - middle left */}
                <div className="from-accent-2/15 via-accent/10 absolute top-1/3 left-0 h-80 w-80 animate-[float_10s_ease-in-out_infinite_2s] rounded-full bg-linear-to-tr to-transparent blur-3xl" />

                {/* Small floating circle - bottom right */}
                <div className="from-accent/25 to-accent-2/10 absolute right-20 bottom-20 h-64 w-64 animate-[float_12s_ease-in-out_infinite_4s] rounded-full bg-linear-to-tl via-transparent blur-2xl" />

                {/* Abstract geometric shapes */}
                <svg className="absolute top-1/4 left-1/4 h-96 w-96 animate-[rotate_60s_linear_infinite] opacity-20" viewBox="0 0 200 200">
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: 'var(--color-accent)', stopOpacity: 0.3 }} />
                            <stop offset="100%" style={{ stopColor: 'var(--color-accent-2)', stopOpacity: 0.1 }} />
                        </linearGradient>
                    </defs>
                    <rect x="40" y="40" width="60" height="60" fill="url(#grad1)" transform="rotate(45 70 70)" />
                    <circle cx="130" cy="70" r="30" fill="url(#grad1)" opacity="0.5" />
                    <polygon points="100,120 130,170 70,170" fill="url(#grad1)" opacity="0.6" />
                </svg>

                {/* Brush stroke effect - top left */}
                <div
                    className="via-accent/20 absolute top-20 left-10 h-2 w-72 animate-[shimmer_8s_ease-in-out_infinite] bg-linear-to-r from-transparent to-transparent blur-sm"
                    style={{ transform: 'rotate(-15deg)' }}
                />

                {/* Brush stroke effect - bottom */}
                <div
                    className="via-accent-2/20 absolute right-1/4 bottom-40 h-2 w-96 animate-[shimmer_10s_ease-in-out_infinite_3s] bg-linear-to-r from-transparent to-transparent blur-sm"
                    style={{ transform: 'rotate(25deg)' }}
                />
            </div>

            {/* Content with higher z-index */}
            <div className="relative z-10">
                <Hero />
                <FeaturedGrid />
                <Newsletter />
            </div>
        </main>
    )
}

export default Home
