import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, ArrowRight, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-4 z-50">
      <div className="flex items-center justify-between w-[90%] max-w-7xl px-4 md:px-8 py-3
        backdrop-blur-md bg-black/80 shadow-lg rounded-full border border-white/10 mx-auto relative">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
          <img
            src={logo}
            alt="Logo"
            className="h-9 w-auto object-contain transition-transform group-hover:scale-110"
          />
          <span className="text-xl font-bold text-white tracking-wide drop-shadow-sm whitespace-nowrap">
            CV_Builder
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-white font-medium">
          <button onClick={() => scrollToSection('home')} className="hover:text-purple-400 transition-colors">Home</button>
          <button onClick={() => scrollToSection('about')} className="hover:text-purple-400 transition-colors">About</button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-purple-400 transition-colors">Contact Us</button>

          {user ? (
            <>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span className="text-base">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-md text-white transition-colors shadow-sm"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center space-x-1 bg-white text-black font-semibold px-4 py-2 rounded-md hover:bg-gray-200 transition-colors shadow-md"
            >
              <span>Join Us</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </nav>

        {/* Hamburger Button */}
        <button
          className="md:hidden flex items-center justify-center p-2 text-white rounded-md hover:bg-white/10 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[90%] bg-black/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 z-50 overflow-hidden">
          <ul className="flex flex-col text-white font-medium p-6 space-y-4">
            <li>
              <button onClick={() => scrollToSection('home')} className="hover:text-purple-400 transition-colors w-full text-left">Home</button>
            </li>
            <li>
              <button onClick={() => scrollToSection('about')} className="hover:text-purple-400 transition-colors w-full text-left">About</button>
            </li>
            <li>
              <button onClick={() => scrollToSection('contact')} className="hover:text-purple-400 transition-colors w-full text-left">Contact Us</button>
            </li>

            {user ? (
              <>
                <li className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors w-full justify-center"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  onClick={() => setMenuOpen(false)}
                  to="/login"
                  className="flex items-center space-x-2 bg-white text-black font-semibold px-4 py-2 rounded-full hover:bg-gray-200 transition-colors w-full justify-center"
                >
                  <span>Join Us</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
