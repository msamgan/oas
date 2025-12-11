import Badge from '../components/ui/Badge'
import Heading from '../components/ui/Heading'

function DashboardPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="animate-fade-in-up mb-8">
                <div className="mb-3 flex items-center gap-2">
                    <Badge withDot variant="glow">
                        <span className={'ml-2'}>Welcome Back</span>
                    </Badge>
                </div>
                <Heading as="h1" variant="h2" className="mb-3">
                    Dashboard
                </Heading>
                <p className="text-muted max-w-2xl text-lg leading-relaxed">
                    Monitor your art studio's performance, track submissions, and manage your curated collection.
                </p>
            </div>
        </div>
    )
}

export default DashboardPage
