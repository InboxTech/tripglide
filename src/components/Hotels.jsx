import React, { useState, useEffect } from "react";
import Header from "./Header";
import TravelDeals from "./TravelDeals";
import Footer from "./Footer";
import FeaturesSection from "./FeaturesSection";
import { FaHotel, FaCalendarAlt, FaTag } from "react-icons/fa";

export default function Hotels() {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [destination, setDestination] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const handleCheckInDateChange = (event) => {
    setCheckInDate(event.target.value);
    if (checkOutDate && event.target.value > checkOutDate) {
      setCheckOutDate("");
    }
  };

  const handleCheckOutDateChange = (event) => {
    setCheckOutDate(event.target.value);
  };

  const isFormComplete = destination && checkInDate && checkOutDate;

  const hotelFeatures = [
    {
      icon: <FaHotel />,
      text: "Search and compare hotels in seconds – anywhere in the world",
    },
    {
      icon: <FaCalendarAlt />,
      text: "Compare deals from trusted hotel providers in one place",
    },
    {
      icon: <FaTag />,
      text: "Book a hotel with flexible booking policies or free cancellation",
    },
  ];

  return (
    <section className="relative w-full">
      {/* Header */}
      <Header />

      {/* Background Image - Hidden on Small Screens */}
      <div className="absolute inset-0 hidden lg:block -z-10 h-[600px] lg:h-[800px]">
        <img
          src="/images/Heroimg.jpg"
          alt="Hotel background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24 mt-16">
        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8">
          Find the best hotel deals
        </h1>

        {/* Search Form */}
        <div className="bg-[#001533] p-6 rounded-2xl shadow-lg">
          <form className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 items-center">
            {/* Destination */}
            <div className="lg:col-span-2">
              <label className="block text-white font-semibold mb-1">
                Where do you want to stay?
              </label>
              <input
                type="text"
                placeholder="Enter destination or hotel name"
                className="w-full p-3 rounded-lg bg-white text-black"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            {/* Check-In */}
            <div>
              <label className="block text-white font-semibold mb-1">Check-In</label>
              <input
                type="date"
                className="w-full p-3 rounded-lg bg-white text-black"
                min={today}
                value={checkInDate}
                onChange={handleCheckInDateChange}
              />
            </div>

            {/* Check-Out */}
            <div>
              <label className="block text-white font-semibold mb-1">Check-Out</label>
              <input
                type="date"
                className="w-full p-3 rounded-lg bg-white text-black"
                min={checkInDate || today}
                value={checkOutDate}
                onChange={handleCheckOutDateChange}
                disabled={!checkInDate}
              />
            </div>

            {/* Guests & Rooms */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1 text-white">Guests & Rooms</label>
              <select className="p-3 rounded w-full border border-gray-300 bg-white text-black">
                <option>2 adults, 1 room</option>
                <option>1 adult, 1 room</option>
                <option>Family</option>
              </select>
            </div>

            {/* Options */}
            <div className="lg:col-span-5 flex flex-wrap gap-4 items-center mt-4">
              <label className="flex items-center text-white">
                <input type="checkbox" className="mr-2" defaultChecked />
                Free cancellation
              </label>

              <label className="flex items-center text-white">
                <input type="checkbox" className="mr-2" />
                4 stars
              </label>

              <label className="flex items-center text-white">
                <input type="checkbox" className="mr-2" />
                3 stars
              </label>

              <button
                type="submit"
                className={`ml-auto px-6 py-3 font-semibold rounded-lg transition ${
                  isFormComplete
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-300 text-gray-200 cursor-not-allowed"
                }`}
                disabled={!isFormComplete}
                style={{ cursor: isFormComplete ? "pointer" : "not-allowed" }}
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white">
        <div className="container mx-auto max-w-7xl px-8 pt-5">
          <nav className="text-sm">
            <a href="/" className="text-blue-600 hover:underline">
              Home
            </a>
            <span className="mx-2 text-gray-400">›</span>
            <span className="text-gray-600">Hotels</span>
          </nav>
        </div>
        <div className="container mx-auto max-w-7xl">
          <FeaturesSection features={hotelFeatures} />
        </div>
      </div>

      {/* Swiper Section */}
      <section className="bg-white">
        <TravelDeals />
      </section>

      {/* Footer */}
      <Footer />
    </section>
  );
}
