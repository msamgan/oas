import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Container from './ui/Container'
import Icon from './ui/Icon'
import Link from './ui/Link'
import Logo from './ui/Logo'

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-10 animate-[fade-in-down_0.6s_ease-out] border-b border-white/[0.06] bg-gradient-to-b from-[rgba(15,15,16,0.8)] to-[rgba(15,15,16,0.4)] backdrop-blur-md">
            <Container className="flex items-center justify-between py-4">
                <RouterLink
                    className="group flex items-center gap-3 text-[var(--color-text)] no-underline transition-transform duration-300 ease-out hover:scale-105"
                    to="/"
                >
                    <Logo />
                    <span className="font-extrabold tracking-[0.2px]">Orange Art Studio</span>
                </RouterLink>
                <button
                    className="hidden cursor-pointer border-none bg-transparent p-2 text-[var(--color-text)] max-md:block"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    <Icon name={isMenuOpen ? 'close' : 'menu'} />
                </button>
                <nav
                    className={`flex gap-[18px] max-md:absolute max-md:top-full max-md:right-0 max-md:left-0 max-md:flex-col max-md:gap-3 max-md:border-b max-md:border-white/[0.06] max-md:bg-[rgba(15,15,16,0.95)] max-md:p-5 max-md:backdrop-blur-xl max-md:transition-all max-md:duration-300 max-md:ease-out ${isMenuOpen ? 'max-md:pointer-events-auto max-md:translate-y-0 max-md:opacity-100' : 'max-md:pointer-events-none max-md:-translate-y-full max-md:opacity-0'}`}
                    aria-label="Primary"
                >
                    <Link href="#featured" onClick={() => setIsMenuOpen(false)} variant="underline">
                        Featured
                    </Link>
                    <RouterLink to="/artists" onClick={() => setIsMenuOpen(false)} className="oas-link oas-link-underline font-semibold">
                        Artists
                    </RouterLink>
                    <RouterLink to="/about" onClick={() => setIsMenuOpen(false)} className="oas-link oas-link-underline font-semibold">
                        About
                    </RouterLink>
                    <RouterLink to="/contact" onClick={() => setIsMenuOpen(false)} className="oas-link oas-link-underline font-semibold">
                        Contact
                    </RouterLink>
                </nav>
            </Container>
        </header>
    )
}

export default Header
