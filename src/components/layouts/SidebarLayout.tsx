import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth-context.shared'

export default function SidebarLayout() {
    const { signOut } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    function handleSignOut() {
        signOut()
        navigate('/sign-in', { replace: true })
    }

    const isActive = (path: string) => (location.pathname === path ? 'bg-black/5 font-semibold' : '')

    return (
        <div className="text-text min-h-screen bg-white">
            <div className="grid min-h-screen grid-cols-[240px_1fr] max-md:grid-cols-1">
                {/* Sidebar */}
                <aside className="border-r border-black/6 p-4 max-md:order-2 max-md:border-t max-md:border-r-0">
                    <div className="mb-6 px-2">
                        <Link to="/" className="text-text text-base font-extrabold no-underline">
                            Orange Art Studio
                        </Link>
                    </div>
                    <nav className="flex flex-col gap-1">
                        <Link to="/dashboard" className={`oas-link rounded-md px-3 py-2 ${isActive('/dashboard')}`}>
                            Dashboard
                        </Link>
                        {/* Add more protected links here as routes are introduced */}
                    </nav>
                    <div className="mt-6 border-t border-black/6 pt-4">
                        <button
                            type="button"
                            onClick={handleSignOut}
                            className="oas-link oas-link-underline cursor-pointer border-0 bg-transparent p-0 text-left"
                        >
                            Sign Out
                        </button>
                    </div>
                </aside>

                {/* Content */}
                <main className="p-6 max-md:order-1">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
