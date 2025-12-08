import type { HTMLAttributes, PropsWithChildren } from 'react'

type CardProps = PropsWithChildren<
    HTMLAttributes<HTMLElement> & {
        variant?: 'default' | 'featured' | 'stat' | 'mission' | 'value'
        animationDelay?: number
        badge?: React.ReactNode
    }
>

function cn(...classes: Array<string | undefined | false | null>) {
    return classes.filter(Boolean).join(' ')
}

const variants: Record<NonNullable<CardProps['variant']>, string> = {
    default:
        'rounded-[var(--radius-sm)] bg-white border border-black/8 overflow-hidden shadow-[var(--shadow-1)] transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.165,0.84,0.44,1)] cursor-pointer opacity-0 animate-[fade-in-up_0.6s_ease-out_forwards] hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[var(--shadow-hover)] hover:border-[rgba(255,122,24,0.3)]',
    featured:
        'group relative rounded-[var(--radius)] bg-linear-to-br from-white to-[rgba(255,122,24,0.02)] border border-[rgba(255,122,24,0.15)] overflow-hidden shadow-[var(--shadow-2)] transition-all duration-500 [transition-timing-function:cubic-bezier(0.165,0.84,0.44,1)] cursor-pointer opacity-0 animate-[fade-in-up_0.7s_ease-out_forwards] hover:-translate-y-3 hover:scale-[1.03] hover:shadow-[var(--shadow-hover)] hover:border-[rgba(255,122,24,0.4)]',
    stat: "text-center p-6 opacity-0 scale-90 transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] relative bg-[linear-gradient(135deg,rgba(255,122,24,0.02)_0%,rgba(255,183,3,0.01)_100%)] rounded-[var(--radius)] border border-black/6 before:content-[''] before:absolute before:inset-0 before:rounded-[var(--radius)] before:p-px before:bg-[linear-gradient(135deg,rgba(255,122,24,0.3),rgba(255,183,3,0.1))] before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[mask-composite:exclude] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:opacity-0 before:transition-opacity before:duration-300 before:ease-out [&.visible]:opacity-100 [&.visible]:scale-100 hover:-translate-y-1.5 hover:scale-[1.02] hover:bg-[linear-gradient(135deg,rgba(255,122,24,0.08)_0%,rgba(255,183,3,0.04)_100%)] hover:before:opacity-100",
    mission:
        "bg-[linear-gradient(135deg,rgba(255,122,24,0.04)_0%,rgba(255,183,3,0.02)_100%)] border border-black/8 rounded-[var(--radius)] p-8 px-6 text-center shadow-[var(--shadow-1)] transition-all duration-500 [transition-timing-function:cubic-bezier(0.165,0.84,0.44,1)] animate-[fade-in-up_0.6s_ease-out_both] relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,122,24,0.12)_0%,rgba(255,183,3,0.06)_100%)] before:opacity-0 before:transition-opacity before:duration-500 before:ease-out hover:-translate-y-3 hover:scale-[1.03] hover:border-[rgba(255,122,24,0.4)] hover:shadow-[var(--shadow-hover)] hover:before:opacity-100",
    value: "relative opacity-0 translate-y-[30px] transition-all duration-[600ms] ease-out bg-[linear-gradient(90deg,rgba(255,122,24,0.04)_0%,transparent_100%)] py-5 pr-5 pl-[70px] rounded-[var(--radius-sm)] border-l-2 border-l-transparent before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-[linear-gradient(180deg,var(--color-accent)_0%,var(--color-accent-2)_100%)] before:scale-y-0 before:origin-top before:transition-transform before:duration-[600ms] before:ease-out [&.visible]:opacity-100 [&.visible]:translate-y-0 [&.visible]:before:scale-y-100 hover:bg-[linear-gradient(90deg,rgba(255,122,24,0.08)_0%,rgba(255,183,3,0.04)_100%)] hover:translate-x-2",
}

function Card({ children, className, variant = 'default', animationDelay, badge, ...rest }: CardProps) {
    const style = animationDelay !== undefined ? { animationDelay: `${animationDelay}s` } : undefined

    return (
        <article className={cn(variants[variant], className)} style={style} {...rest}>
            {badge && <div className="absolute top-3 right-3 z-10">{badge}</div>}
            {variant === 'featured' && (
                <>
                    {/* Shimmer effect overlay */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <div className="absolute inset-0 translate-x-[-100%] bg-linear-to-r from-transparent via-black/5 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
                    </div>
                </>
            )}
            {children}
        </article>
    )
}

export default Card
