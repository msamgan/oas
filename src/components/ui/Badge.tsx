import type { HTMLAttributes, PropsWithChildren } from 'react'

type BadgeProps = PropsWithChildren<
    HTMLAttributes<HTMLSpanElement> & {
        variant?: 'default' | 'featured' | 'glow'
        withDot?: boolean
    }
>

function cn(...classes: Array<string | undefined | false | null>) {
    return classes.filter(Boolean).join(' ')
}

const variants: Record<NonNullable<BadgeProps['variant']>, string> = {
    default:
        'inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-[rgba(255,122,24,0.12)] text-[#ffd7b0] text-xs font-bold tracking-wider uppercase animate-[scale-in_0.5s_ease-out]',
    featured:
        'px-2.5 py-1 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] text-xs font-bold text-[#1a1208] shadow-lg animate-[float_6s_ease-in-out_infinite]',
    glow: 'px-2.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[var(--color-text)] text-xs font-bold animate-[glow_2s_ease-in-out_infinite]',
}

function Badge({ children, className, variant = 'default', withDot = false, ...rest }: BadgeProps) {
    return (
        <span className={cn(variants[variant], className)} {...rest}>
            {withDot && (
                <span className="inline-block h-1.5 w-1.5 animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-[var(--color-accent)] shadow-[0_0_10px_rgba(255,122,24,0.6)]" />
            )}
            {children}
        </span>
    )
}

export default Badge
