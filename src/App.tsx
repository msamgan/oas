import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicLayout from './components/layouts/PublicLayout'
import SidebarLayout from './components/layouts/SidebarLayout'
import { ROUTES } from './constants/routes'
import { AuthProvider } from './contexts/AuthContext'
import AboutPage from './pages/AboutPage'
import ArtDetailsPage from './pages/ArtDetailsPage'
import ArtistDetailsPage from './pages/ArtistDetailsPage'
import ArtistsPage from './pages/ArtistsPage'
import ArtistSubmissionPage from './pages/ArtistSubmissionPage'
import ContactMessagesPage from './pages/ContactMessagesPage'
import ContactPage from './pages/ContactPage'
import DashboardPage from './pages/DashboardPage'
import Home from './pages/Home'
import ProfileUpdatePage from './pages/ProfileUpdatePage'
import SettingsPage from './pages/SettingsPage'
import SignInPage from './pages/SignInPage'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public routes with header/footer */}
                    <Route element={<PublicLayout />}>
                        <Route path={ROUTES.HOME} element={<Home />} />
                        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
                        <Route path={ROUTES.ARTISTS} element={<ArtistsPage />} />
                        <Route path={ROUTES.ARTIST_DETAILS} element={<ArtistDetailsPage />} />
                        <Route path={ROUTES.ART_DETAILS} element={<ArtDetailsPage />} />
                        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
                        <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
                        <Route path={ROUTES.SUBMIT_ARTIST} element={<ArtistSubmissionPage />} />
                    </Route>

                    {/* Protected routes with sidebar layout */}
                    <Route
                        element={
                            <ProtectedRoute>
                                <SidebarLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
                        {/* Add more protected routes here */}
                        <Route path={ROUTES.PROFILE} element={<ProfileUpdatePage />} />
                        <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
                        <Route path={ROUTES.CONTACT_MESSAGES} element={<ContactMessagesPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
