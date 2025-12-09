import type { HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import { artSlug } from '../../lib/slug'
import Card from './Card'

type FeaturedWorkCardProps = HTMLAttributes<HTMLElement> & {
    title: string
    author: string
    animationDelay?: number
    variant?: 'default' | 'featured'
    badge?: React.ReactNode
}

function FeaturedWorkCard({ title, author, animationDelay, variant = 'default', badge, ...rest }: FeaturedWorkCardProps) {
    const to = `/art/${artSlug(author)}`
    const cardVariant = variant === 'featured' ? 'featured' : 'default'

    return (
        <Link to={to} className="group block" aria-label={`${title} by ${author}`}>
            <Card variant={cardVariant} className="card" animationDelay={animationDelay} badge={badge} role="listitem" {...rest}>
                <div
                    className={`relative overflow-hidden bg-linear-to-br from-[#f5f5f5] to-[#e8e8e8] after:absolute after:inset-0 after:bg-linear-to-br after:from-[rgba(255,122,24,0.1)] after:to-[rgba(255,183,3,0.05)] after:opacity-0 after:transition-opacity after:duration-400 after:ease-out after:content-[''] group-hover:after:opacity-100 ${
                        variant === 'featured' ? 'aspect-16/10' : 'aspect-4/3'
                    }`}
                >
                    {/* Shimmer effect on hover */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                    </div>
                </div>
                <div
                    className={`px-3.5 py-3 pb-4 transition-[background] duration-300 ease-out group-hover:bg-[rgba(255,122,24,0.05)] ${
                        variant === 'featured' ? 'backdrop-blur-sm' : ''
                    }`}
                >
                    <div className="group-hover:text-accent font-extrabold transition-colors duration-300 ease-out">{title}</div>
                    <div className="text-muted text-sm">{author}</div>
                </div>
            </Card>
        </Link>
    )
}

export default FeaturedWorkCard
