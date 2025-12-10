import { createContext, useContext } from 'react'

export type AuthUser = Record<string, unknown> | null

export type AuthState = {
    user: AuthUser
    token: string | null
    tokenType: string | null
    loading: boolean
}

export type SignInPayload = {
    email: string
    password: string
}

export type AuthContextValue = AuthState & {
    isAuthenticated: boolean
    signIn: (payload: SignInPayload) => Promise<{ ok: true } | { ok: false; message: string }>
    signOut: () => void
    getAuthHeader: () => Record<string, string>
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
    return ctx
}
