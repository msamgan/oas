import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import Heading from '../components/ui/Heading'
import Section from '../components/ui/Section'
import FeaturedWorkCard from '../components/ui/FeaturedWorkCard'
import { artists } from '../data/artists'
import { works } from '../data/works'
import { artistSlug } from '../lib/slug'

function ArtistDetailsPage() {
    const { slug } = useParams()

    const artist = useMemo(() => artists.find((a) => artistSlug(a.name, a.location) === slug), [slug])
    const artistWorks = useMemo(() => (artist ? works.filter((w) => w.author === artist.name) : []), [artist])

    if (!artist) {
        return (
            <main className="min-h-[60vh]">
                <Section padding="lg">
                    <Container className="text-center">
                        <Heading as="h1" variant="h3" className="mb-3">
                            Artist Not Found
                        </Heading>
                        <p className="mb-6 text-[var(--color-muted)]">We couldn’t find the artist you’re looking for.</p>
                        <Button asLink to="/artists">Back to Artists</Button>
                    </Container>
                </Section>
            </main>
        )
    }

    return (
        <main className="min-h-screen">
            {/* Hero */}
            <Section padding="lg" className="relative overflow-hidden">
                <div className="absolute inset-0 animate-[gradient-shift_8s_ease-in-out_infinite] bg-gradient-to-br from-[rgba(255,122,24,0.08)] via-transparent to-[rgba(255,183,3,0.06)] [background-size:200%_200%]" />
                <Container className="relative z-10">
                    <div className="mx-auto max-w-3xl text-center">
                        <Badge withDot className="mb-5">
                            Artist Profile
                        </Badge>
                        <Heading as="h1" variant="hero" className="mb-3">
                            {artist.name}
                        </Heading>
                        <p className="mb-3 text-[var(--color-accent)] font-semibold">{artist.genre}</p>
                        {artist.location && (
                            <p className="text-[var(--color-muted)]">{artist.location}</p>
                        )}
                        <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)]">{artist.bio}</p>
                        <div className="mt-8 flex items-center justify-center gap-3.5">
                            <Button asLink to="/contact">Commission Work</Button>
                            <Button variant="secondary" asLink to="#works">
                                View Works
                            </Button>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Works */}
            <Section id="works" padding="lg">
                <Container>
                    <div className="mb-8 flex items-end justify-between">
                        <div>
                            <span className="mb-2 block text-xs font-bold tracking-wider text-[var(--color-accent)] uppercase">
                                Artworks
                            </span>
                            <Heading as="h2" variant="h3">
                                {artist.name}’s Works ({artistWorks.length})
                            </Heading>
                        </div>
                        <Button variant="ghost" asLink to="/artists">
                            All Artists →
                        </Button>
                    </div>

                    {artistWorks.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
                            {artistWorks.map((w, i) => (
                                <FeaturedWorkCard key={`${w.title}-${i}`} title={w.title} author={w.author} animationDelay={i * 0.08} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-16 text-center text-[var(--color-muted)]">No works listed yet.</div>
                    )}
                </Container>
            </Section>
        </main>
    )
}

export default ArtistDetailsPage
