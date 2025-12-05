import type { HTMLAttributes } from 'react'

type ArtCanvasProps = HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'shimmer' | 'hero'
    withHoverEffect?: boolean
}

function cn(...classes: Array<string | undefined | false | null>) {
    return classes.filter(Boolean).join(' ')
}

const variants: Record<NonNullable<ArtCanvasProps['variant']>, string> = {
    default: 'aspect-[4/3] bg-gradient-to-br from-[#0b0b0d] to-[#1a1a1c] relative overflow-hidden',
    shimmer: 'aspect-[4/3] bg-gradient-to-br from-[#0b0b0d] via-[#1a1a1c] to-[#0f0f10] relative overflow-hidden',
    hero: "aspect-[4/3] bg-[radial-gradient(120px_80px_at_20%_30%,rgba(255,122,24,0.35),transparent_50%),radial-gradient(160px_120px_at_70%_60%,rgba(255,183,3,0.25),transparent_50%),#0a0a0c] relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] before:bg-[length:200%_100%] before:animate-[shimmer_3s_infinite]",
}

function ArtCanvas({ className, variant = 'default', withHoverEffect = false, ...rest }: ArtCanvasProps) {
    return (
        <div className={cn(variants[variant], className)} {...rest}>
            {variant === 'shimmer' && (
                <>
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,122,24,0.15)] via-transparent to-[rgba(255,183,3,0.1)] opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
                    {/* Shimmer placeholder */}
                    <div className="absolute inset-0 animate-[shimmer_3s_linear_infinite] bg-[linear-gradient(110deg,transparent_0%,transparent_40%,rgba(255,255,255,0.05)_50%,transparent_60%,transparent_100%)] [background-size:200%_100%]" />
                </>
            )}
            {withHoverEffect && (
                <>
                    {/* Gradient overlay that appears on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,122,24,0.08)] to-[rgba(255,183,3,0.05)] opacity-0 transition-opacity duration-[400ms] ease-out group-hover:opacity-100" />
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="absolute inset-0 animate-[shimmer_2s_linear_infinite] bg-[linear-gradient(110deg,transparent_0%,transparent_40%,rgba(255,255,255,0.08)_50%,transparent_60%,transparent_100%)] [background-size:200%_100%]" />
                    </div>
                </>
            )}
        </div>
    )
}

export default ArtCanvas
