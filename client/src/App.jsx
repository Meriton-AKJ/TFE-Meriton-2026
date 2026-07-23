import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Accueil from './pages/accueil/Accueil'
import Chambres from './pages/chambres/Chambres'
import ChambreDetail from './pages/chambreDetail/ChambreDetail'
import Reservations from './pages/reservations/Reservations'
import Login from './pages/login/Login'
import Contact from './pages/contact/Contact'
import APropos from './pages/apropos/APropos'

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
        <Route path="/contact" element={<Contact />} />
        <Route path="/apropos" element={<APropos />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
