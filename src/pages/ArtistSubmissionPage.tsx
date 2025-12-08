import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
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
    const sidebarRef = useRef<HTMLDivElement>(null)

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

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            },
            { threshold: 0.1 },
        )

        if (formRef.current) observer.observe(formRef.current)
        if (sidebarRef.current) observer.observe(sidebarRef.current)

        return () => observer.disconnect()
    }, [])

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <Section id="submit-hero" padding="lg" className="relative -mb-14 overflow-hidden">
                <div className="absolute inset-0 animate-[gradient-shift_8s_ease-in-out_infinite] bg-linear-to-br from-[rgba(255,122,24,0.04)] via-transparent to-[rgba(255,183,3,0.03)] bg-size-[200%_200%]" />

                {/* Decorative floating orbs */}
                <div className="pointer-events-none absolute -top-1/2 -right-[20%] h-[600px] w-[600px] animate-[float_8s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgba(255,122,24,0.08)_0%,transparent_70%)]" />
                <div className="pointer-events-none absolute -bottom-[40%] -left-[10%] h-[500px] w-[500px] animate-[float_10s_ease-in-out_infinite_reverse] rounded-full bg-[radial-gradient(circle,rgba(255,183,3,0.06)_0%,transparent_70%)]" />

                <Container className="relative z-10">
                    <div className="mx-auto max-w-3xl text-center">
                        <Badge withDot className="animate-scale-in mb-6">
                            Artist Intake
                        </Badge>
                        <Heading as="h1" variant="hero" className="mb-5 animate-[fade-in-up_0.8s_ease-out_0.2s_both]">
                            Submit Your{' '}
                            <span className="from-accent to-accent-2 relative inline-block animate-[gradient-shift_3s_ease-in-out_infinite] bg-linear-to-br bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                                Artist Profile
                            </span>
                        </Heading>
                        <p className="text-muted animate-[fade-in-up_0.8s_ease-out_0.3s_both] text-lg leading-relaxed md:text-xl">
                            Share your details for admin review. Once approved, you'll receive sign-in credentials to manage your profile and showcase
                            your work to the world.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Submission Form Section */}
            <Section id="submit-form" padding="md" className="bg-linear-to-b from-transparent to-[rgba(255,122,24,0.02)]">
                <Container>
                    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                        {/* Main Submission Form */}
                        <Form ref={formRef} onSubmit={handleSubmit} aria-labelledby="artist-submit-title">
                            <div className="mb-6">
                                <h2 id="artist-submit-title" className="text-text text-2xl font-extrabold md:text-3xl">
                                    Artist Information
                                </h2>
                                <p className="text-muted mt-2 text-sm">
                                    Fields marked <Required /> are required. We'll review your submission and get back to you within 3–5 business
                                    days.
                                </p>
                            </div>

                            {/* Basic Info */}
                            <div className="space-y-5">
                                <div className="grid gap-5 md:grid-cols-2">
                                    <div className="group/input">
                                        <Label htmlFor="name">
                                            Full Name <Required />
                                        </Label>
                                        <Input id="name" name="name" required placeholder="Your full name" autoComplete="name" className="w-full" />
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
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">
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
                                <div className="grid gap-5 md:grid-cols-2">
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
                                </div>

                                <div className="group/input">
                                    <Label htmlFor="bio">
                                        Artist Bio <Required />
                                    </Label>
                                    <Textarea
                                        id="bio"
                                        name="bio"
                                        required
                                        rows={5}
                                        placeholder="Tell us about your artistic journey, style, and notable achievements..."
                                        className="w-full"
                                    />
                                </div>

                                {/* Social Links */}
                                <div>
                                    <h3 className="text-text mb-3 text-lg font-bold">Social Media</h3>
                                    <div className="grid gap-5 md:grid-cols-3">
                                        <div className="group/input">
                                            <Label htmlFor="instagram">Instagram</Label>
                                            <Input
                                                id="instagram"
                                                name="instagram"
                                                type="url"
                                                placeholder="https://instagram.com/..."
                                                className="w-full"
                                            />
                                        </div>
                                        <div className="group/input">
                                            <Label htmlFor="twitter">X / Twitter</Label>
                                            <Input id="twitter" name="twitter" type="url" placeholder="https://x.com/..." className="w-full" />
                                        </div>
                                        <div className="group/input">
                                            <Label htmlFor="facebook">Facebook</Label>
                                            <Input
                                                id="facebook"
                                                name="facebook"
                                                type="url"
                                                placeholder="https://facebook.com/..."
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Sample Works */}
                                <div>
                                    <h3 className="text-text mb-2 text-lg font-bold">Sample Works</h3>
                                    <p className="text-muted mb-4 text-sm">
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
                                <div className="flex items-start gap-2 rounded-sm border border-black/10 bg-black/[0.02] p-4">
                                    <label className="text-muted hover:text-text flex cursor-pointer items-start gap-3 text-sm transition-colors">
                                        <input
                                            required
                                            type="checkbox"
                                            name="consent"
                                            className="accent-accent hover:border-accent mt-0.5 h-4 w-4 cursor-pointer rounded border-black/20 bg-white transition-all"
                                        />
                                        <span>
                                            I confirm the information provided is accurate and I agree to be contacted by Orange Art Studio regarding
                                            my submission.
                                        </span>
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-2">
                                    <Button
                                        type="submit"
                                        disabled={status === 'submitting' || status === 'submitted'}
                                        className="w-full transition-all"
                                    >
                                        {status === 'submitting' && (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <circle cx="12" cy="12" r="10" strokeWidth="2" strokeOpacity="0.3" />
                                                    <path d="M12 2 A10 10 0 0 1 22 12" strokeWidth="2" strokeLinecap="round" />
                                                </svg>
                                                Submitting...
                                            </span>
                                        )}
                                        {status === 'submitted' && (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Submitted!
                                            </span>
                                        )}
                                        {status === 'idle' && 'Submit for Review'}
                                    </Button>
                                </div>
                            </div>

                            {/* Success Message */}
                            {status === 'submitted' && (
                                <div className="mt-4 animate-[scale-in_0.3s_ease-out] rounded-sm border border-[rgba(255,183,3,0.3)] bg-[rgba(255,183,3,0.08)] p-4">
                                    <p className="text-accent-2 flex items-center gap-2 text-sm font-semibold">
                                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        Thank you! Your submission has been received. You'll be emailed sign-in details upon approval.
                                    </p>
                                </div>
                            )}
                        </Form>

                        {/* Submission Info Sidebar */}
                        <aside ref={sidebarRef} className="animate-[fade-in-up_0.7s_ease-out_0.6s_both] space-y-6 opacity-0">
                            {/* Submission Process Card */}
                            <div className="group rounded-[var(--radius)] border border-black/10 bg-gradient-to-br from-white to-[rgba(255,122,24,0.02)] p-6 shadow-[var(--shadow-1)] transition-all duration-500 hover:border-[rgba(255,122,24,0.2)] hover:shadow-[var(--shadow-hover)]">
                                <h3 className="text-text mb-4 flex items-center gap-2 text-lg font-bold">
                                    <svg className="text-accent h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    What Happens Next?
                                </h3>
                                <ol className="text-muted space-y-4 text-sm">
                                    <li className="flex items-start gap-3">
                                        <span className="text-accent flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(255,122,24,0.15)] text-xs font-bold">
                                            1
                                        </span>
                                        <div>
                                            <p className="text-text font-semibold">We Review Your Profile</p>
                                            <p className="mt-1 text-xs">Our team carefully reviews each submission within 3–5 business days.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-accent flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(255,122,24,0.15)] text-xs font-bold">
                                            2
                                        </span>
                                        <div>
                                            <p className="text-text font-semibold">Get Your Login Credentials</p>
                                            <p className="mt-1 text-xs">Upon approval, we'll email you secure sign-in details.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-accent flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(255,122,24,0.15)] text-xs font-bold">
                                            3
                                        </span>
                                        <div>
                                            <p className="text-text font-semibold">Manage Your Portfolio</p>
                                            <p className="mt-1 text-xs">Log in to update your profile, add works, and connect with art lovers.</p>
                                        </div>
                                    </li>
                                </ol>
                            </div>

                            {/* Requirements Card */}
                            <div className="group rounded-[var(--radius)] border border-black/10 bg-gradient-to-br from-white to-[rgba(255,183,3,0.02)] p-6 shadow-[var(--shadow-1)] transition-all duration-500 hover:border-[rgba(255,183,3,0.2)] hover:shadow-[var(--shadow-hover)]">
                                <h3 className="text-text mb-4 flex items-center gap-2 text-lg font-bold">
                                    <svg className="text-accent-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    Submission Tips
                                </h3>
                                <ul className="text-muted space-y-3 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="text-accent">✓</span>
                                        <span>Provide a compelling bio that tells your artistic story</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-accent">✓</span>
                                        <span>Include high-quality images of your best work</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-accent">✓</span>
                                        <span>Link to your portfolio or professional website</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-accent">✓</span>
                                        <span>Add your social media for better visibility</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Quick Links Card */}
                            <div className="group rounded-[var(--radius)] border border-black/10 bg-gradient-to-br from-white to-[rgba(255,122,24,0.02)] p-6 shadow-[var(--shadow-1)] transition-all duration-500 hover:border-[rgba(255,122,24,0.2)] hover:shadow-[var(--shadow-hover)]">
                                <h3 className="text-text mb-4 text-lg font-bold">Helpful Resources</h3>
                                <ul className="space-y-3 text-sm">
                                    <li>
                                        <Link to="/artists" className="oas-link oas-link-underline flex items-center gap-2 font-medium">
                                            <span>→</span>
                                            View Featured Artists
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/about" className="oas-link oas-link-underline flex items-center gap-2 font-medium">
                                            <span>→</span>
                                            About Our Mission
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/contact" className="oas-link oas-link-underline flex items-center gap-2 font-medium">
                                            <span>→</span>
                                            Contact Support
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Privacy Note */}
                            <div className="rounded-sm border border-black/[0.06] bg-black/[0.02] p-4">
                                <p className="flex items-start gap-2 text-xs leading-relaxed text-[var(--color-muted)]">
                                    <svg className="text-accent mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <span>
                                        Your information is secure and confidential. We use it solely for artist verification and never share it with
                                        third parties.
                                    </span>
                                </p>
                            </div>
                        </aside>
                    </div>
                </Container>
            </Section>

            {/* CTA Section */}
            <Section id="submit-cta" padding="md">
                <Container>
                    <div className="animate-fade-in-up relative overflow-hidden rounded-[var(--radius)] border border-[rgba(255,122,24,0.2)] bg-[linear-gradient(135deg,rgba(255,122,24,0.06)_0%,rgba(255,183,3,0.04)_100%)] p-10 text-center shadow-[var(--shadow-hover)] md:p-12 lg:p-16">
                        <div className="relative z-2">
                            <h2 className="from-text to-accent m-0 mb-4 bg-linear-to-br bg-clip-text text-[clamp(28px,5vw,42px)] font-black tracking-[-0.5px] text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                                Questions About Submission?
                            </h2>
                            <p className="text-muted mx-auto mb-8 max-w-[60ch] text-[clamp(16px,2.2vw,18px)] leading-[1.6]">
                                Our team is here to help guide you through the process. Reach out if you have any questions about joining our artist
                                community.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 max-sm:flex-col max-sm:items-stretch">
                                <Link to="/contact">
                                    <Button className="max-sm:w-full">Contact Support</Button>
                                </Link>
                                <Link to="/artists">
                                    <Button variant="secondary" className="max-sm:w-full">
                                        View Current Artists
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Decorative rotating elements */}
                        <div className="pointer-events-none absolute top-0 right-0 z-1 h-full w-full">
                            <div className="absolute -top-[200px] -right-[100px] h-[400px] w-[400px] animate-[float_10s_ease-in-out_infinite,rotate_20s_linear_infinite] rounded-full bg-[radial-gradient(circle,rgba(255,122,24,0.1)_0%,transparent_70%)]" />
                            <div className="absolute -bottom-[150px] -left-[100px] h-[300px] w-[300px] animate-[float_12s_ease-in-out_infinite_reverse,rotate_25s_linear_infinite_reverse] rounded-full bg-[radial-gradient(circle,rgba(255,183,3,0.1)_0%,transparent_70%)]" />
                        </div>
                    </div>
                </Container>
            </Section>
        </main>
    )
}

export default ArtistSubmissionPage
