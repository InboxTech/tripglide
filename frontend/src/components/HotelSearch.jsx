import React, { useState, useRef } from 'react';
import Header from './Header';
import { ChevronDown, ArrowRight, Filter as FilterIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import HotelCard from './HotelCard';

function HotelSearch() {
  const locationState = useLocation();
  const { destination, checkInDate, checkOutDate, adults, children, rooms } = locationState.state || {};

  const [showFilters, setShowFilters] = useState(true); // Toggle for filters (responsive)
  

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="relative">
        <Header />

        {/* Search Bar */}
        <div className="w-full bg-[#06152B] py-4 px-2 top-[110px] left-0 z-40">
          <div className="max-w-7xl mx-auto bg-white rounded-md flex flex-col md:flex-row overflow-hidden shadow-lg">

            {/* Location */}
            <div className="flex-1 flex flex-col items-start justify-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-300">
              <span className="text-xs text-gray-600">Where do you want to stay?</span>
              <span className="text-blue-600 font-semibold text-base">
                {destination || "Enter Destination"}
              </span>
            </div>

            {/* Check-in */}
            <div className="flex-1 flex flex-col items-start justify-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-300">
              <span className="text-xs text-gray-600">Check-in</span>
              <span className="text-blue-600 font-semibold text-base">
                {checkInDate || "--/--/----"}
              </span>
            </div>

            {/* Check-out */}
            <div className="flex-1 flex flex-col items-start justify-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-300">
              <span className="text-xs text-gray-600">Check-out</span>
              <span className="text-blue-600 font-semibold text-base">
                {checkOutDate || "--/--/----"}
              </span>
            </div>

            {/* Guests */}
            <div className="flex-1 flex flex-col items-start justify-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-300 relative">
              <span className="text-xs text-gray-600">Guests and rooms</span>
              <span className="text-blue-600 font-semibold text-base">
                {adults} adults{children > 0 ? `, ${children} children` : ""}, {rooms} room
              </span>
              <ChevronDown className="absolute right-4 top-7 w-4 h-4 text-black" />
            </div>

            {/* Search Button */}
            <button className="bg-blue-600 text-white flex items-center justify-center gap-2 px-6 py-4 md:rounded-none rounded-b-md md:rounded-r-md font-semibold">
              Search hotels <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        </div>
      </div>

      {/* Content - Fixed Container with Proper Height */}
      <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-180px)]">
        <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row mt-8 px-4 md:px-0 gap-4 flex-1">

          {/* Filters Sidebar - Independent Scrollable Area */}
          <div className={`md:w-1/4 w-full ${showFilters ? 'block' : 'hidden'} md:block`}>
          <div
              className="bg-[#06152B] text-white p-4 rounded-md sticky top-[110px] h-[calc(100vh-180px)] overflow-y-auto"
            >
              <h3 className="text-lg font-bold mb-4">Select Filters</h3>

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

          {/* Hotel Listings - Independent Scrollable Area */}
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
    </div>
  );
}

export default HotelSearch;