// Centralized application route constants
// Use these in Router definitions, Header, Sidebar, and anywhere links are needed

export const ROUTES = {
    HOME: '/',
    ABOUT: '/about',
    ARTISTS: '/artists',
    ARTIST_DETAILS: '/artists/:slug',
    ART_DETAILS: '/art/:slug',
    CONTACT: '/contact',
    SIGN_IN: '/sign-in',
    SUBMIT_ARTIST: '/submit-artist',

    // Protected
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    SETTINGS: '/settings',
    CONTACT_MESSAGES: '/contact-messages',
} as const

export type RouteKey = keyof typeof ROUTES
export type RoutePath = (typeof ROUTES)[RouteKey]
