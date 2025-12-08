import type { TextareaHTMLAttributes } from 'react'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

function cn(...classes: Array<string | undefined | false | null>) {
    return classes.filter(Boolean).join(' ')
}

function Textarea({ className, ...rest }: TextareaProps) {
    const baseClasses =
        'w-full resize-y rounded-[var(--radius)] border border-black/10 bg-black/[0.03] p-4 text-base text-[var(--color-text)] transition-all duration-300 ease-out outline-none placeholder:text-[#9a9a9a] focus:border-[var(--color-accent)] focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,122,24,0.1)]'

    return <textarea className={cn(baseClasses, className)} {...rest} />
}

export default Textarea
