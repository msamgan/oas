import type { HTMLAttributes } from 'react'

type ValueNumberProps = HTMLAttributes<HTMLDivElement> & {
    number: string
}

function cn(...classes: Array<string | undefined | false | null>) {
    return classes.filter(Boolean).join(' ')
}

function ValueNumber({ number, className, ...rest }: ValueNumberProps) {
    return (
        <div
            className={cn(
                'absolute top-[15px] left-[15px] bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)] bg-clip-text text-[56px] leading-none font-black text-transparent opacity-30 transition-all duration-300 ease-out [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] group-hover:scale-110 group-hover:opacity-60',
                className,
            )}
            {...rest}
        >
            {number}
        </div>
    )
}

export default ValueNumber
