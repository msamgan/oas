import ArtCanvas from './ui/ArtCanvas'
import Badge from './ui/Badge'
import Button from './ui/Button'
import Container from './ui/Container'
import Heading from './ui/Heading'
import Section from './ui/Section'

function Hero() {
    const handleExplore = () => {
        document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <Section padding="lg" className="relative">
            <Container className="grid grid-cols-1 gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
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
                <div className="relative animate-[slide-in-right_0.8s_ease-out_0.4s_both]">
                    {/* Decorative background element */}
                    <div className="from-accent/10 to-accent-2/5 absolute -top-4 -right-4 -z-10 h-full w-full rounded-(--radius) bg-linear-to-br blur-2xl" />

                    <div className="group animate-float to-surface relative overflow-hidden rounded-(--radius) border border-black/10 bg-linear-to-b from-white shadow-(--shadow-2) transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-(--shadow-hover)">
                        <ArtCanvas variant="hero" />
                        <div className="flex items-center justify-between gap-2 border-t border-black/6 bg-white/80 px-4 py-3.5 backdrop-blur-sm transition-all duration-300 group-hover:bg-white">
                            <Badge variant="glow">New Drop</Badge>
                            <strong className="group-hover:text-accent text-sm transition-colors">Chromatic Echoes</strong>
                        </div>
                    </div>

                    {/* Floating badge */}
                    <div className="text-accent absolute -top-4 -right-4 animate-[float_4s_ease-in-out_infinite_1s] rounded-full bg-white px-4 py-2 text-xs font-bold shadow-lg">
                        ✨ Trending
                    </div>
                </div>
            </Container>
        </Section>
    )
}

export default Hero
