import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Accueil from './pages/Accueil'
import Chambres from './pages/Chambres'
import ChambreDetail from './pages/ChambreDetail'
import Reservations from './pages/Reservations'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/chambres" element={<Chambres />} />
        <Route path="/chambres/:id" element={<ChambreDetail />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
