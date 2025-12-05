import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import AboutPage from './pages/AboutPage'
import ArtistsPage from './pages/ArtistsPage'
import Home from './pages/Home'

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/artists" element={<ArtistsPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
