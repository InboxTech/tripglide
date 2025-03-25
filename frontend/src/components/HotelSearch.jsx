import React, { useState, useEffect, useRef } from 'react';
<<<<<<< HEAD
import Header from './Header';
import { ChevronDown, ArrowRight, Filter as FilterIcon, Calendar } from "lucide-react";
=======
import { FaSearch } from 'react-icons/fa';
import HotelSearchPopup from './HotelSearchPopup';
import { ChevronDown, ArrowRight, Filter as FilterIcon } from "lucide-react";
>>>>>>> 8996b9dca3699a4b3d92fe541eb524c39d077196
import { useLocation } from "react-router-dom";
import HotelCard from './HotelCard';
import Footer from './Footer';

function HotelSearch() {
  const locationState = useLocation();
<<<<<<< HEAD
  const { destination, checkInDate, checkOutDate, adults, children, rooms } = locationState.state || {};
=======

  const [isPopupOpen, setIsPopupOpen] = useState(false); // Declare the state

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);
>>>>>>> 8996b9dca3699a4b3d92fe541eb524c39d077196

  const [showFilters, setShowFilters] = useState(true); // Toggle for filters (responsive)
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);

<<<<<<< HEAD

  // State for editable search data
  const [searchData, setSearchData] = useState({
    destination: destination || "",
    checkInDate: checkInDate || "",
    checkOutDate: checkOutDate || "",
    adults: adults || 1,
    children: children || 0,
    rooms: rooms || 1
  });

=======
>>>>>>> 8996b9dca3699a4b3d92fe541eb524c39d077196
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

<<<<<<< HEAD
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Search Bar Container */}
      <div className="sticky top-0 z-50 flex justify-center w-full bg-[#06152B]">
        <div className="w-full max-w-7xl px-4  py-4">

          < div className="w-full bg-white rounded-md flex flex-col md:flex-row overflow-hidden shadow-lg">
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
              <span className="text-xs text-gray-600 ">Check-in</span>
              <input
                type="date"
                name="checkInDate"
                value={searchData.checkInDate}
                onChange={handleInputChange}
                className="w-full text-blue-600 font-semibold text-base bg-transparent outline-none"
              />
              {/* <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" /> */}
            </div>

            {/* Check-out */}
            <div className="flex-1 flex flex-col items-start justify-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-300">
              <span className="text-xs text-gray-600">Check-out</span>
              <input
                type="date"
                name="checkOutDate"
                value={searchData.checkOutDate}
                onChange={handleInputChange}
                className="w-full text-blue-600 font-semibold text-base bg-transparent outline-none "
              />
            </div>

            {/* Guests */}
            <div
              ref={guestsDropdownRef}
              className="flex-1 flex flex-col items-start justify-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-300 relative"
              onClick={handleGuestsDropdownClick}
            >
              <span className="text-xs text-gray-600">Guests and rooms</span>
              <span className="text-blue-600 font-semibold text-base">
                {searchData.adults} adults{searchData.children > 0 ? `, ${searchData.children} children` : ""}, {searchData.rooms} room
              </span>
              <ChevronDown className={`absolute right-4 top-7 w-4 h-4 text-black transition-transform ${showGuestsDropdown ? 'rotate-180' : ''}`} />


              {/* Guests Dropdown */}
              {showGuestsDropdown && (
                <div
                  className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-xl z-[100] p-4 mt-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Adults */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="block text-sm font-medium">Adults</span>
                      <span className="text-xs text-gray-500">Ages 18+</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleGuestChange('adults', -1)}
                        className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full disabled:opacity-50"
                        disabled={searchData.adults <= 1}
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{searchData.adults}</span>
                      <button
                        onClick={() => handleGuestChange('adults', 1)}
                        className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full disabled:opacity-50"
                        disabled={searchData.adults >= 10}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="block text-sm font-medium">Children</span>
                      <span className="text-xs text-gray-500">Ages 0-17</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleGuestChange('children', -1)}
                        className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full disabled:opacity-50"
                        disabled={searchData.children <= 0}
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{searchData.children}</span>
                      <button
                        onClick={() => handleGuestChange('children', 1)}
                        className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full disabled:opacity-50"
                        disabled={searchData.children >= 10}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Rooms */}
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="block text-sm font-medium">Rooms</span>
                      <span className="text-xs text-gray-500">Max 5 rooms</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleGuestChange('rooms', -1)}
                        className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full disabled:opacity-50"
                        disabled={searchData.rooms <= 1}
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{searchData.rooms}</span>
                      <button
                        onClick={() => handleGuestChange('rooms', 1)}
                        className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full disabled:opacity-50"
                        disabled={searchData.rooms >= 5}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Done Button */}
                  <button
                    onClick={() => setShowGuestsDropdown(false)}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
            {/* Search Button */}
            <button className="bg-blue-600 text-white flex items-center justify-center gap-2 px-6 py-4 md:rounded-none rounded-b-md md:rounded-r-md font-semibold">
              Search hotels <ArrowRight className="w-4 h-4" />
            </button>

=======
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
>>>>>>> 8996b9dca3699a4b3d92fe541eb524c39d077196
          </div>
        </div>
      </div>

<<<<<<< HEAD

      {/* Content */}
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

      {/* Footer */}
      <div className='mt-3 bg-gray-100'>
        <Footer />
      </div>
=======
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
>>>>>>> 8996b9dca3699a4b3d92fe541eb524c39d077196

    </div >
  );
}

<<<<<<< HEAD
export default HotelSearch;
=======
export default HotelSearch;
>>>>>>> 8996b9dca3699a4b3d92fe541eb524c39d077196
