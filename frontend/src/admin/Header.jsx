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
  Shield,
  Check,
  ChevronRight
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

  // Close notifications on mobile when navigating
  useEffect(() => {
    setShowNotifications(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

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

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
      <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Menu Toggle & Page Title */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            {/* Menu Toggle Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Toggle Sidebar"
            >
              <Menu size={20} className="w-5 h-5" />
            </button>

            {/* Page Title */}
            <div className="flex-1 min-w-0">
              <h1 className="text-base sm:text-xl md:text-2xl font-semibold text-gray-800 truncate">
                {title}
              </h1>
              <p className="hidden xs:block text-xs sm:text-sm text-gray-500 mt-0.5 truncate">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Right side - Notifications & User Dropdown */}
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="Notifications"
              >
                <Bell size={20} className="text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
                {unreadCount > 0 && (
                  <>
                    <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    <span className="absolute -top-1 -right-1 sm:top-0 sm:right-0 bg-red-500 text-white text-[8px] sm:text-[10px] font-bold rounded-full min-w-[14px] sm:min-w-[16px] h-[14px] sm:h-[16px] flex items-center justify-center">
                      {unreadCount}
                    </span>
                  </>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="fixed sm:absolute inset-x-4 sm:inset-x-auto top-16 sm:top-auto sm:right-0 sm:mt-2 sm:w-80 md:w-96 bg-white rounded-xl sm:rounded-lg shadow-2xl sm:shadow-lg border border-gray-200 z-50 overflow-hidden max-h-[80vh] sm:max-h-96">
                  <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-100 bg-gray-50">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900">Notifications</h3>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-emerald-600 hover:text-emerald-700 font-medium px-2 py-1 rounded hover:bg-emerald-50 transition-colors"
                        >
                          Mark all read
                        </button>
                      )}
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="sm:hidden p-1 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <X size={18} className="text-gray-500" />
                      </button>
                    </div>
                  </div>
                  <div className="max-h-64 sm:max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 sm:p-8 text-center">
                        <Bell size={40} className="text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm">No notifications yet</p>
                      </div>
                    ) : (
                      <>
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`group relative p-3 sm:p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                              !notification.read ? 'bg-emerald-50/50 sm:bg-emerald-50/30' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {!notification.read && (
                                <div className="flex-shrink-0 w-2 h-2 bg-emerald-500 rounded-full mt-1.5"></div>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-800">{notification.title}</p>
                                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notification.id);
                                }}
                                className={`opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-200 transition-all ${
                                  notification.read ? 'invisible' : ''
                                }`}
                              >
                                <Check size={14} className="text-emerald-600" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <div className="p-2 sm:p-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
                      <button 
                        onClick={clearAllNotifications}
                        className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                      >
                        Clear all
                      </button>
                      <button className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1 px-2 py-1 rounded hover:bg-emerald-50 transition-colors">
                        View all
                        <ChevronRight size={12} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1 sm:space-x-2 p-1 sm:p-1.5 md:p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="User Menu"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-sm sm:text-base font-semibold shadow-md">
                  {adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : 'A'}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-gray-700 truncate max-w-[120px]">
                    {adminUser?.name || 'Admin User'}
                  </p>
                  <p className="text-xs text-gray-500">{adminUser?.role || 'Administrator'}</p>
                </div>
                <ChevronDown 
                  size={16} 
                  className={`text-gray-500 hidden sm:block transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`} 
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="fixed sm:absolute inset-x-4 sm:inset-x-auto top-16 sm:top-auto sm:right-0 sm:mt-2 sm:w-56 md:w-64 bg-white rounded-xl sm:rounded-lg shadow-2xl sm:shadow-lg border border-gray-200 py-1 sm:py-2 z-50 overflow-hidden">
                  {/* Mobile Header with Close Button */}
                  <div className="sm:hidden flex items-center justify-between p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Account</h3>
                    <button
                      onClick={() => setIsDropdownOpen(false)}
                      className="p-1 rounded-lg hover:bg-gray-100"
                    >
                      <X size={18} className="text-gray-500" />
                    </button>
                  </div>

                  <div className="px-4 py-3 sm:py-3 border-b border-gray-100 bg-gray-50">
                    <p className="text-sm font-medium text-gray-900">
                      {adminUser?.name || 'Admin User'}
                    </p>
                    <p className="text-xs text-gray-500 break-all mt-0.5">
                      {adminUser?.email || 'admin@envirostruct.com'}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <Shield size={10} className="text-emerald-500" />
                      <span className="text-xs text-emerald-600">
                        {adminUser?.role || 'Administrator'}
                      </span>
                    </div>
                  </div>
                  
                  <Link
                    to="/admin/profile"
                    className="flex items-center space-x-3 px-4 py-3 sm:py-2 text-sm text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <User size={18} className="sm:w-4 sm:h-4" />
                    <span>Profile Settings</span>
                  </Link>
                  
                  <Link
                    to="/admin/settings"
                    className="flex items-center space-x-3 px-4 py-3 sm:py-2 text-sm text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Settings size={18} className="sm:w-4 sm:h-4" />
                    <span>Account Settings</span>
                  </Link>
                  
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex items-center space-x-3 px-4 py-3 sm:py-2 text-sm text-red-600 hover:bg-red-50 active:bg-red-100 transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoggingOut ? (
                        <>
                          <div className="w-4 h-4 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin"></div>
                          <span>Logging out...</span>
                        </>
                      ) : (
                        <>
                          <LogOut size={18} className="sm:w-4 sm:h-4" />
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

      {/* Mobile Bottom Safe Area Spacer */}
      <div className="block sm:hidden h-safe-bottom"></div>
    </header>
  );
};

export default Header;