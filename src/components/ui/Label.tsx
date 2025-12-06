import type { LabelHTMLAttributes } from 'react'

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

function cn(...classes: Array<string | undefined | false | null>) {
    return classes.filter(Boolean).join(' ')
}

function Label({ className, ...rest }: LabelProps) {
    const baseClasses = 'mb-2 block text-sm font-semibold text-[var(--color-text)]'
    return <label className={cn(baseClasses, className)} {...rest} />
}

export default Label
