import type { HTMLAttributes } from 'react'
import ArtCanvas from './ArtCanvas'
import Card from './Card'
import Icon from './Icon'

type ArtistCardProps = HTMLAttributes<HTMLElement> & {
    name: string
    genre: string
    bio: string
    works: number
    animationDelay?: number
    location?: string
    featured?: boolean
}

function ArtistCard({ name, genre, bio, works, animationDelay, location, featured = false, ...rest }: ArtistCardProps) {
    if (featured) {
        return (
            <Card variant="featured" animationDelay={animationDelay} {...rest}>
                <ArtCanvas variant="shimmer" />
                <div className="relative p-5">
                    <h3 className="mb-2 text-xl font-extrabold transition-colors duration-300 group-hover:text-[var(--color-accent)]">{name}</h3>
                    <p className="mb-2 text-sm font-semibold text-[var(--color-accent)]">{genre}</p>
                    <p className="mb-4 text-sm leading-relaxed text-[var(--color-muted)]">{bio}</p>
                    <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
                        <span className="text-xs text-[var(--color-muted)]">{works} works</span>
                        {location && (
                            <span className="flex items-center gap-1 text-xs text-[var(--color-muted)]">
                                <Icon name="location" size={12} />
                                {location}
                            </span>
                        )}
                    </div>
                </div>
            </Card>
        )
    }

    return (
        <Card variant="default" animationDelay={animationDelay} className="artist-card group" role="listitem" {...rest}>
            <ArtCanvas withHoverEffect />
            <div className="p-4 transition-[background] duration-300 ease-out group-hover:bg-[rgba(255,122,24,0.05)]">
                <h3 className="mb-1 text-lg font-extrabold transition-colors duration-300 ease-out group-hover:text-[var(--color-accent)]">{name}</h3>
                <p className="mb-2 text-sm text-[var(--color-muted)]">{genre}</p>
                <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-[var(--color-muted)]">{bio}</p>
                <div className="flex items-center justify-between border-t border-white/[0.04] pt-2">
                    <span className="text-xs text-[var(--color-muted)]">{works} works</span>
                    <span className="text-xs font-semibold text-[var(--color-accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        View Profile →
                    </span>
                </div>
            </div>
        </Card>
    )
}

export default ArtistCard
