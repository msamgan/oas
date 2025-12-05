import type { HTMLAttributes } from 'react'

type LogoProps = HTMLAttributes<HTMLSpanElement> & {
    size?: 'sm' | 'md' | 'lg'
}

function cn(...classes: Array<string | undefined | false | null>) {
    return classes.filter(Boolean).join(' ')
}

const sizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
}

function Logo({ className, size = 'md', ...rest }: LogoProps) {
    return (
        <span
            className={cn(
                sizes[size],
                'rounded-[10px] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.08),var(--shadow-1)] transition-transform duration-300 ease-out [background:conic-gradient(from_210deg_at_50%_50%,var(--color-accent),var(--color-accent-2))] group-hover:rotate-180',
                className,
            )}
            aria-hidden="true"
            {...rest}
        />
    )
}

export default Logo
