import { useEffect, useRef } from 'react'
import Badge from './ui/Badge.tsx'
import Container from './ui/Container'
import FeaturedWorkCard from './ui/FeaturedWorkCard'
import Heading from './ui/Heading'
import Section from './ui/Section'

type FeaturedItem = { title: string; author: string }

const defaultItems: FeaturedItem[] = [
    { title: 'Nocturne Study', author: 'Aya Kim' },
    { title: 'Orange Bloom', author: 'Leo Martinez' },
    { title: 'City Drift', author: 'Mara Chen' },
    { title: 'Sun Mosaic', author: 'Yusuf Rahman' },
    { title: 'Signals', author: 'Nora Singh' },
    { title: 'Soft Static', author: 'Iris Park' },
]

function FeaturedGrid({ items = defaultItems }: { items?: FeaturedItem[] }) {
    const gridRef = useRef<HTMLDivElement>(null)

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
    }, [items])

    return (
        <Section id="featured" padding="md" className="relative">
            <Container>
                <div className="mb-12 text-center">
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
                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list" ref={gridRef}>
                    {items.map((item, index) => (
                        <FeaturedWorkCard key={item.title} title={item.title} author={item.author} animationDelay={index * 0.1} />
                    ))}
                </div>

                {/* View All Link */}
                <div className="mt-12 text-center">
                    <a href="/artists" className="group text-accent inline-flex items-center gap-2 text-lg font-semibold transition-all hover:gap-3">
                        Explore all artworks
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                    </a>
                </div>
            </Container>
        </Section>
    )
}

export type { FeaturedItem }
export default FeaturedGrid
