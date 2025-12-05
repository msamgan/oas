import type { AnchorHTMLAttributes, PropsWithChildren } from 'react'

type LinkProps = PropsWithChildren<
    AnchorHTMLAttributes<HTMLAnchorElement> & {
        variant?: 'default' | 'underline' | 'underline-thin'
    }
>

function cn(...classes: Array<string | undefined | false | null>) {
    return classes.filter(Boolean).join(' ')
}

const variants: Record<NonNullable<LinkProps['variant']>, string> = {
    default: 'oas-link',
    underline: 'oas-link oas-link-underline font-semibold',
    'underline-thin': 'oas-link oas-link-underline oas-link-underline--thin',
}

function Link({ children, className, variant = 'default', ...rest }: LinkProps) {
    return (
        <a className={cn(variants[variant], className)} {...rest}>
            {children}
        </a>
    )
}

export default Link
