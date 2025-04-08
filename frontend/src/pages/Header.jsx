import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-950 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-400 hover:text-blue-700">
        <img src="/images/Skyscanner Logo.jpeg" alt="Skyscanner Logo" className="w-8 h-7" />
          <span>Skyscanner</span>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <a href="/" className="text-white hover:text-blue-600">
            Flights
          </a>
          <a href="/" className="text-white hover:text-blue-600">
            Hotels
          </a>
          <a href="/" className="text-white hover:text-blue-600">
            Car Hire
          </a>
          <a href="/" className="text-white hover:text-blue-600">
            Deals
          </a>
        </nav>

        {/* Login / Sign Up */}
        <div className="hidden md:flex space-x-4">
          <Link to="/login" className="text-white hover:text-blue-600 cursor-pointer mt-1">
            Login
          </Link>
          <Link to="/signup" className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 cursor-pointer">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;


