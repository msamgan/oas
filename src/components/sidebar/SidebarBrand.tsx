import { Link } from 'react-router-dom'
import Logo from '../ui/Logo'

export default function SidebarBrand() {
    return (
        <Link
            to="/"
            className="group text-text mb-10 flex items-center gap-3 text-base font-extrabold tracking-[0.2px] no-underline transition-transform duration-300 ease-out hover:scale-105"
        >
            <Logo size="md" />
            <span>Orange Art Studio</span>
        </Link>
    )
}
