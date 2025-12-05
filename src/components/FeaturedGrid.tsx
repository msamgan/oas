import { useEffect, useRef } from 'react'
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
        <Section id="featured" padding="md">
            <Container>
                <Heading as="h2" variant="h2" className="animate-[fade-in-up_0.8s_ease-out]">
                    Featured works
                </Heading>
                <p className="animate-[fade-in-up_0.8s_ease-out_0.1s_both] text-[var(--color-muted)]">
                    Hand-picked pieces from artists we believe in.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-5.5 sm:grid-cols-2 lg:grid-cols-3" role="list" ref={gridRef}>
                    {items.map((item, index) => (
                        <FeaturedWorkCard key={item.title} title={item.title} author={item.author} animationDelay={index * 0.1} />
                    ))}
                </div>
            </Container>
        </Section>
    )
}

export type { FeaturedItem }
export default FeaturedGrid
