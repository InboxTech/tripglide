import React, { useState, useEffect } from "react";
import Header from "./Header";
import TravelDeals from "./TravelDeals";
import Footer from "./Footer";
import FeaturesSection from "./FeaturesSection";
import { FaCar, FaCalendarAlt, FaTag } from "react-icons/fa";
import CarHireFAQ from "./CarHireFAQ";


export default function CarHire() {
  const [today, setToday] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [minPickupTime, setMinPickupTime] = useState("");
  const [dropoffTime, setDropoffTime] = useState("");

  // Set today's date and minimum pickup time (15 mins from now)
  useEffect(() => {
    const now = new Date();

    // Format date as YYYY-MM-DD
    const currentDate = now.toISOString().split("T")[0];
    setToday(currentDate);

    // Set minimum time (15 mins from now)
    now.setMinutes(now.getMinutes() + 15);
    setMinPickupTime(now.toTimeString().slice(0, 5));
  }, []);

  // Handle Pickup Date Change
  const handlePickupDateChange = (e) => {
    const date = e.target.value;
    setPickupDate(date);

    if (dropoffDate && date > dropoffDate) {
      setDropoffDate(date); // Reset drop-off if it's before pickup
    }

    // If pickup date is today, set the min time as 15 mins from now
    if (date === today) {
      const now = new Date();
      now.setMinutes(now.getMinutes() + 15);
      setMinPickupTime(now.toTimeString().slice(0, 5));
    } else {
      setMinPickupTime("00:00");
    }
  };

  // Handle Pickup Time Change
  const handlePickupTimeChange = (e) => {
    const time = e.target.value;
    setPickupTime(time);

    // Set minimum and maximum for drop-off time (15-30 mins after pickup)
    const [hours, minutes] = time.split(":").map(Number);
    const minDropoff = new Date();
    minDropoff.setHours(hours, minutes + 15);
    const maxDropoff = new Date();
    maxDropoff.setHours(hours, minutes + 30);

    const minDropoffTime = minDropoff.toTimeString().slice(0, 5);
    const maxDropoffTime = maxDropoff.toTimeString().slice(0, 5);

    if (dropoffTime < minDropoffTime || dropoffTime > maxDropoffTime) {
      setDropoffTime(minDropoffTime);
    }
  };

  const carFeatures = [
    {
      icon: <FaCar />,
      text: "Search for cheap car rental in seconds – anywhere in the world",
    },
    {
      icon: <FaCalendarAlt />,
      text: "Compare deals from trusted car hire providers in one place",
    },
    {
      icon: <FaTag />,
      text: "Rent a car with a flexible booking policy or free cancellation",
    },
  ];

  return (
    <section className="relative w-full">
      {/* Header */}
      <Header />


      {/* Background Image - Hidden on Small Screens */}
      <div className="absolute inset-0 hidden lg:block -z-10">
        <img
          src="/public/images/carbg.jpg"
          alt="Car rental background"
          className="w-full h-full object-cover object-center fixed"
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

