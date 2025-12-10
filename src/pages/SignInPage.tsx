import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Alert from '../components/ui/Alert'
import Badge from '../components/ui/Badge'
import Container from '../components/ui/Container'
import Form from '../components/ui/Form'
import FormSubmitButton from '../components/ui/FormSubmitButton'
import Heading from '../components/ui/Heading'
import Input from '../components/ui/Input'
import Label from '../components/ui/Label'
import Required from '../components/ui/Required'
import Section from '../components/ui/Section'
import { useAuth } from '../contexts/auth-context.shared'
type LocationState = { from?: { pathname?: string } } | null

function SignInPage() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    const [error, setError] = useState<string | null>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const signInCardRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const location = useLocation()
    const auth = useAuth()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError(null)
        setStatus('submitting')

        const form = new FormData(e.currentTarget)
        const email = String(form.get('email') || '').trim()
        const password = String(form.get('password') || '')

        const result = await auth.signIn({ email, password })

        if (result.ok) {
            setStatus('success')
            const from = (location.state as LocationState)?.from?.pathname || '/dashboard'
            navigate(from, { replace: true })
        } else {
            setStatus('error')
            setError(result.message)
        }
    }

    // If already authenticated, redirect away from sign-in
    useEffect(() => {
        if (auth.isAuthenticated && !auth.loading) {
            navigate('/dashboard', { replace: true })
        }
    }, [auth.isAuthenticated, auth.loading, navigate])

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
                            <h2 id="signin-title" className="text-text text-2xl font-extrabold md:text-3xl">
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
                                <Link to="/contact" className="oas-link oas-link-underline text-sm font-semibold">
                                    Forgot password?
                                </Link>
                            </div>

                            <div className="pt-2">
                                <FormSubmitButton
                                    status={status}
                                    className="w-full transition-all"
                                    labels={{
                                        idle: 'Sign In',
                                        submitting: 'Signing In...',
                                        success: 'Signed In!',
                                        error: 'Sign In',
                                    }}
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {status === 'error' && error && <Alert variant="error" message={error} className="mt-4 animate-[scale-in_0.3s_ease-out]" />}

                        {/* Success Message */}
                        {status === 'success' && (
                            <Alert variant="success" message="Signed in successfully!" className="mt-4 animate-[scale-in_0.3s_ease-out]" />
                        )}

                        {/* Sign Up Link */}
                        <div className="mt-6 border-t border-black/10 pt-6 text-center">
                            <p className="text-muted text-sm">
                                Don't have an account?{' '}
                                <Link to="/contact" className="oas-link text-accent hover:text-accent-2 font-semibold">
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
