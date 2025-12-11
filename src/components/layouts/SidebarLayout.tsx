import { Outlet } from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar'

export default function SidebarLayout() {
    return (
        <div className="text-text min-h-screen bg-linear-to-br from-white via-[#fafafa] to-white">
            {/* Background decoration */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 h-96 w-96 animate-[float_8s_ease-in-out_infinite] rounded-full bg-linear-to-br from-orange-500/5 to-orange-600/10 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-80 w-80 animate-[float_10s_ease-in-out_infinite_2s] rounded-full bg-linear-to-tr from-amber-500/5 to-amber-600/8 blur-3xl" />
            </div>

            <div className="relative grid min-h-screen grid-cols-[280px_1fr] max-md:grid-cols-1">
                <Sidebar />

                {/* Content */}
                <main className="animate-fade-in-up overflow-auto p-8 max-md:order-1 max-md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
