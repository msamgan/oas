import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth-context.shared'

export default function SidebarFooter() {
    const { signOut } = useAuth()
    const navigate = useNavigate()

    function handleSignOut() {
        signOut()
        navigate('/sign-in', { replace: true })
    }

    return (
        <div className="border-t border-black/6 pt-4">
            <button
                type="button"
                onClick={handleSignOut}
                className="group text-muted flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-300 ease-out hover:bg-red-50 hover:text-red-600"
            >
                <svg
                    className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                </svg>
                <span className="font-semibold">Sign Out</span>
            </button>
        </div>
    )
}
