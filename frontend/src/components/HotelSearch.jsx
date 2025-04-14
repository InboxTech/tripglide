import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import HotelSearchPopup from './HotelSearchPopup';
import { ChevronDown, ArrowRight, Filter as FilterIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import HotelCard from './HotelCard';
import Footer from './Footer';

function HotelSearch() {
  const locationState = useLocation();

  const [isPopupOpen, setIsPopupOpen] = useState(false); // Declare the state

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const [showFilters, setShowFilters] = useState(true); // Toggle for filters (responsive)
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);

  // Ref to handle click outside of dropdown
  const guestsDropdownRef = useRef(null);

  // Handle changes to guests and rooms
  const handleGuestChange = (type, increment) => {
    setSearchData(prev => {
      // Handle adults
      if (type === 'adults') {
        const newAdults = Math.max(1, Math.min(prev.adults + increment, 10));
        // Ensure at least one adult per room
        const newRooms = Math.min(prev.rooms, Math.ceil(newAdults / 2));
        return {
          ...prev,
          adults: newAdults,
          rooms: newRooms
        };
      }

      // Handle children
      if (type === 'children') {
        const newChildren = Math.max(0, Math.min(prev.children + increment, 10));
        return { ...prev, children: newChildren };
      }

      // Handle rooms
      if (type === 'rooms') {
        const newRooms = Math.max(1, Math.min(prev.rooms + increment, 5));
        // Ensure enough adults for rooms (2 adults per room max)
        const newAdults = Math.max(newRooms, prev.adults);
        return {
          ...prev,
          rooms: newRooms,
          adults: newAdults
        };
      }

      return prev;
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (guestsDropdownRef.current && !guestsDropdownRef.current.contains(event.target)) {
        setShowGuestsDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle changes to other inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    console.log("Updated Search Data: ", searchData);
  };

  const handleGuestsDropdownClick = (e) => {
    e.stopPropagation();
    setShowGuestsDropdown(!showGuestsDropdown);
  };

  // Search form state
  const [destination, setDestination] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  return (
    <div className="flex flex-col min-h-screen">

      {/* Search Bar */}
      <div className="bg-[#06152B] py-4 px-4 z-10 shadow-lg">
        <div className="flex justify-center">
          <div
            className="flex items-center px-6 py-3 rounded-lg w-full max-w-6xl bg-[#0C1D3D] cursor-pointer"
            onClick={() => setIsPopupOpen(true)}
          >
            <FaSearch className="text-blue-500 mr-3" size={18} />
            <p className="text-white text-sm text-center flex-1">
              {destination || "Enter Destination"} • {checkInDate || "DD/MM/YYYY"} → {checkOutDate || "DD/MM/YYYY"} • {adults} Adults, {children} Children, {rooms} Room
            </p>
          </div>
        </div>
      </div>

      {/* Popup Component */}
      {isPopupOpen && (
        <HotelSearchPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          destination={destination}
          setDestination={setDestination}
          checkInDate={checkInDate}
          setCheckInDate={setCheckInDate}
          checkOutDate={checkOutDate}
          setCheckOutDate={setCheckOutDate}
          adults={adults}
          setAdults={setAdults}
          children={children}
          setChildren={setChildren}
          rooms={rooms}
          setRooms={setRooms}
        />
      )}


      {/* Content */ }
  <div className="flex-1 flex flex-col md:flex-row bg-gray-100">
    {/* Main content */}
    <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row mt-8 px-4 gap-4 flex-1">
      {/* Filters Sidebar */}
      <div className={`md:w-1/4 w-full ${showFilters ? 'block' : 'hidden'} md:block`}>
        <div className="bg-white text-black p-4 rounded-md sticky top-[110px] h-[calc(100vh-180px)] overflow-y-auto">
          <h3 className="text-lg font-bold mb-4">Select Filters</h3>
          {/* Filter Options */}
          <div className="mb-4">
            <label className="block mb-1">Hotel Type:</label>
            <div className="space-y-1">
              <div><input type="checkbox" /> Luxury</div>
              <div><input type="checkbox" /> Budget</div>
              <div><input type="checkbox" /> Resort</div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Rating:</label>
            <div className="space-y-1">
              <div><input type="checkbox" /> 4 stars & above</div>
              <div><input type="checkbox" /> 3 stars & above</div>
              <div><input type="checkbox" /> Below 3 stars</div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Rating:</label>
            <div className="space-y-1">
              <div><input type="checkbox" /> 4 stars & above</div>
              <div><input type="checkbox" /> 3 stars & above</div>
              <div><input type="checkbox" /> Below 3 stars</div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Rating:</label>
            <div className="space-y-1">
              <div><input type="checkbox" /> 4 stars & above</div>
              <div><input type="checkbox" /> 3 stars & above</div>
              <div><input type="checkbox" /> Below 3 stars</div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Rating:</label>
            <div className="space-y-1">
              <div><input type="checkbox" /> 4 stars & above</div>
              <div><input type="checkbox" /> 3 stars & above</div>
              <div><input type="checkbox" /> Below 3 stars</div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Rating:</label>
            <div className="space-y-1">
              <div><input type="checkbox" /> 4 stars & above</div>
              <div><input type="checkbox" /> 3 stars & above</div>
              <div><input type="checkbox" /> Below 3 stars</div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Rating:</label>
            <div className="space-y-1">
              <div><input type="checkbox" /> 4 stars & above</div>
              <div><input type="checkbox" /> 3 stars & above</div>
              <div><input type="checkbox" /> Below 3 stars</div>
            </div>
          </div>


        </div>
      </div>

      {/* Hotel Listings */}
      <div className="md:w-3/4 w-full flex flex-col">
        {/* Filter Toggle Button (mobile) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md mb-4 md:hidden"
        >
          <FilterIcon className="mr-2 w-4 h-4" /> Filter
        </button>

        <h3 className="text-xl font-semibold mb-4">Available Hotels</h3>

        {/* Scrollable Container for Hotel Cards */}
        <div className="flex-1 overflow-y-auto h-[calc(100vh-180px)] pr-">
          <div className="space-y-4 pb-10">
            <HotelCard />
            <HotelCard />
            <HotelCard />
            {/* Add multiple HotelCards */}
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Footer */ }
  <div className='mt-3'>
    <Footer />
  </div>

    </div >
  );
}

export default HotelSearch;