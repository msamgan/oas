import { useEffect, useRef, useState } from 'react'
import Badge from './ui/Badge'
import Button from './ui/Button'
import Card from './ui/Card'
import Container from './ui/Container'
import MissionIcon from './ui/MissionIcon'
import { StatLabel, StatNumber } from './ui/Stat'
import ValueNumber from './ui/ValueNumber'

function About() {
    const statsRef = useRef<HTMLDivElement>(null)
    const valuesRef = useRef<HTMLDivElement>(null)
    const missionRef = useRef<HTMLDivElement>(null)
    const ctaCardRef = useRef<HTMLDivElement>(null)
    const [hasAnimatedStats, setHasAnimatedStats] = useState(false)

    const animateCounters = () => {
        const statNumbers = document.querySelectorAll('.stat-number')
        statNumbers.forEach((stat) => {
            const target = stat.textContent || '0'
            const numericValue = parseInt(target.replace(/[^0-9]/g, ''))
            const suffix = target.match(/[kK+]/g)?.join('') || ''

            let current = 0
            const increment = numericValue / 50
            const duration = 2000
            const stepTime = duration / 50

            const counter = setInterval(() => {
                current += increment
                if (current >= numericValue) {
                    stat.textContent = numericValue + suffix
                    clearInterval(counter)
                } else {
                    stat.textContent = Math.floor(current) + suffix
                }
            }, stepTime)
        })
    }

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px',
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible')

                    // Add visible class to child elements
                    if (entry.target === valuesRef.current) {
                        const valueItems = entry.target.querySelectorAll('.value-item')
                        valueItems.forEach((item) => item.classList.add('visible'))
                    }

                    if (entry.target === statsRef.current) {
                        const statCards = entry.target.querySelectorAll('.stat-card')
                        statCards.forEach((card) => card.classList.add('visible'))

                        // Trigger counter animation for stats
                        if (!hasAnimatedStats) {
                            setHasAnimatedStats(true)
                            animateCounters()
                        }
                    }
                }
            })
        }, observerOptions)

        if (statsRef.current) observer.observe(statsRef.current)
        if (valuesRef.current) observer.observe(valuesRef.current)
        if (missionRef.current) observer.observe(missionRef.current)

        // Add mouse move effect for CTA card
        const handleMouseMove = (e: MouseEvent) => {
            if (!ctaCardRef.current) return
            const rect = ctaCardRef.current.getBoundingClientRect()
            const x = ((e.clientX - rect.left) / rect.width) * 100
            const y = ((e.clientY - rect.top) / rect.height) * 100
            ctaCardRef.current.style.setProperty('--mouse-x', `${x}%`)
            ctaCardRef.current.style.setProperty('--mouse-y', `${y}%`)
        }

        const ctaCard = ctaCardRef.current
        if (ctaCard) {
            ctaCard.addEventListener('mousemove', handleMouseMove)
        }

        return () => {
            observer.disconnect()
            if (ctaCard) {
                ctaCard.removeEventListener('mousemove', handleMouseMove)
            }
        }
    }, [hasAnimatedStats])

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden py-15 before:absolute before:-top-1/2 before:-right-[20%] before:h-[600px] before:w-[600px] before:animate-[float_8s_ease-in-out_infinite] before:rounded-full before:bg-[radial-gradient(circle,rgba(255,122,24,0.15)_0%,transparent_70%)] before:content-[''] after:absolute after:-bottom-[40%] after:-left-[10%] after:h-[500px] after:w-[500px] after:animate-[float_10s_ease-in-out_infinite_reverse] after:rounded-full after:bg-[radial-gradient(circle,rgba(255,183,3,0.1)_0%,transparent_70%)] after:content-[''] md:py-20 lg:py-30">
                <Container>
                    <div className="relative z-[1] mx-auto max-w-[900px] text-center">
                        <Badge withDot>Our Story</Badge>
                        <h1 className="my-5 mb-6 animate-[fade-in-up_0.8s_ease-out_0.2s_both] text-[clamp(36px,7vw,64px)] leading-[1.1] font-black tracking-[-1px]">
                            Championing{' '}
                            <span className="relative inline-block animate-[gradient-shift_3s_ease-in-out_infinite] bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                                Emerging Artists
                            </span>{' '}
                            in the Digital Age
                        </h1>
                        <p className="mx-auto max-w-[70ch] animate-[fade-in-up_0.8s_ease-out_0.3s_both] text-[clamp(17px,2.5vw,20px)] leading-[1.7] text-[var(--color-muted)]">
                            Orange Art Studio is a curated platform spotlighting contemporary works from rising talents. We're building a community
                            where discovery meets accessibility, and where every artist has a voice.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Mission Section */}
            <section
                className="relative bg-[linear-gradient(180deg,transparent_0%,rgba(255,122,24,0.03)_50%,transparent_100%)] py-10 before:pointer-events-none before:absolute before:inset-0 before:[background-image:radial-gradient(circle_at_20%_50%,rgba(255,122,24,0.03)_1px,transparent_1px),radial-gradient(circle_at_80%_80%,rgba(255,183,3,0.03)_1px,transparent_1px)] before:bg-[length:50px_50px] before:opacity-50 before:content-[''] md:py-14 lg:py-18"
                ref={missionRef}
            >
                <Container>
                    <div className="relative z-[1] mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Card variant="mission" className="mission-card" style={{ animationDelay: '0.1s' }}>
                            <MissionIcon emoji="🎨" />
                            <h3 className="relative z-[1] m-0 mb-3 text-2xl font-extrabold text-[var(--color-text)] transition-colors duration-300 ease-out hover:text-[var(--color-accent)]">
                                Our Mission
                            </h3>
                            <p className="relative z-[1] m-0 text-[15px] leading-[1.6] text-[var(--color-muted)] transition-colors duration-300 ease-out hover:text-[var(--color-text)]">
                                To champion new voices, foster discovery, and make art collecting approachable without compromising on taste. We
                                believe every artist deserves a platform to shine.
                            </p>
                        </Card>
                        <Card variant="mission" className="mission-card" style={{ animationDelay: '0.2s' }}>
                            <MissionIcon emoji="✨" />
                            <h3 className="relative z-[1] m-0 mb-3 text-2xl font-extrabold text-[var(--color-text)] transition-colors duration-300 ease-out hover:text-[var(--color-accent)]">
                                Our Vision
                            </h3>
                            <p className="relative z-[1] m-0 text-[15px] leading-[1.6] text-[var(--color-muted)] transition-colors duration-300 ease-out hover:text-[var(--color-text)]">
                                A world where emerging artists are celebrated, supported, and connected with collectors who appreciate their unique
                                perspectives and creative expressions.
                            </p>
                        </Card>
                        <Card variant="mission" className="mission-card" style={{ animationDelay: '0.3s' }}>
                            <MissionIcon emoji="🚀" />
                            <h3 className="relative z-[1] m-0 mb-3 text-2xl font-extrabold text-[var(--color-text)] transition-colors duration-300 ease-out hover:text-[var(--color-accent)]">
                                Our Approach
                            </h3>
                            <p className="relative z-[1] m-0 text-[15px] leading-[1.6] text-[var(--color-muted)] transition-colors duration-300 ease-out hover:text-[var(--color-text)]">
                                We publish limited drops, host seasonal showcases, and collaborate with artists across mediums—from digital to
                                traditional, photography to mixed media.
                            </p>
                        </Card>
                    </div>
                </Container>
            </section>

            {/* Values Section */}
            <section
                className="relative bg-[linear-gradient(180deg,rgba(21,21,23,0.3)_0%,rgba(21,21,23,0.6)_50%,rgba(21,21,23,0.3)_100%)] py-10 md:py-14 lg:py-18"
                ref={valuesRef}
            >
                <Container>
                    <h2 className="m-0 mb-12 animate-[fade-in-up_0.8s_ease-out] bg-gradient-to-br from-[var(--color-text)] to-[var(--color-accent)] bg-clip-text text-center text-[clamp(32px,5vw,48px)] font-black tracking-[-0.5px] text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                        What We Stand For
                    </h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-6">
                        <Card variant="value" className="value-item group" style={{ transitionDelay: '0.1s' }}>
                            <ValueNumber number="01" />
                            <h4 className="m-0 mb-2.5 text-[22px] font-extrabold text-[var(--color-text)] transition-colors duration-300 ease-out hover:text-[var(--color-accent)]">
                                Authenticity
                            </h4>
                            <p className="m-0 text-[15px] leading-[1.7] text-[var(--color-muted)] transition-colors duration-300 ease-out hover:text-[var(--color-text)]">
                                We showcase genuine talent and original work. Every piece tells a story, and every artist brings a unique perspective.
                            </p>
                        </Card>
                        <Card variant="value" className="value-item group" style={{ transitionDelay: '0.2s' }}>
                            <ValueNumber number="02" />
                            <h4 className="m-0 mb-2.5 text-[22px] font-extrabold text-[var(--color-text)] transition-colors duration-300 ease-out hover:text-[var(--color-accent)]">
                                Accessibility
                            </h4>
                            <p className="m-0 text-[15px] leading-[1.7] text-[var(--color-muted)] transition-colors duration-300 ease-out hover:text-[var(--color-text)]">
                                Art should be approachable. We break down barriers between artists and collectors, making discovery effortless.
                            </p>
                        </Card>
                        <Card variant="value" className="value-item group" style={{ transitionDelay: '0.3s' }}>
                            <ValueNumber number="03" />
                            <h4 className="m-0 mb-2.5 text-[22px] font-extrabold text-[var(--color-text)] transition-colors duration-300 ease-out hover:text-[var(--color-accent)]">
                                Quality
                            </h4>
                            <p className="m-0 text-[15px] leading-[1.7] text-[var(--color-muted)] transition-colors duration-300 ease-out hover:text-[var(--color-text)]">
                                Curated doesn't mean exclusive—it means excellent. We maintain high standards while keeping an open mind.
                            </p>
                        </Card>
                        <Card variant="value" className="value-item group" style={{ transitionDelay: '0.4s' }}>
                            <ValueNumber number="04" />
                            <h4 className="m-0 mb-2.5 text-[22px] font-extrabold text-[var(--color-text)] transition-colors duration-300 ease-out hover:text-[var(--color-accent)]">
                                Community
                            </h4>
                            <p className="m-0 text-[15px] leading-[1.7] text-[var(--color-muted)] transition-colors duration-300 ease-out hover:text-[var(--color-text)]">
                                We're building more than a gallery—we're fostering connections between artists, collectors, and enthusiasts.
                            </p>
                        </Card>
                    </div>
                </Container>
            </section>

            {/* Stats Section */}
            <section
                className="relative overflow-hidden border-t border-b border-white/[0.06] bg-[linear-gradient(135deg,rgba(255,122,24,0.05)_0%,rgba(255,183,3,0.03)_100%)] py-10 before:absolute before:top-0 before:-left-full before:h-full before:w-full before:animate-[slide-across_3s_ease-in-out_infinite] before:bg-[linear-gradient(90deg,transparent_0%,rgba(255,122,24,0.1)_50%,transparent_100%)] before:content-[''] md:py-14 lg:py-18"
                ref={statsRef}
            >
                <Container>
                    <div className="relative z-[1] grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        <Card variant="stat" className="stat-card" style={{ transitionDelay: '0.1s' }}>
                            <StatNumber value="500+" />
                            <StatLabel>Artists Featured</StatLabel>
                        </Card>
                        <Card variant="stat" className="stat-card" style={{ transitionDelay: '0.2s' }}>
                            <StatNumber value="2.5k+" />
                            <StatLabel>Artworks Showcased</StatLabel>
                        </Card>
                        <Card variant="stat" className="stat-card" style={{ transitionDelay: '0.3s' }}>
                            <StatNumber value="50+" />
                            <StatLabel>Seasonal Drops</StatLabel>
                        </Card>
                        <Card variant="stat" className="stat-card" style={{ transitionDelay: '0.4s' }}>
                            <StatNumber value="15k+" />
                            <StatLabel>Community Members</StatLabel>
                        </Card>
                    </div>
                </Container>
            </section>

            {/* CTA Section */}
            <section className="py-12 md:py-16 lg:py-24">
                <Container>
                    <div
                        className="relative animate-[fade-in-up_0.8s_ease-out] overflow-hidden rounded-[var(--radius)] border border-[rgba(255,122,24,0.2)] bg-[linear-gradient(135deg,rgba(255,122,24,0.1)_0%,rgba(255,183,3,0.05)_100%)] p-10 px-8 text-center shadow-[0_20px_60px_rgba(255,122,24,0.1),var(--shadow-2)] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(255,122,24,0.15)_0%,transparent_50%)] before:opacity-0 before:transition-opacity before:duration-300 before:ease-out before:content-[''] hover:before:opacity-100 md:p-12 md:px-10 lg:p-16 lg:px-12"
                        ref={ctaCardRef}
                    >
                        <div className="relative z-[2]">
                            <h2 className="m-0 mb-4 bg-gradient-to-br from-[var(--color-text)] to-[var(--color-accent)] bg-clip-text text-[clamp(28px,5vw,42px)] font-black tracking-[-0.5px] text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                                Join Our Creative Community
                            </h2>
                            <p className="mx-auto mb-8 max-w-[60ch] text-[clamp(16px,2.2vw,18px)] leading-[1.6] text-[var(--color-muted)]">
                                Whether you're an artist looking to be featured or a collector seeking fresh perspectives, we'd love to connect with
                                you.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 max-sm:flex-col max-sm:items-stretch">
                                <Button className="max-sm:w-full">Submit Your Work</Button>
                                <Button variant="secondary" className="max-sm:w-full">
                                    Explore Artists
                                </Button>
                            </div>
                        </div>
                        <div className="pointer-events-none absolute top-0 right-0 z-[1] h-full w-full">
                            <div className="absolute -top-[200px] -right-[100px] h-[400px] w-[400px] animate-[float_10s_ease-in-out_infinite,rotate_20s_linear_infinite] rounded-full bg-[radial-gradient(circle,rgba(255,122,24,0.15)_0%,transparent_70%)]" />
                            <div className="absolute -bottom-[150px] -left-[100px] h-[300px] w-[300px] animate-[float_12s_ease-in-out_infinite_reverse,rotate_25s_linear_infinite_reverse] rounded-full bg-[radial-gradient(circle,rgba(255,122,24,0.15)_0%,transparent_70%)]" />
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}

export default About
