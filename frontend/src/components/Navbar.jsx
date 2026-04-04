import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Helper function for active link styling
  const navLinkStyles = ({ isActive }) =>
    `block py-2 px-3 rounded md:p-0 transition-colors ${
      isActive 
        ? "text-blue-500 font-semibold" 
        : "text-gray-200 hover:text-blue-400"
    }`;

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <span className="self-center text-2xl font-bold whitespace-nowrap text-white">
            EnviroStruct
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
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

        {/* Desktop & Mobile Menu */}
        <div className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto transition-all`}>
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-800 rounded-lg bg-gray-900 md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
              <NavLink to="/" className={navLinkStyles} onClick={() => setIsOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/sectors" className={navLinkStyles} onClick={() => setIsOpen(false)}>
                Sectors
              </NavLink>
            </li>
            <li>
              <NavLink to="/portfolio" className={navLinkStyles} onClick={() => setIsOpen(false)}>
                Portfolio
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkStyles} onClick={() => setIsOpen(false)}>
                About
              </NavLink>
            </li>
            {/* Services Dropdown logic can go here, but for now, simple links: */}
            <li>
              <NavLink to="/eng-service" className={navLinkStyles} onClick={() => setIsOpen(false)}>
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navLinkStyles} onClick={() => setIsOpen(false)}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;