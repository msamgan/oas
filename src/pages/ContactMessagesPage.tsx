import { useEffect, useMemo, useRef, useState } from 'react'
import { listContactMessages, type ContactMessage } from '../api/contact-messages'
import Badge from '../components/ui/Badge'
import Heading from '../components/ui/Heading'
import Icon from '../components/ui/Icon'
import Pagination from '../components/ui/Pagination'
import { useAuth } from '../contexts/auth-context.shared'

type UiState = 'idle' | 'loading' | 'error' | 'ready' | 'empty'

function StatusBadge({ status }: { status: ContactMessage['status'] }) {
    const normalized = String(status || '').toLowerCase()
    const variant = normalized === 'replied' ? 'featured' : normalized === 'read' ? 'default' : 'glow'
    const label = normalized ? normalized.charAt(0).toUpperCase() + normalized.slice(1) : 'New'
    return <Badge variant={variant}>{label}</Badge>
}

function MessageItem({ msg, index }: { msg: ContactMessage; index: number }) {
    const created = useMemo(() => {
        try {
            const d = new Date(msg.createdAt as unknown as string)
            return d.toLocaleString()
        } catch {
            return String(msg.createdAt)
        }
    }, [msg.createdAt])

    return (
        <li
            className="message-card group bg-surface/60 hover:bg-surface/80 relative animate-[fade-in-up_0.7s_ease-out_forwards] overflow-hidden rounded-(--radius) border border-white/6 p-6 opacity-0 shadow-(--shadow-1) transition-all duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:-translate-y-1 hover:border-[rgba(255,122,24,0.2)] hover:shadow-(--shadow-2)"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            {/* Shimmer effect overlay */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </div>

            {/* Subtle gradient accent on left edge */}
            <div className="from-accent to-accent-2 absolute top-0 left-0 h-full w-1 bg-linear-to-b opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                    <div className="mb-3 flex items-center gap-2.5">
                        <div className="from-accent to-accent-2 flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br shadow-(--shadow-1) transition-transform duration-300 group-hover:scale-110">
                            <Icon name="mail" size={18} className="text-white" />
                        </div>
                        <span className="text-text group-hover:text-accent truncate text-lg font-bold transition-colors duration-300">
                            {msg.subject || 'No subject'}
                        </span>
                    </div>
                    <p className="text-muted mb-4 line-clamp-2 leading-relaxed wrap-break-word">{msg.message}</p>
                    <div className="text-muted flex flex-wrap items-center gap-4 text-sm">
                        <span className="hover:text-text inline-flex items-center gap-1.5 transition-colors duration-200">
                            <Icon name="user" size={16} className="text-accent" /> {msg.name}
                        </span>
                        <span className="hover:text-text inline-flex items-center gap-1.5 transition-colors duration-200">
                            <Icon name="at-sign" size={16} className="text-accent" /> {msg.email}
                        </span>
                        <span className="hover:text-text inline-flex items-center gap-1.5 transition-colors duration-200">
                            <Icon name="clock" size={16} className="text-accent" /> {created}
                        </span>
                    </div>
                </div>
                <div className="shrink-0">
                    <StatusBadge status={msg.status} />
                </div>
            </div>
        </li>
    )
}

function ContactMessagesPage() {
    const { getAuthHeader } = useAuth()
    const [state, setState] = useState<UiState>('idle')
    const [error, setError] = useState<string | null>(null)
    const [items, setItems] = useState<ContactMessage[]>([])
    const [page, setPage] = useState(1)
    const [perPage] = useState(15)
    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [status, setStatus] = useState<string>('all')
    const [pagination, setPagination] = useState<{
        currentPage: number
        perPage: number
        total: number
        lastPage: number
        from: number
        to: number
    } | null>(null)
    const gridRef = useRef<HTMLUListElement>(null)
    const prevSearchRef = useRef(debouncedSearch)
    const prevStatusRef = useRef(status)

    // Debounce search input (500ms delay)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search)
        }, 500)

        return () => clearTimeout(timer)
    }, [search])

    useEffect(() => {
        let active = true

        // Reset page when filters change
        if (prevSearchRef.current !== debouncedSearch || prevStatusRef.current !== status) {
            prevSearchRef.current = debouncedSearch
            prevStatusRef.current = status
            if (page !== 1) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setPage(1)
                return // Don't fetch yet, wait for page state to update
            }
        }

        ;(async () => {
            setState('loading')
            const params: { page: number; perPage: number; search?: string; status?: string } = { page, perPage }

            if (debouncedSearch.trim()) {
                params.search = debouncedSearch.trim()
            }

            if (status && status !== 'all') {
                params.status = status
            }

            const res = await listContactMessages(getAuthHeader, params)

            if (!active) return

            if (!res.ok) {
                setError(res.message)
                setState('error')
                return
            }
            setItems(res.data)
            setPagination(res.pagination)
            setState(res.data.length ? 'ready' : 'empty')
        })()
        return () => {
            active = false
        }
    }, [getAuthHeader, page, perPage, debouncedSearch, status])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            },
            { threshold: 0.1 },
        )

        const cards = gridRef.current?.querySelectorAll('.message-card')
        cards?.forEach((card) => observer.observe(card))

        return () => observer.disconnect()
    }, [items])

    return (
        <div className="min-h-screen">
            {/* Header Section - Dashboard Style */}
            <div className="animate-fade-in-up mb-8">
                <div className="mb-3 flex items-center gap-2">
                    <Badge withDot variant="glow">
                        <span className="ml-2">Inbox</span>
                    </Badge>
                </div>
                <Heading as="h1" variant="h2" className="mb-3">
                    Contact Messages
                </Heading>
                <p className="text-muted max-w-2xl text-lg leading-relaxed">
                    Review messages submitted via the public contact form. Stay connected with artists, collectors, and art enthusiasts.
                </p>
            </div>

            {/* Filters Section */}
            <div className="mb-6 animate-[fade-in-up_0.6s_ease-out_0.1s_both]">
                <div className="bg-surface/40 rounded-(--radius) border border-white/6 p-4 shadow-(--shadow-1) transition-all duration-300 hover:border-white/10">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        {/* Search Bar */}
                        <div className="relative flex-1 md:max-w-md">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg
                                    className="text-muted h-5 w-5 transition-colors duration-200"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                }}
                                placeholder="Search messages by name, email, or subject..."
                                className="text-text placeholder:text-muted focus:border-accent/50 focus:ring-accent/20 w-full rounded-sm border border-white/10 bg-white/5 py-2.5 pr-4 pl-10 text-sm transition-all duration-300 focus:bg-white/8 focus:ring-2 focus:outline-none"
                            />
                            {search && (
                                <button
                                    onClick={() => {
                                        setSearch('')
                                        setPage(1)
                                    }}
                                    className="text-muted hover:text-text absolute inset-y-0 right-0 flex items-center pr-3 transition-colors duration-200"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center gap-3">
                            <label htmlFor="status-filter" className="text-muted text-sm font-medium whitespace-nowrap">
                                Status:
                            </label>
                            <div className="relative">
                                <select
                                    id="status-filter"
                                    value={status}
                                    onChange={(e) => {
                                        setStatus(e.target.value)
                                        setPage(1) // Reset to first page on filter change
                                    }}
                                    className="text-text hover:border-accent/30 focus:border-accent/50 focus:ring-accent/20 w-full appearance-none rounded-[var(--radius-sm)] border border-white/10 bg-white/5 py-2.5 pr-10 pl-4 text-sm font-medium transition-all duration-300 focus:bg-white/8 focus:ring-2 focus:outline-none md:w-auto"
                                >
                                    <option value="all">All Messages</option>
                                    <option value="submitted">Submitted</option>
                                    <option value="responded">Responded</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <svg className="text-muted h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Active Filters Display */}
                    {(search || status !== 'all') && (
                        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/6 pt-3">
                            <span className="text-muted text-xs font-medium tracking-wider uppercase">Active Filters:</span>
                            {search && (
                                <span className="border-accent/20 bg-accent/10 text-accent inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium">
                                    Search: "{search}"
                                    <button
                                        onClick={() => {
                                            setSearch('')
                                            setPage(1)
                                        }}
                                        className="hover:text-accent-2 transition-colors duration-200"
                                    >
                                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                            )}
                            {status !== 'all' && (
                                <span className="border-accent/20 bg-accent/10 text-accent inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium">
                                    Status: {status.charAt(0).toUpperCase() + status.slice(1)}
                                    <button
                                        onClick={() => {
                                            setStatus('all')
                                            setPage(1)
                                        }}
                                        className="hover:text-accent-2 transition-colors duration-200"
                                    >
                                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                            )}
                            <button
                                onClick={() => {
                                    setSearch('')
                                    setStatus('all')
                                    setPage(1)
                                }}
                                className="text-muted hover:text-accent ml-auto text-xs font-medium underline transition-colors duration-200"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            {state === 'loading' && (
                <div className="bg-surface/60 animate-[fade-in_0.4s_ease-out] rounded-(--radius) border border-white/6 p-8 text-center">
                    <div className="from-accent to-accent-2 mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br">
                        <Icon name="mail" size={20} className="text-white" />
                    </div>
                    <p className="text-muted text-lg">Loading messages…</p>
                </div>
            )}

            {state === 'error' && (
                <div className="animate-[fade-in_0.4s_ease-out] rounded-(--radius) border border-red-500/20 bg-red-500/10 p-8 text-center">
                    <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20">
                        <svg className="h-5 w-5 text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <div className="mb-1 text-lg font-semibold text-red-200">Failed to load messages</div>
                    <div className="text-muted text-sm">{error}</div>
                </div>
            )}

            {state === 'empty' && (
                <div className="bg-surface/60 animate-[fade-in_0.4s_ease-out] rounded-(--radius) border border-white/6 p-12 text-center">
                    <div className="from-accent/20 to-accent-2/20 mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br">
                        <svg className="text-accent h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                            />
                        </svg>
                    </div>
                    <p className="text-muted mb-2 text-lg font-semibold">No messages yet</p>
                    <p className="text-muted text-sm">New messages will appear here when visitors submit the contact form.</p>
                </div>
            )}

            {state === 'ready' && (
                <>
                    {/* Stats bar */}
                    <div className="bg-surface/40 mb-6 animate-[fade-in-up_0.6s_ease-out] rounded-(--radius) border border-white/6 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <div className="from-accent to-accent-2 flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br">
                                    <Icon name="mail" size={14} className="text-white" />
                                </div>
                                <span className="text-text text-sm font-semibold">
                                    Showing {pagination?.from || 1}–{pagination?.to || items.length} of {pagination?.total || items.length} messages
                                </span>
                            </div>
                            {pagination && pagination.lastPage > 1 && (
                                <span className="text-muted text-sm">
                                    Page {pagination.currentPage} of {pagination.lastPage}
                                </span>
                            )}
                        </div>
                    </div>

                    <ul className="mb-8 grid grid-cols-1 gap-4" ref={gridRef}>
                        {items.map((msg, index) => (
                            <MessageItem key={String(msg.id)} msg={msg} index={index} />
                        ))}
                    </ul>

                    {pagination && pagination.lastPage > 1 && (
                        <div className="animate-[fade-in-up_0.6s_ease-out_0.3s_both]">
                            <Pagination
                                currentPage={pagination.currentPage}
                                lastPage={pagination.lastPage}
                                total={pagination.total}
                                from={pagination.from}
                                to={pagination.to}
                                onPrev={() => setPage((p) => Math.max(1, p - 1))}
                                onNext={() => setPage((p) => p + 1)}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default ContactMessagesPage
