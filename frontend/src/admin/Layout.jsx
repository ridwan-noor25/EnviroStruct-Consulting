import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const API_URL = 'http://127.0.0.1:5000/api';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPageTitle, setCurrentPageTitle] = useState('Dashboard');
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        navigate('/admin-login');
        setIsChecking(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/admin/check-session`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        
        const data = await response.json();
        
        if (!data.authenticated) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          navigate('/admin-login');
        }
      } catch (error) {
        console.error('Session check error:', error);
        // Don't redirect on error, assume still authenticated
      } finally {
        setIsChecking(false);
      }
    };

    checkSession();
  }, [navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        isOpen={sidebarOpen} 
        sidebarToggle={toggleSidebar}
      />
      
      <div className={`transition-all duration-300 min-h-screen ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        <Header 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          pageTitle={currentPageTitle}
        />
        
        <main className="p-6">
          <Outlet context={{ setCurrentPageTitle }} />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;