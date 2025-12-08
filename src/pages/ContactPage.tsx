import { useEffect, useRef, useState } from 'react'
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

function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
    const formRef = useRef<HTMLFormElement>(null)
    const contactInfoRef = useRef<HTMLDivElement>(null)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // This is a static site form placeholder. Replace with real handler/integration as needed.
        setStatus('sending')
        setTimeout(() => {
            setStatus('sent')
            setTimeout(() => {
                setStatus('idle')
                formRef.current?.reset()
            }, 3000)
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

        if (formRef.current) observer.observe(formRef.current)
        if (contactInfoRef.current) observer.observe(contactInfoRef.current)

        return () => observer.disconnect()
    }, [])

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <Section id="contact-hero" padding="lg" className="relative overflow-hidden">
                <div className="absolute inset-0 animate-[gradient-shift_8s_ease-in-out_infinite] bg-linear-to-br from-[rgba(255,122,24,0.04)] via-transparent to-[rgba(255,183,3,0.03)] bg-size-[200%_200%]" />

                {/* Decorative floating orbs */}
                <div className="pointer-events-none absolute -top-1/2 -right-[20%] h-[600px] w-[600px] animate-[float_8s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgba(255,122,24,0.08)_0%,transparent_70%)]" />
                <div className="pointer-events-none absolute -bottom-[40%] -left-[10%] h-[500px] w-[500px] animate-[float_10s_ease-in-out_infinite_reverse] rounded-full bg-[radial-gradient(circle,rgba(255,183,3,0.06)_0%,transparent_70%)]" />

                <Container className="relative z-10">
                    <div className="mx-auto max-w-3xl text-center">
                        <Badge withDot className="animate-scale-in mb-6">
                            Get in Touch
                        </Badge>
                        <Heading as="h1" variant="hero" className="mb-5 animate-[fade-in-up_0.8s_ease-out_0.2s_both]">
                            Let's Start a{' '}
                            <span className="from-accent to-accent-2 relative inline-block animate-[gradient-shift_3s_ease-in-out_infinite] bg-linear-to-br bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                                Conversation
                            </span>
                        </Heading>
                        <p className="text-muted mb-8 animate-[fade-in-up_0.8s_ease-out_0.3s_both] text-lg leading-relaxed md:text-xl">
                            Have a question, collaboration idea, or feedback? We'd love to hear from you. Our team is here to help and typically
                            responds within 1–2 business days.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Contact Form Section */}
            <Section id="contact-form" padding="md" className="bg-linear-to-b from-transparent to-[rgba(255,122,24,0.02)]">
                <Container>
                    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                        {/* Main Contact Form */}
                        <Form ref={formRef} onSubmit={handleSubmit}>
                            <div>
                                <h2 className="text-text mb-2 text-2xl font-bold">Send us a message</h2>
                                <p className="text-muted text-sm">Fill out the form below and we'll get back to you soon.</p>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                <div className="group/input">
                                    <Label htmlFor="name">
                                        Name <Required />
                                    </Label>
                                    <Input id="name" required name="name" placeholder="Your full name" autoComplete="name" className={'w-full'} />
                                </div>
                                <div className="group/input">
                                    <Label htmlFor="email">
                                        Email <Required />
                                    </Label>
                                    <Input
                                        id="email"
                                        required
                                        type="email"
                                        name="email"
                                        placeholder="your@email.com"
                                        autoComplete="email"
                                        className={'w-full'}
                                    />
                                </div>
                            </div>

                            <div className="group/input">
                                <Label htmlFor="subject">Subject</Label>
                                <Input id="subject" name="subject" placeholder="What's this about?" className={'w-full'} />
                            </div>

                            <div className="group/input">
                                <Label htmlFor="message">
                                    Message <Required />
                                </Label>
                                <Textarea
                                    id="message"
                                    required
                                    name="message"
                                    placeholder="Tell us more about your inquiry..."
                                    rows={6}
                                    className={'w-full'}
                                />
                            </div>

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <Button type="submit" disabled={status === 'sending' || status === 'sent'} className="group relative overflow-hidden">
                                    {status === 'sending' && (
                                        <span className="flex items-center gap-2">
                                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <circle cx="12" cy="12" r="10" strokeWidth="2" strokeOpacity="0.3" />
                                                <path d="M12 2 A10 10 0 0 1 22 12" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                            Sending...
                                        </span>
                                    )}
                                    {status === 'sent' && (
                                        <span className="flex items-center gap-2">
                                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            Message Sent!
                                        </span>
                                    )}
                                    {status === 'idle' && 'Send Message'}
                                </Button>
                                {status === 'idle' && (
                                    <span className="text-muted text-sm">
                                        <span className="mr-1">💬</span>
                                        Response time: 1–2 business days
                                    </span>
                                )}
                            </div>

                            {/* Success Message */}
                            {status === 'sent' && (
                                <div className="animate-[scale-in_0.3s_ease-out] rounded-sm border border-[rgba(255,183,3,0.3)] bg-[rgba(255,183,3,0.08)] p-4">
                                    <p className="text-accent-2 flex items-center gap-2 text-sm font-semibold">
                                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        Thank you! We've received your message and will respond shortly.
                                    </p>
                                </div>
                            )}
                        </Form>

                        {/* Contact Information Sidebar */}
                        <aside ref={contactInfoRef} className="contact-info animate-[fade-in-up_0.7s_ease-out_0.6s_both] space-y-6 opacity-0">
                            {/* Contact Details Card */}
                            <div className="group rounded-(--radius) border border-black/10 bg-linear-to-br from-white to-[rgba(255,122,24,0.02)] p-6 shadow-(--shadow-1) transition-all duration-500 hover:border-[rgba(255,122,24,0.2)] hover:shadow-(--shadow-hover)">
                                <h3 className="text-text mb-4 flex items-center gap-2 text-lg font-bold">
                                    <svg className="text-accent h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    Contact Details
                                </h3>
                                <ul className="text-muted space-y-4 text-sm">
                                    <li className="flex items-start gap-3">
                                        <svg className="text-accent mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <div>
                                            <p className="text-accent mb-1 text-xs font-semibold tracking-wider uppercase">Email</p>
                                            <a href="mailto:hello@orangeart.studio" className="oas-link hover:text-accent text-base font-semibold">
                                                hello@orangeart.studio
                                            </a>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="text-accent mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                            <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                        <div>
                                            <p className="text-accent mb-1 text-xs font-semibold tracking-wider uppercase">Hours</p>
                                            <p className="text-base">Monday – Friday</p>
                                            <p className="text-sm">9:00 AM – 6:00 PM EST</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* FAQ / Quick Links Card */}
                            <div className="group rounded-(--radius) border border-black/10 bg-linear-to-br from-white to-[rgba(255,183,3,0.02)] p-6 shadow-(--shadow-1) transition-all duration-500 hover:border-[rgba(255,183,3,0.2)] hover:shadow-(--shadow-hover)">
                                <h3 className="text-text mb-4 flex items-center gap-2 text-lg font-bold">
                                    <svg className="text-accent-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                        <path
                                            d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m.08 4h.01"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    Quick Links
                                </h3>
                                <ul className="space-y-3 text-sm">
                                    <li>
                                        <a href="/artists" className="oas-link oas-link-underline flex items-center gap-2 font-medium">
                                            <span>→</span>
                                            Browse Artists
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/about" className="oas-link oas-link-underline flex items-center gap-2 font-medium">
                                            <span>→</span>
                                            About Our Mission
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/#featured" className="oas-link oas-link-underline flex items-center gap-2 font-medium">
                                            <span>→</span>
                                            Featured Works
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Privacy Note */}
                            <div className="rounded-sm border border-black/6 bg-black/2 p-4">
                                <p className="text-muted flex items-start gap-2 text-xs leading-relaxed">
                                    <svg className="text-accent mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <span>
                                        Your information is secure. We use it solely to respond to your inquiry and never share it with third parties.
                                    </span>
                                </p>
                            </div>
                        </aside>
                    </div>
                </Container>
            </Section>

            {/* CTA Section */}
            <Section id="contact-cta" padding="md">
                <Container>
                    <div className="animate-fade-in-up relative overflow-hidden rounded-(--radius) border border-[rgba(255,122,24,0.2)] bg-[linear-gradient(135deg,rgba(255,122,24,0.06)_0%,rgba(255,183,3,0.04)_100%)] p-10 text-center shadow-(--shadow-hover) md:p-12 lg:p-16">
                        <div className="relative z-2">
                            <h2 className="from-text to-accent m-0 mb-4 bg-linear-to-br bg-clip-text text-[clamp(28px,5vw,42px)] font-black tracking-[-0.5px] text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                                Interested in Submitting Your Work?
                            </h2>
                            <p className="text-muted mx-auto mb-8 max-w-[60ch] text-[clamp(16px,2.2vw,18px)] leading-[1.6]">
                                We're always looking for talented artists to feature. Submit your portfolio and join our growing community of
                                creators.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 max-sm:flex-col max-sm:items-stretch">
                                <Button className="max-sm:w-full">Submit Portfolio</Button>
                                <Button variant="secondary" className="max-sm:w-full">
                                    Explore Current Artists
                                </Button>
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

export default ContactPage
