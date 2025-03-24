import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import { ChevronDown, ArrowRight, Filter as FilterIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import HotelCard from './HotelCard';
import Footer from './Footer';

function HotelSearch() {
  const locationState = useLocation();
  const { destination, checkInDate, checkOutDate, adults, children, rooms } = locationState.state || {};

  const [showFilters, setShowFilters] = useState(true); // Toggle for filters (responsive)
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);

  // Close dropdown when clicking outside
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowGuestDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGuestChange = (field, action) => {
    setSearchData(prev => ({
      ...prev,
      [field]: action === 'increment' ? prev[field] + 1 : Math.max(0, prev[field] - 1)
    }));
  };


  // State for editable search data
  const [searchData, setSearchData] = useState({
    destination: destination || "",
    checkInDate: checkInDate || "",
    checkOutDate: checkOutDate || "",
    adults: adults || 1,
    children: children || 0,
    rooms: rooms || 1
  });

  // Handle changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    // Here, call backend API to fetch hotels based on searchData (if needed)
    console.log("Updated Search Data: ", searchData);
  };


  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Search Bar Container */}
      <div className="sticky top-0 z-50">
        <div className="w-full bg-[#06152B] py-4 px-2">
          <div className="max-w-7xl mx-auto bg-white rounded-md flex flex-col md:flex-row overflow-hidden shadow-lg">
            {/* Destination */}
            <div className="flex-1 flex flex-col items-start justify-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-300">
              <span className="text-xs text-gray-600">Where do you want to stay?</span>
              <input
                type="text"
                name="destination"
                value={searchData.destination}
                onChange={handleInputChange}
                placeholder="Enter Destination"
                className="text-blue-600 font-semibold text-base bg-transparent outline-none"
              />
            </div>

            {/* Check-in */}
            <div className="flex-1 flex flex-col items-start justify-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-300">
              <span className="text-xs text-gray-600">Check-in</span>
              <input
                type="date"
                name="checkInDate"
                value={searchData.checkInDate}
                onChange={handleInputChange}
                className="text-blue-600 font-semibold text-base bg-transparent outline-none"
              />
            </div>

            {/* Check-out */}
            <div className="flex-1 flex flex-col items-start justify-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-300">
              <span className="text-xs text-gray-600">Check-out</span>
              <input
                type="date"
                name="checkOutDate"
                value={searchData.checkOutDate}
                onChange={handleInputChange}
                className="text-blue-600 font-semibold text-base bg-transparent outline-none"
              />
            </div>

            {/* Guests & Rooms */}
            <div className="flex-1 flex flex-col items-start justify-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-300 relative" ref={dropdownRef}>
              <span className="text-xs text-gray-600 mb-1">Guests & Rooms</span>

              <button
                onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                className="flex gap-1 items-center"
              >
                <span className="text-blue-600 font-semibold">{searchData.adults}</span> Adults,
                <span className="ml-1 text-blue-600 font-semibold">{searchData.children}</span> Children,
                <span className="ml-1 text-blue-600 font-semibold">{searchData.rooms}</span> Rooms
                <ChevronDown className="ml-2 w-4 h-4 text-black" />
              </button>

              {/* Dropdown */}
              {showGuestDropdown && (
                <div
                  className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-md p-4 w-64 z-50"
                >
                  {['adults', 'children', 'rooms'].map((field, idx) => (
                    <div key={idx} className="flex justify-between items-center mb-3">
                      <span className="capitalize">{field}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleGuestChange(field, 'decrement')}
                          className="bg-gray-200 px-2 rounded"
                        >-</button>
                        <span>{searchData[field]}</span>
                        <button
                          onClick={() => handleGuestChange(field, 'increment')}
                          className="bg-gray-200 px-2 rounded"
                        >+</button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => setShowGuestDropdown(false)}
                    className="text-blue-600 font-semibold mt-2"
                  >Done</button>
                </div>
              )}
            </div>

            {/* Search Button */}
            <button
              className="bg-blue-600 text-white flex items-center justify-center gap-2 px-6 py-4 md:rounded-none rounded-b-md md:rounded-r-md font-semibold"
              onClick={handleSearch}
            >
              Search hotels <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>


      {/* Content */}
      <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-180px)] bg-gray-100">
        <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row mt-8 px-4 md:px-0 gap-4 flex-1">
          {/* Filters Sidebar */}
          <div className={`md:w-1/4 w-full ${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="bg-[#06152B] text-white p-4 rounded-md sticky top-[110px] h-[calc(100vh-180px)] overflow-y-auto">
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

      {/* Footer */}
      <div className='mt-3'>
        <Footer />
      </div>

    </div>
  );
}

export default HotelSearch;
