export default function SidebarQuickTip() {
    return (
        <div className="mb-4 rounded-xl border border-black/6 bg-linear-to-br from-orange-500/5 to-orange-600/10 p-4">
            <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-r from-orange-500 to-orange-600">
                    <span className="text-sm font-bold text-white">✨</span>
                </div>
                <span className="text-text text-sm font-bold">Quick Tip</span>
            </div>
            <p className="text-muted text-xs leading-relaxed">Explore featured artists and discover unique artworks.</p>
        </div>
    )
}
