import type { AuthUser } from '../contexts/auth-context.shared'
import { getApiUrl } from '../lib/methods'

export type ProfilePayload = {
    name: string
    email: string
    location: string
    country_code?: string
    phone_number?: string
    website?: string
    bio?: string
}

export type ProfileResult = { ok: true; user: AuthUser } | { ok: false; message: string }

function getAuthHeaderFromStorage(): Record<string, string> {
    try {
        const token = localStorage.getItem('auth_token')
        const type = localStorage.getItem('auth_token_type') || 'Bearer'
        if (token) return { Authorization: `${type} ${token}` }
    } catch {
        // ignore storage errors
    }
    return {}
}

export type GetUserBySlugResult = { ok: true; user: AuthUser } | { ok: false; message: string }

export async function getUserBySlug(slug: string): Promise<GetUserBySlugResult> {
    const url = getApiUrl(`users/${encodeURIComponent(slug)}`)

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                ...getAuthHeaderFromStorage(),
            },
        })

        const data = await res.json().catch(() => ({}) as never)

        if (!res.ok) {
            const message = (data && (data.message || data.error || data.errors?.[0] || data.detail)) || `Fetch failed with status ${res.status}`
            return { ok: false, message }
        }

        const user: AuthUser = (data && (data.payload?.user || data.user || data.data?.user || data.payload)) || {}
        return { ok: true, user }
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Network error while loading your profile.'
        return { ok: false, message }
    }
}

export async function updateProfile(payload: ProfilePayload): Promise<ProfileResult> {
    const url = getApiUrl('profile')

    try {
        // Map local camelCase fields to API snake_case expectations
        const apiPayload: Record<string, unknown> = {
            name: payload.name,
            email: payload.email,
            location: payload.location,
            website: payload.website,
            bio: payload.bio,
        }
        if (payload.country_code) apiPayload.country_code = payload.country_code
        if (payload.phone_number) apiPayload.phone_number = payload.phone_number

        const res = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                ...getAuthHeaderFromStorage(),
            },
            body: JSON.stringify(apiPayload),
        })

        const data = await res.json().catch(() => ({}) as never)

        if (!res.ok) {
            const message = (data && (data.message || data.error || data.errors?.[0] || data.detail)) || `Update failed with status ${res.status}`
            return { ok: false, message }
        }

        // Extract the updated user from various possible response shapes
        const user: AuthUser = (data && (data.payload?.user || data.user || data.data?.user)) || {}
        return { ok: true, user }
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Network error while updating your profile.'
        return { ok: false, message }
    }
}

export default updateProfile

// SETTINGS: Change Password
export type ChangePasswordPayload = {
    current_password: string
    new_password: string
}

export type ChangePasswordResult = { ok: true; message?: string } | { ok: false; message: string }

export async function changePassword(payload: ChangePasswordPayload): Promise<ChangePasswordResult> {
    const url = getApiUrl('profile/password')

    try {
        const res = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                ...getAuthHeaderFromStorage(),
            },
            body: JSON.stringify({
                current_password: payload.current_password,
                password: payload.new_password,
            }),
        })

        const data = await res.json().catch(() => ({}) as never)

        if (!res.ok) {
            const message = (data && (data.message || data.error || data.errors?.[0] || data.detail)) || `Update failed with status ${res.status}`
            return { ok: false, message }
        }

        const message: string | undefined = (data && (data.message || data.payload?.message || data.status)) || undefined
        return { ok: true, message }
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Network error while updating your password.'
        return { ok: false, message }
    }
}
