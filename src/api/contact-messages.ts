import { getApiUrl } from '../lib/methods'

export type ContactMessage = {
    id: string | number
    name: string
    email: string
    subject?: string | null
    message: string
    status: 'new' | 'read' | 'replied' | string
    createdAt: string | number | Date
}

export type Pagination = {
    currentPage: number
    perPage: number
    total: number
    lastPage: number
    from: number
    to: number
}

export type ListContactMessagesResult = { ok: true; data: ContactMessage[]; pagination: Pagination } | { ok: false; message: string }

/**
 * Fetch contact messages from the API. Exposed as a simple function to match existing API style.
 * It uses the `/contact/messages` convention based on existing `contact` submit endpoint.
 */
export async function listContactMessages(
    getAuthHeader?: () => Record<string, string>,
    params?: { page?: number; perPage?: number },
): Promise<ListContactMessagesResult> {
    // Build URL with optional pagination params (page, per_page)
    const base = getApiUrl('contact/messages')
    const usp = new URLSearchParams()
    if (params?.page) usp.set('page', String(params.page))
    if (params?.perPage) usp.set('per_page', String(params.perPage))
    const url = usp.toString() ? `${base}?${usp.toString()}` : base

    try {
        const res = await fetch(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...(getAuthHeader ? getAuthHeader() : {}),
            },
        })

        const data = await res.json().catch(() => ({}))

        if (!res.ok) {
            const message = (data && (data.message || data.error || data.errors?.[0] || data.detail)) || `Fetch failed with status ${res.status}`
            return { ok: false, message }
        }

        // Support multiple common API shapes, including the provided payload.messages + pagination
        // Examples we handle:
        // - { payload: { messages: [...], pagination: {...} } }
        // - { payload: { data: [...] } }
        // - { payload: [...] }
        // - { data: [...] }
        // - [ ... ]
        const pl = data?.payload
        let list: any[] = []
        if (Array.isArray(pl?.messages)) list = pl.messages
        else if (Array.isArray(pl?.data)) list = pl.data
        else if (Array.isArray(pl)) list = pl as any[]
        else if (Array.isArray(data?.data)) list = data.data
        else if (Array.isArray(data)) list = data
        else list = []

        // Normalize fields to our UI model (camelCase, createdAt, etc.)
        const normalized: ContactMessage[] = list.map((it) => ({
            id: it.id,
            name: it.name ?? it.full_name ?? '',
            email: it.email ?? '',
            subject: it.subject ?? it.title ?? null,
            message: it.message ?? it.body ?? '',
            status: (it.status ?? 'new') as ContactMessage['status'],
            createdAt: it.created_at ?? it.createdAt ?? it.created ?? it.created_at_utc ?? '',
        }))

        // Extract pagination metadata when available; provide sensible fallbacks
        const pg = pl?.pagination || data?.pagination || null
        const pagination: Pagination = {
            currentPage: Number(pg?.current_page ?? pg?.currentPage ?? params?.page ?? 1) || 1,
            perPage: Number(pg?.per_page ?? pg?.perPage ?? params?.perPage ?? (normalized.length || 15)) || 15,
            total: Number(pg?.total ?? normalized.length) || normalized.length,
            lastPage: Number(pg?.last_page ?? pg?.lastPage ?? 1) || 1,
            from: Number(pg?.from ?? (normalized.length ? 1 : 0)) || (normalized.length ? 1 : 0),
            to: Number(pg?.to ?? normalized.length) || normalized.length,
        }

        return { ok: true, data: normalized, pagination }
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Network error while fetching contact messages.'
        return { ok: false, message }
    }
}

export default listContactMessages
