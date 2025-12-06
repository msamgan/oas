import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import FeaturedWorkCard from '../components/ui/FeaturedWorkCard'
import Heading from '../components/ui/Heading'
import Section from '../components/ui/Section'
import { artists } from '../data/artists'
import { works } from '../data/works'
import { artistSlug, normalizeForSlug, parseArtSlug } from '../lib/slug'

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

    const relatedWorks = useMemo(() => {
        if (!artist) return []
        // Find works by artists in the same category
        const relatedArtists = artists.filter((a) => a.name !== artist.name && a.category === artist.category).slice(0, 3)
        return relatedArtists.flatMap((a) => works.filter((w) => w.author === a.name).slice(0, 1))
    }, [artist])

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
                        <p className="mb-6 text-[var(--color-muted)]">We couldn't resolve this artwork. The link may be invalid or expired.</p>
                        <Button asLink to="/artists">
                            Browse Artists
                        </Button>
                    </Container>
                </Section>
            </main>
        )
    }

    const primaryWork = artistWorks[0]

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <Section padding="lg" className="relative overflow-hidden">
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 animate-[gradient-shift_8s_ease-in-out_infinite] bg-gradient-to-br from-[rgba(255,122,24,0.08)] via-transparent to-[rgba(255,183,3,0.06)] [background-size:200%_200%]" />

                {/* Decorative Floating Orbs */}
                <div className="absolute -top-20 -right-20 h-96 w-96 animate-[float_8s_ease-in-out_infinite] rounded-full bg-gradient-to-br from-[rgba(255,122,24,0.15)] to-transparent opacity-30 blur-3xl" />
                <div
                    className="absolute -bottom-10 -left-20 h-80 w-80 animate-[float_6s_ease-in-out_infinite] rounded-full bg-gradient-to-br from-[rgba(255,183,3,0.12)] to-transparent opacity-20 blur-3xl"
                    style={{ animationDelay: '1s' }}
                />

                <Container className="relative z-10">
                    <div className="mx-auto max-w-4xl text-center">
                        <Badge
                            withDot
                            className={`mb-5 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
                        >
                            Artwork Details
                        </Badge>

                        <Heading
                            as="h1"
                            variant="hero"
                            className={`mb-3 bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent-2)] to-[var(--color-text)] bg-clip-text text-transparent transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                            style={{
                                backgroundSize: '200% auto',
                                animation: 'gradient-shift 4s ease-in-out infinite',
                                transitionDelay: '0.2s',
                            }}
                        >
                            {primaryWork ? primaryWork.title : `Artwork by ${artist.name}`}
                        </Heading>

                        <div
                            className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                            style={{ transitionDelay: '0.3s' }}
                        >
                            <p className="mb-2 text-lg">
                                by <span className="font-semibold text-[var(--color-accent)]">{artist.name}</span>
                            </p>
                            <p className="flex items-center justify-center gap-3 text-[var(--color-muted)]">
                                <span>{artist.genre}</span>
                                {artist.location && (
                                    <>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                            {artist.location}
                                        </span>
                                    </>
                                )}
                            </p>
                            {code && <p className="mt-1 text-xs text-[var(--color-muted)]">ID: {code}</p>}
                        </div>

                        <div
                            className={`mt-8 flex flex-wrap items-center justify-center gap-3.5 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                            style={{ transitionDelay: '0.4s' }}
                        >
                            <Button>Inquire About Piece</Button>
                            <Button variant="secondary" asLink to={`/artists/${artistSlug(artist.name, artist.location)}`}>
                                View Artist Profile
                            </Button>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Artwork Details Section */}
            <Section padding="lg" className="border-y border-white/[0.06]">
                <Container>
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr]">
                        {/* Artwork Display */}
                        <div
                            className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                            style={{ transitionDelay: '0.5s' }}
                        >
                            <div className="group relative aspect-[4/3] overflow-hidden rounded-[var(--radius)] border border-[rgba(255,122,24,0.15)] bg-gradient-to-br from-[#0b0b0d] via-[#1a1a1c] to-[#0f0f10] shadow-[var(--shadow-2)] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(255,122,24,0.25)]">
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,122,24,0.12)] via-transparent to-[rgba(255,183,3,0.1)] opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 animate-[shimmer_3s_linear_infinite] bg-[linear-gradient(110deg,transparent_0%,transparent_40%,rgba(255,255,255,0.05)_50%,transparent_60%,transparent_100%)] [background-size:200%_100%]" />

                                {/* Placeholder Icon */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                    <svg className="h-24 w-24 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Details Panel */}
                        <div
                            className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                            style={{ transitionDelay: '0.6s' }}
                        >
                            <Heading as="h2" variant="h3" className="mb-4">
                                About this piece
                            </Heading>
                            <p className="mb-6 leading-relaxed text-[var(--color-muted)]">
                                {primaryWork
                                    ? `${primaryWork.title} is a signature work by ${artist.name}, exemplifying their ${artist.genre.toLowerCase()} approach. This piece captures the essence of ${artist.category.toLowerCase()} art with distinctive style and mastery.`
                                    : `This piece by ${artist.name} reflects their ${artist.genre.toLowerCase()} style and represents their unique artistic vision.`}
                            </p>

                            {/* Stats Grid */}
                            <div className="mb-6 grid grid-cols-2 gap-3">
                                {[
                                    { label: 'Artist', value: artist.name },
                                    { label: 'Category', value: artist.category },
                                    { label: 'Location', value: artist.location ?? '—' },
                                    { label: 'ID', value: code ?? '—' },
                                ].map((stat, i) => (
                                    <div
                                        key={i}
                                        className="group relative overflow-hidden rounded-[var(--radius-sm)] border border-[rgba(255,122,24,0.15)] bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-4 transition-all duration-300 hover:border-[var(--color-accent)]/40 hover:bg-white/[0.06] hover:shadow-[0_4px_20px_rgba(255,122,24,0.15)]"
                                    >
                                        {/* Hover Shimmer */}
                                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-500 group-hover:translate-x-full" />

                                        <div className="relative">
                                            <span className="mb-1 block text-xs font-bold tracking-wider text-[var(--color-muted)] uppercase">
                                                {stat.label}
                                            </span>
                                            <span className="block font-semibold text-[var(--color-text)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                                                {stat.value}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3">
                                <Button className="flex-1 sm:flex-none">Add to Favorites</Button>
                                <Button variant="secondary" className="flex-1 sm:flex-none">
                                    Share
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* More from Artist Section */}
            {artistWorks.length > 1 && (
                <Section padding="lg" className="bg-gradient-to-b from-transparent to-white/[0.02]">
                    <Container>
                        <div className="mb-10 text-center">
                            <span className="mb-3 inline-block animate-[fade-in-up_0.8s_ease-out] text-xs font-bold tracking-wider text-[var(--color-accent)] uppercase">
                                Portfolio
                            </span>
                            <Heading as="h2" variant="h2" className="mb-3 animate-[fade-in-up_0.8s_ease-out]" style={{ animationDelay: '0.1s' }}>
                                More from {artist.name}
                            </Heading>
                            <p className="animate-[fade-in-up_0.8s_ease-out] text-[var(--color-muted)]" style={{ animationDelay: '0.2s' }}>
                                Explore more works by this artist
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {artistWorks.slice(0, 6).map((w, i) => (
                                <div
                                    key={`${w.title}-${i}`}
                                    className="group animate-[fade-in-up_0.8s_ease-out]"
                                    style={{ animationDelay: `${0.3 + i * 0.08}s` }}
                                >
                                    <FeaturedWorkCard
                                        title={w.title}
                                        author={w.author}
                                        animationDelay={0}
                                        className="h-full transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(255,122,24,0.2)]"
                                    />
                                </div>
                            ))}
                        </div>
                    </Container>
                </Section>
            )}

            {/* Related Works Section */}
            {relatedWorks.length > 0 && (
                <Section padding="lg" className="border-t border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent">
                    <Container>
                        <div className="mb-10 text-center">
                            <span className="mb-3 inline-block animate-[fade-in-up_0.8s_ease-out] text-xs font-bold tracking-wider text-[var(--color-accent)] uppercase">
                                Discover More
                            </span>
                            <Heading as="h2" variant="h2" className="animate-[fade-in-up_0.8s_ease-out]" style={{ animationDelay: '0.1s' }}>
                                Similar Artworks
                            </Heading>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {relatedWorks.map((work, i) => {
                                const workArtist = artists.find((a) => a.name === work.author)
                                if (!workArtist) return null

                                return (
                                    <Link
                                        key={`${work.title}-${i}`}
                                        to={`/artists/${artistSlug(workArtist.name, workArtist.location)}`}
                                        className="group relative animate-[fade-in-up_0.8s_ease-out] overflow-hidden rounded-[var(--radius)] border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-accent)]/30 hover:bg-white/[0.06] hover:shadow-[0_12px_40px_rgba(255,122,24,0.2)]"
                                        style={{ animationDelay: `${0.2 + i * 0.1}s` }}
                                    >
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/0 to-[var(--color-accent-2)]/0 opacity-0 transition-opacity duration-500 group-hover:from-[var(--color-accent)]/10 group-hover:to-[var(--color-accent-2)]/5 group-hover:opacity-100" />

                                        <div className="relative">
                                            {/* Artwork Placeholder */}
                                            <div className="mb-4 aspect-square overflow-hidden rounded-[var(--radius-sm)] bg-gradient-to-br from-[#0b0b0d] via-[#1a1a1c] to-[#0f0f10] transition-transform duration-500 group-hover:scale-105">
                                                <div className="flex h-full items-center justify-center opacity-20">
                                                    <svg
                                                        className="h-12 w-12 text-[var(--color-accent)]"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={1.5}
                                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <h3 className="mb-1 text-lg font-bold text-[var(--color-text)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                                                {work.title}
                                            </h3>
                                            <p className="text-sm text-[var(--color-muted)]">by {work.author}</p>

                                            {/* Arrow Icon */}
                                            <div className="absolute top-6 right-6 text-[var(--color-accent)] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>

                        {/* View All Button */}
                        <div className="mt-10 animate-[fade-in-up_0.8s_ease-out] text-center" style={{ animationDelay: '0.5s' }}>
                            <Button variant="secondary" asLink to="/artists">
                                Explore All Artists
                            </Button>
                        </div>
                    </Container>
                </Section>
            )}

            {/* Call to Action */}
            <Section padding="lg" className="border-t border-white/[0.06]">
                <Container>
                    <div className="relative overflow-hidden rounded-[var(--radius)] border border-white/[0.08] bg-gradient-to-br from-[rgba(255,122,24,0.12)] via-[rgba(255,183,3,0.08)] to-transparent p-12 text-center shadow-[var(--shadow-2)]">
                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 h-40 w-40 animate-[rotate_20s_linear_infinite] rounded-full bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-20 blur-2xl" />
                        <div className="absolute -bottom-10 -left-10 h-40 w-40 animate-[rotate_15s_linear_infinite] rounded-full bg-gradient-to-br from-[var(--color-accent-2)] to-transparent opacity-20 blur-2xl" />

                        <div className="relative z-10">
                            <Heading as="h2" variant="h2" className="mb-4 animate-[fade-in-up_0.8s_ease-out]">
                                Interested in This Artwork?
                            </Heading>
                            <p
                                className="mx-auto mb-8 max-w-2xl animate-[fade-in-up_0.8s_ease-out] text-lg leading-relaxed text-[var(--color-muted)]"
                                style={{ animationDelay: '0.1s' }}
                            >
                                Get in touch to discuss pricing, availability, or commissioning similar pieces from {artist.name}.
                            </p>
                            <div
                                className="flex animate-[fade-in-up_0.8s_ease-out] flex-wrap items-center justify-center gap-3.5"
                                style={{ animationDelay: '0.2s' }}
                            >
                                <Button>Contact Artist</Button>
                                <Button variant="secondary" asLink to="/artists">
                                    Browse More Artists
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
        </main>
    )
}

export default ArtDetailsPage
