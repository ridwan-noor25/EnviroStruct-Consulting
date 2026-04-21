import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Bell, 
  User, 
  LogOut, 
  Settings, 
  ChevronDown,
  Menu,
  X,
  Shield
} from 'lucide-react';

const Header = ({ sidebarOpen, setSidebarOpen, pageTitle }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New contact message from John Doe', time: '5 min ago', read: false },
    { id: 2, title: 'Project "Green Valley" deadline approaching', time: '1 hour ago', read: false },
    { id: 3, title: 'New team member added', time: '2 hours ago', read: true },
    { id: 4, title: 'Service updated successfully', time: '5 hours ago', read: true },
  ]);
  
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Get admin user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('adminUser');
    if (userData) {
      setAdminUser(JSON.parse(userData));
    } else {
      // Default fallback
      setAdminUser({
        name: 'Admin User',
        email: 'admin@envirostruct.com',
        role: 'Administrator'
      });
    }
  }, []);

  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/admin/projects')) return 'Manage Projects';
    if (path.includes('/admin/services')) return 'Manage Services';
    if (path.includes('/admin/team')) return 'Team Management';
    if (path.includes('/admin/contacts')) return 'Contact Messages';
    if (path.includes('/admin/analytics')) return 'Analytics';
    if (path.includes('/admin/profile')) return 'Profile Settings';
    if (path.includes('/admin/settings')) return 'Account Settings';
    return 'Dashboard';
  };

  const title = pageTitle || getPageTitle();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
      setIsDropdownOpen(false);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
      <div className="px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Menu Toggle & Page Title */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Menu Toggle Button - Fixed icon */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Toggle Sidebar"
            >
              {sidebarOpen ? <Menu size={20} /> : <Menu size={20} />}
            </button>

            {/* Page Title */}
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-semibold text-gray-800">{title}</h1>
              <p className="text-xs md:text-sm text-gray-500 mt-0.5">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="block sm:hidden">
              <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
            </div>
          </div>

          {/* Right side - Notifications & User Dropdown */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="Notifications"
              >
                <Bell size={20} className="text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
                  <div className="flex items-center justify-between p-3 border-b border-gray-100 bg-gray-50">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-500 text-sm">
                        No notifications
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => markAsRead(notification.id)}
                          className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                            !notification.read ? 'bg-emerald-50/30 border-l-4 border-l-emerald-500' : ''
                          }`}
                        >
                          <p className="text-sm text-gray-800">{notification.title}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-2 border-t border-gray-100 bg-gray-50">
                    <button className="w-full text-center text-xs text-emerald-600 hover:text-emerald-700 py-1 font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 md:space-x-3 p-1.5 md:p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="User Menu"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                  {adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : 'A'}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-gray-700">{adminUser?.name || 'Admin User'}</p>
                  <p className="text-xs text-gray-500">{adminUser?.role || 'Administrator'}</p>
                </div>
                <ChevronDown size={16} className="text-gray-500 hidden sm:block" />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <p className="text-sm font-medium text-gray-900">{adminUser?.name || 'Admin User'}</p>
                    <p className="text-xs text-gray-500 break-all">{adminUser?.email || 'admin@envirostruct.com'}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <Shield size={10} className="text-emerald-500" />
                      <span className="text-xs text-emerald-600">{adminUser?.role || 'Administrator'}</span>
                    </div>
                  </div>
                  
                  <Link
                    to="/admin/profile"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <User size={16} />
                    <span>Profile Settings</span>
                  </Link>
                  
                  <Link
                    to="/admin/settings"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Settings size={16} />
                    <span>Account Settings</span>
                  </Link>
                  
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoggingOut ? (
                        <>
                          <div className="w-4 h-4 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin"></div>
                          <span>Logging out...</span>
                        </>
                      ) : (
                        <>
                          <LogOut size={16} />
                          <span>Logout</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;