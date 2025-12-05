import { useState, type FormEvent } from 'react'
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
        <Section padding="md">
            <Container className="grid animate-[fade-in-up_0.8s_ease-out] grid-cols-1 items-center gap-7 md:grid-cols-[1.2fr_0.8fr]">
                <div>
                    <Heading as="h2" variant="h2">
                        Stay in the loop
                    </Heading>
                    <p className="text-[var(--color-muted)]">
                        Get early access to releases, open calls, and studio updates. We send no more than two emails a month.
                    </p>
                </div>
                {isSubmitted ? (
                    <div className="animate-[scale-in_0.3s_ease-out] rounded-[var(--radius)] border border-[rgba(34,197,94,0.3)] bg-[rgba(34,197,94,0.1)] p-5 text-center font-semibold text-[#86efac]">
                        ✓ Thank you for subscribing!
                    </div>
                ) : (
                    <form className="flex gap-2.5" onSubmit={handleSubmit}>
                        <Input
                            type="email"
                            placeholder="Your email"
                            aria-label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Button type="submit">Subscribe</Button>
                    </form>
                )}
            </Container>
        </Section>
    )
}

export default Newsletter
