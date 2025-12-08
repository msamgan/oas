import FeaturedGrid from '../components/FeaturedGrid'
import Hero from '../components/Hero'
import Newsletter from '../components/Newsletter'

function Home() {
    return (
        <main className="relative overflow-hidden">
            {/* Abstract Art Background Elements */}
            <div className="pointer-events-none fixed inset-0 z-0 opacity-40">
                {/* Subtle grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,122,24,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,122,24,0.03)_1px,transparent_1px)] bg-size-[80px_80px]" />

                {/* Large floating circles - enhanced sizes and blur */}
                <div className="from-accent/20 via-accent-2/10 absolute -top-32 -right-32 h-[600px] w-[600px] animate-[float_8s_ease-in-out_infinite] rounded-full bg-linear-to-br to-transparent blur-3xl" />

                {/* Medium floating circle - middle left */}
                <div className="from-accent-2/15 via-accent/10 absolute top-1/3 -left-20 h-[500px] w-[500px] animate-[float_10s_ease-in-out_infinite_2s] rounded-full bg-linear-to-tr to-transparent blur-3xl" />

                {/* Small floating circle - bottom right */}
                <div className="from-accent/25 to-accent-2/10 absolute right-20 bottom-20 h-80 w-80 animate-[float_12s_ease-in-out_infinite_4s] rounded-full bg-linear-to-tl via-transparent blur-2xl" />

                {/* Additional floating orb - center */}
                <div className="from-accent-2/20 to-accent/15 absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-[float_15s_ease-in-out_infinite_6s] rounded-full bg-linear-to-br via-transparent blur-3xl" />

                {/* Abstract geometric shapes - enhanced */}
                <svg className="absolute top-1/4 left-1/4 h-[500px] w-[500px] animate-[rotate_60s_linear_infinite] opacity-20" viewBox="0 0 200 200">
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: 'var(--color-accent)', stopOpacity: 0.3 }} />
                            <stop offset="100%" style={{ stopColor: 'var(--color-accent-2)', stopOpacity: 0.1 }} />
                        </linearGradient>
                        <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: 'var(--color-accent-2)', stopOpacity: 0.4 }} />
                            <stop offset="100%" style={{ stopColor: 'var(--color-accent)', stopOpacity: 0.15 }} />
                        </linearGradient>
                    </defs>
                    <rect x="40" y="40" width="60" height="60" fill="url(#grad1)" transform="rotate(45 70 70)" />
                    <circle cx="130" cy="70" r="30" fill="url(#grad1)" opacity="0.5" />
                    <polygon points="100,120 130,170 70,170" fill="url(#grad1)" opacity="0.6" />
                    <ellipse cx="50" cy="150" rx="25" ry="15" fill="url(#grad2)" opacity="0.4" />
                    <rect x="120" y="120" width="40" height="40" fill="url(#grad2)" opacity="0.5" />
                </svg>

                {/* Additional rotating shape - bottom left */}
                <svg className="absolute bottom-20 left-10 h-64 w-64 animate-[rotate-reverse_80s_linear_infinite] opacity-15" viewBox="0 0 100 100">
                    <defs>
                        <radialGradient id="radialGrad">
                            <stop offset="0%" style={{ stopColor: 'var(--color-accent)', stopOpacity: 0.4 }} />
                            <stop offset="100%" style={{ stopColor: 'var(--color-accent-2)', stopOpacity: 0 }} />
                        </radialGradient>
                    </defs>
                    <circle cx="50" cy="50" r="40" fill="url(#radialGrad)" />
                    <polygon points="50,20 65,45 85,50 65,55 50,80 35,55 15,50 35,45" fill="url(#grad1)" opacity="0.6" />
                </svg>

                {/* Brush stroke effects - enhanced */}
                <div
                    className="via-accent/20 absolute top-20 left-10 h-2 w-[450px] animate-[shimmer_8s_ease-in-out_infinite] bg-linear-to-r from-transparent to-transparent blur-sm"
                    style={{ transform: 'rotate(-15deg)' }}
                />
                <div
                    className="via-accent-2/20 absolute right-1/4 bottom-40 h-2 w-[500px] animate-[shimmer_10s_ease-in-out_infinite_3s] bg-linear-to-r from-transparent to-transparent blur-sm"
                    style={{ transform: 'rotate(25deg)' }}
                />
                <div
                    className="via-accent/15 absolute top-1/2 left-1/3 h-1.5 w-[300px] animate-[shimmer_12s_ease-in-out_infinite_5s] bg-linear-to-r from-transparent to-transparent blur-sm"
                    style={{ transform: 'rotate(-5deg)' }}
                />

                {/* Floating particles */}
                <div className="from-accent to-accent-2 absolute top-[20%] left-[15%] h-2 w-2 animate-[pulse_3s_ease-in-out_infinite] rounded-full bg-linear-to-r" />
                <div className="from-accent-2 to-accent absolute top-[45%] right-[20%] h-1.5 w-1.5 animate-[pulse_4s_ease-in-out_infinite_1s] rounded-full bg-linear-to-r" />
                <div className="from-accent to-accent-2 absolute bottom-[30%] left-[35%] h-2.5 w-2.5 animate-[pulse_3.5s_ease-in-out_infinite_2s] rounded-full bg-linear-to-r" />
                <div className="from-accent-2 to-accent absolute top-[65%] left-[60%] h-1 w-1 animate-[pulse_5s_ease-in-out_infinite_3s] rounded-full bg-linear-to-r" />
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
