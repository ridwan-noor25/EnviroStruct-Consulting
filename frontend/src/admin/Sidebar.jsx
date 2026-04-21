import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Mail,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Briefcase,
  LogOut,
  Shield,
  User,
  Settings,
  Bell
} from 'lucide-react';

const Sidebar = ({ isOpen, sidebarToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const adminNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { id: 'projects', label: 'Manage Projects', icon: FolderKanban, path: '/admin/projects' },
    { id: 'services', label: 'Manage Services', icon: Briefcase, path: '/admin/services' },
    { id: 'team', label: 'Manage Team', icon: Users, path: '/admin/team' },
    { id: 'contacts', label: 'Contact Messages', icon: Mail, path: '/admin/contacts' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
  ];

  // Fetch admin user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('adminUser');
    if (userData) {
      setAdminUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      // Call backend logout API
      const response = await fetch('http://localhost:5000/api/admin/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      // Clear localStorage regardless of API response
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      localStorage.removeItem('adminAuthenticated');
      
      // Show success message
      alert('✅ Logged out successfully!');
      
      // Redirect to login page
      navigate('/admin-login');
      
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local storage even if API fails
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      localStorage.removeItem('adminAuthenticated');
      alert('✅ Logged out successfully!');
      navigate('/admin-login');
    } finally {
      setIsLoggingOut(false);
      setShowLogoutConfirm(false);
    }
  };

  const isNavActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut size={28} className="text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Confirm Logout</h3>
              <p className="text-gray-500 text-sm mb-6">
                Are you sure you want to sign out from your admin account?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed left-0 top-0 h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
          text-white transition-all duration-300 ease-in-out z-30
          flex flex-col shadow-2xl
          ${isOpen ? 'w-64' : 'w-20'}
        `}
      >
        {/* Logo Section with Toggle Button */}
        <div className="flex items-center justify-between p-5 border-b border-gray-700">
          <Link to="/admin/dashboard" className={`flex items-center space-x-3 ${!isOpen && 'justify-center w-full'}`}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden bg-white">
              <img 
                src="/src/assets/logo of Enviro.png"
                alt="Envirostruct Logo" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<span class="font-bold text-xl text-emerald-600">EC</span>';
                }}
              />
            </div>
            {isOpen && (
              <div className="overflow-hidden">
                <span className="font-semibold text-base block">Envirostruct</span>
                <p className="text-xs text-gray-400">Admin Panel</p>
              </div>
            )}
          </Link>
          {/* Sidebar Toggle Button */}
         
        </div>

        
        {/* Admin Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto sidebar-scroll">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = isNavActive(item.path);
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-xl
                  transition-all duration-200 group
                  ${isActive 
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }
                  ${!isOpen && 'justify-center'}
                `}
              >
                <Icon size={20} className="flex-shrink-0" />
                {isOpen && <span className="text-sm font-medium">{item.label}</span>}
                {!isOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Session Status Indicator */}
        {isOpen && (
          <div className="px-4 py-2 mx-3 mb-2 bg-emerald-900/20 rounded-lg border border-emerald-700/30">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Session Status</span>
              <span className="flex items-center gap-1 text-xs text-emerald-400">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                Active
              </span>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <div className="px-3 pb-3">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className={`
              w-full flex items-center space-x-3 px-4 py-3 rounded-xl
              transition-all duration-200 group
              ${isOpen 
                ? 'bg-red-600/10 hover:bg-red-600/20 text-red-400 hover:text-red-300 border border-red-500/20' 
                : 'justify-center text-gray-400 hover:text-red-400 hover:bg-red-600/20'
              }
            `}
          >
            <LogOut size={20} className="flex-shrink-0" />
            {isOpen && <span className="text-sm font-medium">Sign Out</span>}
            {!isOpen && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                Sign Out
              </div>
            )}
          </button>
        </div>

        {/* Divider */}
        <div className="mx-4 h-px bg-gray-700"></div>

        {/* Footer */}
        {isOpen && (
          <div className="px-4 py-3 text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Shield size={12} className="text-gray-500" />
              <p className="text-[10px] text-gray-500">Secure Admin Area</p>
            </div>
            <p className="text-[9px] text-gray-600">
              © 2026 Envirostruct Consulting
            </p>
          </div>
        )}
        
        {!isOpen && (
          <div className="p-2 text-center">
            <Shield size={14} className="text-gray-500 mx-auto" />
          </div>
        )}
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        .sidebar-scroll {
          scrollbar-width: thin;
          scrollbar-color: #4b5563 #1f2937;
        }
        .sidebar-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .sidebar-scroll::-webkit-scrollbar-track {
          background: #1f2937;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 4px;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </>
  );
};

export default Sidebar;