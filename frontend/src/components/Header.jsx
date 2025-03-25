import React from "react";
import { useState, useEffect, useRef } from "react";
import { FaGlobe, FaUser, FaBars, FaHeart, FaPlane, FaHotel, FaCar, FaFlag, FaSearchLocation, FaQuestionCircle } from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "../assets/image/logo2.png";

export default function Header({ user, handleLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("flights");
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isDropdownOpen) setIsDropdownOpen(false);
  };

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/hotels")) {
      setActiveTab("hotels");
    } else if (path.includes("/carhire") || path.includes("/cabs")) {
      setActiveTab("carhire");
    } else {
      setActiveTab("flights");
    }
  }, [location.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleLogout();
    setIsProfileOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-[#06152B] text-white w-full">
      <div className="container mx-auto max-w-7xl flex flex-wrap items-center justify-between p-4 md:p-6">
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link to="/" className="flex items-center gap-3 cursor-pointer hover:text-blue-300">
            <img src={logo} alt="Tripglide Logo" className="h-8 md:h-10 w-auto" />
            <span className="text-lg md:text-2xl font-bold font-serif">Tripglide</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
        <Link to="/country-facts" className="p-2 rounded-lg hover:bg-gray-600 transition cursor-pointer">
          <FaGlobe />
        </Link>

          <div className="p-2 rounded-lg hover:bg-gray-600 transition cursor-pointer">
            <FaHeart />
          </div>

          {/* Show Profile if Logged In, Else Show Sign In Button */}
          {user ? (
            <div className="relative" ref={profileRef}>
              <div 
                className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-600"
                onClick={toggleProfile}
              >
                <FaUser />
                <span className="hidden sm:inline">{user.username}</span>
              </div>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-20">
                  <div className="p-1">
                    <p className="font-semibold">{user.username}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <button
                      onClick={onLogout}
                      className="mt-2 w-full text-left text-sm text-red-600 hover:underline"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signin" className="flex items-center gap-1 p-2 rounded-lg hover:bg-gray-600 transition cursor-pointer">
              <FaUser />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          )}

          <div className="relative" ref={dropdownRef}>
            <div className="p-2 rounded-lg hover:bg-gray-600 transition cursor-pointer" onClick={toggleDropdown}>
              <FaBars />
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white text-black shadow-lg rounded-xl z-20">
                <div className="py-2">
                  <Link to="/" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition">
                    <FaPlane className="text-blue-500" /> Flights
                  </Link>
                  <Link to="/hotels" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition">
                    <FaHotel className="text-blue-500" /> Hotels
                  </Link>
                  <Link to="/carhire" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition">
                    <FaCar className="text-blue-500" /> Car hire
                  </Link>
                </div>
                <hr className="border-t border-gray-300" />
                <div className="py-2">
                  <Link to="/regional-settings" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition">
                    <FaFlag /> Regional settings
                  </Link>
                  <Link to="/" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition">
                    <FaSearchLocation className="text-[#0c828b]" /> Explore everywhere
                  </Link>
                  <Link to="/help" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition">
                    <FaQuestionCircle className="text-[#0c828b]" /> Help
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl overflow-x-auto scrollbar-hide">
        <div className="flex flex-nowrap gap-2 md:gap-4 px-4 md:px-6 py-2 md:py-4 bg-[#06152B] text-white min-w-max">
          {[
            { id: "flights", icon: <FaPlane />, label: "Flights" },
            { id: "hotels", icon: <FaHotel />, label: "Hotels" },
            { id: "carhire", icon: <FaCar />, label: "Car hire" }
          ].map(({ id, icon, label }) => (
            <Link
              key={id}
              to={`/${id === "flights" ? "" : id}`}
              className={`flex items-center whitespace-nowrap cursor-pointer gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white transition-transform duration-300 hover:scale-105 hover:bg-blue-600 ${
                activeTab === id ? "bg-blue-600" : "bg-gray-800"
              }`}
            >
              {icon} {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}