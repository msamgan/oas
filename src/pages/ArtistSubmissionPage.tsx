import { useRef, useState } from 'react'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import Form from '../components/ui/Form'
import Heading from '../components/ui/Heading'
import Input from '../components/ui/Input'
import Label from '../components/ui/Label'
import Required from '../components/ui/Required'
import Section from '../components/ui/Section'
import Textarea from '../components/ui/Textarea'

function ArtistSubmissionPage() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle')
    const formRef = useRef<HTMLFormElement>(null)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // Static placeholder: Replace with real submission/API later.
        setStatus('submitting')
        setTimeout(() => {
            setStatus('submitted')
            setTimeout(() => {
                setStatus('idle')
                formRef.current?.reset()
            }, 3000)
        }, 800)
    }

    return (
        <main className="min-h-screen">
            {/* Hero */}
            <Section padding="lg" className="relative overflow-hidden">
                <div className="absolute inset-0 animate-[gradient-shift_8s_ease-in-out_infinite] bg-gradient-to-br from-[rgba(255,122,24,0.08)] via-transparent to-[rgba(255,183,3,0.06)] [background-size:200%_200%]" />
                <Container className="relative z-10">
                    <div className="mx-auto max-w-3xl text-center">
                        <Badge withDot className="mb-6">
                            Artist Intake
                        </Badge>
                        <Heading as="h1" variant="hero" className="mb-5">
                            Submit Your Artist Profile
                        </Heading>
                        <p className="text-lg leading-relaxed text-[var(--color-muted)] md:text-xl">
                            Share your details for admin review. Once approved, you’ll receive sign-in credentials to manage your profile.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Submission Form */}
            <Section padding="md" className="bg-gradient-to-b from-transparent to-[rgba(255,122,24,0.02)]">
                <Container>
                    <Form ref={formRef} onSubmit={handleSubmit} aria-labelledby="artist-submit-title">
                        <div className="mb-2">
                            <h2 id="artist-submit-title" className="text-2xl font-extrabold text-[var(--color-text)]">
                                Artist Information
                            </h2>
                            <p className="mt-1 text-sm text-[var(--color-muted)]">
                                Fields marked <Required /> are required.
                            </p>
                        </div>

                        {/* Basic Info */}
                        <div className="grid gap-5 md:grid-cols-2">
                            <div className="group/input">
                                <Label htmlFor="name">
                                    Full Name <Required />
                                </Label>
                                <Input id="name" name="name" required placeholder="Your name" autoComplete="name" className="w-full" />
                            </div>
                            <div className="group/input">
                                <Label htmlFor="email">
                                    Email <Required />
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    className="w-full"
                                />
                            </div>
                            <div className="group/input">
                                <Label htmlFor="location">
                                    Location <Required />
                                </Label>
                                <Input id="location" name="location" required placeholder="City, Country" className="w-full" />
                            </div>
                            <div className="group/input">
                                <Label htmlFor="website">Website / Portfolio</Label>
                                <Input id="website" name="website" type="url" placeholder="https://your-portfolio.com" className="w-full" />
                            </div>
                        </div>

                        {/* Artistic Profile */}
                        <div className="mt-5 grid gap-5 md:grid-cols-2">
                            <div className="group/input">
                                <Label htmlFor="genre">
                                    Genre <Required />
                                </Label>
                                <Input id="genre" name="genre" required placeholder="e.g., Abstract, Mixed Media" className="w-full" />
                            </div>
                            <div className="group/input">
                                <Label htmlFor="category">
                                    Category <Required />
                                </Label>
                                <Input id="category" name="category" required placeholder="e.g., Contemporary" className="w-full" />
                            </div>
                            <div className="group/input md:col-span-2">
                                <Label htmlFor="bio">
                                    Short Bio <Required />
                                </Label>
                                <Textarea
                                    id="bio"
                                    name="bio"
                                    required
                                    rows={5}
                                    placeholder="Tell us about your work, style, and achievements"
                                    className="w-full"
                                />
                            </div>
                        </div>

                        {/* Socials */}
                        <div className="mt-5 grid gap-5 md:grid-cols-3">
                            <div className="group/input">
                                <Label htmlFor="instagram">Instagram</Label>
                                <Input id="instagram" name="instagram" type="url" placeholder="https://instagram.com/username" className="w-full" />
                            </div>
                            <div className="group/input">
                                <Label htmlFor="twitter">X/Twitter</Label>
                                <Input id="twitter" name="twitter" type="url" placeholder="https://x.com/username" className="w-full" />
                            </div>
                            <div className="group/input">
                                <Label htmlFor="facebook">Facebook</Label>
                                <Input id="facebook" name="facebook" type="url" placeholder="https://facebook.com/username" className="w-full" />
                            </div>
                        </div>

                        {/* Sample Works */}
                        <div className="mt-6">
                            <h3 className="mb-2 text-lg font-bold text-[var(--color-text)]">Sample Works</h3>
                            <p className="mb-4 text-sm text-[var(--color-muted)]">
                                Share up to three links to representative works (drive, portfolio pages, or public image URLs).
                            </p>
                            <div className="grid gap-5 md:grid-cols-3">
                                <div className="group/input">
                                    <Label htmlFor="work1">Work URL 1</Label>
                                    <Input id="work1" name="work1" type="url" placeholder="https://..." className="w-full" />
                                </div>
                                <div className="group/input">
                                    <Label htmlFor="work2">Work URL 2</Label>
                                    <Input id="work2" name="work2" type="url" placeholder="https://..." className="w-full" />
                                </div>
                                <div className="group/input">
                                    <Label htmlFor="work3">Work URL 3</Label>
                                    <Input id="work3" name="work3" type="url" placeholder="https://..." className="w-full" />
                                </div>
                            </div>
                        </div>

                        {/* Consent */}
                        <div className="mt-6">
                            <label className="flex cursor-pointer items-center gap-2 text-sm text-[var(--color-muted)]">
                                <input required type="checkbox" name="consent" className="h-4 w-4 accent-[var(--color-accent)]" />I confirm the
                                information provided is accurate and I agree to be contacted by Orange Art Studio.
                            </label>
                        </div>

                        <div className="mt-6">
                            <Button type="submit" disabled={status === 'submitting'}>
                                {status === 'submitting' ? 'Submitting…' : 'Submit for Review'}
                            </Button>
                        </div>

                        {status === 'submitted' && (
                            <p role="status" className="mt-3 text-sm text-[var(--color-accent)]">
                                Thank you! Your submission has been received for admin review. You’ll be emailed sign-in details upon approval.
                            </p>
                        )}
                    </Form>
                </Container>
            </Section>
        </main>
    )
}

export default ArtistSubmissionPage
