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
