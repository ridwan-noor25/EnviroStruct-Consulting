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

  return (
    <nav className="bg-slate-50 sticky top-0 z-50 shadow-md">
      {/* Top Bar with Contact Info */}
      <div className="bg-[#e2e8f0] text-[#0F3A5A] text-sm py-2">
        <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
          <div className="hidden md:block text-[#6E8F3D] font-semibold">
            Get in Touch Today!
          </div>
          <div className="flex items-center space-x-4 mx-auto md:mx-0">
            <a href="tel:2394945700" className="hover:text-[#6E8F3D] transition flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              239.494.5700
            </a>
            <span className="text-[#0F3A5A]/30 hidden sm:inline">|</span>
            <a href="mailto:info@envirostruct.net" className="hover:text-[#6E8F3D] transition flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              info@envirostruct.net
            </a>
          </div>
          <div className="hidden md:block w-32"></div>
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
              <span className="text-xl font-bold text-[#0F3A5A] tracking-wider">
                ENVIROSTRUCT
              </span>
              <span className="text-xs text-[#0F3A5A]/70 tracking-wide">
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