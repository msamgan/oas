import type { HTMLAttributes } from 'react'

export type PaginationProps = HTMLAttributes<HTMLDivElement> & {
    currentPage: number
    lastPage: number
    total: number
    from: number
    to: number
    onPrev: () => void
    onNext: () => void
}

function cn(...classes: Array<string | undefined | false | null>) {
    return classes.filter(Boolean).join(' ')
}

function Pagination({ currentPage, lastPage, total, from, to, onPrev, onNext, className, ...rest }: PaginationProps) {
    const atStart = currentPage <= 1
    const atEnd = currentPage >= lastPage

    return (
        <div
            className={cn(
                'group bg-surface/40 mt-6 flex flex-col items-center justify-between gap-4 rounded-(--radius) border border-white/6 p-4 shadow-(--shadow-1) transition-all duration-300 hover:border-white/10 hover:shadow-(--shadow-2) sm:flex-row',
                className,
            )}
            {...rest}
        >
            {/* Info Section */}
            <div className="flex items-center gap-2">
                <div className="from-accent to-accent-2 flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                </div>
                <span className="text-muted group-hover:text-text text-sm font-medium transition-colors duration-200">
                    Showing{' '}
                    <span className="text-text font-semibold">
                        {from}–{to}
                    </span>{' '}
                    of <span className="text-text font-semibold">{total}</span>
                </span>
            </div>

            {/* Navigation Section */}
            <div className="flex items-center gap-3">
                {/* Previous Button */}
                <button
                    onClick={onPrev}
                    disabled={atStart}
                    className={cn(
                        'group/btn flex items-center gap-1.5 rounded-[var(--radius-sm)] border px-4 py-2 text-sm font-semibold transition-all duration-300',
                        atStart
                            ? 'text-muted/40 cursor-not-allowed border-white/4 bg-white/2'
                            : 'text-text hover:border-accent/30 hover:bg-accent/10 hover:text-accent border-white/10 bg-white/5 hover:-translate-x-0.5 hover:shadow-lg',
                    )}
                >
                    <svg
                        className={cn('h-4 w-4 transition-transform duration-300', !atStart && 'group-hover/btn:-translate-x-0.5')}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                </button>

                {/* Page Indicator */}
                <div className="hover:border-accent/20 hover:bg-accent/5 flex items-center gap-2 rounded-sm border border-white/6 bg-white/3 px-4 py-2 transition-all duration-300">
                    <span className="text-muted text-xs font-medium tracking-wider uppercase">Page</span>
                    <span className="from-accent to-accent-2 bg-linear-to-r bg-clip-text text-lg font-bold text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                        {currentPage}
                    </span>
                    <span className="text-muted text-sm">of</span>
                    <span className="text-text text-sm font-semibold">{Math.max(1, lastPage)}</span>
                </div>

                {/* Next Button */}
                <button
                    onClick={onNext}
                    disabled={atEnd}
                    className={cn(
                        'group/btn flex items-center gap-1.5 rounded-sm border px-4 py-2 text-sm font-semibold transition-all duration-300',
                        atEnd
                            ? 'text-muted/40 cursor-not-allowed border-white/4 bg-white/2'
                            : 'text-text hover:border-accent/30 hover:bg-accent/10 hover:text-accent border-white/10 bg-white/5 hover:translate-x-0.5 hover:shadow-lg',
                    )}
                >
                    Next
                    <svg
                        className={cn('h-4 w-4 transition-transform duration-300', !atEnd && 'group-hover/btn:translate-x-0.5')}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Pagination
