import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import AboutPage from './pages/AboutPage'
import ArtDetailsPage from './pages/ArtDetailsPage'
import ArtistDetailsPage from './pages/ArtistDetailsPage'
import ArtistsPage from './pages/ArtistsPage'
import ArtistSubmissionPage from './pages/ArtistSubmissionPage'
import ContactPage from './pages/ContactPage'
import Home from './pages/Home'
import SignInPage from './pages/SignInPage'

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/artists" element={<ArtistsPage />} />
                <Route path="/artists/:slug" element={<ArtistDetailsPage />} />
                <Route path="/art/:slug" element={<ArtDetailsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/submit-artist" element={<ArtistSubmissionPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
