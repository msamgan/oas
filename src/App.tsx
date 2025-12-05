import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import AboutPage from './pages/AboutPage'
import ArtistsPage from './pages/ArtistsPage'
import ArtistDetailsPage from './pages/ArtistDetailsPage'
import ArtDetailsPage from './pages/ArtDetailsPage'
import Home from './pages/Home'

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
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
