import Container from '../components/ui/Container'
import Heading from '../components/ui/Heading'
import Section from '../components/ui/Section'

function DashboardPage() {
    return (
        <main className="min-h-screen">
            <Section padding="lg">
                <Container>
                    <Heading as="h1" variant="h2" className="mb-4">
                        Dashboard
                    </Heading>
                    <p className="text-muted">You are signed in. This is a placeholder dashboard page.</p>
                </Container>
            </Section>
        </main>
    )
}

export default DashboardPage
