import { useEffect, useRef, useState } from 'react'
import Badge from './ui/Badge.tsx'
import Container from './ui/Container'
import FeaturedWorkCard from './ui/FeaturedWorkCard'
import FilterButton from './ui/FilterButton'
import Heading from './ui/Heading'
import Icon from './ui/Icon'
import Section from './ui/Section'

type FeaturedItem = { title: string; author: string; category?: string; featured?: boolean }

const defaultItems: FeaturedItem[] = [
    { title: 'Nocturne Study', author: 'Aya Kim', category: 'Abstract', featured: true },
    { title: 'Orange Bloom', author: 'Leo Martinez', category: 'Contemporary', featured: true },
    { title: 'City Drift', author: 'Mara Chen', category: 'Urban', featured: false },
    { title: 'Sun Mosaic', author: 'Yusuf Rahman', category: 'Abstract', featured: false },
    { title: 'Signals', author: 'Nora Singh', category: 'Digital', featured: false },
    { title: 'Soft Static', author: 'Iris Park', category: 'Contemporary', featured: false },
]

const categories = ['All', 'Abstract', 'Contemporary', 'Urban', 'Digital'] as const
type Category = (typeof categories)[number]

type ViewMode = 'grid' | 'masonry'

function FeaturedGrid({ items = defaultItems }: { items?: FeaturedItem[] }) {
    const gridRef = useRef<HTMLDivElement>(null)
    const [activeCategory, setActiveCategory] = useState<Category>('All')
    // View mode is currently static; keep as a constant until a toggle is introduced
    const viewMode: ViewMode = 'grid'

    const filteredItems = activeCategory === 'All' ? items : items.filter((item) => item.category === activeCategory)

    // Separate featured and regular items
    const featuredItems = filteredItems.filter((item) => item.featured)
    const regularItems = filteredItems.filter((item) => !item.featured)

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

        const cards = gridRef.current?.querySelectorAll('.card')
        cards?.forEach((card) => observer.observe(card))

        return () => observer.disconnect()
    }, [filteredItems])

    return (
        <Section id="featured" padding="md" className="relative">
            {/* Decorative background elements */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
                <div className="from-accent/10 to-accent-2/5 absolute top-20 -left-20 h-64 w-64 animate-[float_15s_ease-in-out_infinite] rounded-full bg-linear-to-br blur-3xl" />
                <div className="from-accent-2/10 to-accent/5 absolute top-1/2 -right-20 h-80 w-80 animate-[float_20s_ease-in-out_infinite_5s] rounded-full bg-linear-to-tl blur-3xl" />
            </div>

            <Container>
                {/* Header */}
                <div className="mb-10 text-center">
                    <Badge withDot className="animate-[fade-in-up_0.8s_ease-out_0s_both]">
                        Curated Collection
                    </Badge>
                    <Heading as="h2" variant="h2" className="animate-fade-in-up mx-auto max-w-3xl">
                        Featured works
                    </Heading>
                    <p className="text-muted mx-auto mt-4 max-w-2xl animate-[fade-in-up_0.8s_ease-out_0.1s_both] text-lg">
                        Hand-picked pieces from artists we believe in. Each work tells a unique story and showcases exceptional creativity.
                    </p>
                </div>

                {/* Filter & View Controls */}
                <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
                    {/* Category Filters */}
                    <div className="flex animate-[fade-in-up_0.8s_ease-out_0.2s_both] flex-wrap items-center justify-center gap-2.5">
                        {categories.map((category) => (
                            <FilterButton key={category} isActive={activeCategory === category} onClick={() => setActiveCategory(category)}>
                                {category}
                            </FilterButton>
                        ))}
                    </div>
                </div>

                {/* Featured Spotlight - First Two Items */}
                {featuredItems.length > 0 && (
                    <div className="mb-8">
                        <div className="mb-4 flex items-center gap-2">
                            <span className="text-accent text-sm font-bold tracking-wider uppercase">✨ Spotlight</span>
                            <div className="bg-accent/20 h-px flex-1" />
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2" role="list">
                            {featuredItems.slice(0, 2).map((item, index) => (
                                <FeaturedWorkCard
                                    key={item.title}
                                    title={item.title}
                                    author={item.author}
                                    animationDelay={index * 0.1}
                                    variant="featured"
                                    badge={<Badge variant="featured">Featured</Badge>}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Main Grid */}
                <div
                    className={`mt-10 grid gap-6 ${
                        viewMode === 'grid'
                            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 [&>*:nth-child(3n+1)]:sm:col-span-2 [&>*:nth-child(3n+1)]:lg:col-span-1'
                    }`}
                    role="list"
                    ref={gridRef}
                >
                    {regularItems.map((item, index) => (
                        <FeaturedWorkCard
                            key={item.title}
                            title={item.title}
                            author={item.author}
                            animationDelay={(featuredItems.length > 0 ? 0.2 : 0) + index * 0.1}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {filteredItems.length === 0 && (
                    <div className="text-muted py-20 text-center">
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-black/5">
                            <Icon name="search" className="h-8 w-8" />
                        </div>
                        <p className="text-lg font-semibold">No artworks found in this category</p>
                        <p className="mt-2 text-sm">Try selecting a different category</p>
                    </div>
                )}

                {/* View All Link */}
                <div className="mt-14 text-center">
                    <a
                        href="/artists"
                        className="text-accent group inline-flex items-center gap-2.5 text-lg font-semibold transition-all duration-300 hover:gap-3.5"
                    >
                        Explore all artworks
                        <span className="group-hover:bg-accent inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(255,122,24,0.1)] transition-all duration-300 group-hover:text-white group-hover:shadow-lg">
                            →
                        </span>
                    </a>
                </div>
            </Container>
        </Section>
    )
}

export type { FeaturedItem }
export default FeaturedGrid
