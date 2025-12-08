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

function SignInPage() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    const formRef = useRef<HTMLFormElement>(null)
    const signInCardRef = useRef<HTMLDivElement>(null)

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

        if (signInCardRef.current) observer.observe(signInCardRef.current)

        return () => observer.disconnect()
    }, [])

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <Section id="signin-hero" padding="lg" className="relative -mb-14 overflow-hidden">
                <div className="absolute inset-0 animate-[gradient-shift_8s_ease-in-out_infinite] bg-linear-to-br from-[rgba(255,122,24,0.04)] via-transparent to-[rgba(255,183,3,0.03)] bg-size-[200%_200%]" />

                {/* Decorative floating orbs */}
                <div className="pointer-events-none absolute -top-1/2 -right-[20%] h-[600px] w-[600px] animate-[float_8s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgba(255,122,24,0.08)_0%,transparent_70%)]" />
                <div className="pointer-events-none absolute -bottom-[40%] -left-[10%] h-[500px] w-[500px] animate-[float_10s_ease-in-out_infinite_reverse] rounded-full bg-[radial-gradient(circle,rgba(255,183,3,0.06)_0%,transparent_70%)]" />

                <Container className="relative z-10">
                    <div className="mx-auto max-w-2xl text-center">
                        <Badge withDot className="animate-scale-in mb-6">
                            Member Access
                        </Badge>
                        <Heading as="h1" variant="hero" className="mb-5 animate-[fade-in-up_0.8s_ease-out_0.2s_both]">
                            Welcome{' '}
                            <span className="from-accent to-accent-2 relative inline-block animate-[gradient-shift_3s_ease-in-out_infinite] bg-linear-to-br bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                                Back
                            </span>
                        </Heading>
                        <p className="text-muted animate-[fade-in-up_0.8s_ease-out_0.3s_both] text-lg leading-relaxed md:text-xl">
                            Sign in to access your account and continue exploring amazing art.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Sign In Form Section */}
            <Container>
                <div className="mx-auto w-full max-w-lg">
                    <Form ref={formRef} onSubmit={handleSubmit} aria-labelledby="signin-title">
                        <div className="mb-6">
                            <h2 id="signin-title" className="text-2xl font-extrabold text-[var(--color-text)] md:text-3xl">
                                Sign In
                            </h2>
                            <p className="text-muted mt-2 text-sm">Use your email and password to continue.</p>
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
                                <label className="text-muted flex cursor-pointer items-center gap-2 text-sm transition-colors hover:text-[var(--color-text)]">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        className="h-4 w-4 cursor-pointer rounded border-black/20 bg-white accent-[var(--color-accent)] transition-all hover:border-[var(--color-accent)]"
                                    />
                                    Remember me
                                </label>
                                <Link to="/contact" className="oas-link oas-link-underline text-sm font-semibold">
                                    Forgot password?
                                </Link>
                            </div>

                            <div className="pt-2">
                                <Button type="submit" disabled={status === 'submitting' || status === 'success'} className="w-full transition-all">
                                    {status === 'submitting' && (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <circle cx="12" cy="12" r="10" strokeWidth="2" strokeOpacity="0.3" />
                                                <path d="M12 2 A10 10 0 0 1 22 12" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                            Signing In...
                                        </span>
                                    )}
                                    {status === 'success' && (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            Signed In!
                                        </span>
                                    )}
                                    {status === 'idle' && 'Sign In'}
                                </Button>
                            </div>
                        </div>

                        {/* Success Message */}
                        {status === 'success' && (
                            <div className="mt-4 animate-[scale-in_0.3s_ease-out] rounded-[var(--radius-sm)] border border-[rgba(255,183,3,0.3)] bg-[rgba(255,183,3,0.08)] p-4">
                                <p className="flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-2)]">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    Signed in successfully! (demo)
                                </p>
                            </div>
                        )}

                        {/* Sign Up Link */}
                        <div className="mt-6 border-t border-black/10 pt-6 text-center">
                            <p className="text-muted text-sm">
                                Don't have an account?{' '}
                                <Link to="/contact" className="oas-link font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-2)]">
                                    Contact us to get started
                                </Link>
                            </p>
                        </div>
                    </Form>
                </div>
            </Container>
        </main>
    )
}

export default SignInPage
