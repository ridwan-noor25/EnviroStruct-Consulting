import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Helper function for active link styling
  const navLinkStyles = ({ isActive }) =>
    `block py-2 px-3 rounded md:p-0 transition-colors text-sm font-medium tracking-wide ${
      isActive 
        ? "text-[#6E8F3D] border-b-2 border-[#6E8F3D]" 
        : "text-[#0F3A5A] hover:text-[#6E8F3D]"
    }`;

  // Toggle dropdowns
  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  // Close dropdowns when clicking a link
  const closeDropdowns = () => {
    setOpenDropdown(null);
    setIsOpen(false);
  };

  // Social Media Icons
  const SocialIcons = () => (
    <div className="flex items-center space-x-3">
      {/* LinkedIn */}
      <a 
        href="https://linkedin.com/company/envirostruct" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-[#0F3A5A] hover:text-[#6E8F3D] transition-colors duration-300"
        aria-label="LinkedIn"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.222 0 22.225 0z"/>
        </svg>
      </a>
      
      {/* Twitter/X */}
      <a 
        href="https://twitter.com/envirostruct" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-[#0F3A5A] hover:text-[#6E8F3D] transition-colors duration-300"
        aria-label="Twitter"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.965-12.114c0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      </a>
      
      {/* Facebook */}
      <a 
        href="https://facebook.com/envirostruct" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-[#0F3A5A] hover:text-[#6E8F3D] transition-colors duration-300"
        aria-label="Facebook"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </a>
      
      {/* Instagram */}
      <a 
        href="https://instagram.com/envirostruct" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-[#0F3A5A] hover:text-[#6E8F3D] transition-colors duration-300"
        aria-label="Instagram"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      </a>
    </div>
  );

  return (
    <nav className="bg-slate-50 sticky top-0 z-50 shadow-md">
      {/* Top Bar with Contact Info and Social Media */}
      <div className="bg-[#e2e8f0] text-[#0F3A5A] text-sm py-2">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            {/* Left side - Get in Touch */}
            <div className="hidden md:block text-[#6E8F3D] font-semibold text-xs lg:text-sm">
              🌿 Your Trusted Sustainability Partner
            </div>
            
            {/* Center/Right - Contact Info & Social Media */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {/* Phone */}
              <a href="tel:2394945700" className="hover:text-[#6E8F3D] transition flex items-center gap-1.5 text-xs lg:text-sm">
                <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                239.494.5700
              </a>
              
              {/* Separator */}
              <span className="text-[#0F3A5A]/30 hidden sm:inline">|</span>
              
              {/* Email */}
              <a href="mailto:info@envirostruct.net" className="hover:text-[#6E8F3D] transition flex items-center gap-1.5 text-xs lg:text-sm">
                <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@envirostruct.net
              </a>
              
              {/* Separator */}
              <span className="text-[#0F3A5A]/30 hidden sm:inline">|</span>
              
              {/* Social Media Icons */}
              <SocialIcons />
            </div>
            
            {/* Right side spacer for balance */}
            <div className="hidden lg:block w-32"></div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between py-4">
          
          {/* Logo Section with Image */}
          <Link to="/" className="flex items-center gap-3" onClick={closeDropdowns}>
            <img 
              src="/src/assets/logo of Enviro.png" 
              alt="EnviroStruct Logo" 
              className="h-12 w-auto object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/48x48?text=Logo";
              }}
            />
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold text-[#0F3A5A] tracking-wider">
                ENVIROSTRUCT
              </span>
              <span className="text-[10px] md:text-xs text-[#0F3A5A]/70 tracking-wide">
                GENERAL CONTRACTORS & CONSTRUCTION MANAGERS
              </span>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-[#0F3A5A] rounded-lg md:hidden hover:bg-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#6E8F3D]"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 14 14" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
            )}
          </button>

          {/* Navigation Links */}
          <div className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto transition-all mt-4 md:mt-0`}>
            <ul className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0 pb-4 md:pb-0">
              
              {/* Home */}
              <li>
                <NavLink to="/" className={navLinkStyles} onClick={closeDropdowns}>
                  HOME
                </NavLink>
              </li>

              {/* About Dropdown */}
              <li className="relative">
                <button
                  onClick={() => toggleDropdown('about')}
                  className="flex items-center justify-between w-full py-2 px-3 rounded md:p-0 text-[#0F3A5A] hover:text-[#6E8F3D] transition-colors text-sm font-medium tracking-wide"
                >
                  <span>ABOUT US</span>
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                      openDropdown === 'about' ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div
                  className={`${
                    openDropdown === 'about' ? 'block' : 'hidden'
                  } md:absolute md:left-0 md:mt-2 md:w-56 bg-white rounded-md shadow-xl overflow-hidden transition-all duration-200 md:top-full z-10 border border-gray-200 ${
                    isOpen ? 'ml-4 mt-1' : ''
                  }`}
                >
                  <NavLink
                    to="/about"
                    className="block px-4 py-3 text-[#0F3A5A] hover:bg-[#6E8F3D] hover:text-white transition-colors text-sm"
                    onClick={closeDropdowns}
                  >
                    About Us
                  </NavLink>
                  <NavLink
                    to="/team"
                    className="block px-4 py-3 text-[#0F3A5A] hover:bg-[#6E8F3D] hover:text-white transition-colors text-sm"
                    onClick={closeDropdowns}
                  >
                    Team Members
                  </NavLink>
                </div>
              </li>

              {/* Services Dropdown */}
              <li className="relative">
                <button
                  onClick={() => toggleDropdown('services')}
                  className="flex items-center justify-between w-full py-2 px-3 rounded md:p-0 text-[#0F3A5A] hover:text-[#6E8F3D] transition-colors text-sm font-medium tracking-wide"
                >
                  <span>SERVICES</span>
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                      openDropdown === 'services' ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div
                  className={`${
                    openDropdown === 'services' ? 'block' : 'hidden'
                  } md:absolute md:left-0 md:mt-2 md:w-64 bg-white rounded-md shadow-xl overflow-hidden transition-all duration-200 md:top-full z-10 border border-gray-200 ${
                    isOpen ? 'ml-4 mt-1' : ''
                  }`}
                >
                  <NavLink
                    to="/environmental-social"
                    className="block px-4 py-3 text-[#0F3A5A] hover:bg-[#6E8F3D] hover:text-white transition-colors text-sm"
                    onClick={closeDropdowns}
                  >
                    Environmental & Social
                  </NavLink>
                  <NavLink
                    to="/engineering-services"
                    className="block px-4 py-3 text-[#0F3A5A] hover:bg-[#6E8F3D] hover:text-white transition-colors text-sm"
                    onClick={closeDropdowns}
                  >
                    Engineering Services
                  </NavLink>
                  <NavLink
                    to="/other-services"
                    className="block px-4 py-3 text-[#0F3A5A] hover:bg-[#6E8F3D] hover:text-white transition-colors text-sm"
                    onClick={closeDropdowns}
                  >
                    Other Services
                  </NavLink>
                </div>
              </li>

              {/* Portfolio */}
              <li>
                <NavLink to="/portfolio" className={navLinkStyles} onClick={closeDropdowns}>
                  PORTFOLIO
                </NavLink>
              </li>

              {/* Sectors */}
              <li>
                <NavLink to="/sectors" className={navLinkStyles} onClick={closeDropdowns}>
                  SECTORS
                </NavLink>
              </li>

              {/* Contact */}
              <li>
                <NavLink to="/contact" className={navLinkStyles} onClick={closeDropdowns}>
                  CONTACT
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;