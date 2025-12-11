import { getApiUrl } from '../lib/methods'

export type ContactPayload = {
    name: string
    email: string
    subject?: string
    message: string
}

export type ContactResult = { ok: true } | { ok: false; message: string }

export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
    const url = getApiUrl('contact')

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(payload),
        })

        const data = await res.json().catch(() => ({}) as any)

        if (!res.ok) {
            const message = (data && (data.message || data.error || data.errors?.[0] || data.detail)) || `Submission failed with status ${res.status}`
            return { ok: false, message }
        }

        return { ok: true }
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Network error while sending your message.'
        return { ok: false, message }
    }
}

export default submitContact
