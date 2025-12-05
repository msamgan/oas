// Utility helpers to build URL slugs consistently across the app

export function normalizeForSlug(input: string) {
    return input
        .normalize('NFKD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
}

export function artistSlug(name: string, location?: string) {
    const base = location ? `${name}-${location}` : name
    return normalizeForSlug(base)
}

// Generate a lowercase random string of the given length using a-z
function randomLowercase(length = 6) {
    const letters = 'abcdefghijklmnopqrstuvwxyz'
    const out: string[] = []
    // Prefer crypto if available for better randomness
    if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
        const buf = new Uint32Array(length)
        crypto.getRandomValues(buf)
        for (let i = 0; i < length; i++) {
            out.push(letters[buf[i] % 26])
        }
    } else {
        for (let i = 0; i < length; i++) {
            out.push(letters[Math.floor(Math.random() * 26)])
        }
    }
    return out.join('')
}

// Art slug: artist name + 6-digit random lowercase string
// Example: "aya-kim-qlxvpd"
export function artSlug(artistName: string) {
    return `${normalizeForSlug(artistName)}-${randomLowercase(6)}`
}

// Parse functions to assist resolving artist and code from an art slug
export function parseArtSlug(slug: string): { artistPart: string; code: string | null } {
    const parts = slug.split('-')
    if (parts.length === 0) return { artistPart: '', code: null }
    const code = parts[parts.length - 1]
    if (/^[a-z]{6}$/.test(code)) {
        const artistPart = parts.slice(0, -1).join('-')
        return { artistPart, code }
    }
    return { artistPart: slug, code: null }
}
