import { useRef, useState } from 'react'
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
    const formRef = useRef<HTMLFormElement>(null)
    const { user } = useAuth()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setStatus('submitting')
        // Placeholder: integrate with API when available
        await new Promise((r) => setTimeout(r, 800))
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

                        <Form ref={formRef} onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                {/* Full Name */}
                                <div className="group/input">
                                    <Label htmlFor="name">
                                        Full Name <Required />
                                    </Label>
                                    <Input id="name" name="name" placeholder="Jane Doe" defaultValue={userName} required className="w-full" />
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
                                        defaultValue={(user?.email as string) || ''}
                                        required
                                        className="w-full"
                                    />
                                </div>

                                {/* Country Code */}
                                <div className="group/input">
                                    <Label htmlFor="countryCode">Country Code</Label>
                                    <Input
                                        id="countryCode"
                                        name="countryCode"
                                        type="tel"
                                        placeholder="+1"
                                        defaultValue="+1"
                                        className="w-full"
                                    />
                                </div>

                                {/* Phone Number */}
                                <div className="group/input">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" name="phone" type="tel" placeholder="(555) 123-4567" className="w-full" />
                                </div>

                                {/* Location */}
                                <div className="group/input">
                                    <Label htmlFor="location">Location</Label>
                                    <Input id="location" name="location" placeholder="City, Country" className="w-full" />
                                </div>

                                {/* Website */}
                                <div className="group/input">
                                    <Label htmlFor="website">Website</Label>
                                    <Input id="website" name="website" type="url" placeholder="https://yourwebsite.com" className="w-full" />
                                </div>

                                {/* Bio - Full Width */}
                                <div className="group/input md:col-span-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea id="bio" name="bio" rows={4} placeholder="Tell us about yourself..." className="w-full" />
                                </div>
                            </div>

                            {/* Success Message with enhanced styling */}
                            {status === 'success' && (
                                <div className="animate-scale-in mt-6 flex items-center gap-3 rounded-lg border border-green-200/60 bg-linear-to-r from-green-50 to-emerald-50 px-4 py-3 shadow-sm">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500">
                                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-sm font-semibold text-green-800">Profile updated successfully!</p>
                                </div>
                            )}

                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <FormSubmitButton
                                    status={status}
                                    labels={{
                                        idle: 'Save Changes',
                                        submitting: 'Saving...',
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
