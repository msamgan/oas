import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

function cn(...classes: Array<string | undefined | false | null>) {
    return classes.filter(Boolean).join(' ')
}

function Input({ className, ...rest }: InputProps) {
    const baseClasses =
        'flex-1 bg-black/[0.03] border border-black/10 text-[var(--color-text)] py-3.5 px-4 rounded-[var(--radius)] transition-all duration-300 ease-out text-base placeholder:text-[#9a9a9a] focus:outline-none focus:border-[var(--color-accent)] focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,122,24,0.1)]'

    return <input className={cn(baseClasses, className)} {...rest} />
}

export default Input
