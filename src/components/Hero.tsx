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
        <Section padding="lg">
            <Container className="grid grid-cols-1 gap-12 md:grid-cols-[1.1fr_0.9fr]">
                <div className="animate-[fade-in-up_0.8s_ease-out_0.2s_both]">
                    <Badge withDot>Rising artists • Contemporary works</Badge>
                    <Heading as="h1" variant="hero" className="animate-[fade-in-up_0.8s_ease-out_0.1s_both]">
                        Discover fresh voices in art
                    </Heading>
                    <p className="max-w-[60ch] animate-[fade-in-up_0.8s_ease-out_0.2s_both] text-[clamp(16px,2.1vw,18px)] text-[var(--color-muted)]">
                        Orange Art Studio is a curated platform spotlighting emerging artists across painting, digital, and mixed media. Explore
                        limited releases, support new talent, and collect what moves you.
                    </p>
                    <div className="mt-7 flex animate-[fade-in-up_0.8s_ease-out_0.3s_both] items-center gap-3.5">
                        <Button onClick={handleExplore}>Explore Collections</Button>
                        <Button variant="secondary">Submit Your Portfolio</Button>
                    </div>
                </div>
                <div className="relative animate-[slide-in-right_0.8s_ease-out_0.4s_both]">
                    <div className="animate-[float_6s_ease-in-out_infinite] overflow-hidden rounded-[var(--radius)] border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] shadow-[var(--shadow-2)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                        <ArtCanvas variant="hero" />
                        <div className="flex items-center justify-between gap-2 px-4 py-3.5">
                            <Badge variant="glow">New Drop</Badge>
                            <strong>Chromatic Echoes</strong>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    )
}

export default Hero
