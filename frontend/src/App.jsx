import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Sectors from './pages/Sectors';
import Contact from './pages/Contact';

// About Pages
import AboutUs from './pages/about/AboutUs';
import TeamMembers from './pages/about/TeamMembers';

// Service Pages
import EnviroSS from './pages/service/EnviroSS';
import EngServices from './pages/service/EngServices';
import OtherServices from './pages/service/OtherServices';

function App() {
  return (
    <div className="App">
      <Navbar />

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/sectors" element={<Sectors />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/about" element={<AboutUs />} />
          <Route path="/team" element={<TeamMembers />} />

          <Route path="/environmental-social" element={<EnviroSS />} />
          <Route path="/engineering-services" element={<EngServices />} />
          <Route path="/other-services" element={<OtherServices />} />

          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;