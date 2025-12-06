import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

type ButtonProps = PropsWithChildren<
    ButtonHTMLAttributes<HTMLButtonElement> & {
        variant?: 'primary' | 'secondary' | 'ghost'
        asLink?: boolean
        to?: string
    }
>

function cn(...classes: Array<string | undefined | false | null>) {
    return classes.filter(Boolean).join(' ')
}

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary:
        "appearance-none border-none cursor-pointer py-3.5 px-4.5 rounded-[var(--radius)] font-extrabold tracking-[0.2px] transition-all duration-300 ease-out relative overflow-hidden bg-gradient-to-b from-[var(--color-accent)] to-[#ff6a00] text-[#1a1208] shadow-[0_6px_20px_rgba(255,122,24,0.45)] before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-0 before:h-0 before:rounded-full before:bg-white/20 before:-translate-x-1/2 before:-translate-y-1/2 before:transition-[width,height] before:duration-[600ms] hover:before:w-[300px] hover:before:h-[300px] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,122,24,0.65)] active:translate-y-0",
    secondary:
        "appearance-none border cursor-pointer py-3.5 px-4.5 rounded-[var(--radius)] font-extrabold tracking-[0.2px] transition-all duration-300 ease-out relative overflow-hidden bg-white/[0.06] text-[var(--color-text)] border-white/[0.08] before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-0 before:h-0 before:rounded-full before:bg-white/20 before:-translate-x-1/2 before:-translate-y-1/2 before:transition-[width,height] before:duration-[600ms] hover:before:w-[300px] hover:before:h-[300px] hover:border-white/[0.18] hover:bg-white/10 hover:-translate-y-px",
    ghost: 'appearance-none cursor-pointer py-3.5 px-4.5 rounded-[var(--radius)] font-extrabold tracking-[0.2px] transition-all duration-200 ease-out text-[var(--color-text)] hover:bg-white/5',
}

function Button({ children, className, variant = 'primary', type = 'button', asLink, to, ...rest }: ButtonProps) {
    const classes = cn(variants[variant], className)
    if (asLink && to) {
        return (
            <Link to={to} className={classes} {...(rest as any)}>
                {children}
            </Link>
        )
    }
    return (
        <button type={type} className={classes} {...rest}>
            {children}
        </button>
    )
}

export default Button
