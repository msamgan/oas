import type { HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import { artSlug } from '../../lib/slug'
import Card from './Card'

type FeaturedWorkCardProps = HTMLAttributes<HTMLElement> & {
    title: string
    author: string
    animationDelay?: number
}

function FeaturedWorkCard({ title, author, animationDelay, ...rest }: FeaturedWorkCardProps) {
    const to = `/art/${artSlug(author)}`
    return (
        <Link to={to} className="group block" aria-label={`${title} by ${author}`}>
            <Card variant="default" className="card" animationDelay={animationDelay} role="listitem" {...rest}>
                <div className="relative aspect-[4/3] overflow-hidden bg-linear-to-br from-[#f5f5f5] to-[#e8e8e8] after:absolute after:inset-0 after:bg-linear-to-br after:from-[rgba(255,122,24,0.1)] after:to-[rgba(255,183,3,0.05)] after:opacity-0 after:transition-opacity after:duration-[400ms] after:ease-out after:content-[''] group-hover:after:opacity-100" />
                <div className="px-3.5 py-3 pb-4 transition-[background] duration-300 ease-out group-hover:bg-[rgba(255,122,24,0.05)]">
                    <div className="group-hover:text-accent font-extrabold transition-colors duration-300 ease-out">{title}</div>
                    <div className="text-muted text-sm">{author}</div>
                </div>
            </Card>
        </Link>
    )
}

export default FeaturedWorkCard
