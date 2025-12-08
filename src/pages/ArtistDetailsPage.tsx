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
import { artistSlug } from '../lib/slug'

function ArtistDetailsPage() {
    const { slug } = useParams()
    const [isVisible, setIsVisible] = useState(false)

    const artist = useMemo(() => artists.find((a) => artistSlug(a.name, a.location) === slug), [slug])
    const artistWorks = useMemo(() => (artist ? works.filter((w) => w.author === artist.name) : []), [artist])
    const relatedArtists = useMemo(() => {
        if (!artist) return []
        return artists
            .filter((a) => a.name !== artist.name && (a.category === artist.category || a.genre.includes(artist.genre.split(',')[0])))
            .slice(0, 3)
    }, [artist])

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 0)
        return () => clearTimeout(timer)
    }, [])

    if (!artist) {
        return (
            <main className="min-h-[60vh]">
                <Section padding="lg">
                    <Container className="text-center">
                        <Heading as="h1" variant="h3" className="mb-3">
                            Artist Not Found
                        </Heading>
                        <p className="text-muted mb-6">We couldn't find the artist you're looking for.</p>
                        <Button asLink to="/artists">
                            Back to Artists
                        </Button>
                    </Container>
                </Section>
            </main>
        )
    }

    return (
        <main className="min-h-screen">
            {/* Hero Section with Profile */}
            <Section padding="lg" className="relative overflow-hidden">
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 animate-[gradient-shift_8s_ease-in-out_infinite] bg-linear-to-br from-[rgba(255,122,24,0.04)] via-transparent to-[rgba(255,183,3,0.03)] [background-size:200%_200%]" />

                {/* Decorative Elements */}
                <div className="absolute -top-20 -right-20 h-96 w-96 animate-[float_8s_ease-in-out_infinite] rounded-full bg-linear-to-br from-[rgba(255,122,24,0.08)] to-transparent opacity-30 blur-3xl" />
                <div
                    className="absolute -bottom-10 -left-20 h-80 w-80 animate-[float_6s_ease-in-out_infinite] rounded-full bg-linear-to-br from-[rgba(255,183,3,0.06)] to-transparent opacity-20 blur-3xl"
                    style={{ animationDelay: '1s' }}
                />

                <Container className="relative z-10">
                    <div className="mx-auto max-w-4xl">
                        {/* Profile Header */}
                        <div className="text-center">
                            <Badge
                                withDot
                                className={`mb-5 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
                            >
                                Artist Profile
                            </Badge>

                            {/* Artist Avatar Placeholder */}
                            <div
                                className={`mx-auto mb-6 h-32 w-32 rounded-full bg-linear-to-br from-[var(--color-accent)] via-[var(--color-accent-2)] to-[var(--color-accent)] shadow-[0_0_50px_rgba(255,122,24,0.4)] transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
                                style={{
                                    backgroundSize: '200% 200%',
                                    animation: 'gradient-shift 3s ease-in-out infinite',
                                    transitionDelay: '0.1s',
                                }}
                            />

                            <Heading
                                as="h1"
                                variant="hero"
                                className={`mb-3 bg-linear-to-r from-[var(--color-text)] via-[var(--color-accent-2)] to-[var(--color-text)] bg-clip-text text-transparent transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                                style={{
                                    backgroundSize: '200% auto',
                                    animation: 'gradient-shift 4s ease-in-out infinite',
                                    transitionDelay: '0.2s',
                                }}
                            >
                                {artist.name}
                            </Heading>

                            <div
                                className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                                style={{ transitionDelay: '0.3s' }}
                            >
                                <p className="mb-2 text-lg font-semibold text-[var(--color-accent)]">{artist.genre}</p>
                                {artist.location && (
                                    <p className="text-muted mb-1 flex items-center justify-center gap-2">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {artist.location}
                                    </p>
                                )}
                            </div>

                            {/* Bio */}
                            <p
                                className={`text-muted mx-auto mt-6 max-w-2xl text-lg leading-relaxed transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                                style={{ transitionDelay: '0.4s' }}
                            >
                                {artist.bio}
                            </p>

                            {/* Action Buttons */}
                            <div
                                className={`mt-8 flex flex-wrap items-center justify-center gap-3.5 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                                style={{ transitionDelay: '0.5s' }}
                            >
                                <Button asLink to="/contact">
                                    Commission Work
                                </Button>
                                <Button variant="secondary" asLink to="#works">
                                    View Portfolio
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Statistics Section */}
            <Section padding="md" className="border-y border-black/[0.06] bg-linear-to-b from-transparent to-black/[0.01]">
                <Container>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                        {[
                            { label: 'Total Works', value: artist.works, delay: '0s' },
                            { label: 'Category', value: artist.category, delay: '0.1s' },
                            { label: 'Listed Works', value: artistWorks.length, delay: '0.2s' },
                            { label: 'Status', value: artist.featured ? 'Featured' : 'Active', delay: '0.3s' },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className={`group relative overflow-hidden rounded-[var(--radius)] border border-black/[0.06] bg-linear-to-br from-black/[0.02] to-white p-6 text-center backdrop-blur-sm transition-all duration-500 hover:border-[var(--color-accent)]/30 hover:bg-black/[0.04] hover:shadow-[0_8px_30px_rgba(255,122,24,0.15)] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                                style={{ transitionDelay: stat.delay }}
                            >
                                {/* Hover Shimmer Effect */}
                                <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-black/[0.05] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                                <div className="relative">
                                    <div className="mb-2 text-3xl font-extrabold text-[var(--color-text)] transition-all duration-300 group-hover:scale-110 group-hover:text-[var(--color-accent)]">
                                        {stat.value}
                                    </div>
                                    <div className="text-muted text-xs font-bold tracking-wider uppercase">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Works Gallery */}
            <Section id="works" padding="lg">
                <Container>
                    {/* Section Header */}
                    <div className="mb-12 text-center">
                        <span className="animate-fade-in-up mb-3 inline-block text-xs font-bold tracking-wider text-[var(--color-accent)] uppercase">
                            Portfolio
                        </span>
                        <Heading as="h2" variant="h2" className="animate-fade-in-up mb-3" style={{ animationDelay: '0.1s' }}>
                            Featured Artworks
                        </Heading>
                        <p className="animate-fade-in-up text-muted" style={{ animationDelay: '0.2s' }}>
                            Explore {artist.name}'s creative collection
                        </p>
                    </div>

                    {artistWorks.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
                            {artistWorks.map((w, i) => (
                                <div key={`${w.title}-${i}`} className="group animate-fade-in-up" style={{ animationDelay: `${0.3 + i * 0.08}s` }}>
                                    <FeaturedWorkCard
                                        title={w.title}
                                        author={w.author}
                                        animationDelay={0}
                                        className="h-full transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(255,122,24,0.2)]"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-[var(--radius)] border border-dashed border-black/10 bg-black/1 py-20 text-center">
                            <svg className="text-muted mx-auto mb-4 h-16 w-16 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <p className="text-muted text-lg">No artworks listed yet. Check back soon!</p>
                        </div>
                    )}
                </Container>
            </Section>

            {/* Related Artists Section */}
            {relatedArtists.length > 0 && (
                <Section padding="lg" className="border-t border-black/6 bg-linear-to-b from-black/1 to-transparent">
                    <Container>
                        <div className="mb-10 text-center">
                            <span className="animate-fade-in-up mb-3 inline-block text-xs font-bold tracking-wider text-[var(--color-accent)] uppercase">
                                Discover More
                            </span>
                            <Heading as="h2" variant="h2" className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                                Similar Artists
                            </Heading>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {relatedArtists.map((relatedArtist, i) => (
                                <Link
                                    key={relatedArtist.name}
                                    to={`/artists/${artistSlug(relatedArtist.name, relatedArtist.location)}`}
                                    className="group animate-fade-in-up relative overflow-hidden rounded-[var(--radius)] border border-black/6 bg-linear-to-br from-black/2 to-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-accent)]/30 hover:bg-black/4 hover:shadow-[0_12px_40px_rgba(255,122,24,0.2)]"
                                    style={{ animationDelay: `${0.2 + i * 0.1}s` }}
                                >
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-linear-to-br from-[var(--color-accent)]/0 to-[var(--color-accent-2)]/0 opacity-0 transition-opacity duration-500 group-hover:from-[var(--color-accent)]/10 group-hover:to-[var(--color-accent-2)]/5 group-hover:opacity-100" />

                                    <div className="relative">
                                        {/* Avatar */}
                                        <div className="mb-4 h-20 w-20 rounded-full bg-linear-to-br from-[var(--color-accent)] to-[var(--color-accent-2)] shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,122,24,0.5)]" />

                                        {/* Content */}
                                        <h3 className="mb-2 text-xl font-extrabold text-[var(--color-text)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                                            {relatedArtist.name}
                                        </h3>
                                        <p className="text-muted mb-3 text-sm">{relatedArtist.genre}</p>

                                        {/* Stats */}
                                        <div className="text-muted flex items-center gap-4 text-xs">
                                            <span className="flex items-center gap-1">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                {relatedArtist.works} works
                                            </span>
                                            {relatedArtist.location && (
                                                <span className="flex items-center gap-1">
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                        />
                                                    </svg>
                                                    {relatedArtist.location.split(',')[0]}
                                                </span>
                                            )}
                                        </div>

                                        {/* Arrow Icon */}
                                        <div className="absolute top-6 right-6 text-[var(--color-accent)] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* View All Button */}
                        <div className="animate-fade-in-up mt-10 text-center" style={{ animationDelay: '0.5s' }}>
                            <Button variant="secondary" asLink to="/artists">
                                Explore All Artists
                            </Button>
                        </div>
                    </Container>
                </Section>
            )}

            {/* Call to Action */}
            <Section padding="lg" className="border-t border-black/6">
                <Container>
                    <div className="relative overflow-hidden rounded-[var(--radius)] border border-black/8 bg-linear-to-br from-[rgba(255,122,24,0.08)] via-[rgba(255,183,3,0.05)] to-transparent p-12 text-center shadow-[var(--shadow-2)]">
                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 h-40 w-40 animate-[rotate_20s_linear_infinite] rounded-full bg-linear-to-br from-[var(--color-accent)] to-transparent opacity-20 blur-2xl" />
                        <div className="absolute -bottom-10 -left-10 h-40 w-40 animate-[rotate_15s_linear_infinite] rounded-full bg-linear-to-br from-[var(--color-accent-2)] to-transparent opacity-20 blur-2xl" />

                        <div className="relative z-10">
                            <Heading as="h2" variant="h2" className="animate-fade-in-up mb-4">
                                Interested in {artist.name}'s Work?
                            </Heading>
                            <p className="animate-fade-in-up text-muted mx-auto mb-8 max-w-2xl text-lg" style={{ animationDelay: '0.1s' }}>
                                Get in touch to discuss commissions, exhibitions, or collaborations with this talented artist.
                            </p>
                            <div className="animate-fade-in-up flex flex-wrap items-center justify-center gap-3.5" style={{ animationDelay: '0.2s' }}>
                                <Button asLink to="/contact">
                                    Contact Artist
                                </Button>
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

export default ArtistDetailsPage
