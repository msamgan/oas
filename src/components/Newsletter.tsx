import { type FormEvent, useState } from 'react'
import Badge from './ui/Badge.tsx'
import Button from './ui/Button'
import Container from './ui/Container'
import Heading from './ui/Heading'
import Input from './ui/Input'
import Section from './ui/Section'

function Newsletter() {
    const [email, setEmail] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (email) {
            setIsSubmitted(true)
            setTimeout(() => {
                setEmail('')
                setIsSubmitted(false)
            }, 3000)
        }
    }

    return (
        <Section padding="lg" className="relative">
            <Container>
                <div className="via-surface relative overflow-hidden rounded-(--radius) border border-black/10 bg-linear-to-br from-white to-white p-10 shadow-(--shadow-2) md:p-16">
                    {/* Enhanced decorative background elements */}
                    <div className="from-accent/15 via-accent-2/10 pointer-events-none absolute -top-32 -right-32 h-80 w-80 animate-[float_8s_ease-in-out_infinite] rounded-full bg-linear-to-br to-transparent blur-3xl" />
                    <div className="from-accent-2/12 via-accent/8 pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 animate-[float_10s_ease-in-out_infinite_2s] rounded-full bg-linear-to-tr to-transparent blur-3xl" />
                    <div className="from-accent/5 to-accent-2/5 pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-[pulse_4s_ease-in-out_infinite] rounded-full bg-linear-to-r blur-2xl" />

                    <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-[1.3fr_1fr] lg:gap-16">
                        <div className="animate-[fade-in-up_0.8s_ease-out_0s_both]">
                            <Badge withDot className="mb-5 animate-[scale-in_0.6s_ease-out_0.2s_both]">
                                NEWSLETTER
                            </Badge>
                            <Heading as="h2" variant="h2" className="from-text to-accent mb-4 bg-linear-to-r bg-clip-text text-transparent">
                                Stay in the loop
                            </Heading>
                            <p className="text-muted mb-6 text-lg leading-relaxed">
                                Get early access to new releases, exclusive open calls, and curated studio updates delivered straight to your inbox.
                            </p>

                            {/* Enhanced benefits list */}
                            <div className="space-y-3">
                                <div className="group flex items-start gap-3 transition-transform duration-300 hover:translate-x-1">
                                    <div className="from-accent to-accent-2 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-linear-to-br shadow-md">
                                        <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-text font-semibold">Early Access</div>
                                        <div className="text-muted text-sm">Be the first to discover new artworks and collections</div>
                                    </div>
                                </div>

                                <div className="group flex items-start gap-3 transition-transform duration-300 hover:translate-x-1">
                                    <div className="from-accent to-accent-2 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-linear-to-br shadow-md">
                                        <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-text font-semibold">Curated Updates</div>
                                        <div className="text-muted text-sm">Hand-picked content, no more than twice a month</div>
                                    </div>
                                </div>

                                <div className="group flex items-start gap-3 transition-transform duration-300 hover:translate-x-1">
                                    <div className="from-accent to-accent-2 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-linear-to-br shadow-md">
                                        <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-text font-semibold">Unsubscribe Anytime</div>
                                        <div className="text-muted text-sm">One-click opt-out, no questions asked</div>
                                    </div>
                                </div>
                            </div>

                            {/* Trust indicators */}
                            <div className="text-muted mt-6 flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <svg className="text-accent h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                    <span>100% Privacy</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="text-accent h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <span>Ad-Free</span>
                                </div>
                            </div>
                        </div>

                        {isSubmitted ? (
                            <div className="animate-[scale-in_0.4s_ease-out] rounded-(--radius) border border-[rgba(34,197,94,0.3)] bg-linear-to-br from-[rgba(34,197,94,0.08)] to-[rgba(34,197,94,0.12)] p-8 text-center shadow-(--shadow-1)">
                                <div className="mb-4 flex justify-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-[#16a34a] to-[#15803d] shadow-lg">
                                        <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="mb-2 text-xl font-bold text-[#16a34a]">Welcome aboard!</div>
                                <div className="text-[#16a34a]/80">Check your inbox for a confirmation email</div>
                                <div className="mt-4 text-sm text-[#16a34a]/60">We'll be in touch soon</div>
                            </div>
                        ) : (
                            <form className="animate-[fade-in-up_0.8s_ease-out_0.2s_both] space-y-4" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <label htmlFor="newsletter-email" className="text-text block text-sm font-semibold">
                                        Email Address
                                    </label>
                                    <Input
                                        id="newsletter-email"
                                        type="email"
                                        placeholder="your.email@example.com"
                                        aria-label="Email address for newsletter"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full transition-all duration-300 focus:scale-[1.02]"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="group relative w-full overflow-hidden shadow-(--color-accent)/20 shadow-lg transition-all duration-300 hover:shadow-(--color-accent)/30 hover:shadow-xl"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Subscribe Now
                                        <svg
                                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </span>
                                    <div className="from-accent to-accent-2 absolute inset-0 z-0 bg-linear-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                </Button>
                                <p className="text-muted text-center text-xs">
                                    By subscribing, you agree to receive promotional emails. You can opt out at any time.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </Container>
        </Section>
    )
}

export default Newsletter
