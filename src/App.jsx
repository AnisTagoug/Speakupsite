import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingRadio from './components/FloatingRadio';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Shows from './pages/Shows';
import Contact from './pages/Contact';
import Team from './pages/Team';
import { AuthProvider } from './AuthContext';
import Events from './pages/Events';
import BackOffice from './pages/BackOffice';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRadioClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-dark">
        <Navbar onRadioClick={handleRadioClick} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shows" element={<Shows />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/team" element={<Team />} />
            <Route path="/events" element={<Events />} />
            <Route path="/pdc" element={<BackOffice />} />
          </Routes>
        </main>
        <Footer />
        <FloatingRadio isModalOpen={isModalOpen} onCloseModal={handleCloseModal} />
      </div>
    </AuthProvider>
  );
}

export default App; 