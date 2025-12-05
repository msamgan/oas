export type Artist = {
    name: string
    genre: string
    bio: string
    works: number
    category: string
    featured?: boolean
    location?: string
}

export const artists: Artist[] = [
    {
        name: 'Aya Kim',
        genre: 'Abstract, Mixed Media',
        bio: 'Known for vibrant color palettes and emotional depth',
        works: 24,
        category: 'Abstract',
        featured: true,
        location: 'Seoul, South Korea',
    },
    {
        name: 'Leo Martinez',
        genre: 'Contemporary, Acrylic',
        bio: 'Creates bold contemporary pieces with striking contrasts',
        works: 18,
        category: 'Contemporary',
        location: 'Mexico City, Mexico',
    },
    {
        name: 'Mara Chen',
        genre: 'Urban, Digital',
        bio: 'Digital artist exploring modern urban landscapes',
        works: 32,
        category: 'Digital',
        location: 'Hong Kong',
    },
    {
        name: 'Yusuf Rahman',
        genre: 'Geometric, Oil',
        bio: 'Precise geometric compositions with rich oil textures',
        works: 15,
        category: 'Geometric',
        featured: true,
        location: 'Dubai, UAE',
    },
    {
        name: 'Nora Singh',
        genre: 'Minimal, Sculpture',
        bio: 'Minimalist sculptor working with natural materials',
        works: 12,
        category: 'Sculpture',
        location: 'Mumbai, India',
    },
    {
        name: 'Iris Park',
        genre: 'Textural, Pastel',
        bio: 'Delicate pastel works with intricate textural details',
        works: 28,
        category: 'Contemporary',
        location: 'Paris, France',
    },
    {
        name: 'Diego Silva',
        genre: 'Street Art, Spray',
        bio: 'Street artist bringing gallery-quality urban expressions',
        works: 41,
        category: 'Urban',
        location: 'São Paulo, Brazil',
    },
    {
        name: 'Amara Johnson',
        genre: 'Portrait, Oil',
        bio: 'Capturing human emotion through classical oil techniques',
        works: 19,
        category: 'Portrait',
        featured: true,
        location: 'New York, USA',
    },
    {
        name: 'Kai Tanaka',
        genre: 'Abstract, Ink',
        bio: 'Traditional ink techniques meeting modern abstraction',
        works: 26,
        category: 'Abstract',
        location: 'Tokyo, Japan',
    },
]
