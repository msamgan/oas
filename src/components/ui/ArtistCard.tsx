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
                    <h3 className="group-hover:text-accent mb-2 text-xl font-extrabold transition-colors duration-300">{name}</h3>
                    <p className="mb-2 text-sm font-semibold text-[var(--color-accent)]">{genre}</p>
                    <p className="text-muted mb-4 text-sm leading-relaxed">{bio}</p>
                    <div className="flex items-center justify-between border-t border-black/6 pt-3">
                        <span className="text-muted text-xs">{works} works</span>
                        {location && (
                            <span className="text-muted flex items-center gap-1 text-xs">
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
                <h3 className="group-hover:text-accent mb-1 text-lg font-extrabold transition-colors duration-300 ease-out">{name}</h3>
                <p className="text-muted mb-2 text-sm">{genre}</p>
                <p className="text-muted mb-3 line-clamp-2 text-xs leading-relaxed">{bio}</p>
                <div className="flex items-center justify-between border-t border-black/4 pt-2">
                    <span className="text-muted text-xs">{works} works</span>
                    <span className="text-xs font-semibold text-[var(--color-accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        View Profile →
                    </span>
                </div>
            </div>
        </Card>
    )
}

export default ArtistCard
