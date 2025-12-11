import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth-context.shared'

export default function SidebarFooter() {
    const { signOut, user } = useAuth()
    const navigate = useNavigate()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    function handleSignOut() {
        signOut()
        setIsDropdownOpen(false)
        navigate('/sign-in', { replace: true })
    }

    const userName = (user?.name as string) || (user?.email as string) || 'User'
    const userInitial = userName.charAt(0).toUpperCase()

    return (
        <div className="border-t border-black/6 pt-4">
            <div className="relative">
                {/* User Profile Button */}
                <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="text-text group flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-300 ease-out hover:bg-black/5"
                >
                    {/* User Avatar */}
                    <div className="from-accent to-accent-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br font-bold text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                        {userInitial}
                    </div>

                    {/* User Info */}
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{userName}</p>
                        <p className="text-muted truncate text-xs">View Profile</p>
                    </div>

                    {/* Chevron Icon */}
                    <svg
                        className={`text-muted h-4 w-4 shrink-0 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div className="animate-fade-in-down absolute right-0 bottom-full left-0 mb-2 overflow-hidden rounded-xl border border-black/6 bg-white shadow-lg backdrop-blur-md">
                        {/* Profile Link */}
                        <Link
                            to="/profile"
                            onClick={() => setIsDropdownOpen(false)}
                            className="text-text group flex items-center gap-3 px-4 py-3 transition-all duration-200 hover:bg-black/5"
                        >
                            <svg
                                className="text-muted group-hover:text-accent h-5 w-5 transition-colors duration-200"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            <span className="font-medium">Profile Settings</span>
                        </Link>

                        {/* Divider */}
                        <div className="border-t border-black/6" />

                        {/* Sign Out */}
                        <button
                            type="button"
                            onClick={handleSignOut}
                            className="group flex w-full items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-red-50"
                        >
                            <svg
                                className="text-muted h-5 w-5 transition-all duration-200 group-hover:scale-110 group-hover:text-red-600"
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
                            <span className="text-muted font-medium transition-colors duration-200 group-hover:text-red-600">Sign Out</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
