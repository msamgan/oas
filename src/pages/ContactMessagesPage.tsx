import { useEffect, useMemo, useState } from 'react'
import { listContactMessages, type ContactMessage } from '../api/contact-messages'
import Badge from '../components/ui/Badge'
import Container from '../components/ui/Container'
import Heading from '../components/ui/Heading'
import Icon from '../components/ui/Icon'
import { useAuth } from '../contexts/auth-context.shared'

type UiState = 'idle' | 'loading' | 'error' | 'ready' | 'empty'

function StatusBadge({ status }: { status: ContactMessage['status'] }) {
    const normalized = String(status || '').toLowerCase()
    const variant = normalized === 'replied' ? 'featured' : normalized === 'read' ? 'default' : 'glow'
    const label = normalized ? normalized.charAt(0).toUpperCase() + normalized.slice(1) : 'New'
    return <Badge variant={variant}>{label}</Badge>
}

function MessageItem({ msg }: { msg: ContactMessage }) {
    const created = useMemo(() => {
        try {
            const d = new Date(msg.createdAt as any)
            return d.toLocaleString()
        } catch {
            return String(msg.createdAt)
        }
    }, [msg.createdAt])

    return (
        <li className="group rounded-(--radius) border border-white/6 bg-surface/60 p-4 shadow-(--shadow-1) transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:shadow-(--shadow-2)">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                        <Icon name="mail" size={18} className="text-accent" />
                        <span className="truncate font-semibold">{msg.subject || 'No subject'}</span>
                    </div>
                    <p className="text-muted line-clamp-2 text-sm wrap-break-word">{msg.message}</p>
                    <div className="text-muted mt-2 flex flex-wrap items-center gap-3 text-xs">
                        <span className="inline-flex items-center gap-1">
                            <Icon name="user" size={14} /> {msg.name}
                        </span>
                        <span className="inline-flex items-cen  ter gap-1">
                            <Icon name="at-sign" size={14} /> {msg.email}
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <Icon name="clock" size={14} /> {created}
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

    useEffect(() => {
        let active = true
        ;(async () => {
            setState('loading')
            const res = await listContactMessages(getAuthHeader)

            if (!active) return

            if (!res.ok) {
                setError(res.message)
                setState('error')
                return
            }
            setItems(res.data)
            setState(res.data.length ? 'ready' : 'empty')
        })()
        return () => {
            active = false
        }
    }, [getAuthHeader])

    return (
        <div className="min-h-screen">
            <div className="animate-fade-in-up mb-8">
                <div className="mb-3 flex items-center gap-2">
                    <Badge withDot variant="glow">
                        <span className={'ml-2'}>Inbox</span>
                    </Badge>
                </div>
                <Heading as="h1" variant="h2" className="mb-3">
                    Contact Messages
                </Heading>
                <p className="text-muted max-w-2xl text-lg leading-relaxed">Review messages submitted via the public contact form.</p>
            </div>

            {/* Content */}
            <Container>
                {state === 'loading' && (
                    <div className="text-muted animate-[fade-in_0.4s_ease-out] rounded-(--radius) border border-white/6 bg-surface/60 p-6">
                        Loading messages…
                    </div>
                )}

                {state === 'error' && (
                    <div className="animate-[fade-in_0.4s_ease-out] rounded-(--radius) border border-red-500/20 bg-red-500/10 p-6 text-red-200">
                        <div className="mb-1 font-semibold">Failed to load</div>
                        <div className="text-sm opacity-90">{error}</div>
                    </div>
                )}

                {state === 'empty' && (
                    <div className="text-muted animate-[fade-in_0.4s_ease-out] rounded-(--radius) border border-white/6 bg-surface/60 p-6">
                        No messages yet.
                    </div>
                )}

                {state === 'ready' && (
                    <ul className="grid grid-cols-1 gap-4">
                        {items.map((msg) => (
                            <MessageItem key={String(msg.id)} msg={msg} />
                        ))}
                    </ul>
                )}
            </Container>
        </div>
    )
}

export default ContactMessagesPage
