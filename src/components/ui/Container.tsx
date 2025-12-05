import type { HTMLAttributes, PropsWithChildren } from 'react'

type ContainerProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>

function cn(...classes: Array<string | undefined | false | null>) {
    return classes.filter(Boolean).join(' ')
}

function Container({ children, className, ...rest }: ContainerProps) {
    return (
        <div className={cn('oas-container', className)} {...rest}>
            {children}
        </div>
    )
}

export default Container
