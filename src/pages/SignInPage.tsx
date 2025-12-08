import { useRef, useState } from 'react'
import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import Heading from '../components/ui/Heading'
import Form from '../components/ui/Form'
import Label from '../components/ui/Label'
import Required from '../components/ui/Required'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

function SignInPage() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    const formRef = useRef<HTMLFormElement>(null)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // Placeholder submit handler for static site. Replace with real auth later.
        setStatus('submitting')
        setTimeout(() => {
            setStatus('success')
            setTimeout(() => {
                setStatus('idle')
                formRef.current?.reset()
            }, 2000)
        }, 700)
    }

    return (
        <main className="min-h-screen">
            {/* Hero */}
            <Section padding="lg" className="relative overflow-hidden">
                <div className="absolute inset-0 animate-[gradient-shift_8s_ease-in-out_infinite] bg-gradient-to-br from-[rgba(255,122,24,0.08)] via-transparent to-[rgba(255,183,3,0.06)] [background-size:200%_200%]" />
                <Container className="relative z-10">
                    <div className="mx-auto max-w-xl text-center">
                        <Heading as="h1" variant="hero" className="mb-5">
                            Welcome back
                        </Heading>
                        <p className="text-lg leading-relaxed text-[var(--color-muted)]">
                            Sign in to access your account and continue exploring amazing art.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Sign In form */}
            <Section padding="md" className="bg-gradient-to-b from-transparent to-[rgba(255,122,24,0.02)]">
                <Container>
                    <div className="mx-auto w-full max-w-xl">
                        <Form ref={formRef} onSubmit={handleSubmit} aria-labelledby="signin-title">
                            <div className="mb-2">
                                <h2 id="signin-title" className="text-2xl font-extrabold text-[var(--color-text)]">
                                    Sign In
                                </h2>
                                <p className="mt-1 text-sm text-[var(--color-muted)]">Use your email and password to continue.</p>
                            </div>

                            <div className="space-y-5">
                                <div className="group/input">
                                    <Label htmlFor="email">
                                        Email <Required />
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        placeholder="you@example.com"
                                        className="w-full"
                                    />
                                </div>

                                <div className="group/input">
                                    <Label htmlFor="password">
                                        Password <Required />
                                    </Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        className="w-full"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex cursor-pointer items-center gap-2 text-sm text-[var(--color-muted)]">
                                        <input type="checkbox" name="remember" className="h-4 w-4 accent-[var(--color-accent)]" />
                                        Remember me
                                    </label>
                                    {/* Placeholder link style, reuse button ghost as link via asLink if needed later */}
                                    <a href="#" className="oas-link oas-link-underline font-semibold">
                                        Forgot password?
                                    </a>
                                </div>

                                <div className="pt-2">
                                    <Button type="submit" disabled={status === 'submitting'} className="w-full">
                                        {status === 'submitting' ? 'Signing In…' : 'Sign In'}
                                    </Button>
                                </div>
                            </div>

                            {status === 'success' && (
                                <p role="status" className="mt-3 text-center text-sm text-[var(--color-accent)]">
                                    Signed in (demo). Replace with real authentication.
                                </p>
                            )}
                        </Form>
                    </div>
                </Container>
            </Section>
        </main>
    )
}

export default SignInPage
