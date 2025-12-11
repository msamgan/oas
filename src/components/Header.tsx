import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { useAuth } from '../contexts/auth-context.shared'
import Container from './ui/Container'
import Icon from './ui/Icon'
import Logo from './ui/Logo'

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { isAuthenticated, loading } = useAuth()

    return (
        <header className="animate-fade-in-down sticky top-0 z-10 border-b border-black/6 bg-linear-to-b from-[rgba(255,255,255,0.95)] to-[rgba(255,255,255,0.8)] shadow-sm backdrop-blur-md transition-all duration-300">
            <Container className="flex items-center justify-between py-4">
                <RouterLink
                    className="group text-text flex items-center gap-3 no-underline transition-transform duration-300 ease-out hover:scale-105"
                    to={ROUTES.HOME}
                >
                    <Logo />
                    <span className="font-extrabold tracking-[0.2px]">Orange Art Studio</span>
                </RouterLink>
                <button
                    className="text-text hidden cursor-pointer border-none bg-transparent p-2 transition-transform hover:scale-110 max-md:block"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    <Icon name={isMenuOpen ? 'close' : 'menu'} />
                </button>
                <nav
                    className={`flex items-center gap-[18px] max-md:absolute max-md:top-full max-md:right-0 max-md:left-0 max-md:flex-col max-md:gap-3 max-md:border-b max-md:border-black/6 max-md:bg-[rgba(255,255,255,0.98)] max-md:p-5 max-md:shadow-lg max-md:backdrop-blur-xl max-md:transition-all max-md:duration-300 max-md:ease-out ${isMenuOpen ? 'max-md:pointer-events-auto max-md:translate-y-0 max-md:opacity-100' : 'max-md:pointer-events-none max-md:-translate-y-full max-md:opacity-0'}`}
                    aria-label="Primary"
                >
                    {!loading && isAuthenticated && (
                        <RouterLink
                            to={ROUTES.DASHBOARD}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-text inline-flex items-center gap-2 rounded-md px-3 py-2 font-semibold transition-colors hover:bg-black/5"
                            aria-label="Dashboard"
                            title="Dashboard"
                        >
                            <Icon name="grid" />
                        </RouterLink>
                    )}
                    <RouterLink to={ROUTES.ARTISTS} onClick={() => setIsMenuOpen(false)} className="oas-link oas-link-underline font-semibold">
                        Artists
                    </RouterLink>
                    <RouterLink to={ROUTES.ABOUT} onClick={() => setIsMenuOpen(false)} className="oas-link oas-link-underline font-semibold">
                        About
                    </RouterLink>
                    <RouterLink to={ROUTES.CONTACT} onClick={() => setIsMenuOpen(false)} className="oas-link oas-link-underline font-semibold">
                        Contact
                    </RouterLink>
                    {!loading &&
                        (isAuthenticated ? (
                            <></>
                        ) : (
                            <RouterLink
                                to={ROUTES.SIGN_IN}
                                onClick={() => setIsMenuOpen(false)}
                                className="oas-link oas-link-underline font-semibold"
                            >
                                Sign In
                            </RouterLink>
                        ))}
                    <RouterLink
                        to={ROUTES.SUBMIT_ARTIST}
                        onClick={() => setIsMenuOpen(false)}
                        className="inline-flex items-center rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-5 py-2.5 font-bold text-white shadow-md transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-orange-700 hover:shadow-lg focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none"
                    >
                        Submit Portfolio
                    </RouterLink>
                </nav>
            </Container>
        </header>
    )
}

export default Header
