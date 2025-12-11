import SidebarBrand from './SidebarBrand'
import SidebarFooter from './SidebarFooter'
import SidebarNav from './SidebarNav'
import SidebarQuickTip from './SidebarQuickTip'

export default function Sidebar() {
    return (
        <aside className="animate-fade-in sticky top-0 h-screen overflow-y-auto border-r border-black/6 bg-white/60 p-6 backdrop-blur-md max-md:relative max-md:order-2 max-md:h-auto max-md:border-t max-md:border-r-0">
            <div className="flex min-h-full flex-col">
                <SidebarBrand />
                <SidebarNav />

                {/* Bottom section */}
                <div className="mt-auto pt-6">
                    <SidebarQuickTip />
                    <SidebarFooter />
                </div>
            </div>
        </aside>
    )
}
