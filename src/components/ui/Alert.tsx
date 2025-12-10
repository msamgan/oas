import type { HTMLAttributes, PropsWithChildren, ReactNode } from 'react'

type AlertProps = PropsWithChildren<
    HTMLAttributes<HTMLDivElement> & {
        variant?: 'success' | 'error'
        message?: ReactNode
    }
>

function cn(...classes: Array<string | undefined | false | null>) {
    return classes.filter(Boolean).join(' ')
}

const styles: Record<NonNullable<AlertProps['variant']>, { wrapper: string; text: string }> = {
    error: {
        wrapper: 'rounded-sm border border-[rgba(255,0,0,0.2)] bg-[rgba(255,0,0,0.06)] p-4',
        text: 'text-red-600 flex items-center gap-2 text-sm font-semibold',
    },
    success: {
        wrapper: 'rounded-sm border border-[rgba(255,183,3,0.3)] bg-[rgba(255,183,3,0.08)] p-4',
        text: 'text-accent-2 flex items-center gap-2 text-sm font-semibold',
    },
}

function ErrorIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path d="M12 8v5m0 3h.01" strokeWidth="2" strokeLinecap="round" />
        </svg>
    )
}

function SuccessIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default function Alert({ variant = 'error', message, children, className, ...rest }: AlertProps) {
    const Icon = variant === 'error' ? ErrorIcon : SuccessIcon
    const { wrapper, text } = styles[variant]
    return (
        <div className={cn(wrapper, className)} {...rest}>
            <p className={text}>
                <Icon />
                {message ?? children}
            </p>
        </div>
    )
}
