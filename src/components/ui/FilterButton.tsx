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
        ? 'bg-linear-to-r from-[var(--color-accent)] to-[#ff6a00] text-white shadow-[0_4px_12px_rgba(255,122,24,0.3)] scale-105'
        : 'bg-black/4 text-muted border border-black/10 hover:bg-black/8 hover:text-[var(--color-text)] hover:border-black/20 hover:scale-105'

    return (
        <button className={cn(baseClasses, stateClasses, className)} style={style} {...rest}>
            {children}
        </button>
    )
}

export default FilterButton
