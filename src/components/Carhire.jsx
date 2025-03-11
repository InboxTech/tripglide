import React from "react";
import Header from "./Header";
import TravelDeals from "./TravelDeals";
import Footer from "./Footer";
import FeaturesSection from "./FeaturesSection";
import { FaCar, FaCalendarAlt, FaTag } from "react-icons/fa";
import CarHireFAQ from "./CarHireFAQ";

// export default function CarHire() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Header */}
//       <Header />

//       {/* Main Content */}
//       <main className="flex-grow p-6">
//         <h1 className="text-3xl font-bold mb-4">Car Hire</h1>
    
//         {/* Empty Div for Future Components */}
//         <div className="border border-gray-300 p-4 rounded-lg">
//           {/* Add your car hire components here */}
//         </div>
//       </main>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }

export default function CarHire() {
  return (
    <section className="relative w-full">
      {/* Header */}
      <Header />


      {/* Background Image - Hidden on Small Screens */}
      <div className="absolute inset-0 hidden lg:block -z-10 fixed">
        <img
          src="/public/images/carbg.jpg"
          alt="Car rental background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <h1 className="text-4xl lg:text-6xl font-bold text-black mb-8">
          Find the best car rental deals
        </h1>

        {/* Search Form */}
        <div className="bg-[#001533] p-6 rounded-2xl shadow-lg">
          <form className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 items-center">
            
            {/* Pickup Location */}
            <div className="lg:col-span-1">
              <label className="block text-white font-semibold mb-1">
                Pick-up location
              </label>
              <input
                type="text"
                placeholder="City, airport or station"
                className="w-full p-3 rounded-lg bg-white text-black"
              />
            </div>

            {/* Pickup Date */}
            <div>
              <label className="block text-white font-semibold mb-1">
                Pick-up date
              </label>
              <input type="date" className="w-full p-3 rounded-lg bg-white text-black" />
            </div>

            {/* Pickup Time */}
            <div>
              <label className="block text-white font-semibold mb-1">
                Time
              </label>
              <input type="time" className="w-full p-3 rounded-lg bg-white text-black" />
            </div>

            {/* Drop-off Date */}
            <div>
              <label className="block text-white font-semibold mb-1">
                Drop-off date
              </label>
              <input type="date" className="w-full p-3 rounded-lg bg-white text-black" />
            </div>

            {/* Drop-off Time */}
            <div>
              <label className="block text-white font-semibold mb-1">
                Time
              </label>
              <input type="time" className="w-full p-3 rounded-lg bg-white text-black" />
            </div>

            {/* Options */}
            <div className="lg:col-span-5 flex flex-wrap gap-4 items-center mt-4">
              <label className="flex items-center text-white">
                <input type="checkbox" className="mr-2" defaultChecked />
                Driver aged between 25 – 70
              </label>

              <label className="flex items-center text-white">
                <input type="checkbox" className="mr-2" />
                Return car to a different location
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



      {/* Features Section */}
      <div className="bg-white">
      <div className="px-8 pt-5">
  <nav className="text-sm">
    <a href="/" className="text-blue-600 hover:underline">Home</a>
    <span className="mx-2 text-gray-400">›</span>
    <span className="text-gray-600">Car hire</span>
  </nav>
</div>
      <FeaturesSection features={carFeatures} />
      </div>

      {/* Swiper Travel Deals */}
      <TravelDeals />

      {/* Car Hire FAQ */}
      <div className="bg-white">
      <CarHireFAQ />
      </div>

       {/* Footer */}
       <Footer />
    </section>
  );
}

