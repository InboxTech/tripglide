import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { FaSearch } from "react-icons/fa";
import SearchFormPopup from "./SearchFormPopUp";

const flights = [
  { city: "New Delhi", price: 80433 },
  { city: "Bengaluru", price: 82161 },
  { city: "Mumbai", price: 100829 },
  { city: "Chennai", price: 109997 },
  { city: "Hyderabad", price: 111865 },
  { city: "Kochi", price: 112670 },
  { city: "Thiruvananthapuram", price: 115680 },
  { city: "Ahmedabad", price: 118031 },
  { city: "Vadodara", price: 126850 },
];

const cheapestFlights = [...flights].sort((a, b) => a.price - b.price).slice(0, 3);
const directFlights = flights.slice(0, 5);
const allFlights = flights;

const FlightCardList = () => {
  const location = useLocation();
  const searchParams = location.state || {};
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // State for search form
  const [tripType, setTripType] = useState(searchParams.tripType || "return");
  const [from, setFrom] = useState(searchParams.from || "");
  const [to, setTo] = useState(searchParams.to || "");
  const [departDate, setDepartDate] = useState(searchParams.departDate || "");
  const [returnDate, setReturnDate] = useState(searchParams.returnDate || "");
  const [cabinClass, setCabinClass] = useState(searchParams.cabinClass || "Economy");
  const [multiCityFlights, setMultiCityFlights] = useState(
    searchParams.multiCityFlights || [
      { id: 1, from: "", to: "", depart: "" },
      { id: 2, from: "", to: "", depart: "" }
    ]
  );
  
  // Mock airports data - replace with your actual data
  const departureAirports = ["New Delhi", "Mumbai", "Bengaluru", "Chennai"];
  const arrivalAirports = ["London", "New York", "Dubai", "Singapore"];

  const handleSearch = (e) => {
    e.preventDefault();
    // Updated search logic to handle multi-city
    if (tripType === "multicity") {
      console.log("Multi-city search:", multiCityFlights);
    } else {
      console.log("Search:", { tripType, from, to, departDate, returnDate, cabinClass });
    }
    setIsSearchOpen(false);
  };

  // Search Summary
  let searchSummary = "";
  if (tripType === "return") {
    searchSummary = `${from} → ${to} • ${departDate} - ${returnDate} • ${cabinClass}`;
  } else if (tripType === "oneway") {
    searchSummary = `${from} → ${to} • ${departDate} • ${cabinClass}`;
  } else if (tripType === "multicity") {
    searchSummary = multiCityFlights
      .map(flight => `${flight.from} → ${flight.to} • ${flight.depart}`)
      .join(" | ") + ` • ${cabinClass}`;
  }

  const [selectedFilter, setSelectedFilter] = useState("all");

  let displayedFlights = allFlights;
  if (selectedFilter === "cheapest") displayedFlights = cheapestFlights;
  else if (selectedFilter === "direct") displayedFlights = directFlights;

  return (
    <div className="bg-blue-50 min-h-screen">
      {/* <Header /> */}

      <div className="flex bg-[#06152B] justify-center py-6 px-4">
        <div
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center px-6 py-3 rounded-lg w-full max-w-6xl bg-[#0C1D3D]/100 cursor-pointer hover:bg-[#0C1D3D]/80 transition-colors"
        >
          <FaSearch className="text-blue-500 mr-3" size={18} />
          <p className="text-white text-sm text-center flex-1">{searchSummary}</p>
        </div>
      </div>

      <SearchFormPopup
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        tripType={tripType}
        from={from}
        to={to}
        departDate={departDate}
        returnDate={returnDate}
        cabinClass={cabinClass}
        setTripType={setTripType}
        setFrom={setFrom}
        setTo={setTo}
        setDepartDate={setDepartDate}
        setReturnDate={setReturnDate}
        setCabinClass={setCabinClass}
        handleSearch={handleSearch}
        departureAirports={departureAirports}
        arrivalAirports={arrivalAirports}
        multiCityFlights={multiCityFlights}
        setMultiCityFlights={setMultiCityFlights}
      />

      <div className="p-8 container mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold mb-4">Select departure location</h2>

        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 cursor-pointer rounded-lg border ${
              selectedFilter === "cheapest" ? "bg-blue-900 text-white" : "text-black border-gray-300 hover:border-black"
            }`}
            onClick={() => setSelectedFilter("cheapest")}
          >
            Cheapest flights
          </button>
          <button
            className={`px-4 py-2 cursor-pointer rounded-lg border ${
              selectedFilter === "direct" ? "bg-blue-900 text-white" : "text-black border-gray-300 hover:border-black"
            }`}
            onClick={() => setSelectedFilter("direct")}
          >
            Direct flights
          </button>
          <button
            className={`px-4 py-2 cursor-pointer rounded-lg border ${
              selectedFilter === "all" ? "bg-blue-900 text-white" : "text-black border-gray-300 hover:border-black"
            }`}
            onClick={() => setSelectedFilter("all")}
          >
            All available locations
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {displayedFlights.map((flight, index) => (
    <div
      key={index}
      className="bg-white p-4 rounded-xl shadow-md border hover:shadow-lg cursor-pointer flex flex-col justify-between"
    >
      <h3 className="text-lg font-semibold">{flight.city}</h3>
      <div className="flex justify-between items-center">
        <p className="text-gray-500">Flights from</p>
        <p className="text-xl font-bold">₹{flight.price.toLocaleString()}</p>
      </div>
      <div className="text-sm text-gray-600 mt-2">
        <p>1+ stops</p>
      </div>
    </div>
  ))}
</div>
      </div>

      <Footer />
    </div>
  );
};

export default FlightCardList;
