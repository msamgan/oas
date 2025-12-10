import type { ButtonHTMLAttributes, ReactNode } from 'react'
import Button from './Button'

export type SignInStatus = 'idle' | 'submitting' | 'success' | 'error'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    status: SignInStatus
    labels?: {
        idle?: ReactNode
        submitting?: ReactNode
        success?: ReactNode
        error?: ReactNode
    }
}

export default function FormSubmitButton({ status, className, disabled, type = 'submit', labels, ...rest }: Props) {
    const isDisabled = disabled || status === 'submitting' || status === 'success'
    const textIdle = labels?.idle ?? 'Submit'
    const textSubmitting = labels?.submitting ?? 'Submitting...'
    const textSuccess = labels?.success ?? 'Done!'
    const textError = labels?.error ?? textIdle
    return (
        <Button type={type} className={className} disabled={isDisabled} {...rest}>
            {status === 'submitting' && (
                <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" strokeWidth="2" strokeOpacity="0.3" />
                        <path d="M12 2 A10 10 0 0 1 22 12" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    {textSubmitting}
                </span>
            )}
            {status === 'success' && (
                <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {textSuccess}
                </span>
            )}
            {(status === 'idle' || status === 'error') && (status === 'idle' ? textIdle : textError)}
        </Button>
    )
}
