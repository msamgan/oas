import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ArtistCard from '../components/ui/ArtistCard'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import FilterButton from '../components/ui/FilterButton'
import Heading from '../components/ui/Heading'
import Section from '../components/ui/Section'
import { artists as allArtists, type Artist } from '../data/artists'
import { artistSlug } from '../lib/slug'

const defaultArtists: Artist[] = allArtists

const categories = ['All', 'Abstract', 'Contemporary', 'Digital', 'Geometric', 'Sculpture', 'Urban', 'Portrait']

function ArtistsPage({ artists = defaultArtists }: { artists?: Artist[] }) {
    const gridRef = useRef<HTMLDivElement>(null)
    const featuredRef = useRef<HTMLDivElement>(null)
    const [selectedCategory, setSelectedCategory] = useState('All')

    const filteredArtists = selectedCategory === 'All' ? artists : artists.filter((artist) => artist.category === selectedCategory)

    const featuredArtists = artists.filter((artist) => artist.featured)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            },
            { threshold: 0.1 },
        )

        const cards = gridRef.current?.querySelectorAll('.artist-card')
        cards?.forEach((card) => observer.observe(card))

        const featuredCards = featuredRef.current?.querySelectorAll('.featured-card')
        featuredCards?.forEach((card) => observer.observe(card))

        return () => observer.disconnect()
    }, [filteredArtists])

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <Section id="artists-hero" padding="lg" className="relative overflow-hidden">
                <div className="absolute inset-0 animate-[gradient-shift_8s_ease-in-out_infinite] bg-linear-to-br from-[rgba(255,122,24,0.08)] via-transparent to-[rgba(255,183,3,0.06)] bg-size-[200%_200%]" />
                <Container className="relative z-10">
                    <div className="mx-auto max-w-3xl text-center">
                        <Badge withDot className="mb-6">
                            Discover Talent
                        </Badge>
                        <Heading as="h1" variant="hero" className="animate-fade-in-up mb-5">
                            Meet Our Artists
                        </Heading>
                        <p className="text-muted mb-8 animate-[fade-in-up_0.8s_ease-out_0.1s_both] text-lg leading-relaxed md:text-xl">
                            Explore the creators behind the works. Discover emerging and established artists, their unique styles, and the mediums
                            they master.
                        </p>
                        <div className="flex animate-[fade-in-up_0.8s_ease-out_0.2s_both] items-center justify-center gap-3.5">
                            <Button>Submit Portfolio</Button>
                            <Button variant="secondary">Commission Work</Button>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Featured Artists Spotlight */}
            {featuredArtists.length > 0 && (
                <Section id="featured-artists" padding="md" className="bg-linear-to-b from-transparent to-[rgba(255,122,24,0.02)]">
                    <Container>
                        <div className="mb-8 flex animate-[fade-in-up_0.6s_ease-out] items-center justify-between">
                            <div>
                                <span className="text-accent mb-2 block text-xs font-bold tracking-wider uppercase">Featured Artists</span>
                                <Heading as="h2" variant="h3">
                                    Spotlight
                                </Heading>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" ref={featuredRef}>
                            {featuredArtists.map((artist, index) => (
                                <Link
                                    to={`/artists/${artistSlug(artist.name, artist.location)}`}
                                    key={artist.name}
                                    className="featured-card group relative animate-[fade-in-up_0.7s_ease-out_forwards] cursor-pointer overflow-hidden rounded-(--radius) border border-[rgba(255,122,24,0.15)] bg-linear-to-br from-white to-[rgba(255,122,24,0.03)] opacity-0 shadow-(--shadow-2) transition-all duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:-translate-y-3 hover:scale-[1.03] hover:border-[rgba(255,122,24,0.4)] hover:shadow-(--shadow-hover)"
                                    style={{ animationDelay: `${index * 0.15}s` }}
                                >
                                    {/* Shimmer effect overlay */}
                                    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                        <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                                    </div>

                                    {/* Featured badge */}
                                    <div className="from-accent to-accent-2 animate-float absolute top-3 right-3 z-10 rounded-full bg-linear-to-r px-2.5 py-1 text-xs font-bold text-white shadow-lg">
                                        ★ Featured
                                    </div>

                                    <div className="relative aspect-4/3 overflow-hidden bg-linear-to-br from-[#fafafa] via-[#f0f0f0] to-[#f5f5f5]">
                                        {/* Animated gradient overlay */}
                                        <div className="absolute inset-0 bg-linear-to-br from-[rgba(255,122,24,0.1)] via-transparent to-[rgba(255,183,3,0.08)] opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
                                        {/* Shimmer placeholder */}
                                        <div className="absolute inset-0 animate-[shimmer_3s_linear_infinite] bg-[linear-gradient(110deg,transparent_0%,transparent_40%,rgba(255,255,255,0.4)_50%,transparent_60%,transparent_100%)] bg-size-[200%_100%]" />
                                    </div>

                                    <div className="relative p-5">
                                        <h3 className="group-hover:text-accent mb-2 text-xl font-extrabold transition-colors duration-300">
                                            {artist.name}
                                        </h3>
                                        <p className="text-accent mb-2 text-sm font-semibold">{artist.genre}</p>
                                        <p className="text-muted mb-4 text-sm leading-relaxed">{artist.bio}</p>
                                        <div className="flex items-center justify-between border-t border-black/6 pt-3">
                                            <span className="text-muted text-xs">{artist.works} works</span>
                                            {artist.location && (
                                                <span className="text-muted flex items-center gap-1 text-xs">
                                                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </Container>
                </Section>
            )}

            {/* All Artists Section with Filters */}
            <Section id="all-artists" padding="lg">
                <Container>
                    <div className="mb-10 animate-[fade-in-up_0.6s_ease-out]">
                        <Heading as="h2" variant="h3" className="mb-6">
                            Browse All Artists
                        </Heading>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2.5">
                            {categories.map((category, index) => (
                                <FilterButton
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    isActive={selectedCategory === category}
                                    animationDelay={index * 0.05}
                                >
                                    {category}
                                </FilterButton>
                            ))}
                        </div>
                    </div>

                    {/* Artists Grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list" ref={gridRef}>
                        {filteredArtists.map((artist, index) => (
                            <Link key={`${artist.name}-${index}`} to={`/artists/${artistSlug(artist.name, artist.location)}`} className="block">
                                <ArtistCard
                                    name={artist.name}
                                    genre={artist.genre}
                                    bio={artist.bio}
                                    works={artist.works}
                                    animationDelay={index * 0.08}
                                />
                            </Link>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredArtists.length === 0 && (
                        <div className="animate-[fade-in-up_0.6s_ease-out] py-20 text-center">
                            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-black/4">
                                <svg className="text-muted h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <p className="text-muted text-lg">No artists found in this category</p>
                        </div>
                    )}
                </Container>
            </Section>

            {/* Call to Action */}
            <Section id="artists-cta" padding="md" className="bg-linear-to-br from-[rgba(255,122,24,0.04)] to-transparent">
                <Container>
                    <div className="animate-fade-in-up mx-auto max-w-2xl py-12 text-center">
                        <Heading as="h2" variant="h3" className="mb-4">
                            Are You an Artist?
                        </Heading>
                        <p className="text-muted mb-8 text-lg leading-relaxed">
                            Join our community of talented artists. Share your portfolio and connect with collectors worldwide.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <Button>Apply Now</Button>
                            <Button variant="secondary">Learn More</Button>
                        </div>
                    </div>
                </Container>
            </Section>
        </main>
    )
}

export default ArtistsPage
