import { forwardRef, type FormHTMLAttributes } from 'react'

type FormProps = FormHTMLAttributes<HTMLFormElement>

function cn(...classes: Array<string | undefined | false | null>) {
    return classes.filter(Boolean).join(' ')
}

const baseClasses =
    'contact-form group animate-[fade-in-up_0.7s_ease-out_0.5s_both] space-y-5 rounded-[var(--radius)] border border-black/10 bg-gradient-to-br from-white to-[rgba(255,122,24,0.02)] p-8 opacity-0 shadow-[var(--shadow-1)] transition-all duration-500 hover:border-[rgba(255,122,24,0.2)] hover:shadow-[var(--shadow-hover)] md:p-10'

const Form = forwardRef<HTMLFormElement, FormProps>(function Form({ className, ...rest }, ref) {
    return <form ref={ref} className={cn(baseClasses, className)} {...rest} />
})

export default Form
