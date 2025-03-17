import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import FAQSection from "./FAQSection";


export default function Hotels() {
  return (
    <section className="relative w-full">
      {/* Header */}
      <Header />


      {/* Background Image - Hidden on Small Screens */}
      <div className="absolute inset-0 hidden lg:block -z-10 h-[600px] lg:h-[800px]">
        <img
          src="public\images\Heroimg.jpg"
          alt="Car rental background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24 mt-16">
        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8">
          Find the best car rental deals
        </h1>

        {/* Search Form */}
        <div className="bg-[#001533] p-6 rounded-2xl shadow-lg">
          <form className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 items-center">

            {/* Destination*/}
            <div className="lg:col-span-2">
              <label className="block text-white font-semibold mb-1">
                Where do you want to stay?
              </label>
              <input
                type="text"
                placeholder="Enter destination or hotel name"
                className="w-full p-3 rounded-lg bg-white text-black"
              />
            </div>

            {/* Check-In */}
            <div>
              <label className="block text-white font-semibold mb-1">
                Check-In
              </label>
              <input type="date" className="w-full p-3 rounded-lg bg-white text-black" />
            </div>



            {/* Check-Out */}
            <div>
              <label className="block text-white font-semibold mb-1">
                Check-Out
              </label>
              <input type="date" className="w-full p-3 rounded-lg bg-white text-black" />
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
                className="ml-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      
    </section>
  );
}