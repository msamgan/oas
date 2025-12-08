import type { HTMLAttributes } from 'react'

type StatNumberProps = HTMLAttributes<HTMLDivElement> & {
    value: string
}

function cn(...classes: Array<string | undefined | false | null>) {
    return classes.filter(Boolean).join(' ')
}

function StatNumber({ value, className, ...rest }: StatNumberProps) {
    return (
        <div
            className={cn(
                "stat-number relative mb-2 inline-block bg-linear-to-br from-[var(--color-accent)] to-[var(--color-accent-2)] bg-clip-text text-[clamp(40px,6vw,56px)] leading-none font-black text-transparent transition-all duration-300 ease-out [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] after:absolute after:-bottom-1 after:left-1/2 after:h-0.5 after:w-10 after:-translate-x-1/2 after:bg-[linear-gradient(90deg,transparent,var(--color-accent),transparent)] after:opacity-0 after:transition-opacity after:duration-300 after:ease-out after:content-[''] hover:scale-110 hover:[filter:drop-shadow(0_4px_12px_rgba(255,122,24,0.4))] hover:after:opacity-100",
                className,
            )}
            {...rest}
        >
            {value}
        </div>
    )
}

type StatLabelProps = HTMLAttributes<HTMLDivElement>

function StatLabel({ className, children, ...rest }: StatLabelProps) {
    return (
        <div
            className={cn(
                'stat-label text-muted text-[15px] font-semibold tracking-[0.8px] uppercase transition-colors duration-300 ease-out hover:text-[var(--color-text)]',
                className,
            )}
            {...rest}
        >
            {children}
        </div>
    )
}

export { StatLabel, StatNumber }
