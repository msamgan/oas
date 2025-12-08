import { type FormEvent, useState } from 'react'
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
        <Section padding="md" className="relative">
            <Container>
                <div className="via-surface relative overflow-hidden rounded-sm border border-black/10 bg-linear-to-br from-white to-white p-8 shadow-(--shadow-2) md:p-12">
                    {/* Decorative background elements */}
                    <div className="from-accent/10 to-accent-2/5 pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-linear-to-br blur-3xl" />
                    <div className="from-accent-2/10 to-accent/5 pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-linear-to-tr blur-3xl" />

                    <div className="animate-fade-in-up relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
                        <div>
                            <div className="border-accent/20 bg-accent/5 text-accent mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold">
                                📬 NEWSLETTER
                            </div>
                            <Heading as="h2" variant="h2" className="mb-3">
                                Stay in the loop
                            </Heading>
                            <p className="text-muted">
                                Get early access to releases, open calls, and studio updates. We send no more than two emails a month.
                            </p>
                            <div className="text-muted mt-4 flex items-center gap-4 text-sm">
                                <span className="flex items-center gap-1.5">
                                    <svg className="text-accent h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    No spam
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <svg className="text-accent h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Unsubscribe anytime
                                </span>
                            </div>
                        </div>
                        {isSubmitted ? (
                            <div className="animate-[scale-in_0.3s_ease-out] rounded-(--radius) border border-[rgba(34,197,94,0.3)] bg-[rgba(34,197,94,0.1)] p-6 text-center">
                                <div className="mb-2 text-4xl">✓</div>
                                <div className="font-semibold text-[#16a34a]">Thank you for subscribing!</div>
                                <div className="mt-1 text-sm text-[#16a34a]/70">Check your inbox for confirmation</div>
                            </div>
                        ) : (
                            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                                <Input
                                    type="email"
                                    placeholder="Enter your email address"
                                    aria-label="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full"
                                />
                                <Button type="submit" className="w-full shadow-(--color-accent)/20 shadow-lg">
                                    Subscribe Now
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </Container>
        </Section>
    )
}

export default Newsletter
