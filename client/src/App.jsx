import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Accueil from './pages/accueil/Accueil'
import Chambres from './pages/chambres/Chambres'
import ChambreDetail from './pages/chambreDetail/ChambreDetail'
import Reservations from './pages/reservations/Reservations'
import Login from './pages/login/Login'
import MesSejours from './pages/mesSejours/MesSejours'
import Contact from './pages/contact/Contact'
import APropos from './pages/apropos/APropos'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import AdminBookings from './pages/admin/AdminBookings'
import AdminUsers from './pages/admin/AdminUsers'
import AdminContacts from './pages/admin/AdminContacts'
import AdminRoute from './components/AdminRoute'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<><Navbar /><Accueil /><Footer /></>} />
        <Route path="/chambres" element={<><Navbar /><Chambres /><Footer /></>} />
        <Route path="/chambres/:id" element={<><Navbar /><ChambreDetail /><Footer /></>} />
        <Route path="/reservations" element={<><Navbar /><Reservations /><Footer /></>} />
        <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
        <Route path="/mes-sejours" element={<><Navbar /><MesSejours /><Footer /></>} />
        <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
        <Route path="/apropos" element={<><Navbar /><APropos /><Footer /></>} />
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="contacts" element={<AdminContacts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
