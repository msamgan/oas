import Container from './ui/Container'
import Link from './ui/Link'

function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="animate-[fade-in_1s_ease-out] border-t border-white/[0.06] py-7 pb-12 text-[var(--color-muted)]">
            <Container>
                <div className="flex flex-col justify-between gap-4 max-sm:text-center sm:flex-row">
                    <div>
                        <small>© {currentYear} Orange Art Studio</small>
                        <p className="mt-2 text-sm text-[var(--color-muted)] opacity-70">Curating contemporary art from emerging voices</p>
                    </div>
                    <div className="flex gap-[18px] max-sm:justify-center">
                        <Link href="#terms" variant="underline-thin">
                            Terms
                        </Link>
                        <Link href="#privacy" variant="underline-thin">
                            Privacy
                        </Link>
                        <Link href="#contact" id="contact" variant="underline-thin">
                            Contact
                        </Link>
                    </div>
                </div>
            </Container>
        </footer>
    )
}

export default Footer
