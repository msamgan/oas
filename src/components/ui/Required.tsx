import type { HTMLAttributes, ReactNode } from 'react'

type RequiredProps = HTMLAttributes<HTMLSpanElement> & {
    children?: ReactNode
}

function cn(...classes: Array<string | undefined | false | null>) {
    return classes.filter(Boolean).join(' ')
}

function Required({ className, children = '*', ...rest }: RequiredProps) {
    const baseClasses = 'text-[var(--color-accent)]'
    return (
        <span className={cn(baseClasses, className)} aria-hidden="true" {...rest}>
            {children}
        </span>
    )
}

export default Required
