import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getApiUrl } from '../lib/methods'

type AuthUser = Record<string, any> | null

type AuthState = {
    user: AuthUser
    token: string | null
    tokenType: string | null
    loading: boolean
}

type SignInPayload = {
    email: string
    password: string
}

type AuthContextValue = AuthState & {
    isAuthenticated: boolean
    signIn: (payload: SignInPayload) => Promise<{ ok: true } | { ok: false; message: string }>
    signOut: () => void
    getAuthHeader: () => Record<string, string>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AuthState>({ user: null, token: null, tokenType: null, loading: true })

    // Hydrate from storage on mount
    useEffect(() => {
        try {
            const token = localStorage.getItem('auth_token')
            const tokenType = localStorage.getItem('auth_token_type')
            const rawUser = localStorage.getItem('user')
            const user = rawUser ? (JSON.parse(rawUser) as AuthUser) : null
            setState({ user, token, tokenType, loading: false })
        } catch {
            setState({ user: null, token: null, tokenType: null, loading: false })
        }
    }, [])

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
            } catch (err: any) {
                return { ok: false as const, message: err?.message || 'Network error while signing in.' }
            }
        },
        [persist],
    )

    const signOut = useCallback(() => {
        clear()
        setState({ user: null, token: null, tokenType: null, loading: false })
    }, [clear])

    const getAuthHeader = useCallback(() => {
        if (!state.token) return {}
        const type = state.tokenType || 'Bearer'
        return { Authorization: `${type} ${state.token}` }
    }, [state.token, state.tokenType])

    const value = useMemo<AuthContextValue>(
        () => ({
            ...state,
            isAuthenticated: Boolean(state.token),
            signIn,
            signOut,
            getAuthHeader,
        }),
        [state, signIn, signOut, getAuthHeader],
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
    return ctx
}
