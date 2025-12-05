import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import Heading from '../components/ui/Heading'
import Section from '../components/ui/Section'
import { artists } from '../data/artists'
import { works } from '../data/works'
import { artSlug, normalizeForSlug, parseArtSlug } from '../lib/slug'

function ArtDetailsPage() {
    const { slug = '' } = useParams()
    const [isVisible, setIsVisible] = useState(false)

    const { artistPart, code } = useMemo(() => parseArtSlug(slug), [slug])

    const artist = useMemo(() => {
        if (!artistPart) return undefined
        // Try match by name or name+location normalized, preferring exact name match
        return (
            artists.find((a) => normalizeForSlug(a.name) === artistPart) ||
            artists.find((a) => normalizeForSlug(`${a.name}-${a.location ?? ''}`) === artistPart)
        )
    }, [artistPart])

    const artistWorks = useMemo(() => (artist ? works.filter((w) => w.author === artist.name) : []), [artist])

    useEffect(() => {
        const t = setTimeout(() => setIsVisible(true), 0)
        return () => clearTimeout(t)
    }, [])

    if (!artist) {
        return (
            <main className="min-h-[60vh]">
                <Section padding="lg">
                    <Container className="text-center">
                        <Heading as="h1" variant="h3" className="mb-3">
                            Artwork Not Found
                        </Heading>
                        <p className="mb-6 text-[var(--color-muted)]">
                            We couldn't resolve this artwork. The link may be invalid or expired.
                        </p>
                        <Button asLink to="/artists">Browse Artists</Button>
                    </Container>
                </Section>
            </main>
        )
    }

    const primaryWork = artistWorks[0]

    return (
        <main className="min-h-screen">
            {/* Hero */}
            <Section padding="lg" className="relative overflow-hidden">
                <div className="absolute inset-0 animate-[gradient-shift_8s_ease-in-out_infinite] bg-gradient-to-br from-[rgba(255,122,24,0.08)] via-transparent to-[rgba(255,183,3,0.06)] [background-size:200%_200%]" />
                <Container className="relative z-10">
                    <div className="mx-auto max-w-4xl text-center">
                        <Badge withDot className={`mb-5 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                            Art Details
                        </Badge>
                        <Heading
                            as="h1"
                            variant="hero"
                            className={`mb-3 bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent-2)] to-[var(--color-text)] bg-clip-text text-transparent transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                            style={{ backgroundSize: '200% auto', animation: 'gradient-shift 4s ease-in-out infinite' }}
                        >
                            {primaryWork ? primaryWork.title : `Artwork by ${artist.name}`}
                        </Heading>
                        <p className={`text-[var(--color-muted)] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            by <span className="font-semibold text-[var(--color-accent)]">{artist.name}</span>
                            {code ? <span className="ml-2 text-xs text-[var(--color-muted)]">• id {code}</span> : null}
                        </p>
                        <div className="mt-6 flex items-center justify-center gap-3">
                            <Button variant="secondary" asLink to={`/artists/${normalizeForSlug(artist.name)}`}>
                                View Artist
                            </Button>
                            <Button>Inquire</Button>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Details section */}
            <Section padding="md">
                <Container>
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius)] border border-[rgba(255,122,24,0.15)] bg-gradient-to-br from-[#0b0b0d] via-[#1a1a1c] to-[#0f0f10] shadow-[var(--shadow-2)]">
                            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,122,24,0.12)] via-transparent to-[rgba(255,183,3,0.1)] opacity-70" />
                            <div className="absolute inset-0 animate-[shimmer_3s_linear_infinite] bg-[linear-gradient(110deg,transparent_0%,transparent_40%,rgba(255,255,255,0.05)_50%,transparent_60%,transparent_100%)] [background-size:200%_100%]" />
                        </div>
                        <div>
                            <Heading as="h2" variant="h3" className="mb-4">
                                About this piece
                            </Heading>
                            <p className="mb-4 leading-relaxed text-[var(--color-muted)]">
                                {primaryWork
                                    ? `${primaryWork.title} is a signature work by ${artist.name}, exemplifying their ${artist.genre.toLowerCase()} approach.`
                                    : `This piece by ${artist.name} reflects their ${artist.genre.toLowerCase()} style.`}
                            </p>
                            <ul className="mb-6 grid grid-cols-2 gap-3 text-sm">
                                <li className="rounded-[var(--radius)] border border-[rgba(255,122,24,0.15)] bg-[var(--color-surface)] p-3"><span className="text-[var(--color-muted)]">Artist</span><br />{artist.name}</li>
                                <li className="rounded-[var(--radius)] border border-[rgba(255,122,24,0.15)] bg-[var(--color-surface)] p-3"><span className="text-[var(--color-muted)]">Category</span><br />{artist.category}</li>
                                <li className="rounded-[var(--radius)] border border-[rgba(255,122,24,0.15)] bg-[var(--color-surface)] p-3"><span className="text-[var(--color-muted)]">Location</span><br />{artist.location ?? '—'}</li>
                                <li className="rounded-[var(--radius)] border border-[rgba(255,122,24,0.15)] bg-[var(--color-surface)] p-3"><span className="text-[var(--color-muted)]">ID</span><br />{code ?? '—'}</li>
                            </ul>
                            <div className="flex gap-3">
                                <Button>Add to Favorites</Button>
                                <Button variant="secondary">Share</Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* More from artist */}
            {artistWorks.length > 1 && (
                <Section padding="md" className="bg-gradient-to-b from-transparent to-[rgba(255,122,24,0.02)]">
                    <Container>
                        <div className="mb-6">
                            <Heading as="h3" variant="h3">
                                More from {artist.name}
                            </Heading>
                        </div>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            {artistWorks.slice(0, 4).map((w) => (
                                <Link key={w.title} to={`/art/${artSlug(artist.name)}`} className="group rounded-[var(--radius)] border border-[rgba(255,122,24,0.15)] p-4 transition-colors hover:border-[rgba(255,122,24,0.4)]">
                                    <div className="mb-2 h-36 w-full rounded-[calc(var(--radius)-6px)] bg-gradient-to-br from-[#0b0b0d] via-[#1a1a1c] to-[#0f0f10]" />
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">{w.title}</span>
                                        <span className="text-xs text-[var(--color-muted)]">by {w.author}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </Container>
                </Section>
            )}
        </main>
    )
}

export default ArtDetailsPage
