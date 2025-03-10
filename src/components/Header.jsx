import { useState, useEffect } from "react";
import { FaGlobe, FaUser, FaBars, FaHeart, FaPlane, FaHotel, FaCar, FaFlag, FaSearchLocation, FaQuestionCircle } from "react-icons/fa";
import logo from "../assets/image/logo2.png"; // Ensure your logo is stored here
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Link } from "react-router-dom"; 

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("flights");
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    console.log("Current path:", location.pathname);
  }, [location]);

  return (
    <div>
      {/* Navbar */}
      <header className="flex justify-between items-center p-6 bg-[#06152B] text-white relative">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3 cursor-pointer hover:text-blue-300">
          <img src={logo} alt="Skyscanner Logo" className="h-10 w-auto" />
          <span className="text-2xl font-bold font-serif">Tripglide</span>
        </Link>
        </div>

        {/* Icons + Log In + Dropdown */}
        <div className="flex items-center gap-4">
          {/* Globe Icon */}
          <div className="p-2 rounded-lg hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
            <FaGlobe />
          </div>

          {/* Heart Icon */}
          <div className="p-2 rounded-lg hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
            <FaHeart />
          </div>

          {/* User Icon with Log In Text */}
          <div
            className="flex items-center gap-1 p-2 rounded-lg hover:bg-gray-600 transition-colors duration-300 cursor-pointer"
            onClick={() => navigate("/login")} // Navigate to Login page
          >
            <FaUser />
            <span>Log in</span>
          </div>

          {/* Dropdown Menu Trigger */}
          <div className="relative">
            <div
              className="p-2 rounded-lg hover:bg-gray-600 transition-colors duration-300 cursor-pointer"
              onClick={toggleDropdown}
            >
              <FaBars />
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white text-black shadow-lg rounded-xl z-10">
                {/* Top Section */}
                <div className="py-2">
                  <a
                    href="/"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                  >
                    <FaPlane className="text-blue-500" /> Flights
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                  >
                    <FaHotel className="text-blue-500" /> Hotels
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                  >
                    <FaCar className="text-blue-500" /> Car hire
                  </a>
                </div>

                {/* Divider */}
                <hr className="border-t border-gray-300" />

                {/* Bottom Section */}
                <div className="py-2">
                  <a
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                  >
                    <FaFlag /> Regional settings
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                  >
                    <FaSearchLocation className="text-[#0c828b]" /> Explore everywhere
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                  >
                    <FaQuestionCircle className="text-[#0c828b]" /> Help
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

        {/* Tabs Section - Now rendered below the navbar */}
        <div className="flex gap-4 px-6 py-4 bg-[#06152B] text-white">
      {["flights", "hotels", "carhire"].map((tab) => (
        <Link 
          key={tab} 
          to={`/${tab}`} 
          onClick={() => setActiveTab(tab)} // Move onClick here
          className={`flex items-center cursor-pointer gap-2 px-4 py-2 rounded-full border border-white transition-transform duration-300 hover:scale-105 hover:bg-blue-600 ${
            activeTab === tab ? "bg-blue-600" : "bg-gray-800"
          }`}
        >
          {tab === "flights" && <FaPlane />}
          {tab === "hotels" && <FaHotel />}
          {tab === "carhire" && <FaCar />}
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </Link>
      ))}
    </div>
    </div>
  );
}