import { useEffect, useRef, useState } from 'react'
import ArtCanvas from './ui/ArtCanvas'
import Badge from './ui/Badge'
import Button from './ui/Button'
import Container from './ui/Container'
import Heading from './ui/Heading'
import Section from './ui/Section'

function Hero() {
    const heroRef = useRef<HTMLDivElement>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [absoluteMousePosition, setAbsoluteMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!heroRef.current) return

            const rect = heroRef.current.getBoundingClientRect()
            const x = (e.clientX - rect.left - rect.width / 2) / rect.width
            const y = (e.clientY - rect.top - rect.height / 2) / rect.height

            setMousePosition({ x, y })
            setAbsoluteMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
        }

        const heroElement = heroRef.current
        if (heroElement) {
            heroElement.addEventListener('mousemove', handleMouseMove)
        }

        return () => {
            if (heroElement) {
                heroElement.removeEventListener('mousemove', handleMouseMove)
            }
        }
    }, [])

    const handleExplore = () => {
        document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <Section ref={heroRef} padding="lg" className="relative overflow-hidden">
            {/* Cursor follower effects */}
            {absoluteMousePosition.x > 0 && (
                <>
                    <div
                        className="pointer-events-none absolute z-50 h-8 w-8 rounded-full bg-accent/30 blur-xl transition-all duration-200 ease-out"
                        style={{
                            left: `${absoluteMousePosition.x}px`,
                            top: `${absoluteMousePosition.y}px`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                    <div
                        className="pointer-events-none absolute z-50 h-16 w-16 rounded-full bg-accent-2/20 blur-2xl transition-all duration-500 ease-out"
                        style={{
                            left: `${absoluteMousePosition.x}px`,
                            top: `${absoluteMousePosition.y}px`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                    <div
                        className="pointer-events-none absolute z-50 h-4 w-4 rounded-full border-2 border-accent/50 transition-all duration-100 ease-out"
                        style={{
                            left: `${absoluteMousePosition.x}px`,
                            top: `${absoluteMousePosition.y}px`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                </>
            )}

            {/* Enhanced Hero Background */}
            <div className="pointer-events-none absolute inset-0 z-0">
                {/* Animated gradient mesh background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,122,24,0.25),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,183,3,0.22),transparent_50%),radial-gradient(circle_at_40%_80%,rgba(255,122,24,0.18),transparent_40%)]" />

                {/* Floating gradient orbs with different animations */}
                <div
                    className="from-accent/30 via-accent/20 absolute top-20 right-[15%] h-[500px] w-[500px] animate-[float_10s_ease-in-out_infinite] rounded-full bg-linear-to-br to-transparent blur-3xl transition-transform duration-300 ease-out"
                    style={{ transform: `translate(${mousePosition.x * 80}px, ${mousePosition.y * 80}px)` }}
                />
                <div
                    className="from-accent-2/25 via-accent-2/18 absolute top-40 left-[10%] h-[400px] w-[400px] animate-[float_12s_ease-in-out_infinite_2s] rounded-full bg-linear-to-tl to-transparent blur-3xl transition-transform duration-400 ease-out"
                    style={{ transform: `translate(${mousePosition.x * -60}px, ${mousePosition.y * -60}px)` }}
                />
                <div
                    className="from-accent/22 to-accent-2/18 absolute right-[25%] bottom-20 h-[350px] w-[350px] animate-[float_14s_ease-in-out_infinite_4s] rounded-full bg-linear-to-tr via-transparent blur-2xl transition-transform duration-350 ease-out"
                    style={{ transform: `translate(${mousePosition.x * 100}px, ${mousePosition.y * 100}px)` }}
                />

                {/* Subtle animated rings */}
                <div
                    className="border-accent/20 absolute top-[15%] left-[5%] h-64 w-64 animate-[rotate_40s_linear_infinite] rounded-full border-2 transition-transform duration-300 ease-out"
                    style={{ transform: `translate(${mousePosition.x * 70}px, ${mousePosition.y * 70}px) rotate(${mousePosition.x * 20}deg)` }}
                />
                <div
                    className="border-accent-2/20 absolute right-[8%] bottom-[20%] h-48 w-48 animate-[rotate-reverse_50s_linear_infinite] rounded-full border-2 transition-transform duration-300 ease-out"
                    style={{ transform: `translate(${mousePosition.x * -50}px, ${mousePosition.y * -50}px) rotate(${mousePosition.x * -20}deg)` }}
                />

                {/* Glowing dots */}
                <div
                    className="from-accent to-accent-2 absolute top-[30%] left-[20%] h-4 w-4 animate-[pulse_3s_ease-in-out_infinite] rounded-full bg-linear-to-r shadow-lg shadow-accent/30 transition-transform duration-200 ease-out"
                    style={{ transform: `translate(${mousePosition.x * 120}px, ${mousePosition.y * 120}px) scale(${1 + Math.abs(mousePosition.x) * 0.5})` }}
                />
                <div
                    className="from-accent-2 to-accent absolute top-[60%] right-[15%] h-3 w-3 animate-[pulse_4s_ease-in-out_infinite_1s] rounded-full bg-linear-to-r shadow-lg shadow-accent-2/30 transition-transform duration-250 ease-out"
                    style={{ transform: `translate(${mousePosition.x * -100}px, ${mousePosition.y * -100}px) scale(${1 + Math.abs(mousePosition.y) * 0.6})` }}
                />
                <div
                    className="from-accent to-accent-2 absolute bottom-[40%] left-[40%] h-3.5 w-3.5 animate-[pulse_3.5s_ease-in-out_infinite_2s] rounded-full bg-linear-to-r shadow-lg shadow-accent/30 transition-transform duration-200 ease-out"
                    style={{ transform: `translate(${mousePosition.x * 90}px, ${mousePosition.y * 90}px) scale(${1 + (Math.abs(mousePosition.x) + Math.abs(mousePosition.y)) * 0.4})` }}
                />

                {/* Artistic brush strokes with shimmer */}
                <div
                    className="via-accent/25 absolute top-[25%] left-0 h-2 w-[40%] animate-[shimmer_8s_ease-in-out_infinite] bg-linear-to-r from-transparent to-transparent blur-sm transition-transform duration-300 ease-out"
                    style={{ transform: `rotate(-8deg) translate(${mousePosition.x * 60}px, ${mousePosition.y * 50}px)` }}
                />
                <div
                    className="via-accent-2/22 absolute right-0 bottom-[35%] h-2 w-[35%] animate-[shimmer_10s_ease-in-out_infinite_3s] bg-linear-to-r from-transparent to-transparent blur-sm transition-transform duration-300 ease-out"
                    style={{ transform: `rotate(12deg) translate(${mousePosition.x * -60}px, ${mousePosition.y * -50}px)` }}
                />
            </div>

            <Container className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
                <div className="flex flex-col justify-center">
                    <Badge withDot className="animate-[fade-in-up_0.8s_ease-out_0s_both]">
                        Rising artists • Contemporary works
                    </Badge>
                    <Heading
                        as="h1"
                        variant="hero"
                        className="from-text via-text to-accent mt-5 animate-[fade-in-up_0.8s_ease-out_0.1s_both] bg-linear-to-br bg-clip-text text-transparent"
                    >
                        Discover fresh voices in art
                    </Heading>
                    <p className="text-muted mt-6 max-w-[60ch] animate-[fade-in-up_0.8s_ease-out_0.2s_both] text-[clamp(16px,2.1vw,18px)] leading-relaxed">
                        Orange Art Studio is a curated platform spotlighting emerging artists across painting, digital, and mixed media. Explore
                        limited releases, support new talent, and collect what moves you.
                    </p>
                    <div className="mt-8 flex animate-[fade-in-up_0.8s_ease-out_0.3s_both] flex-wrap items-center gap-4">
                        <Button
                            onClick={handleExplore}
                            className="shadow-(--color-accent)/20 shadow-lg transition-shadow hover:shadow-(--color-accent)/30 hover:shadow-xl"
                        >
                            Explore Collections
                        </Button>
                        <Button variant="secondary">Submit Your Portfolio</Button>
                    </div>

                    {/* Stats row */}
                    <div className="mt-12 flex animate-[fade-in-up_0.8s_ease-out_0.4s_both] flex-wrap gap-8 border-t border-black/6 pt-8">
                        <div>
                            <div className="text-accent text-3xl font-bold">200+</div>
                            <div className="text-muted mt-1 text-sm">Featured Artists</div>
                        </div>
                        <div>
                            <div className="text-accent text-3xl font-bold">1.5K+</div>
                            <div className="text-muted mt-1 text-sm">Artworks</div>
                        </div>
                        <div>
                            <div className="text-accent text-3xl font-bold">50+</div>
                            <div className="text-muted mt-1 text-sm">Countries</div>
                        </div>
                    </div>
                </div>
                <div
                    className="relative animate-[slide-in-right_0.8s_ease-out_0.4s_both] transition-transform duration-300 ease-out"
                    style={{
                        transform: `perspective(1000px) rotateY(${mousePosition.x * 15}deg) rotateX(${mousePosition.y * -15}deg) translateZ(${Math.abs(mousePosition.x + mousePosition.y) * 20}px)`,
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {/* Decorative background element */}
                    <div
                        className="from-accent/10 to-accent-2/5 absolute -top-4 -right-4 -z-10 h-full w-full rounded-(--radius) bg-linear-to-br blur-2xl transition-transform duration-400 ease-out"
                        style={{ transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)` }}
                    />

                    <div className="group animate-float to-surface relative overflow-hidden rounded-(--radius) border border-black/10 bg-linear-to-b from-white shadow-(--shadow-2) transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-(--shadow-hover)">
                        <ArtCanvas variant="hero" />
                        <div className="flex items-center justify-between gap-2 border-t border-black/6 bg-white/80 px-4 py-3.5 backdrop-blur-sm transition-all duration-300 group-hover:bg-white">
                            <Badge variant="glow">New Drop</Badge>
                            <strong className="group-hover:text-accent text-sm transition-colors">Chromatic Echoes</strong>
                        </div>
                    </div>

                    {/* Floating badge */}
                    <div
                        className="text-accent absolute -top-4 -right-4 animate-[float_4s_ease-in-out_infinite_1s] rounded-full bg-white px-4 py-2 text-xs font-bold shadow-lg transition-transform duration-200 ease-out"
                        style={{ transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px) scale(${1 + Math.abs(mousePosition.x) * 0.2})` }}
                    >
                        ✨ Trending
                    </div>
                </div>
            </Container>
        </Section>
    )
}

export default Hero
