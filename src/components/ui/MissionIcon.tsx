import type { HTMLAttributes } from 'react'

type MissionIconProps = HTMLAttributes<HTMLDivElement> & {
    emoji: string
}

function cn(...classes: Array<string | undefined | false | null>) {
    return classes.filter(Boolean).join(' ')
}

function MissionIcon({ emoji, className, ...rest }: MissionIconProps) {
    return (
        <div
            className={cn(
                'mission-icon relative z-[1] mb-4 inline-block text-5xl [filter:drop-shadow(0_4px_8px_rgba(255,122,24,0.3))] transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.68,-0.55,0.265,1.55)] hover:scale-125 hover:-rotate-[5deg] hover:[filter:drop-shadow(0_8px_16px_rgba(255,122,24,0.5))]',
                className,
            )}
            {...rest}
        >
            {emoji}
        </div>
    )
}

export default MissionIcon
