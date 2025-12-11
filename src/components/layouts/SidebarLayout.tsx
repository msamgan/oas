import { Outlet } from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar'

export default function SidebarLayout() {
    return (
        <div className="text-text min-h-screen bg-linear-to-br from-white via-[#fafafa] to-white">
            {/* Enhanced Background decoration */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                {/* Subtle grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,122,24,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,122,24,0.02)_1px,transparent_1px)] bg-size-[80px_80px]" />

                {/* Large floating circles */}
                <div className="from-accent/15 via-accent-2/10 absolute -top-20 -right-20 h-[500px] w-[500px] animate-[float_8s_ease-in-out_infinite] rounded-full bg-linear-to-br to-transparent blur-3xl" />
                <div className="from-accent-2/10 via-accent/8 absolute -bottom-20 -left-20 h-[400px] w-[400px] animate-[float_10s_ease-in-out_infinite_2s] rounded-full bg-linear-to-tr to-transparent blur-3xl" />

                {/* Additional decorative orbs */}
                <div className="from-accent/20 to-accent-2/15 absolute top-1/3 right-1/4 h-64 w-64 animate-[float_12s_ease-in-out_infinite_4s] rounded-full bg-linear-to-br via-transparent blur-3xl" />
                <div className="from-accent-2/12 to-accent/10 absolute bottom-1/4 left-1/3 h-80 w-80 animate-[float_15s_ease-in-out_infinite_6s] rounded-full bg-linear-to-tl via-transparent blur-3xl" />

                {/* Subtle brush strokes */}
                <div
                    className="via-accent/15 absolute top-20 left-10 h-1.5 w-[300px] animate-[shimmer_8s_ease-in-out_infinite] bg-linear-to-r from-transparent to-transparent opacity-40 blur-sm"
                    style={{ transform: 'rotate(-15deg)' }}
                />
                <div
                    className="via-accent-2/15 absolute right-1/4 bottom-40 h-1.5 w-[350px] animate-[shimmer_10s_ease-in-out_infinite_3s] bg-linear-to-r from-transparent to-transparent opacity-40 blur-sm"
                    style={{ transform: 'rotate(25deg)' }}
                />
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
