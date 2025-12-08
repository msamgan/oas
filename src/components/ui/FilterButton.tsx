import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type FilterButtonProps = PropsWithChildren<
    ButtonHTMLAttributes<HTMLButtonElement> & {
        isActive?: boolean
        animationDelay?: number
    }
>

function cn(...classes: Array<string | undefined | false | null>) {
    return classes.filter(Boolean).join(' ')
}

function FilterButton({ children, className, isActive = false, animationDelay, ...rest }: FilterButtonProps) {
    const style = animationDelay !== undefined ? { animationDelay: `${animationDelay}s` } : undefined

    const baseClasses = 'px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ease-out animate-[scale-in_0.4s_ease-out]'

    const stateClasses = isActive
        ? 'bg-gradient-to-r from-[var(--color-accent)] to-[#ff6a00] text-white shadow-[0_4px_12px_rgba(255,122,24,0.3)] scale-105'
        : 'bg-black/[0.04] text-[var(--color-muted)] border border-black/[0.1] hover:bg-black/[0.08] hover:text-[var(--color-text)] hover:border-black/[0.2] hover:scale-105'

    return (
        <button className={cn(baseClasses, stateClasses, className)} style={style} {...rest}>
            {children}
        </button>
    )
}

export default FilterButton
