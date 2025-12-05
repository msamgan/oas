import type { HTMLAttributes, PropsWithChildren } from 'react'

type HeadingProps = PropsWithChildren<
    HTMLAttributes<HTMLHeadingElement> & {
        as?: 'h1' | 'h2' | 'h3' | 'h4'
        variant?: 'hero' | 'h2' | 'h3'
    }
>

function cn(...classes: Array<string | undefined | false | null>) {
    return classes.filter(Boolean).join(' ')
}

const variants: Record<NonNullable<HeadingProps['variant']>, string> = {
    hero: 'text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-0.5px] my-4 bg-gradient-to-br from-[var(--color-text)] to-[var(--color-accent)] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] bg-[length:200%_200%]',
    h2: 'text-[clamp(28px,4.6vw,40px)] m-0 mb-4.5',
    h3: 'text-2xl m-0 mb-3 font-extrabold',
}

function Heading({ as = 'h2', variant = 'h2', className, children, ...rest }: HeadingProps) {
    const Tag = as
    return (
        <Tag className={cn(variants[variant], className)} {...rest}>
            {children}
        </Tag>
    )
}

export default Heading
