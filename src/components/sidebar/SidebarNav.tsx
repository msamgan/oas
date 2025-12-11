import { Link, useLocation } from 'react-router-dom'
import Icon from '../ui/Icon'
import { useAuth } from '../../contexts/auth-context.shared'
import { PERMISSIONS } from '../../constants/permissions'

export default function SidebarNav() {
    const location = useLocation()
    const isActive = (path: string) => location.pathname === path
    const { hasPermission } = useAuth()

    return (
        <nav className="flex flex-1 flex-col gap-2">
            <div className="text-muted mb-2 px-3 text-xs font-bold tracking-wider uppercase">Menu</div>
            <Link
                to="/dashboard"
                className={`group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ease-out ${
                    isActive('/dashboard')
                        ? 'bg-linear-to-r from-orange-500 to-orange-600 font-semibold text-white shadow-[0_4px_12px_rgba(255,122,24,0.25)]'
                        : 'text-muted hover:text-text hover:bg-black/5'
                }`}
            >
                <Icon
                    name="grid"
                    size={20}
                    className={`transition-transform duration-300 ${isActive('/dashboard') ? 'scale-110' : 'group-hover:scale-110'}`}
                />
                <span>Dashboard</span>
                {isActive('/dashboard') && <div className="ml-auto h-2 w-2 animate-pulse rounded-full bg-white"/>}
            </Link>

            {hasPermission(PERMISSIONS.CONTACT_MESSAGES_VIEW) && (
                <Link
                    to="/contact-messages"
                    className={`group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ease-out ${
                        isActive('/contact-messages')
                            ? 'bg-linear-to-r from-orange-500 to-orange-600 font-semibold text-white shadow-[0_4px_12px_rgba(255,122,24,0.25)]'
                            : 'text-muted hover:text-text hover:bg-black/5'
                    }`}
                >
                    <Icon
                        name="mail"
                        size={20}
                        className={`transition-transform duration-300 ${isActive('/contact-messages') ? 'scale-110' : 'group-hover:scale-110'}`}
                    />
                    <span>Contact messages</span>
                    {isActive('/contact-messages') && (
                        <div className="ml-auto h-2 w-2 animate-pulse rounded-full bg-white"/>
                    )}
                </Link>
            )}
        </nav>
    )
}
