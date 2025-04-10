// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   FaSearch,
// //   FaFilter,
// //   FaHeart,
// //   FaUserFriends,
// //   FaSuitcase,
// //   FaSnowflake,
// //   FaCogs,
// //   FaStar,
// //   FaMapMarkerAlt,
// //   FaChevronDown,
// //   FaChevronUp,
// //   FaTimes,
// // } from "react-icons/fa";
// // import { useLocation } from "react-router-dom";
// // import Footer from "./Footer";
// // import CabPopup from "./CabPopup";

// // const CabListing = () => {
// //   const locationState = useLocation();
// //   const { pickupLocation, pickupDate, dropoffDate, pickupTime, dropoffTime } =
// //     locationState.state || {};
// //   const navigate = useNavigate();

// //   // State for the search popup
// //   const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
// //   const [formPickupLocation, setFormPickupLocation] = useState(
// //     pickupLocation || ""
// //   );
// //   const [formPickupDate, setFormPickupDate] = useState(pickupDate || "");
// //   const [formPickupTime, setFormPickupTime] = useState(pickupTime || "");
// //   const [formDropoffDate, setFormDropoffDate] = useState(dropoffDate || "");
// //   const [formDropoffTime, setFormDropoffTime] = useState(dropoffTime || "");
// //   const [isDifferentLocation, setIsDifferentLocation] = useState(false);
// //   const [dropoffLocation, setDropoffLocation] = useState("");
// //   const [isDriverAgeValid, setIsDriverAgeValid] = useState(true);

// //   const handleSearchSubmit = () => {
// //     setIsSearchPopupOpen(false);
// //   };

// //   const [cars, setCars] = useState([]);
// //   const [filteredCars, setFilteredCars] = useState([]);
// //   const [isFilterOpen, setIsFilterOpen] = useState(false);
// //   const [expandedCarId, setExpandedCarId] = useState(null);

// //   const [filters, setFilters] = useState({
// //     passengers: 1,
// //     carType: [],
// //     fuelPolicy: [],
// //     transmission: "all",
// //     carAgency: [],
// //   });

// //   // Function to clear all filters
// //   const clearFilters = () => {
// //     setFilters({
// //       passengers: 1,
// //       carType: [],
// //       fuelPolicy: [],
// //       transmission: "all",
// //       carAgency: [],
// //     });
// //     setFilteredCars(cars); // Reset filtered cars to the full list
// //   };

// //   // Filter logic
// //   useEffect(() => {
// //     let results = [...cars];

// //     // Filter by number of passengers
// //     if (filters.passengers) {
// //       const passengerCount = parseInt(filters.passengers);
// //       if (!isNaN(passengerCount)) {
// //         results = results.filter((car) => car.passengers >= passengerCount);
// //       }
// //     }

// //     // Filter by car type
// //     if (filters.carType.length > 0) {
// //       results = results.filter((car) => filters.carType.includes(car.type));
// //     }

// //     // Filter by fuel type
// //     if (filters.fuelPolicy.length > 0) {
// //       results = results.filter((car) =>
// //         filters.fuelPolicy.includes(car.fuelPolicy)
// //       );
// //     }

// //     // Filter by transmission
// //     if (filters.transmission !== "all") {
// //       results = results.filter(
// //         (car) => car.transmission === filters.transmission
// //       );
// //     }

// //     // Filter by car agency
// //     if (filters.carAgency.length > 0) {
// //       results = results.filter((car) =>
// //         filters.carAgency.includes(car.carAgency)
// //       );
// //     }

// //     setFilteredCars(results);
// //   }, [filters, cars]);

// //   const handleCheckboxChange = (e, category) => {
// //     const value = e.target.value;
// //     const checked = e.target.checked;

// //     setFilters((prevFilters) => ({
// //       ...prevFilters,
// //       [category]: checked
// //         ? [...prevFilters[category], value]
// //         : prevFilters[category].filter((item) => item !== value),
// //     }));
// //   };

// //   const carAgencies = [...new Set(cars.map((car) => car.carAgency))];

// //   const toggleFavorite = (carId) => {
// //     setCars((prevCars) =>
// //       prevCars.map((car) =>
// //         car.id === carId ? { ...car, isFavorite: !car.isFavorite } : car
// //       )
// //     );
// //   };

// //   const toggleDeals = (carId) => {
// //     setExpandedCarId(expandedCarId === carId ? null : carId);
// //   };

// //   // Calculate the number of active filters for display
// //   const activeFilterCount = [
// //     filters.carType.length,
// //     filters.fuelPolicy.length,
// //     filters.carAgency.length,
// //     filters.transmission !== "all" ? 1 : 0,
// //     filters.passengers > 1 ? 1 : 0,
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Search Bar */}
// //       <div className="bg-[#001533] py-4 px-4 z-10 shadow-lg">
// //         <div className="flex justify-center">
// //           <div
// //             className="flex items-center px-4 py-2 rounded-full w-full max-w-6xl bg-white/10 backdrop-blur-md cursor-pointer border border-white/20 sm:px-6 sm:py-3"
// //             onClick={() => setIsSearchPopupOpen(true)}
// //           >
// //             <FaSearch className="text-white mr-2 sm:mr-3" size={16} />
// //             <p className="text-white text-xs sm:text-sm text-center flex-1 truncate">
// //               {formPickupLocation || "Enter Pickup Location"} •{" "}
// //               {formPickupDate || "DD/MM/YYYY"}, {formPickupTime || "HH:MM"} -{" "}
// //               {formDropoffDate || "DD/MM/YYYY"}, {formDropoffTime || "HH:MM"}
// //             </p>
// //           </div>
// //         </div>
// //       </div>

// //       <CabPopup
// //         isOpen={isSearchPopupOpen}
// //         onClose={() => setIsSearchPopupOpen(false)}
// //         pickupLocation={formPickupLocation}
// //         setPickupLocation={setFormPickupLocation}
// //         pickupDate={formPickupDate}
// //         setPickupDate={setFormPickupDate}
// //         pickupTime={formPickupTime}
// //         setPickupTime={setFormPickupTime}
// //         dropoffDate={formDropoffDate}
// //         setDropoffDate={setFormDropoffDate}
// //         dropoffTime={formDropoffTime}
// //         setDropoffTime={setFormDropoffTime}
// //         isDifferentLocation={isDifferentLocation}
// //         setIsDifferentLocation={setIsDifferentLocation}
// //         dropoffLocation={dropoffLocation}
// //         setDropoffLocation={setDropoffLocation}
// //         isDriverAgeValid={isDriverAgeValid}
// //         setIsDriverAgeValid={setIsDriverAgeValid}
// //         handleSearch={handleSearchSubmit}
// //       />

// //       {/* Page Content */}
// //       <div className="container mx-auto max-w-7xl px-4 py-6 sm:py-8">

// //         {/* Available Cabs Heading and Mobile Filter Toggle */}
// //         <div className="flex justify-between items-center mb-4 sm:mb-6">
// //           <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
// //             Available Cabs ({filteredCars.length})
// //           </h2>
// //           <button
// //             className="flex items-center md:hidden bg-blue-600 text-white px-3 py-2 rounded-lg relative text-sm sm:text-base"
// //             onClick={() => setIsFilterOpen(!isFilterOpen)}
// //           >
// //             <FaFilter className="mr-1 sm:mr-2" /> Filters
// //             {activeFilterCount > 0 && (
// //               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center">
// //                 {activeFilterCount}
// //               </span>
// //             )}
// //           </button>
// //         </div>

// //         {/* Filters and Car Listings */}
// //         <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
// //           {/* Sidebar for Filters */}
// //           <div
// //             className={`${
// //               isFilterOpen ? "block" : "hidden"
// //             } md:block bg-white rounded-xl shadow-md p-4 sm:p-6 md:w-1/4 md:sticky md:top-20 h-auto md:h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200`}
// //           >
// //             <div className="flex justify-between items-center mb-4">
// //               <h3 className="text-base sm:text-lg font-bold text-gray-800">
// //                 Filters
// //               </h3>
// //               {activeFilterCount > 0 && (
// //                 <button
// //                   onClick={clearFilters}
// //                   className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
// //                 >
// //                   <FaTimes className="mr-1" /> Clear All
// //                 </button>
// //               )}
// //             </div>

// //             {/* Number of Passengers */}
// //             <div className="mb-4 sm:mb-6">
// //               <h4 className="font-semibold mb-2 text-gray-800 text-sm sm:text-base">
// //                 Number of Passengers
// //               </h4>
// //               <div className="flex gap-4">
// //                 <label className="flex items-center space-x-2">
// //                   <input
// //                     type="checkbox"
// //                     checked={filters.passengers === "4-5"}
// //                     onChange={() =>
// //                       setFilters({ ...filters, passengers: "4-5" })
// //                     }
// //                     className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
// //                   />
// //                   <span className="text-gray-800 text-sm sm:text-base">
// //                     4-5
// //                   </span>
// //                 </label>

// //                 <label className="flex items-center space-x-2">
// //                   <input
// //                     type="checkbox"
// //                     checked={filters.passengers === "6+"}
// //                     onChange={() =>
// //                       setFilters({ ...filters, passengers: "6+" })
// //                     }
// //                     className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
// //                   />
// //                   <span className="text-gray-800 text-sm sm:text-base">6+</span>
// //                 </label>
// //               </div>
// //             </div>

// //             {/* Car Type */}
// //             <div className="mb-4 sm:mb-6">
// //               <h4 className="font-semibold mb-2 text-gray-800 text-sm sm:text-base">
// //                 Car Type
// //               </h4>
// //               <div className="space-y-2">
// //                 {["SUV", "Sedan", "Luxury", "Hatchback"].map((type) => (
// //                   <label
// //                     key={type}
// //                     className="flex items-center cursor-pointer text-gray-800"
// //                   >
// //                     <input
// //                       type="checkbox"
// //                       value={type}
// //                       onChange={(e) => handleCheckboxChange(e, "carType")}
// //                       checked={filters.carType.includes(type)}
// //                       className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
// //                     />
// //                     <span className="text-sm sm:text-base">{type}</span>
// //                   </label>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Fuel Policy */}
// //             <div className="mb-4 sm:mb-6">
// //               <h4 className="font-semibold mb-2 text-gray-800 text-sm sm:text-base">
// //                 Fuel Type
// //               </h4>
// //               <div className="space-y-2">
// //                 {["Full to Full", "Same to Same", "Full to Empty"].map(
// //                   (fuel) => (
// //                     <label
// //                       key={fuel}
// //                       className="flex items-center cursor-pointer text-gray-800"
// //                     >
// //                       <input
// //                         type="checkbox"
// //                         value={fuel}
// //                         onChange={(e) => handleCheckboxChange(e, "fuelPolicy")}
// //                         checked={filters.fuelPolicy.includes(fuel)}
// //                         className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
// //                       />
// //                       <span className="text-sm sm:text-base">{fuel}</span>
// //                     </label>
// //                   )
// //                 )}
// //               </div>
// //             </div>

// //             {/* Transmission Type */}
// //             <div className="mb-4 sm:mb-6">
// //               <h4 className="font-semibold mb-2 text-gray-800 text-sm sm:text-base">
// //                 Transmission Type
// //               </h4>
// //               <div className="space-y-2">
// //                 <label className="flex items-center cursor-pointer text-gray-800">
// //                   <input
// //                     type="radio"
// //                     name="transmission"
// //                     value="all"
// //                     checked={filters.transmission === "all"}
// //                     onChange={() =>
// //                       setFilters({ ...filters, transmission: "all" })
// //                     }
// //                     className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
// //                   />
// //                   <span className="text-sm sm:text-base">All</span>
// //                 </label>
// //                 <label className="flex items-center cursor-pointer text-gray-800">
// //                   <input
// //                     type="radio"
// //                     name="transmission"
// //                     value="Automatic"
// //                     checked={filters.transmission === "Automatic"}
// //                     onChange={() =>
// //                       setFilters({ ...filters, transmission: "Automatic" })
// //                     }
// //                     className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
// //                   />
// //                   <span className="text-sm sm:text-base">Automatic</span>
// //                 </label>
// //                 <label className="flex items-center cursor-pointer text-gray-800">
// //                   <input
// //                     type="radio"
// //                     name="transmission"
// //                     value="Manual"
// //                     checked={filters.transmission === "Manual"}
// //                     onChange={() =>
// //                       setFilters({ ...filters, transmission: "Manual" })
// //                     }
// //                     className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
// //                   />
// //                   <span className="text-sm sm:text-base">Manual</span>
// //                 </label>
// //               </div>
// //             </div>

// //             {/* Car Agency */}
// //             <div className="mb-4 sm:mb-6">
// //               <h4 className="font-semibold mb-2 text-gray-800 text-sm sm:text-base">
// //                 Car Agency
// //               </h4>
// //               <div className="space-y-2">
// //                 {carAgencies.map((agency) => (
// //                   <label
// //                     key={agency}
// //                     className="flex items-center cursor-pointer text-gray-800"
// //                   >
// //                     <input
// //                       type="checkbox"
// //                       value={agency}
// //                       onChange={(e) => handleCheckboxChange(e, "carAgency")}
// //                       checked={filters.carAgency.includes(agency)}
// //                       className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
// //                     />
// //                     <span className="text-sm sm:text-base">{agency}</span>
// //                   </label>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Car Listings */}
// //           <main className="w-full md:w-3/4">
// //             {filteredCars.length > 0 ? (
// //               filteredCars.map((car) => (
// //                 <div
// //                   key={car.id}
// //                   className="bg-white p-4 sm:p-6 rounded-2xl mb-4 sm:mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
// //                 >
// //                   {/* Car Header */}
// //                   <div className="flex items-center justify-between mb-3 sm:mb-4">
// //                     <div className="flex items-center space-x-2 sm:space-x-3">
// //                       <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
// //                         {car.carMake} {car.model}
// //                       </h3>
// //                       <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
// //                         {car.type}
// //                       </span>
// //                     </div>
// //                     <button
// //                       onClick={() => toggleFavorite(car.id)}
// //                       className="text-gray-400 hover:text-red-500 transition-colors"
// //                     >
// //                       <FaHeart
// //                         className={car.isFavorite ? "text-red-500" : ""}
// //                         size={20}
// //                       />
// //                     </button>
// //                   </div>

// //                   {/* Car Image and Details */}
// //                   <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">
// //                     <div className="sm:w-1/3">
// //                       <img
// //                         src={car.image}
// //                         alt={`${car.carMake} ${car.model}`}
// //                         className="w-full h-32 sm:h-40 object-contain rounded-lg bg-gray-50 p-2"
// //                       />
// //                     </div>
// //                     <div className="sm:w-2/3 flex flex-col justify-between">
// //                       <div className="grid grid-cols-2 gap-2 sm:gap-4">
// //                         <div className="flex items-center space-x-2 text-gray-600">
// //                           <FaUserFriends size={14} />
// //                           <span className="text-xs sm:text-sm">
// //                             {car.passengers} Passengers
// //                           </span>
// //                         </div>
// //                         <div className="flex items-center space-x-2 text-gray-600">
// //                           <FaSuitcase size={14} />
// //                           <span className="text-xs sm:text-sm">
// //                             {car.luggage} Luggage
// //                           </span>
// //                         </div>
// //                         <div className="flex items-center space-x-2 text-gray-600">
// //                           <FaSnowflake size={14} />
// //                           <span className="text-xs sm:text-sm">
// //                             Air Conditioning
// //                           </span>
// //                         </div>
// //                         <div className="flex items-center space-x-2 text-gray-600">
// //                           <FaCogs size={14} />
// //                           <span className="text-xs sm:text-sm">
// //                             {car.transmission}
// //                           </span>
// //                         </div>
// //                         <div className="flex items-center space-x-2 text-gray-600">
// //                           <FaMapMarkerAlt size={14} />
// //                           <span className="text-xs sm:text-sm">
// //                             {car.mileage}
// //                           </span>
// //                         </div>
// //                         <div className="flex items-center space-x-2 text-gray-600">
// //                           <FaStar size={14} className="text-yellow-400" />
// //                           <span className="text-xs sm:text-sm">
// //                             {car.rating}/10 ({car.reviews.toLocaleString()}{" "}
// //                             reviews)
// //                           </span>
// //                         </div>
// //                       </div>
// //                       <div className="mt-3 sm:mt-4 flex items-center justify-between">
// //                         <span className="text-lg sm:text-2xl font-bold text-gray-800">
// //                           ₹{car.pricePerDay.toLocaleString()}
// //                           <span className="text-xs sm:text-sm font-normal text-gray-500">
// //                             /day
// //                           </span>
// //                         </span>
// //                         <button
// //                           onClick={() => toggleDeals(car.id)}
// //                           className="flex items-center text-blue-600 font-semibold hover:text-blue-800 cursor-pointer transition-colors text-sm sm:text-base"
// //                         >
// //                           {expandedCarId === car.id ? (
// //                             <>
// //                               Hide Deals{" "}
// //                               <FaChevronUp className="ml-1 sm:ml-2 cursor-pointer" />
// //                             </>
// //                           ) : (
// //                             <>
// //                               View Deals{" "}
// //                               <FaChevronDown className="ml-1 sm:ml-2 cursor-pointer" />
// //                             </>
// //                           )}
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Expanded Deal Section */}
// //                   {expandedCarId === car.id && (
// //                     <div className="border-t pt-3 sm:pt-4">
// //                       <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
// //                         Compare Deals
// //                       </h4>
// //                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
// //                         {car.deals && car.deals.length > 0 ? (
// //                           car.deals.map((deal, index) => (
// //                             <div
// //                               key={index}
// //                               className="bg-gray-50 p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 hover:border-blue-300 transition-colors flex flex-col"
// //                             >
// //                               <div className="mb-2 sm:mb-3">
// //                                 <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
// //                                   <span className="text-sm sm:text-lg font-medium text-gray-800 truncate">
// //                                     {deal.agency}
// //                                   </span>
// //                                   <div className="flex items-center space-x-1">
// //                                     <span className="text-yellow-400 flex">
// //                                       {[
// //                                         ...Array(Math.round(deal.rating / 2)),
// //                                       ].map((_, i) => (
// //                                         <FaStar
// //                                           key={i}
// //                                           size={12}
// //                                           className="sm:w-4 sm:h-4"
// //                                         />
// //                                       ))}
// //                                     </span>
// //                                     <span className="text-xs sm:text-sm text-gray-600">
// //                                       {deal.rating}/10
// //                                     </span>
// //                                   </div>
// //                                 </div>
// //                                 <div className="text-xs sm:text-sm text-gray-700 space-y-1 sm:space-y-2">
// //                                   <ul className="space-y-1">
// //                                     {deal.features.map((feature, idx) => (
// //                                       <li
// //                                         key={idx}
// //                                         className="flex items-start space-x-2"
// //                                       >
// //                                         <FaMapMarkerAlt
// //                                           size={12}
// //                                           className="text-blue-500 flex-shrink-0 mt-0.5"
// //                                         />
// //                                         <span className="break-words">
// //                                           {feature}
// //                                         </span>
// //                                       </li>
// //                                     ))}
// //                                     {deal.freeCancellation && (
// //                                       <li className="flex items-start space-x-2 text-green-600">
// //                                         <FaMapMarkerAlt
// //                                           size={12}
// //                                           className="flex-shrink-0 mt-0.5"
// //                                         />
// //                                         <span className="break-words">
// //                                           Free Cancellation
// //                                         </span>
// //                                       </li>
// //                                     )}
// //                                   </ul>
// //                                   <p className="text-gray-500 text-xs mt-1 sm:mt-2">
// //                                     {deal.reviews.toLocaleString()} reviews
// //                                   </p>
// //                                   <div className="text-base sm:text-xl font-bold text-gray-800">
// //                                     ₹{deal.price.toLocaleString()}
// //                                     <span className="text-xs sm:text-sm font-normal text-gray-500">
// //                                       /day
// //                                     </span>
// //                                   </div>
// //                                 </div>
// //                               </div>
// //                               <button
// //                                 onClick={() =>
// //                                   navigate("/car-confirmation", {
// //                                     state: {
// //                                       pickupLocation,
// //                                       pickupDate,
// //                                       pickupTime,
// //                                       dropoffDate,
// //                                       dropoffTime,
// //                                       carId: car.id,
// //                                       selectedDeal: deal,
// //                                     },
// //                                   })
// //                                 }
// //                                 className="w-full bg-blue-600 text-white px-3 py-1.5 cursor-pointer sm:px-4 sm:py-2 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base mt-auto"
// //                               >
// //                                 Book Now
// //                               </button>
// //                             </div>
// //                           ))
// //                         ) : (
// //                           <p className="text-gray-600 col-span-3 text-sm sm:text-base">
// //                             No deals available for this car.
// //                           </p>
// //                         )}
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>
// //               ))
// //             ) : (
// //               <div className="bg-white rounded-xl p-6 sm:p-8 text-center shadow-md">
// //                 <p className="text-base sm:text-lg text-gray-800">
// //                   No cars found matching your criteria.
// //                 </p>
// //                 <p className="text-gray-600 mt-2 text-sm sm:text-base">
// //                   Try adjusting your filters or clear them to see all available
// //                   cars.
// //                 </p>
// //                 <button
// //                   onClick={clearFilters}
// //                   className="mt-4 text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base"
// //                 >
// //                   Clear Filters
// //                 </button>
// //               </div>
// //             )}
// //           </main>
// //         </div>
// //       </div>

// //       <Footer />
// //     </div>
// //   );
// // };

// // export default CabListing;








// // import React, { useState, useEffect } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import {
// //   FaSearch,
// //   FaFilter,
// //   FaHeart,
// //   FaUserFriends,
// //   FaSuitcase,
// //   FaSnowflake,
// //   FaCogs,
// //   FaStar,
// //   FaMapMarkerAlt,
// //   FaChevronDown,
// //   FaChevronUp,
// //   FaTimes,
// // } from "react-icons/fa";
// // import Footer from "./Footer";
// // import CabPopup from "./CabPopup";
// // import CarCard from "./CarCard";

// // const CabListing = () => {
// //   const locationState = useLocation();
// //   const { pickupLocation, pickupDate, dropoffDate, pickupTime, dropoffTime } = locationState.state || {};
// //   const navigate = useNavigate();

// //   // Popup state
// //   const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
// //   const [formPickupLocation, setFormPickupLocation] = useState(pickupLocation || "");
// //   const [formPickupDate, setFormPickupDate] = useState(pickupDate || "");
// //   const [formPickupTime, setFormPickupTime] = useState(pickupTime || "");
// //   const [formDropoffDate, setFormDropoffDate] = useState(dropoffDate || "");
// //   const [formDropoffTime, setFormDropoffTime] = useState(dropoffTime || "");
// //   const [isDifferentLocation, setIsDifferentLocation] = useState(false);
// //   const [dropoffLocation, setDropoffLocation] = useState("");
// //   const [isDriverAgeValid, setIsDriverAgeValid] = useState(true);

// //   const handleSearchSubmit = () => setIsSearchPopupOpen(false);

// //   // Car and filter state
// //   const [cars, setCars] = useState([]);
// //   const [expandedCarId, setExpandedCarId] = useState(null);
// //   const [isFilterOpen, setIsFilterOpen] = useState(false);

// //   const [filters, setFilters] = useState({
// //     passengers: 1,
// //     carType: [],
// //     fuelPolicy: [],
// //     transmission: "all",
// //     carAgency: [],
// //   });

// //   const clearFilters = () => {
// //     setFilters({
// //       passengers: 1,
// //       carType: [],
// //       fuelPolicy: [],
// //       transmission: "all",
// //       carAgency: [],
// //     });
// //   };

// //   // Filter logic for car cards and deals
// //   const getFilteredDeals = (car) => {
// //     let filteredDeals = [...car.deals];

// //     // Filter deals by fuel policy
// //     if (filters.fuelPolicy.length > 0) {
// //       filteredDeals = filteredDeals.filter(deal => filters.fuelPolicy.includes(deal.fuelPolicy));
// //     }

// //     // Filter deals by car agency
// //     if (filters.carAgency.length > 0) {
// //       filteredDeals = filteredDeals.filter(deal => filters.carAgency.includes(deal.agency));
// //     }

// //     return filteredDeals;
// //   };

// //   const filteredCars = cars.filter(car => {
// //     let matches = true;

// //     // Filter by passengers
// //     if (filters.passengers) {
// //       const passengerCount = parseInt(filters.passengers);
// //       if (!isNaN(passengerCount)) {
// //         matches = matches && car.passengers >= passengerCount;
// //       }
// //     }

// //     // Filter by car type
// //     if (filters.carType.length > 0) {
// //       matches = matches && filters.carType.includes(car.type);
// //     }

// //     // Filter by transmission
// //     if (filters.transmission !== "all") {
// //       matches = matches && car.transmission === filters.transmission;
// //     }

// //     // Ensure the car has at least one deal after filtering
// //     const filteredDeals = getFilteredDeals(car);
// //     matches = matches && filteredDeals.length > 0;

// //     return matches;
// //   });

// //   const handleCheckboxChange = (e, category) => {
// //     const value = e.target.value;
// //     const checked = e.target.checked;
// //     setFilters(prev => ({
// //       ...prev,
// //       [category]: checked ? [...prev[category], value] : prev[category].filter(item => item !== value),
// //     }));
// //   };

// //   const carAgencies = [...new Set(cars.flatMap(car => car.deals.map(deal => deal.agency)))];

// //   const toggleFavorite = (carId) => {
// //     setCars(prev => prev.map(car => car.id === carId ? { ...car, isFavorite: !car.isFavorite } : car));
// //   };

// //   const toggleDeals = (carId) => {
// //     setExpandedCarId(expandedCarId === carId ? null : carId);
// //   };

// //   const activeFilterCount = [
// //     filters.carType.length,
// //     filters.fuelPolicy.length,
// //     filters.carAgency.length,
// //     filters.transmission !== "all" ? 1 : 0,
// //     filters.passengers > 1 ? 1 : 0,
// //   ].reduce((a, b) => a + b, 0);

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Search Bar */}
// //       <div className="bg-[#001533] py-4 px-4 z-10 shadow-lg">
// //         <div className="flex justify-center">
// //           <div
// //             className="flex items-center px-4 py-2 rounded-full w-full max-w-6xl bg-white/10 backdrop-blur-md cursor-pointer border border-white/20 sm:px-6 sm:py-3"
// //             onClick={() => setIsSearchPopupOpen(true)}
// //           >
// //             <FaSearch className="text-white mr-2 sm:mr-3" size={16} />
// //             <p className="text-white text-xs sm:text-sm text-center flex-1 truncate">
// //               {formPickupLocation || "Enter Pickup Location"} •{" "}
// //               {formPickupDate || "DD/MM/YYYY"}, {formPickupTime || "HH:MM"} -{" "}
// //               {formDropoffDate || "DD/MM/YYYY"}, {formDropoffTime || "HH:MM"}
// //             </p>
// //           </div>
// //         </div>
// //       </div>

// //       <CabPopup
// //         isOpen={isSearchPopupOpen}
// //         onClose={() => setIsSearchPopupOpen(false)}
// //         pickupLocation={formPickupLocation}
// //         setPickupLocation={setFormPickupLocation}
// //         pickupDate={formPickupDate}
// //         setPickupDate={setFormPickupDate}
// //         pickupTime={formPickupTime}
// //         setPickupTime={setFormPickupTime}
// //         dropoffDate={formDropoffDate}
// //         setDropoffDate={setFormDropoffDate}
// //         dropoffTime={formDropoffTime}
// //         setDropoffTime={setFormDropoffTime}
// //         isDifferentLocation={isDifferentLocation}
// //         setIsDifferentLocation={setIsDifferentLocation}
// //         dropoffLocation={dropoffLocation}
// //         setDropoffLocation={setDropoffLocation}
// //         isDriverAgeValid={isDriverAgeValid}
// //         setIsDriverAgeValid={setIsDriverAgeValid}
// //         handleSearch={handleSearchSubmit}
// //       />

// //       {/* Page Content */}
// //       <div className="container mx-auto max-w-7xl px-4 py-6 sm:py-8">
// //         <div className="flex justify-between items-center mb-4 sm:mb-6">
// //           <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
// //             Available Cabs ({filteredCars.length})
// //           </h2>
// //           <button
// //             className="flex items-center md:hidden bg-blue-600 text-white px-3 py-2 rounded-lg relative text-sm sm:text-base"
// //             onClick={() => setIsFilterOpen(!isFilterOpen)}
// //           >
// //             <FaFilter className="mr-1 sm:mr-2" /> Filters
// //             {activeFilterCount > 0 && (
// //               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center">
// //                 {activeFilterCount}
// //               </span>
// //             )}
// //           </button>
// //         </div>

// //         <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
// //           <div
// //             className={`${isFilterOpen ? "block" : "hidden"} md:block bg-white rounded-xl shadow-md p-4 sm:p-6 md:w-1/4 md:sticky md:top-20 h-auto md:h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200`}
// //           >
// //             <div className="flex justify-between items-center mb-4">
// //               <h3 className="text-base sm:text-lg font-bold text-gray-800">Filters</h3>
// //               {activeFilterCount > 0 && (
// //                 <button onClick={clearFilters} className="flex items-center text-blue-600 hover:text-blue-800 text-sm">
// //                   <FaTimes className="mr-1" /> Clear All
// //                 </button>
// //               )}
// //             </div>

// //             {/* Filters (unchanged except for context) */}
// //             <div className="mb-4 sm:mb-6">
// //               <h4 className="font-semibold mb-2 text-gray-800 text-sm sm:text-base">Number of Passengers</h4>
// //               <div className="flex gap-4">
// //                 <label className="flex items-center space-x-2">
// //                   <input type="checkbox" checked={filters.passengers === "4-5"} onChange={() => setFilters({ ...filters, passengers: "4-5" })} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
// //                   <span className="text-gray-800 text-sm sm:text-base">4-5</span>
// //                 </label>
// //                 <label className="flex items-center space-x-2">
// //                   <input type="checkbox" checked={filters.passengers === "6+"} onChange={() => setFilters({ ...filters, passengers: "6+" })} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
// //                   <span className="text-gray-800 text-sm sm:text-base">6+</span>
// //                 </label>
// //               </div>
// //             </div>

// //             <div className="mb-4 sm:mb-6">
// //               <h4 className="font-semibold mb-2 text-gray-800 text-sm sm:text-base">Car Type</h4>
// //               <div className="space-y-2">
// //                 {["SUV", "Sedan", "Luxury", "Hatchback"].map(type => (
// //                   <label key={type} className="flex items-center cursor-pointer text-gray-800">
// //                     <input type="checkbox" value={type} onChange={(e) => handleCheckboxChange(e, "carType")} checked={filters.carType.includes(type)} className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
// //                     <span className="text-sm sm:text-base">{type}</span>
// //                   </label>
// //                 ))}
// //               </div>
// //             </div>

// //             <div className="mb-4 sm:mb-6">
// //               <h4 className="font-semibold mb-2 text-gray-800 text-sm sm:text-base">Fuel Policy</h4>
// //               <div className="space-y-2">
// //                 {["Full to Full", "Same to Same", "Full to Empty"].map(fuel => (
// //                   <label key={fuel} className="flex items-center cursor-pointer text-gray-800">
// //                     <input type="checkbox" value={fuel} onChange={(e) => handleCheckboxChange(e, "fuelPolicy")} checked={filters.fuelPolicy.includes(fuel)} className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
// //                     <span className="text-sm sm:text-base">{fuel}</span>
// //                   </label>
// //                 ))}
// //               </div>
// //             </div>

// //             <div className="mb-4 sm:mb-6">
// //               <h4 className="font-semibold mb-2 text-gray-800 text-sm sm:text-base">Transmission Type</h4>
// //               <div className="space-y-2">
// //                 <label className="flex items-center cursor-pointer text-gray-800">
// //                   <input type="radio" name="transmission" value="all" checked={filters.transmission === "all"} onChange={() => setFilters({ ...filters, transmission: "all" })} className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
// //                   <span className="text-sm sm:text-base">All</span>
// //                 </label>
// //                 <label className="flex items-center cursor-pointer text-gray-800">
// //                   <input type="radio" name="transmission" value="Automatic" checked={filters.transmission === "Automatic"} onChange={() => setFilters({ ...filters, transmission: "Automatic" })} className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
// //                   <span className="text-sm sm:text-base">Automatic</span>
// //                 </label>
// //                 <label className="flex items-center cursor-pointer text-gray-800">
// //                   <input type="radio" name="transmission" value="Manual" checked={filters.transmission === "Manual"} onChange={() => setFilters({ ...filters, transmission: "Manual" })} className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
// //                   <span className="text-sm sm:text-base">Manual</span>
// //                 </label>
// //               </div>
// //             </div>
// //           </div>
         
// //          {/* Car Cards */}
// //          <main className="w-full md:w-3/4">
// //             <CarCard />
// //           </main>
         
// //         </div>
// //       </div>
// //       <Footer />
// //     </div>
// //   );
// // };

// // export default CabListing;



//  {/* Car Listings */}
//           {/* <main className="w-full md:w-3/4">
//             {filteredCars.length > 0 ? (
//               filteredCars.map(car => {
//                 const visibleDeals = getFilteredDeals(car);
//                 return (
//                   <div
//                     key={car.id}
//                     className="bg-white p-4 sm:p-6 rounded-2xl mb-4 sm:mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
//                   >
//                     <div className="flex items-center justify-between mb-3 sm:mb-4">
//                       <div className="flex items-center space-x-2 sm:space-x-3">
//                         <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
//                           {car.carMake} {car.model}
//                         </h3>
//                         <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
//                           {car.type}
//                         </span>
//                       </div>
//                       <button onClick={() => toggleFavorite(car.id)} className="text-gray-400 hover:text-red-500 transition-colors">
//                         <FaHeart className={car.isFavorite ? "text-red-500" : ""} size={20} />
//                       </button>
//                     </div>

//                     <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">
//                       <div className="sm:w-1/3">
//                         <img src={car.image} alt={`${car.carMake} ${car.model}`} className="w-full h-32 sm:h-40 object-contain rounded-lg bg-gray-50 p-2" />
//                       </div>
//                       <div className="sm:w-2/3 flex flex-col justify-between">
//                         <div className="grid grid-cols-2 gap-2 sm:gap-4">
//                           <div className="flex items-center space-x-2 text-gray-600">
//                             <FaUserFriends size={14} />
//                             <span className="text-xs sm:text-sm">{car.passengers} Passengers</span>
//                           </div>
//                           <div className="flex items-center space-x-2 text-gray-600">
//                             <FaSuitcase size={14} />
//                             <span className="text-xs sm:text-sm">{car.luggage} Luggage</span>
//                           </div>
//                           <div className="flex items-center space-x-2 text-gray-600">
//                             <FaSnowflake size={14} />
//                             <span className="text-xs sm:text-sm">Air Conditioning</span>
//                           </div>
//                           <div className="flex items-center space-x-2 text-gray-600">
//                             <FaCogs size={14} />
//                             <span className="text-xs sm:text-sm">{car.transmission}</span>
//                           </div>
//                           <div className="flex items-center space-x-2 text-gray-600">
//                             <FaMapMarkerAlt size={14} />
//                             <span className="text-xs sm:text-sm">{car.mileage}</span>
//                           </div>
//                           <div className="flex items-center space-x-2 text-gray-600">
//                             <FaStar size={14} className="text-yellow-400" />
//                             <span className="text-xs sm:text-sm">
//                               {car.rating}/10 ({car.reviews.toLocaleString()} reviews)
//                             </span>
//                           </div>
//                         </div>
//                         <div className="mt-3 sm:mt-4 flex items-center justify-between">
//                           <span className="text-lg sm:text-2xl font-bold text-gray-800">
//                             ₹{car.pricePerDay.toLocaleString()}
//                             <span className="text-xs sm:text-sm font-normal text-gray-500">/day</span>
//                           </span>
//                           <button onClick={() => toggleDeals(car.id)} className="flex items-center text-blue-600 font-semibold hover:text-blue-800 cursor-pointer transition-colors text-sm sm:text-base">
//                             {expandedCarId === car.id ? (
//                               <>Hide Deals <FaChevronUp className="ml-1 sm:ml-2 cursor-pointer" /></>
//                             ) : (
//                               <>View Deals <FaChevronDown className="ml-1 sm:ml-2 cursor-pointer" /></>
//                             )}
//                           </button>
//                         </div>
//                       </div>
//                     </div>

//                     {expandedCarId === car.id && (
//                       <div className="border-t pt-3 sm:pt-4">
//                         <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Compare Deals</h4>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
//                           {visibleDeals.length > 0 ? (
//                             visibleDeals.map((deal, index) => (
//                               <div
//                                 key={index}
//                                 className="bg-gray-50 p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 hover:border-blue-300 transition-colors flex flex-col"
//                               >
//                                 <div className="mb-2 sm:mb-3">
//                                   <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
//                                     <span className="text-sm sm:text-lg font-medium text-gray-800 truncate">{deal.agency}</span>
//                                     <div className="flex items-center space-x-1">
//                                       <span className="text-yellow-400 flex">
//                                         {[...Array(Math.round(deal.rating / 2))].map((_, i) => (
//                                           <FaStar key={i} size={12} className="sm:w-4 sm:h-4" />
//                                         ))}
//                                       </span>
//                                       <span className="text-xs sm:text-sm text-gray-600">{deal.rating}/10</span>
//                                     </div>
//                                   </div>
//                                   <div className="text-xs sm:text-sm text-gray-700 space-y-1 sm:space-y-2">
//                                     <ul className="space-y-1">
//                                       {deal.features.map((feature, idx) => (
//                                         <li key={idx} className="flex items-start space-x-2">
//                                           <FaMapMarkerAlt size={12} className="text-blue-500 flex-shrink-0 mt-0.5" />
//                                           <span className="break-words">{feature}</span>
//                                         </li>
//                                       ))}
//                                       {deal.freeCancellation && (
//                                         <li className="flex items-start space-x-2 text-green-600">
//                                           <FaMapMarkerAlt size={12} className="flex-shrink-0 mt-0.5" />
//                                           <span className="break-words">Free Cancellation</span>
//                                         </li>
//                                       )}
//                                     </ul>
//                                     <p className="text-gray-500 text-xs mt-1 sm:mt-2">{deal.reviews.toLocaleString()} reviews</p>
//                                     <div className="text-base sm:text-xl font-bold text-gray-800">
//                                       ₹{deal.price.toLocaleString()}
//                                       <span className="text-xs sm:text-sm font-normal text-gray-500">/day</span>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <button
//                                   onClick={() => {
//                                     console.log("Navigating with car:", car);
//                                     navigate("/car-confirmation", {
//                                       state: {
//                                         pickupLocation,
//                                         pickupDate,
//                                         pickupTime,
//                                         dropoffDate,
//                                         dropoffTime,
//                                         car, // Pass full car object
//                                         selectedDeal: deal,
//                                       },
//                                     });
//                                   }}
//                                   className="w-full bg-blue-600 text-white px-3 py-1.5 cursor-pointer sm:px-4 sm:py-2 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base mt-auto"
//                                 >
//                                   Book Now
//                                 </button>
//                               </div>
//                             ))
//                           ) : (
//                             <p className="text-gray-600 col-span-3 text-sm sm:text-base">
//                               No deals available matching your filters.
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })
//             ) : (
//               <div className="bg-white rounded-xl p-6 sm:p-8 text-center shadow-md">
//                 <p className="text-base sm:text-lg text-gray-800">No cars found matching your criteria.</p>
//                 <p className="text-gray-600 mt-2 text-sm sm:text-base">
//                   Try adjusting your filters or clear them to see all available cars.
//                 </p>
//                 <button onClick={clearFilters} className="mt-4 text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base">
//                   Clear Filters
//                 </button>
//               </div>
//             )}
//           </main> */}





//           import React, { useState, useEffect } from "react";
//           import { useNavigate, useLocation } from "react-router-dom";
//           import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";
//           import Footer from "./Footer";
//           import CabPopup from "./CabPopup";
//           import CarCard from "./CarCard";
//           import axios from "axios";
          
//           const CabListing = () => {
//             const locationState = useLocation();
//             const { pickupLocation, pickupDate, dropoffDate, pickupTime, dropoffTime } = locationState.state || {};
//             const navigate = useNavigate();
          
//             // Popup and search state
//             const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
//             const [formPickupLocation, setFormPickupLocation] = useState(pickupLocation || "");
//             const [formPickupDate, setFormPickupDate] = useState(pickupDate || "");
//             const [formPickupTime, setFormPickupTime] = useState(pickupTime || "");
//             const [formDropoffDate, setFormDropoffDate] = useState(dropoffDate || "");
//             const [formDropoffTime, setFormDropoffTime] = useState(dropoffTime || "");
//             const [isDifferentLocation, setIsDifferentLocation] = useState(false);
//             const [dropoffLocation, setDropoffLocation] = useState("");
//             const [isDriverAgeValid, setIsDriverAgeValid] = useState(true);
          
//             // Car and filter state
//             const [cars, setCars] = useState([]);
//             const [isFilterOpen, setIsFilterOpen] = useState(false);
//             const [filters, setFilters] = useState({
//               passengers: 1,
//               carType: [],
//               fuelPolicy: [],
//               transmission: "all",
//             });
          
//             // Fetch cars based on search and filters
//             const fetchCars = async () => {
//               try {
//                 const response = await axios.get("http://localhost:5001", {
//                   params: {
//                     location: formPickupLocation,
//                     no_of_passenger: filters.passengers > 1 ? filters.passengers : null,
//                     cartype: filters.carType.length === 1 ? filters.carType[0] : null,
//                     transmission: filters.transmission !== "all" ? filters.transmission : null,
//                     fuel_policy: filters.fuelPolicy.length === 1 ? filters.fuelPolicy[0] : null,
//                   },
//                 });
//                 setCars(response.data);
//               } catch (error) {
//                 console.error("Error fetching cars:", error);
//               }
//             };
          
//             useEffect(() => {
//               if (formPickupLocation) fetchCars(); // Fetch when location changes
//             }, [formPickupLocation, filters]); // Refetch when filters change
          
//             const handleSearchSubmit = () => {
//               setIsSearchPopupOpen(false);
//               fetchCars(); // Fetch updated data on search
//             };
          
//             const clearFilters = () => {
//               setFilters({
//                 passengers: 1,
//                 carType: [],
//                 fuelPolicy: [],
//                 transmission: "all",
//               });
//             }; 
          
//             const handleCheckboxChange = (e, category) => {
//               const value = e.target.value;
//               const checked = e.target.checked;
//               setFilters((prev) => ({
//                 ...prev,
//                 [category]: checked ? [...prev[category], value] : prev[category].filter((item) => item !== value),
//               }));
//             };
          
//             const activeFilterCount = [
//               filters.carType.length,
//               filters.fuelPolicy.length,
//               filters.transmission !== "all" ? 1 : 0,
//               filters.passengers > 1 ? 1 : 0,
//             ].reduce((a, b) => a + b, 0);
          
//             return (
//               <div className="min-h-screen bg-gray-50">
//                 <div className="bg-[#001533] py-4 px-4 z-10 shadow-lg">
//                   <div className="flex justify-center">
//                     <div
//                       className="flex items-center px-4 py-2 rounded-full w-full max-w-6xl bg-white/10 backdrop-blur-md cursor-pointer border border-white/20 sm:px-6 sm:py-3"
//                       onClick={() => setIsSearchPopupOpen(true)}
//                     >
//                       <FaSearch className="text-white mr-2 sm:mr-3" size={16} />
//                       <p className="text-white text-xs sm:text-sm text-center flex-1 truncate">
//                         {formPickupLocation || "Enter Pickup Location"} •{" "}
//                         {formPickupDate || "DD/MM/YYYY"}, {formPickupTime || "HH:MM"} -{" "}
//                         {formDropoffDate || "DD/MM/YYYY"}, {formDropoffTime || "HH:MM"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
          
//                 <CabPopup
//                   isOpen={isSearchPopupOpen}
//                   onClose={() => setIsSearchPopupOpen(false)}
//                   pickupLocation={formPickupLocation}
//                   setPickupLocation={setFormPickupLocation}
//                   pickupDate={formPickupDate}
//                   setPickupDate={setFormPickupDate}
//                   pickupTime={formPickupTime}
//                   setPickupTime={setFormPickupTime}
//                   dropoffDate={formDropoffDate}
//                   setDropoffDate={setFormDropoffDate}
//                   dropoffTime={formDropoffTime}
//                   setDropoffTime={setFormDropoffTime}
//                   isDifferentLocation={isDifferentLocation}
//                   setIsDifferentLocation={setIsDifferentLocation}
//                   dropoffLocation={dropoffLocation}
//                   setDropoffLocation={setDropoffLocation}
//                   isDriverAgeValid={isDriverAgeValid}
//                   setIsDriverAgeValid={setIsDriverAgeValid}
//                   handleSearch={handleSearchSubmit}
//                 />
          
//                 <div className="container mx-auto max-w-7xl px-4 py-6 sm:py-8">
//                   <div className="flex justify-between items-center mb-4 sm:mb-6">
//                     <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
//                       Available Cabs ({cars.length})
//                     </h2>
//                     <button
//                       className="flex items-center md:hidden bg-blue-600 text-white px-3 py-2 rounded-lg relative text-sm sm:text-base"
//                       onClick={() => setIsFilterOpen(!isFilterOpen)}
//                     >
//                       <FaFilter className="mr-1 sm:mr-2" /> Filters
//                       {activeFilterCount > 0 && (
//                         <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center">
//                           {activeFilterCount}
//                         </span>
//                       )}
//                     </button>
//                   </div>
          
//                   <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
//                     <div
//                       className={`${isFilterOpen ? "block" : "hidden"} md:block bg-white rounded-xl shadow-md p-4 sm:p-6 md:w-1/4 md:sticky md:top-20 h-auto md:h-[70vh] overflow-y-auto scrollbar-thin`}
//                     >
//                       <div className="flex justify-between items-center mb-4">
//                         <h3 className="text-base sm:text-lg font-bold text-gray-800">Filters</h3>
//                         {activeFilterCount > 0 && (
//                           <button onClick={clearFilters} className="flex items-center text-blue-600 hover:text-blue-800 text-sm">
//                             <FaTimes className="mr-1" /> Clear All
//                           </button>
//                         )}
//                       </div>

//                       {/* Filters remain unchanged, just ensure they trigger fetchCars via useEffect */}
//                       <div className="mb-4 sm:mb-6">
//                         <h4 className="font-semibold mb-2 text-gray-800 text-sm sm:text-base">Number of Passengers</h4>
//                         <div className="flex gap-4">
//                           <label className="flex items-center space-x-2">
//                             <input
//                               type="checkbox"
//                               checked={filters.passengers === "4-5"}
//                               onChange={() => setFilters({ ...filters, passengers: "4-5" })}
//                               className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                             />
//                             <span className="text-gray-800 text-sm sm:text-base">4-5</span>
//                           </label>
//                           <label className="flex items-center space-x-2">
//                             <input
//                               type="checkbox"
//                               checked={filters.passengers === "6+"}
//                               onChange={() => setFilters({ ...filters, passengers: "6+" })}
//                               className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                             />
//                             <span className="text-gray-800 text-sm sm:text-base">6+</span>
//                           </label>
//                         </div>
//                       </div>
//                       {/* Other filter sections (carType, fuelPolicy, transmission) unchanged */}
//                     </div>
          
//                     <main className="w-full md:w-3/4">
//                       <CarCard cars={cars} initialState={location.state}/>
//                     </main>
//                   </div>
//                 </div>
//                 <Footer />
//               </div>
//             );
//           };
          
//           export default CabListing;








import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  FaSearch,
  FaFilter,
  FaHeart,
  FaUserFriends,
  FaSuitcase,
  FaSnowflake,
  FaCogs,
  FaStar,
  FaMapMarkerAlt,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
} from "react-icons/fa";
import Footer from "./Footer";
import CabPopup from "./CabPopup";
import CarCard from "./CarCard";
import axios from "axios";

const CabListing = () => {
  const locationState = useLocation();
  const { pickupLocation, pickupDate, dropoffDate, pickupTime, dropoffTime } = locationState.state || {};
  const navigate = useNavigate();

  // Popup and search state
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [isDriverAgeValid, setIsDriverAgeValid] = useState(true);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const [formPickupLocation, setFormPickupLocation] = useState(pickupLocation || "");
  const [formPickupDate, setFormPickupDate] = useState(pickupDate || "");
  const [formPickupTime, setFormPickupTime] = useState(pickupTime || "");
  const [formDropoffDate, setFormDropoffDate] = useState(dropoffDate || "");
  const [formDropoffTime, setFormDropoffTime] = useState(dropoffTime || "");
  const [isDifferentLocation, setIsDifferentLocation] = useState(false);
  const [locations, setLocations] = useState([]);

  // Car and filter state
  const [cars, setCars] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    passengers: 1,
    carType: [],
    fuelPolicy: [],
    transmission: "all",
  });

  // Fetch locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:5001/locations");
        setLocations(response.data.locations || []);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);

  // Function to clear all filters
  const clearFilters = () => {
    setFilters({
      passengers: 1,
      carType: [],
      fuelPolicy: [],
      transmission: "all",
    });
    setCars([]); // Reset cars
  };

  // Filter logic
  useEffect(() => {
    let results = [...cars];

    if (filters.passengers) {
      const passengerCount = parseInt(filters.passengers);
      if (!isNaN(passengerCount)) {
        results = results.filter((car) => car.passengers >= passengerCount);
      }
    }

    if (filters.carType.length > 0) {
      results = results.filter((car) => filters.carType.includes(car.type));
    }

    if (filters.fuelPolicy.length > 0) {
      results = results.filter((car) => filters.fuelPolicy.includes(car.fuel_policy));
    }

    if (filters.transmission !== "all") {
      results = results.filter((car) => car.transmission === filters.transmission);
    }

    setCars(results);
  }, [filters]);

  // Fetch cars based on search and filters
  const fetchCars = async () => {
    try {
      const response = await axios.get("http://localhost:5001", {
        params: {
          location: formPickupLocation,
          no_of_passenger: filters.passengers > 1 ? filters.passengers : null,
          cartype: filters.carType.length === 1 ? filters.carType[0] : null,
          transmission: filters.transmission !== "all" ? filters.transmission : null,
          fuel_policy: filters.fuelPolicy.length === 1 ? filters.fuelPolicy[0] : null,
        },
      });
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    if (formPickupLocation) fetchCars();
  }, [formPickupLocation, filters]);

  const handleSearchSubmit = () => {
    setIsSearchPopupOpen(false);
    navigate("/cab-listing", {
      state: {
        pickupLocation: formPickupLocation,
        pickupDate: formPickupDate,
        pickupTime: formPickupTime,
        dropoffDate: formDropoffDate,
        dropoffTime: formDropoffTime,
      },
    });
    fetchCars();
  };

  const handleCheckboxChange = (e, category) => {
    const value = e.target.value;
    const checked = e.target.checked;
    setFilters((prev) => ({
      ...prev,
      [category]: checked
        ? [...prev[category], value]
        : prev[category].filter((item) => item !== value),
    }));
  };

  const activeFilterCount = [
    filters.carType.length,
    filters.fuelPolicy.length,
    filters.transmission !== "all" ? 1 : 0,
    filters.passengers > 1 ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#001533] py-4 px-4 z-10 shadow-lg">
        <div className="flex justify-center">
          <div
            className="flex items-center px-4 py-2 rounded-full w-full max-w-6xl bg-white/10 backdrop-blur-md cursor-pointer border border-white/20 sm:px-6 sm:py-3"
            onClick={() => setIsSearchPopupOpen(true)}
          >
            <FaSearch className="text-white mr-2 sm:mr-3" size={16} />
            <p className="text-white text-xs sm:text-sm text-center flex-1 truncate">
              {formPickupLocation || "Enter Pickup Location"} •{" "}
              {formPickupDate || "DD/MM/YYYY"}, {formPickupTime || "HH:MM"} -{" "}
              {formDropoffDate || "DD/MM/YYYY"}, {formDropoffTime || "HH:MM"}
            </p>
          </div>
        </div>
      </div>

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
        locations={locations}
      />

      <div className="container mx-auto max-w-7xl px-4 py-6 sm:py-8">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Available Cabs ({cars.length})
          </h2>
          <button
            className="flex items-center md:hidden bg-blue-600 text-white px-3 py-2 rounded-lg relative text-sm sm:text-base"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <FaFilter className="mr-1 sm:mr-2" /> Filters
            {activeFilterCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
          <div
            className={`${isFilterOpen ? "block" : "hidden"} md:block bg-white rounded-xl shadow-md p-4 sm:p-6 md:w-1/4 md:sticky md:top-20 h-auto md:h-[70vh] overflow-y-auto scrollbar-thin`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-800">
                Filters
              </h3>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                >
                  <FaTimes className="mr-1" /> Clear All
                </button>
              )}
            </div>
            <div className="mb-4 sm:mb-6">
              <h4 className="font-semibold mb-2 text-gray-800 text-sm sm:text-base">
                Number of Passengers
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.passengers === "4-5"}
                    onChange={() => setFilters({ ...filters, passengers: "4-5" })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-800 text-sm sm:text-base">
                    4-5
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.passengers === "6+"}
                    onChange={() => setFilters({ ...filters, passengers: "6+" })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-800 text-sm sm:text-base">6+</span>
                </label>
              </div>
            </div>
            <div className="mb-4 sm:mb-6">
              <h4 className="font-semibold mb-2 text-gray-800 text-sm sm:text-base">
                Car Type
              </h4>
              <div className="space-y-2">
                {["SUV", "Sedan", "Luxury", "Hatchback"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center cursor-pointer text-gray-800"
                  >
                    <input
                      type="checkbox"
                      value={type}
                      onChange={(e) => handleCheckboxChange(e, "carType")}
                      checked={filters.carType.includes(type)}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm sm:text-base">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-4 sm:mb-6">
              <h4 className="font-semibold mb-2 text-gray-800 text-sm sm:text-base">
                Fuel Type
              </h4>
              <div className="space-y-2">
                {["Full to Full", "Same to Same", "Full to Empty"].map(
                  (fuel) => (
                    <label
                      key={fuel}
                      className="flex items-center cursor-pointer text-gray-800"
                    >
                      <input
                        type="checkbox"
                        value={fuel}
                        onChange={(e) => handleCheckboxChange(e, "fuelPolicy")}
                        checked={filters.fuelPolicy.includes(fuel)}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm sm:text-base">{fuel}</span>
                    </label>
                  )
                )}
              </div>
            </div>
            <div className="mb-4 sm:mb-6">
              <h4 className="font-semibold mb-2 text-gray-800 text-sm sm:text-base">
                Transmission Type
              </h4>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer text-gray-800">
                  <input
                    type="radio"
                    name="transmission"
                    value="all"
                    checked={filters.transmission === "all"}
                    onChange={() => setFilters({ ...filters, transmission: "all" })}
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-sm sm:text-base">All</span>
                </label>
                <label className="flex items-center cursor-pointer text-gray-800">
                  <input
                    type="radio"
                    name="transmission"
                    value="Automatic"
                    checked={filters.transmission === "Automatic"}
                    onChange={() => setFilters({ ...filters, transmission: "Automatic" })}
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-sm sm:text-base">Automatic</span>
                </label>
                <label className="flex items-center cursor-pointer text-gray-800">
                  <input
                    type="radio"
                    name="transmission"
                    value="Manual"
                    checked={filters.transmission === "Manual"}
                    onChange={() => setFilters({ ...filters, transmission: "Manual" })}
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-sm sm:text-base">Manual</span>
                </label>
              </div>
            </div>
          </div>

          <main className="w-full md:w-3/4">
            <CarCard 
              cars={cars} 
              locationState={{
                pickupLocation: formPickupLocation,
                pickupDate: formPickupDate,
                pickupTime: formPickupTime,
                dropoffDate: formDropoffDate,
                dropoffTime: formDropoffTime,
              }}
            />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CabListing;
