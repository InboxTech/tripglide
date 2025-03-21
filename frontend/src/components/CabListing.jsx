<<<<<<< HEAD
// import React, { useState } from "react";
// import Header from "../components/Header"; // Ensure correct import 
// import { FaSearch } from "react-icons/fa";
// import { useLocation } from "react-router-dom";

// const CabListing = () => {
//     const locationState = useLocation();
//     const { pickupLocation, pickupDate, dropoffDate, pickupTime, dropoffTime } = locationState.state || {};

//     // State to control form visibility
//     const [isSearchOpen, setIsSearchOpen] = useState(false);

//     // Toggle search form visibility
//     const toggleSearch = () => {
//         setIsSearchOpen(!isSearchOpen);
//     };

//     return (
//         <div className="min-h-screen text-white">
//             {/* Header Component */}
//             <Header />

//             {/* Search Bar Section */}
//             <div className="flex bg-[#06152B] justify-center py-6">
//                 <div 
//                     className="flex items-center px-6 py-3 rounded-lg w-3/4 max-w-4xl cursor-pointer bg-opacity-80 hover:bg-opacity-100 transition"
//                     onClick={toggleSearch} // Toggle form on click
//                 >
//                     <FaSearch className="text-blue-500 mr-3" size={18} />
//                     <p className="text-white text-sm">
//                         {pickupLocation || "Enter pick-up location"} • {pickupDate || "Pick-up date"}, {pickupTime || "Time"} - {dropoffDate || "Drop-off date"}, {dropoffTime || "Time"}
//                     </p>
//                 </div>
//             </div>

//             {/* Show CarHire Search Form when clicked */}
//             {isSearchOpen && (
//                 <div className="flex justify-center mt-4">
//                     <div className="bg-[#001533] p-6 rounded-2xl shadow-lg">
//           <form className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 items-center">
            
//             {/* Pickup Location */}
//             <div className="lg:col-span-1">
//               <label className="block text-white font-semibold mb-1">
//                 Pick-up location
//               </label>
//               <input
//                 type="text"
//                 placeholder="City, airport or station"
//                 className="w-full p-3 rounded-lg bg-white text-black"
//                 value={pickupLocation}
//                 onChange={(e) => setPickupLocation(e.target.value)}
//               />
//             </div>

//             {/* Pickup Date */}
//             <div>
//               <label className="block text-white font-semibold mb-1">
//                 Pick-up date
//               </label>
//               <input type="date" 
//               className="w-full p-3 rounded-lg bg-white text-black" 
//               min={today}
//               value={pickupDate}
//               onChange={handlePickupDateChange}
//               />
//             </div>

//             {/* Pickup Time */}
//             <div>
//               <label className="block text-white font-semibold mb-1">
//                 Time
//               </label>
//               <input 
//               type="time" 
//               className="w-full p-3 rounded-lg bg-white text-black" 
//               value={pickupTime}
//                 onChange={(e) => setPickupTime(e.target.value)}
//                 min={pickupDate === today ? currentTime : "00:00"}
//                 disabled={!pickupDate}
//               />
//             </div>

//             {/* Drop-off Date */}
//             <div>
//               <label className="block text-white font-semibold mb-1">
//                 Drop-off date
//               </label>
//               <input type="date" 
//               className="w-full p-3 rounded-lg bg-white text-black" 
//               min={pickupDate || today}
//               value={dropoffDate}
//               onChange={handleDropoffDateChange}
//               disabled={!pickupDate}
//               />
//             </div>

//             {/* Drop-off Time */}
//             <div>
//               <label className="block text-white font-semibold mb-1">
//                 Time
//               </label>
//               <input type="time" 
//               className="w-full p-3 rounded-lg bg-white text-black" 
//               value={dropoffTime}
//                 onChange={(e) => setDropoffTime(e.target.value)}
//                 min={dropoffDate === pickupDate ? pickupTime : "00:00"}
//                 disabled={!dropoffDate}
//               />
//             </div>

//             {/* Options */}
//             <div className="lg:col-span-5 flex flex-wrap gap-4 items-center mt-4">
//               <label className="flex items-center text-white">
//                 <input type="checkbox" className="mr-2" defaultChecked />
//                 Driver aged between 25 – 70
//               </label>

//               <label className="flex items-center text-white">
//                 <input type="checkbox" className="mr-2" />
//                 Return car to a different location
//               </label>

//               <button
//                 onClick={handleSearch}
//                 type="submit"
//                 className={`ml-auto px-6 py-3 font-semibold rounded-lg transition ${
//                   isFormComplete
//                     ? "bg-blue-600 text-white hover:bg-blue-700"
//                     : "bg-blue-300 text-gray-200 cursor-not-allowed"
//                 }`}
//                 disabled={!isFormComplete}
//                 style={{ cursor: isFormComplete ? "pointer" : "not-allowed" }}
//               >
//                 Search
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//             )}
//         </div>
//     );
// };

// export default CabListing;



import React from "react";
import Header from "../components/Header"; // Adjusted import path to ensure Header is found
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const CabListing = () => {
    const locationState = useLocation();
    const { pickupLocation, pickupDate, dropoffDate, pickupTime, dropoffTime } = locationState.state || {};
  return (
    <div className="min-h-screen text-white">
      {/* Header Component */}
      <Header />
      
      {/* Search Bar Section */}
      <div className="flex bg-[#06152B] justify-center py-6 px-4">
  <div className="flex items-center px-6 py-3 rounded-lg w-full max-w-6xl bg-[#0C1D3D]/100 cursor-pointer">
    <FaSearch className="text-blue-500 mr-3" size={18} />
    <p className="text-white text-sm text-center flex-1">
      {pickupLocation} • {pickupDate}, {pickupTime} - {dropoffDate}, {dropoffTime}
    </p>
  </div>
</div>
=======
import React from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "./Footer";
import CabPopup from "./CabPopup";

const CabListing = () => {
  const locationState = useLocation();
  const { pickupLocation, pickupDate, dropoffDate, pickupTime, dropoffTime } = locationState.state || {};

  // State for the search popup
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const [formPickupLocation, setFormPickupLocation] = useState(pickupLocation || '');
  const [formPickupDate, setFormPickupDate] = useState(pickupDate || '');
  const [formPickupTime, setFormPickupTime] = useState(pickupTime || '');
  const [formDropoffDate, setFormDropoffDate] = useState(dropoffDate || '');
  const [formDropoffTime, setFormDropoffTime] = useState(dropoffTime || '');
  const [isDifferentLocation, setIsDifferentLocation] = useState(false);
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [isDriverAgeValid, setIsDriverAgeValid] = useState(true);

  const handleSearchSubmit = () => {
    // Update the state with the form values
    setIsSearchPopupOpen(false);
    // You might want to trigger a search for cars based on these parameters
  };

  const [cars, setCars] = useState([]); // Stores car listings

  // Dummy car data
  useEffect(() => {
    setCars([
      {
        id: 1,
        carMake: "Toyota",
        model: "Corolla",
        type: "Sedan",
        mileage: "15",
        yearOfMake: 2022,
        pricePerDay: 2500,
        carAgency: "ZoomCar",
        agencyPrice: 2200,
        fuelType: "Petrol",
        image: "/images/sedan.jpeg",
      },
      {
        id: 2,
        carMake: "Hyundai",
        model: "Creta",
        type: "SUV",
        mileage: "12",
        yearOfMake: 2023,
        pricePerDay: 3000,
        carAgency: "Drivezy",
        agencyPrice: 2800,
        fuelType: "Diesel",
        image: "/images/suv.jpeg",
      },
      {
        id: 3,
        carMake: "Hyundai",
        model: "Creta",
        type: "Hatchback",
        mileage: "18",
        yearOfMake: 2023,
        pricePerDay: 3400,
        carAgency: "Drivezy",
        agencyPrice: 2800,
        fuelType: "Diesel",
        image: "/images/hatchback.jpeg",
      },
    ]);
  }, []);

  const [filters, setFilters] = useState({
    passengers: 1,
    carType: [],
    fuelType: [],
    luggageCapacity: [],
  });

  const handleCheckboxChange = (e, category) => {
    const value = e.target.value;
    const checked = e.target.checked;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: checked
        ? [...prevFilters[category], value]
        : prevFilters[category].filter((item) => item !== value),
    }));
  };

  return (
    <div className="min-h-screen text-white bg-gray-100">

      {/* Search Bar */}
      <div className=" bg-[#06152B] py-4 px-4 z-10 shadow-lg">
        <div className="flex justify-center">
          <div className="flex items-center px-6 py-3 rounded-lg w-full max-w-6xl bg-[#0C1D3D] cursor-pointer"
          onClick={() => setIsSearchPopupOpen(true)}
          >
            <FaSearch className="text-blue-500 mr-3" size={18} />
            <p className="text-white text-sm text-center flex-1">
              {pickupLocation || "Enter Pickup Location"} • {pickupDate || "DD/MM/YYYY"}, {pickupTime || "HH:MM"} - {dropoffDate || "DD/MM/YYYY"}, {dropoffTime || "HH:MM"}
            </p>
          </div>
        </div>
      </div>

      {/* Search Form Popup */}
      <CabPopup
        isOpen={isSearchPopupOpen}
        onClose={() => setIsSearchPopupOpen(false)}
        pickupLocation={formPickupLocation}
        setPickupLocation={setFormPickupLocation}
        pickupDate={formPickupDate}
        setPickupDate={setFormPickupDate}
        pickupTime={formPickupTime}
        setPickupTime={setFormPickupTime}
        dropoffDate={formDropoffDate}
        setDropoffDate={setFormDropoffDate}
        dropoffTime={formDropoffTime}
        setDropoffTime={setFormDropoffTime}
        isDifferentLocation={isDifferentLocation}
        setIsDifferentLocation={setIsDifferentLocation}
        dropoffLocation={dropoffLocation}
        setDropoffLocation={setDropoffLocation}
        isDriverAgeValid={isDriverAgeValid}
        setIsDriverAgeValid={setIsDriverAgeValid}
        handleSearch={handleSearchSubmit}
      />

      {/* Page Content */}
      <div className=" flex">

        {/* Sidebar for Filters */}
        <div className="w-1/4 p-4 bg-[#06152B] shadow-md">
          <h2 className="text-xl font-semibold mb-4">Select Filters</h2>

          {/* Number of Passengers */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Number of Passengers:</label>
            <input
              type="number"
              min="1"
              value={filters.passengers}
              onChange={(e) => setFilters({ ...filters, passengers: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Car Type */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Car Type:</label>
            {["SUV", "Sedan", "Luxury", "Hatchback"].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={type}
                  onChange={(e) => handleCheckboxChange(e, "carType")}
                  checked={filters.carType.includes(type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>

          {/* Fuel Type */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Fuel Type:</label>
            {["Petrol", "Diesel", "CNG", "Electric"].map((fuel) => (
              <label key={fuel} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={fuel}
                  onChange={(e) => handleCheckboxChange(e, "fuelType")}
                  checked={filters.fuelType.includes(fuel)}
                />
                <span>{fuel}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Car Listings */}
        <main className="w-3/4 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-black">Available Cabs</h2>
            <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
              <FaFilter /> Filter
            </button>
          </div>

          {/* Car Cards */}
          {cars.length > 0 ? (
            cars.map((car) => (
              <div key={car.id} className="bg-white p-4 shadow-lg rounded-lg mb-4 flex">
                <img src={car.image} alt={car.model} className="w-32 h-24 object-cover rounded-lg mr-4" />
                <div>
                  <h3 className="text-lg font-semibold">
                    {car.carMake} {car.model} ({car.yearOfMake})
                  </h3>
                  <p className="text-sm text-gray-500">
                    {car.type} • {car.fuelType} • {car.mileage} km/l
                  </p>
                  <p className="text-sm text-gray-700">Agency: {car.carAgency}</p>
                  <p className="text-green-600 font-semibold mt-1">
                    ₹ {car.pricePerDay}/day{" "}
                    <span className="text-gray-500 text-sm">(Agency Price: ₹{car.agencyPrice})</span>
                  </p>
                  <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg">Book Now</button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No cars available.</p>
          )}
        </main>
      </div>

       {/* Footer */}
             <Footer />
>>>>>>> 35fe6736fdae29ee2cfcc03ea7b5ff4a7e41e7b4
    </div>
  );
};

<<<<<<< HEAD
export default CabListing;
=======
export default CabListing;
>>>>>>> 35fe6736fdae29ee2cfcc03ea7b5ff4a7e41e7b4
