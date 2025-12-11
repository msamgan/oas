import { useCallback, useMemo, useState } from 'react'
import { getApiUrl } from '../lib/methods'
import { AuthContext, type AuthContextValue, type AuthState, type AuthUser, type SignInPayload } from './auth-context.shared'

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AuthState>(() => {
        try {
            const token = localStorage.getItem('auth_token')
            const tokenType = localStorage.getItem('auth_token_type')
            const rawUser = localStorage.getItem('user')
            const user = rawUser ? (JSON.parse(rawUser) as AuthUser) : null
            return { user, token, tokenType, loading: false }
        } catch {
            return { user: null, token: null, tokenType: null, loading: false }
        }
    })

    const persist = useCallback((user: AuthUser, token: string, tokenType?: string | null) => {
        localStorage.setItem('auth_token', token)
        if (tokenType) localStorage.setItem('auth_token_type', tokenType)
        localStorage.setItem('user', JSON.stringify(user || {}))
    }, [])

    const clear = useCallback(() => {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_token_type')
        localStorage.removeItem('user')
    }, [])

    const signIn = useCallback(
        async ({ email, password }: SignInPayload) => {
            const url = getApiUrl('auth/sign-in')
            if (!url) return { ok: false as const, message: 'Missing API configuration.' }

            try {
                const res = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                })

                const data = await res.json().catch(() => ({}))

                if (!res.ok) {
                    const message =
                        (data && (data.message || data.error || data.errors?.[0] || data.detail)) || `Sign in failed with status ${res.status}`
                    return { ok: false as const, message }
                }

                const token: string | undefined = data?.payload?.token || data?.token || data?.access_token || data?.data?.token
                const tokenType: string | undefined = data?.payload?.type || data?.type || data?.token_type || null
                if (!token) return { ok: false as const, message: 'Unexpected response from server: missing token.' }

                const user: AuthUser = data?.payload?.user || data?.user || data?.data?.user || {}
                persist(user, token, tokenType || null)
                setState({ user, token, tokenType: tokenType || null, loading: false })
                return { ok: true as const }
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : 'Network error while signing in.'
                return { ok: false as const, message }
            }
        },
        [persist],
    )

    const signOut = useCallback(() => {
        clear()
        setState({ user: null, token: null, tokenType: null, loading: false })
    }, [clear])

    const updateUser = useCallback((user: AuthUser) => {
        setState((prev) => ({ ...prev, user }))
        localStorage.setItem('user', JSON.stringify(user || {}))
    }, [])

    const getAuthHeader = useCallback<() => Record<string, string>>(() => {
        const headers: Record<string, string> = {}
        if (state.token) {
            const type = state.tokenType || 'Bearer'
            headers.Authorization = `${type} ${state.token}`
        }
        return headers
    }, [state.token, state.tokenType])

    // derive permissions set from user payload in a tolerant way
    const permissionsSet = useMemo<Set<string>>(() => {
        const perms = new Set<string>()
        const user = state.user as unknown as Record<string, unknown> | null
        const tryAdd = (val: unknown) => {
            if (!val) return
            if (Array.isArray(val)) {
                for (const p of val) if (typeof p === 'string') perms.add(p)
            } else if (typeof val === 'string') {
                val.split(',').map((s) => s.trim()).filter(Boolean).forEach((s) => perms.add(s))
            }
        }
        if (user && typeof user === 'object') {
            tryAdd((user as any).permissions)
            tryAdd((user as any).scopes)
            tryAdd((user as any).abilities)
            tryAdd((user as any).perms)
        }
        return perms
    }, [state.user])

    const hasPermission = useCallback(
        (permission: string) => permissionsSet.has('*') || permissionsSet.has(permission),
        [permissionsSet],
    )

    const value = useMemo<AuthContextValue>(
        () => ({
            ...state,
            isAuthenticated: Boolean(state.token),
            signIn,
            signOut,
            getAuthHeader,
            updateUser,
            hasPermission,
        }),
        [state, signIn, signOut, getAuthHeader, updateUser, hasPermission],
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
