import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png'; // Save your uploaded image as logo.png in src/assets

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 shadow-lg backdrop-blur-md bg-opacity-80 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2 group">
            <img
              src={logo}
              alt="CVBuilder Logo"
              className="h-9 w-auto object-contain transition-transform group-hover:scale-110"
            />
            <span className="text-xl font-bold text-white tracking-wide drop-shadow-sm">
              CVBuilder
            </span>
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-white">
                <User className="h-5 w-5" />
                <span className="hidden sm:block font-medium">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-md text-white transition-colors shadow-sm"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:block">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-white hover:text-blue-100 transition-colors font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-green-600 font-semibold px-4 py-2 rounded-md hover:bg-green-100 transition-colors shadow-md"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
