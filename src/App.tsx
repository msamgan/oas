import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicLayout from './components/layouts/PublicLayout'
import SidebarLayout from './components/layouts/SidebarLayout'
import { AuthProvider } from './contexts/AuthContext'
import AboutPage from './pages/AboutPage'
import ArtDetailsPage from './pages/ArtDetailsPage'
import ArtistDetailsPage from './pages/ArtistDetailsPage'
import ArtistsPage from './pages/ArtistsPage'
import ArtistSubmissionPage from './pages/ArtistSubmissionPage'
import ContactPage from './pages/ContactPage'
import DashboardPage from './pages/DashboardPage'
import Home from './pages/Home'
import ProfileUpdatePage from './pages/ProfileUpdatePage'
import SignInPage from './pages/SignInPage'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public routes with header/footer */}
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/artists" element={<ArtistsPage />} />
                        <Route path="/artists/:slug" element={<ArtistDetailsPage />} />
                        <Route path="/art/:slug" element={<ArtDetailsPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/sign-in" element={<SignInPage />} />
                        <Route path="/submit-artist" element={<ArtistSubmissionPage />} />
                    </Route>

                    {/* Protected routes with sidebar layout */}
                    <Route
                        element={
                            <ProtectedRoute>
                                <SidebarLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="/dashboard" element={<DashboardPage />} />
                        {/* Add more protected routes here */}
                        <Route path="/profile" element={<ProfileUpdatePage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
