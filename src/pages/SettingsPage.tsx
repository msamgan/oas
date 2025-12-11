import { useState } from 'react'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'
import Heading from '../components/ui/Heading'
import Icon from '../components/ui/Icon'
import ChangePasswordCard from './settings/ChangePasswordCard'

type TabKey = 'password' | 'preferences' | 'notifications'
type TabIcon = 'lock' | 'sliders' | 'bell'

export default function SettingsPage() {
    const [active, setActive] = useState<TabKey>('password')

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="animate-fade-in-up mb-8">
                <div className="mb-3 flex items-center gap-2">
                    <Badge withDot variant="glow">
                        <span className={'ml-2'}>Settings</span>
                    </Badge>
                </div>
                <Heading as="h1" variant="h2" className="mb-3">
                    Account Settings
                </Heading>
                <p className="text-muted max-w-2xl text-lg leading-relaxed">Review and manage your account settings.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
                {/* Sub Sidebar (tabs) */}
                <div className="animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
                    <Card variant="default" className="p-2">
                        <nav className="flex flex-col gap-1">
                            <TabButton active={active === 'password'} onClick={() => setActive('password')} icon="lock">
                                Change Password
                            </TabButton>
                            <TabButton active={active === 'preferences'} onClick={() => setActive('preferences')} icon="sliders">
                                Preferences
                            </TabButton>
                            <TabButton active={active === 'notifications'} onClick={() => setActive('notifications')} icon="bell">
                                Notifications
                            </TabButton>
                        </nav>
                    </Card>
                </div>

                {/* Tab Content */}
                <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    {active === 'password' && <ChangePasswordCard />}
                    {active === 'preferences' && (
                        <Card variant="default" className="p-8">
                            <Heading as="h3" variant="h3" className="mb-2">
                                Preferences
                            </Heading>
                            <p className="text-muted">More settings coming soon.</p>
                        </Card>
                    )}
                    {active === 'notifications' && (
                        <Card variant="default" className="p-8">
                            <Heading as="h3" variant="h3" className="mb-2">
                                Notifications
                            </Heading>
                            <p className="text-muted">Configure your notification settings (coming soon).</p>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}

function TabButton({ active, onClick, children, icon }: { active: boolean; onClick: () => void; children: React.ReactNode; icon: TabIcon }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-300 ${
                active
                    ? 'bg-linear-to-r from-orange-500 to-orange-600 font-semibold text-white shadow-[0_4px_12px_rgba(255,122,24,0.25)]'
                    : 'text-muted hover:text-text hover:bg-black/5'
            }`}
        >
            <Icon name={icon} size={18} className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
            <span>{children}</span>
            {active && <div className="ml-auto h-2 w-2 animate-pulse rounded-full bg-white" />}
        </button>
    )
}

// moved ChangePasswordCard to ./settings/ChangePasswordCard
