import type { SVGAttributes } from 'react'

type IconProps = SVGAttributes<SVGSVGElement> & {
    name: 'location' | 'menu' | 'close' | 'grid' | 'masonry' | 'search'
    size?: number
}

function cn(...classes: Array<string | undefined | false | null>) {
    return classes.filter(Boolean).join(' ')
}

function Icon({ name, size = 24, className, ...rest }: IconProps) {
    const baseClasses = 'inline-block'

    const icons = {
        location: (
            <svg className={cn(baseClasses, className)} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...rest}>
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        menu: (
            <svg
                className={cn(baseClasses, className)}
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                {...rest}
            >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
        ),
        close: (
            <svg
                className={cn(baseClasses, className)}
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                {...rest}
            >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
        ),
        grid: (
            <svg className={cn(baseClasses, className)} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...rest}>
                <rect x="3" y="3" width="7" height="7" strokeWidth="2" />
                <rect x="14" y="3" width="7" height="7" strokeWidth="2" />
                <rect x="14" y="14" width="7" height="7" strokeWidth="2" />
                <rect x="3" y="14" width="7" height="7" strokeWidth="2" />
            </svg>
        ),
        masonry: (
            <svg className={cn(baseClasses, className)} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...rest}>
                <rect x="3" y="3" width="7" height="12" strokeWidth="2" />
                <rect x="14" y="3" width="7" height="7" strokeWidth="2" />
                <rect x="3" y="17" width="7" height="4" strokeWidth="2" />
                <rect x="14" y="12" width="7" height="9" strokeWidth="2" />
            </svg>
        ),
        search: (
            <svg className={cn(baseClasses, className)} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...rest}>
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    }

    return icons[name] || null
}

export default Icon
