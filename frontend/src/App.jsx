import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Sectors from './pages/Sectors';
import Contact from './pages/Contact';
import AboutUs from './pages/about/AboutUs';
import TeamMembers from './pages/about/TeamMembers';
import EnviroSS from './pages/service/EnviroSS';
import EngServices from './pages/service/EngServices';
import OtherServices from './pages/service/OtherServices';

// Admin Components
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/Layout';
import ProtectedRoute from './admin/ProtectedRoute';
import NotFound from './admin/NotFound';
import Unauthorized from './admin/Unauthorized';
import Dashboard from './admin/Dashboard';
import ManageServices from './admin/ManageServices';
import ManageTeam from './admin/ManageTeam';
import ManageContacts from './admin/ManageContacts';
import ManageProjects from './admin/ManageProject';
import Analytics from './admin/Analytics';

// Frontend wrapper component
const FrontendLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="content">{children}</main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Frontend Routes with Navbar and Footer */}
        <Route path="/" element={<FrontendLayout><Home /></FrontendLayout>} />
        <Route path="/portfolio" element={<FrontendLayout><Portfolio /></FrontendLayout>} />
        <Route path="/sectors" element={<FrontendLayout><Sectors /></FrontendLayout>} />
        <Route path="/contact" element={<FrontendLayout><Contact /></FrontendLayout>} />
        <Route path="/about" element={<FrontendLayout><AboutUs /></FrontendLayout>} />
        <Route path="/team" element={<FrontendLayout><TeamMembers /></FrontendLayout>} />
        <Route path="/environmental-social" element={<FrontendLayout><EnviroSS /></FrontendLayout>} />
        <Route path="/engineering-services" element={<FrontendLayout><EngServices /></FrontendLayout>} />
        <Route path="/other-services" element={<FrontendLayout><OtherServices /></FrontendLayout>} />

        {/* Admin Auth Routes - No protection needed */}
        <Route path="/admin-login" element={<AdminLogin />} />
        
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Admin Dashboard Routes - Protected */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<ManageProjects />} />
          <Route path="services" element={<ManageServices />} />
          <Route path="team" element={<ManageTeam />} />
          <Route path="contacts" element={<ManageContacts />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

        {/* 404 Not Found Route - catches all unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;