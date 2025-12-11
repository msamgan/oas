import type { SVGAttributes } from 'react'

type IconProps = SVGAttributes<SVGSVGElement> & {
    name: 'location' | 'menu' | 'close' | 'grid' | 'masonry' | 'search' | 'lock' | 'sliders' | 'bell' | 'mail' | 'user' | 'at-sign' | 'clock'
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
        lock: (
            <svg className={cn(baseClasses, className)} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...rest}>
                <rect x="5" y="11" width="14" height="10" rx="2" ry="2" strokeWidth="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        sliders: (
            <svg className={cn(baseClasses, className)} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...rest}>
                <line x1="4" y1="21" x2="4" y2="14" strokeWidth="2" />
                <line x1="4" y1="10" x2="4" y2="3" strokeWidth="2" />
                <line x1="12" y1="21" x2="12" y2="12" strokeWidth="2" />
                <line x1="12" y1="8" x2="12" y2="3" strokeWidth="2" />
                <line x1="20" y1="21" x2="20" y2="16" strokeWidth="2" />
                <line x1="20" y1="12" x2="20" y2="3" strokeWidth="2" />
                <line x1="1" y1="14" x2="7" y2="14" strokeWidth="2" />
                <line x1="9" y1="8" x2="15" y2="8" strokeWidth="2" />
                <line x1="17" y1="16" x2="23" y2="16" strokeWidth="2" />
            </svg>
        ),
        bell: (
            <svg className={cn(baseClasses, className)} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...rest}>
                <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.73 21a2 2 0 01-3.46 0" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        mail: (
            <svg className={cn(baseClasses, className)} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...rest}>
                <path
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
        user: (
            <svg className={cn(baseClasses, className)} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...rest}>
                <path d="M20 21a8 8 0 10-16 0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="7" r="4" strokeWidth="2" />
            </svg>
        ),
        'at-sign': (
            <svg className={cn(baseClasses, className)} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...rest}>
                <path d="M16 8a4 4 0 11-2.35-3.64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 8v5a2 2 0 004 0V8a8 8 0 10-3.17 6.36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        clock: (
            <svg className={cn(baseClasses, className)} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...rest}>
                <circle cx="12" cy="12" r="9" strokeWidth="2" />
                <path d="M12 7v5l3 3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    }

    return icons[name] || null
}

export default Icon
