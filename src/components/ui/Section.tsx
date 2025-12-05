import type { HTMLAttributes, PropsWithChildren } from 'react'

type SectionProps = PropsWithChildren<
    HTMLAttributes<HTMLElement> & {
        padding?: 'sm' | 'md' | 'lg' | 'xl'
    }
>

function cn(...classes: Array<string | undefined | false | null>) {
    return classes.filter(Boolean).join(' ')
}

const paddingClasses: Record<NonNullable<SectionProps['padding']>, string> = {
    sm: 'py-8 md:py-12 lg:py-16',
    md: 'py-10 md:py-14 lg:py-18',
    lg: 'py-12 md:py-16 lg:py-24',
    xl: 'py-15 md:py-20 lg:py-30',
}

function Section({ children, className, padding = 'md', ...rest }: SectionProps) {
    return (
        <section className={cn(paddingClasses[padding], className)} {...rest}>
            {children}
        </section>
    )
}

export default Section
