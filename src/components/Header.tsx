import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Container from './ui/Container'
import Icon from './ui/Icon'
import Logo from './ui/Logo'

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="animate-fade-in-down sticky top-0 z-10 border-b border-white/6 bg-linear-to-b from-[rgba(15,15,16,0.8)] to-[rgba(15,15,16,0.4)] backdrop-blur-md">
            <Container className="flex items-center justify-between py-4">
                <RouterLink
                    className="group text-text flex items-center gap-3 no-underline transition-transform duration-300 ease-out hover:scale-105"
                    to="/"
                >
                    <Logo />
                    <span className="font-extrabold tracking-[0.2px]">Orange Art Studio</span>
                </RouterLink>
                <button
                    className="text-text hidden cursor-pointer border-none bg-transparent p-2 max-md:block"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    <Icon name={isMenuOpen ? 'close' : 'menu'} />
                </button>
                <nav
                    className={`flex gap-[18px] max-md:absolute max-md:top-full max-md:right-0 max-md:left-0 max-md:flex-col max-md:gap-3 max-md:border-b max-md:border-white/6 max-md:bg-[rgba(15,15,16,0.95)] max-md:p-5 max-md:backdrop-blur-xl max-md:transition-all max-md:duration-300 max-md:ease-out ${isMenuOpen ? 'max-md:pointer-events-auto max-md:translate-y-0 max-md:opacity-100' : 'max-md:pointer-events-none max-md:-translate-y-full max-md:opacity-0'}`}
                    aria-label="Primary"
                >
                    <RouterLink to="/artists" onClick={() => setIsMenuOpen(false)} className="oas-link oas-link-underline font-semibold">
                        Artists
                    </RouterLink>
                    <RouterLink to="/about" onClick={() => setIsMenuOpen(false)} className="oas-link oas-link-underline font-semibold">
                        About
                    </RouterLink>
                    <RouterLink to="/contact" onClick={() => setIsMenuOpen(false)} className="oas-link oas-link-underline font-semibold">
                        Contact
                    </RouterLink>
                    <RouterLink to="/sign-in" onClick={() => setIsMenuOpen(false)} className="oas-link oas-link-underline font-semibold">
                        Sign In
                    </RouterLink>
                    <RouterLink to="/submit-artist" onClick={() => setIsMenuOpen(false)} className="oas-link oas-link-underline font-semibold">
                        Submit
                    </RouterLink>
                </nav>
            </Container>
        </header>
    )
}

export default Header
