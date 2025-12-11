import { useEffect, useRef, useState } from 'react'
import { getUserBySlug, updateProfile, type ProfilePayload } from '../api/profile'
import Alert from '../components/ui/Alert'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'
import Form from '../components/ui/Form'
import FormSubmitButton from '../components/ui/FormSubmitButton'
import Heading from '../components/ui/Heading'
import Input from '../components/ui/Input'
import Label from '../components/ui/Label'
import Required from '../components/ui/Required'
import Textarea from '../components/ui/Textarea.tsx'
import { useAuth } from '../contexts/auth-context.shared'

export default function ProfileUpdatePage() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    const [error, setError] = useState<string | null>(null)
    const [loadingProfile, setLoadingProfile] = useState<boolean>(true)
    const [loadError, setLoadError] = useState<string | null>(null)
    const [formDefaults, setFormDefaults] = useState<{ [k: string]: string }>({})
    const formRef = useRef<HTMLFormElement>(null)
    const { user, updateUser } = useAuth()

    useEffect(() => {
        // Fetch fresh profile details using /users/{user:slug} and prefill the form
        const raw = user as Record<string, unknown> | null
        const slug: string | undefined =
            (raw?.slug as string | undefined) || (raw?.username as string | undefined) || (raw?.userName as string | undefined)

        if (!slug) return

        getUserBySlug(slug)
            .then((res) => {
                if (!res.ok) {
                    setLoadError(res.message)
                    return
                }
                const u = (res.user || {}) as Record<string, unknown>
                const nextDefaults = {
                    name: (u.name as string) || '',
                    email: (u.email as string) || '',
                    location: (u.location as string) || '',
                    countryCode: (u.country_code as string) || (u.countryCode as string) || '',
                    phone: (u.phone_number as string) || (u.phone as string) || '',
                    website: (u.website as string) || (u.url as string) || '',
                    bio: (u.bio as string) || (u.about as string) || '',
                }
                setFormDefaults(nextDefaults)
            })
            .catch((e: unknown) => {
                const msg = e instanceof Error ? e.message : 'Failed to load your profile.'
                setLoadError(msg)
            })
            .finally(() => setLoadingProfile(false))
    }, [user])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError(null)
        setStatus('submitting')

        const form = e.currentTarget
        const formData = new FormData(form)

        // Basic client-side validation
        const name = (formData.get('name') || '').toString().trim()
        const email = (formData.get('email') || '').toString().trim()
        const location = (formData.get('location') || '').toString().trim()

        if (!name || !email || !location) {
            setStatus('error')
            setError('Please fill in your name, email address, and location.')
            return
        }

        const payload: ProfilePayload = {
            name,
            email,
            location,
            country_code: (formData.get('countryCode') || '').toString().trim() || undefined,
            phone_number: (formData.get('phone') || '').toString().trim() || undefined,
            website: (formData.get('website') || '').toString().trim() || undefined,
            bio: (formData.get('bio') || '').toString().trim() || undefined,
        }

        const result = await updateProfile(payload)
        if (!result.ok) {
            setStatus('error')
            setError(result.message)
            return
        }

        // Update the user in the AuthContext
        updateUser(result.user || {})

        setStatus('success')
        setTimeout(() => setStatus('idle'), 2000)
    }

    const userName = (user?.name as string) || 'User'
    const userInitial = userName.charAt(0).toUpperCase()

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="animate-fade-in-up mb-8">
                <div className="mb-3 flex items-center gap-2">
                    <Badge withDot variant="glow">
                        <span className={'ml-2'}>Account</span>
                    </Badge>
                </div>
                <Heading as="h1" variant="h2" className="mb-3">
                    Profile Settings
                </Heading>
                <p className="text-muted max-w-2xl text-lg leading-relaxed">Manage your personal information and preferences.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
                {/* Profile Card */}
                <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <Card variant="default" className="overflow-hidden">
                        <div className="flex flex-col items-center text-center">
                            {/* Avatar with enhanced styling */}
                            <div className="group/avatar relative mt-4 mb-4">
                                <div className="from-accent to-accent-2 flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br text-3xl font-bold text-white shadow-(--shadow-1) transition-all duration-500 ease-out group-hover/avatar:scale-110 group-hover/avatar:animate-[glow-pulse_2s_ease-in-out_infinite] group-hover/avatar:shadow-(--shadow-hover)">
                                    {userInitial}
                                </div>
                                {/* Online indicator */}
                                <div className="absolute right-1 bottom-1 h-5 w-5 rounded-full border-4 border-white bg-green-500 shadow-sm"></div>
                            </div>

                            <h3 className="text-text mb-1 text-xl font-bold transition-colors duration-300">{userName}</h3>
                            <p className="text-muted mb-6 text-sm transition-colors duration-300">{(user?.email as string) || 'user@example.com'}</p>

                            {/* Stats with hover effects */}
                            <div className="mb-6 grid w-full grid-cols-2 gap-4 border-t border-black/6 pt-6">
                                <div className="group/stat hover:bg-accent/5 cursor-pointer rounded-lg p-2 transition-all duration-300">
                                    <p className="text-accent text-2xl font-bold transition-transform duration-300 group-hover/stat:scale-110">24</p>
                                    <p className="text-muted group-hover/stat:text-accent text-xs tracking-wider uppercase transition-colors duration-300">
                                        Artworks
                                    </p>
                                </div>
                                <div className="group/stat hover:bg-accent/5 cursor-pointer rounded-lg p-2 transition-all duration-300">
                                    <p className="text-accent text-2xl font-bold transition-transform duration-300 group-hover/stat:scale-110">
                                        3.2k
                                    </p>
                                    <p className="text-muted group-hover/stat:text-accent text-xs tracking-wider uppercase transition-colors duration-300">
                                        Views
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Form Card with enhanced header */}
                <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <Card variant="default" className="overflow-hidden">
                        <div className="mt-4 mb-6 ml-10 flex items-start gap-4">
                            <div className="from-accent/10 to-accent-2/10 inline-flex items-center justify-center rounded-lg bg-linear-to-br p-2.5">
                                <svg className="text-accent h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-text mb-2 text-xl font-bold">Personal Information</h2>
                                <p className="text-muted text-sm">Update your personal details and contact information.</p>
                            </div>
                        </div>

                        <Form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            // Force re-mount of inputs so defaultValue takes effect after async load
                            key={JSON.stringify(formDefaults)}
                        >
                            {/* First Row: Name, Email, Location */}
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                                {/* Full Name */}
                                <div className="group/input">
                                    <Label htmlFor="name">
                                        Full Name <Required />
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Jane Doe"
                                        defaultValue={formDefaults.name ?? userName}
                                        required
                                        className="w-full"
                                    />
                                </div>

                                {/* Email Address */}
                                <div className="group/input">
                                    <Label htmlFor="email">
                                        Email Address <Required />
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="jane@example.com"
                                        defaultValue={formDefaults.email ?? ((user?.email as string) || '')}
                                        required
                                        className="w-full"
                                    />
                                </div>

                                {/* Location */}
                                <div className="group/input">
                                    <Label htmlFor="location">
                                        Location <Required />
                                    </Label>
                                    <Input
                                        id="location"
                                        name="location"
                                        placeholder="City, Country"
                                        defaultValue={formDefaults.location ?? ''}
                                        className="w-full"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Second Row: Country Code, Phone, Website */}
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
                                {/* Country Code */}
                                <div className="group/input md:col-span-1">
                                    <Label htmlFor="countryCode">Country Code</Label>
                                    <Input
                                        id="countryCode"
                                        name="countryCode"
                                        type="tel"
                                        placeholder="+1"
                                        defaultValue={formDefaults.countryCode ?? ''}
                                        className="w-full"
                                    />
                                </div>

                                {/* Phone Number */}
                                <div className="group/input md:col-span-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="(555) 123-4567"
                                        defaultValue={formDefaults.phone ?? ''}
                                        className="w-full"
                                    />
                                </div>

                                {/* Website */}
                                <div className="group/input md:col-span-3">
                                    <Label htmlFor="website">Website</Label>
                                    <Input
                                        id="website"
                                        name="website"
                                        type="url"
                                        placeholder="https://yourwebsite.com"
                                        defaultValue={formDefaults.website ?? ''}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            {/* Bio - Full Width */}
                            <div className="group/input">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    name="bio"
                                    rows={4}
                                    placeholder="Tell us about yourself..."
                                    defaultValue={formDefaults.bio ?? ''}
                                    className="w-full"
                                />
                            </div>

                            {/* Profile Load Error */}
                            {loadError && <Alert variant="error" message={loadError} className="mt-6 animate-[scale-in_0.3s_ease-out]" />}

                            {/* Error Message */}
                            {status === 'error' && error && (
                                <Alert variant="error" message={error} className="mt-6 animate-[scale-in_0.3s_ease-out]" />
                            )}

                            {/* Success Message */}
                            {status === 'success' && (
                                <Alert variant="success" message="Profile updated successfully!" className="mt-6 animate-[scale-in_0.3s_ease-out]" />
                            )}

                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <FormSubmitButton
                                    status={loadingProfile ? 'submitting' : status}
                                    labels={{
                                        idle: loadingProfile ? 'Loading...' : 'Save Changes',
                                        submitting: loadingProfile ? 'Loading...' : 'Saving...',
                                        success: 'Saved!',
                                        error: 'Save Changes',
                                    }}
                                />
                                <button
                                    type="button"
                                    className="text-muted group/cancel hover:text-text rounded-lg px-6 py-2 font-semibold transition-all duration-300 hover:bg-black/5"
                                >
                                    Cancel
                                </button>
                            </div>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    )
}
