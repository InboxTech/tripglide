// // // // // // import React, { useState, useEffect } from "react";
// // // // // // import { useNavigate } from "react-router-dom";
// // // // // // import { FaHeart, FaUserFriends, FaSnowflake, FaCogs, FaStar, FaChevronDown, FaChevronUp } from "react-icons/fa";
// // // // // // import axios from "axios";

// // // // // // const CarCard = ({ cars, locationState }) => {
// // // // // //   const navigate = useNavigate();
// // // // // //   const [expandedCarId, setExpandedCarId] = useState(null);
// // // // // //   const [activeMake, setActiveMake] = useState("Volkswagen");

// // // // // //   const toggleDeals = (carId) => {
// // // // // //     setExpandedCarId(expandedCarId === carId ? null : carId);
// // // // // //   };

// // // // // //   const getImageUrl = (type) => {
// // // // // //     switch (type) {
// // // // // //       case "SUV":
// // // // // //         return "https://i.pinimg.com/474x/0f/c8/36/0fc836701d156f6e42595709d7773b44.jpg";
// // // // // //       case "Sedan":
// // // // // //         return "https://i.pinimg.com/474x/fd/52/67/fd5267988393235258b7b32763b67d05.jpg";
// // // // // //       case "Luxury":
// // // // // //         return "https://i.pinimg.com/474x/c5/72/49/c572495a735f8c9a42c9419524c90b23.jpg";
// // // // // //       case "Hatchback":
// // // // // //         return "https://i.pinimg.com/474x/7a/3e/ba/7a3eba674c45f37f174582532d2671ed.jpg";
// // // // // //       default:
// // // // // //         return "https://i.pinimg.com/474x/0f/c8/36/0fc836701d156f6e42595709d7773b44.jpg";
// // // // // //     }
// // // // // //   };

// // // // // //   // Get all 8 unique models for the active make
// // // // // //   const uniqueCars = [];
// // // // // //   const seenModels = new Set();
// // // // // //   const makeCars = cars.filter(car => car.make === activeMake); // Filter cars by active make
// // // // // //   makeCars.forEach((car) => {
// // // // // //     if (!seenModels.has(car.model) && uniqueCars.length < 8) { // Add up to 8 unique models
// // // // // //       seenModels.add(car.model);
// // // // // //       uniqueCars.push(car); // Add the first instance of each model
// // // // // //     }
// // // // // //   });
// // // // // //   console.log("Unique Models for", activeMake, ": ", uniqueCars.map(car => `${car.make} ${car.model}`)); // Debug log

// // // // // //   // Filter agencies for the specific make and model, limited to 5 unique agencies
// // // // // //   const carAgencies = {};
// // // // // //   cars.forEach((car) => {
// // // // // //     const key = `${car.make}-${car.model}`;
// // // // // //     if (!carAgencies[key]) carAgencies[key] = [];
// // // // // //     // Only add if not already present to avoid duplicates
// // // // // //     if (!carAgencies[key].some(d => d.agency === car.agency)) {
// // // // // //       carAgencies[key].push({
// // // // // //         agency: car.agency,
// // // // // //         price: car.price,
// // // // // //         fuelPolicy: car.fuel_policy || `Fuel Policy for ${car.model} not specified`, // Placeholder
// // // // // //         id: car.id,
// // // // // //       });
// // // // // //     }
// // // // // //   });

// // // // // //   const toggleFavorite = (carId) => {
// // // // // //     setCars(prev => prev.map(car => car.id === carId ? { ...car, isFavorite: !car.isFavorite } : car));
// // // // // //   };

// // // // // //   const handleBookNow = (car, deal) => {
// // // // // //     navigate("/car-confirmation", {
// // // // // //       state: {
// // // // // //         ...locationState,
// // // // // //         car,
// // // // // //         selectedDeal: deal,
// // // // // //       },
// // // // // //     });
// // // // // //   };

// // // // // //   const makes = ["Volkswagen", "Toyota", "Ford", "Hyundai", "Honda"];

// // // // // //   return (
// // // // // //     <>
// // // // // //       {/* Tabs Section */}
// // // // // //       <div className="mb-4 flex space-x-2">
// // // // // //         {makes.map((make) => (
// // // // // //           <button
// // // // // //             key={make}
// // // // // //             onClick={() => setActiveMake(make)}
// // // // // //             className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeMake === make ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
// // // // // //           >
// // // // // //             {make}
// // // // // //           </button>
// // // // // //         ))}
// // // // // //       </div>

// // // // // //       {uniqueCars.length > 0 ? (
// // // // // //         uniqueCars.map((car) => (
// // // // // //           <div
// // // // // //             key={car.id}
// // // // // //             className="bg-white p-4 sm:p-6 rounded-2xl mb-4 sm:mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
// // // // // //           >
// // // // // //             <div className="flex items-center justify-between mb-3 sm:mb-4">
// // // // // //               <div className="flex items-center space-x-2 sm:space-x-3">
// // // // // //                 <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
// // // // // //                   {car.make} {car.model} {/* Explicitly display make and model */}
// // // // // //                 </h3>
// // // // // //                 <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{car.type}</span>
// // // // // //               </div>
// // // // // //               <button onClick={() => toggleFavorite(car.id)} className="text-gray-400 hover:text-red-500 transition-colors">
// // // // // //                 <FaHeart size={20} />
// // // // // //               </button>
// // // // // //             </div>

// // // // // //             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">
// // // // // //               <div className="sm:w-1/3">
// // // // // //                 <img src={getImageUrl(car.type)} alt={`${car.make} ${car.model}`} className="w-full h-32 sm:h-40 object-contain rounded-lg bg-gray-50 p-2" />
// // // // // //               </div>
// // // // // //               <div className="sm:w-2/3 flex flex-col justify-between">
// // // // // //                 <div className="grid grid-cols-2 gap-2 sm:gap-4">
// // // // // //                   <div className="flex items-center space-x-2 text-gray-600">
// // // // // //                     <FaUserFriends size={14} />
// // // // // //                     <span className="text-xs sm:text-sm">{car.passengers} Passengers</span>
// // // // // //                   </div>
// // // // // //                   <div className="flex items-center space-x-2 text-gray-600">
// // // // // //                     <FaSnowflake size={14} />
// // // // // //                     <span className="text-xs sm:text-sm">{car.ac === "Yes" ? "Air Conditioning" : "No AC"}</span>
// // // // // //                   </div>
// // // // // //                   <div className="flex items-center space-x-2 text-gray-600">
// // // // // //                     <FaCogs size={14} />
// // // // // //                     <span className="text-xs sm:text-sm">{car.transmission}</span>
// // // // // //                   </div>
// // // // // //                   <div className="flex items-center space-x-2 text-gray-600">
// // // // // //                     <FaStar size={14} className="text-yellow-400" />
// // // // // //                     <span className="text-xs sm:text-sm">{car.ratings}/5</span>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //                 <div className="mt-3 sm:mt-4 flex items-center justify-end">
// // // // // //                   <button
// // // // // //                     onClick={() => toggleDeals(car.id)}
// // // // // //                     className="flex items-center text-blue-600 font-semibold hover:text-blue-800 cursor-pointer transition-colors text-sm sm:text-base"
// // // // // //                   >
// // // // // //                     View Deals {expandedCarId === car.id ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />}
// // // // // //                   </button>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             </div>

// // // // // //             {expandedCarId === car.id && (
// // // // // //               <div className="mt-4 border-t pt-4">
// // // // // //                 <h4 className="text-lg font-semibold mb-2">Available Agencies</h4>
// // // // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// // // // // //                   {carAgencies[`${car.make}-${car.model}`]
// // // // // //                     .filter((deal, index, self) => 
// // // // // //                       index === self.findIndex((d) => d.agency === deal.agency) // Ensure unique agencies
// // // // // //                     )
// // // // // //                     .slice(0, 5) // Limit to 5 agencies
// // // // // //                     .map((deal) => (
// // // // // //                       <div key={deal.id} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
// // // // // //                         <div>
// // // // // //                           <p className="font-semibold">{deal.agency}</p>
// // // // // //                           <p className="text-sm text-gray-600">₹{deal.price}/hour</p>
// // // // // //                           <p className="text-sm text-gray-600">Fuel Policy: {deal.fuelPolicy}</p>
// // // // // //                         </div>
// // // // // //                         <button
// // // // // //                           onClick={() => handleBookNow(car, deal)}
// // // // // //                           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
// // // // // //                         >
// // // // // //                           Book Now
// // // // // //                         </button>
// // // // // //                       </div>
// // // // // //                     ))}
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </div>
// // // // // //         ))
// // // // // //       ) : (
// // // // // //         <div className="bg-white rounded-xl p-6 sm:p-8 text-center shadow-md">
// // // // // //           <p className="text-base sm:text-lg text-gray-800">No cars available for this location.</p>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </>
// // // // // //   );
// // // // // // };

// // // // // // export default CarCard;




// // // // // import React, { useState, useEffect } from "react";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import { FaHeart, FaUserFriends, FaSnowflake, FaCogs, FaStar, FaChevronDown, FaChevronUp } from "react-icons/fa";
// // // // // import axios from "axios";

// // // // // const CarCard = ({ cars, locationState }) => {
// // // // //   const navigate = useNavigate();
// // // // //   const [expandedCarId, setExpandedCarId] = useState(null);
// // // // //   const [activeMake, setActiveMake] = useState("Volkswagen");

// // // // //   const toggleDeals = (carId) => {
// // // // //     setExpandedCarId(expandedCarId === carId ? null : carId);
// // // // //   };

// // // // //   const getImageUrl = (type) => {
// // // // //     switch (type) {
// // // // //       case "SUV":
// // // // //         return "https://i.pinimg.com/474x/0f/c8/36/0fc836701d156f6e42595709d7773b44.jpg";
// // // // //       case "Sedan":
// // // // //         return "https://i.pinimg.com/474x/fd/52/67/fd5267988393235258b7b32763b67d05.jpg";
// // // // //       case "Luxury":
// // // // //         return "https://i.pinimg.com/474x/c5/72/49/c572495a735f8c9a42c9419524c90b23.jpg";
// // // // //       case "Hatchback":
// // // // //         return "https://i.pinimg.com/474x/7a/3e/ba/7a3eba674c45f37f174582532d2671ed.jpg";
// // // // //       default:
// // // // //         return "https://i.pinimg.com/474x/0f/c8/36/0fc836701d156f6e42595709d7773b44.jpg";
// // // // //     }
// // // // //   };

// // // // //   // Ensure all 8 unique models for the active make are displayed
// // // // //   const uniqueCars = [];
// // // // //   const seenModels = new Set();
// // // // //   const makeCars = cars.filter(car => car.make === activeMake); // Filter by active make from fetched cars
// // // // //   makeCars.forEach((car) => {
// // // // //     if (!seenModels.has(car.model) && uniqueCars.length < 8) {
// // // // //       seenModels.add(car.model);
// // // // //       uniqueCars.push(car); // Add first instance of each unique model
// // // // //     }
// // // // //   });
// // // // //   // Pad with duplicates if less than 8 unique models (for debugging)
// // // // //   if (uniqueCars.length < 8 && makeCars.length > 0) {
// // // // //     console.warn("Only", uniqueCars.length, "unique models found for", activeMake, ". Expected 8. Available data:", makeCars.map(car => `${car.make} ${car.model}`));
// // // // //     while (uniqueCars.length < 8 && makeCars.length > uniqueCars.length) {
// // // // //       uniqueCars.push(makeCars[uniqueCars.length % makeCars.length]); // Cycle through available cars
// // // // //     }
// // // // //   }
// // // // //   console.log("Displayed Models for", activeMake, ": ", uniqueCars.map(car => `${car.make} ${car.model}`)); // Debug

// // // // //   // Filter agencies for the specific make and model, limited to 5 unique agencies
// // // // //   const carAgencies = {};
// // // // //   cars.forEach((car) => {
// // // // //     const key = `${car.make}-${car.model}`;
// // // // //     if (!carAgencies[key]) carAgencies[key] = [];
// // // // //     if (!carAgencies[key].some(d => d.agency === car.agency)) {
// // // // //       carAgencies[key].push({
// // // // //         agency: car.agency,
// // // // //         price: car.price,
// // // // //         fuelPolicy: car.fuel_policy || `Fuel Policy for ${car.model} not specified`, // Match CabListing filters
// // // // //         id: car.id,
// // // // //       });
// // // // //     }
// // // // //   });

// // // // //   const toggleFavorite = (carId) => {
// // // // //     setCars(prev => prev.map(car => car.id === carId ? { ...car, isFavorite: !car.isFavorite } : car));
// // // // //   };

// // // // //   const handleBookNow = (car, deal) => {
// // // // //     navigate("/car-confirmation", {
// // // // //       state: {
// // // // //         ...locationState,
// // // // //         car,
// // // // //         selectedDeal: deal,
// // // // //       },
// // // // //     });
// // // // //   };

// // // // //   const makes = ["Volkswagen", "Toyota", "Ford", "Hyundai", "Honda"];

// // // // //   return (
// // // // //     <>
// // // // //       {/* Tabs Section */}
// // // // //       <div className="mb-4 flex space-x-2">
// // // // //         {makes.map((make) => (
// // // // //           <button
// // // // //             key={make}
// // // // //             onClick={() => setActiveMake(make)}
// // // // //             className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeMake === make ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
// // // // //           >
// // // // //             {make}
// // // // //           </button>
// // // // //         ))}
// // // // //       </div>

// // // // //       {uniqueCars.length > 0 ? (
// // // // //         uniqueCars.map((car) => (
// // // // //           <div
// // // // //             key={car.id}
// // // // //             className="bg-white p-4 sm:p-6 rounded-2xl mb-4 sm:mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
// // // // //           >
// // // // //             <div className="flex items-center justify-between mb-3 sm:mb-4">
// // // // //               <div className="flex items-center space-x-2 sm:space-x-3">
// // // // //                 <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
// // // // //                    {car.model}
// // // // //                 </h3>
// // // // //                 <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{car.type}</span>
// // // // //               </div>
// // // // //               <button onClick={() => toggleFavorite(car.id)} className="text-gray-400 hover:text-red-500 transition-colors">
// // // // //                 <FaHeart size={20} />
// // // // //               </button>
// // // // //             </div>

// // // // //             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">
// // // // //               <div className="sm:w-1/3">
// // // // //                 <img src={getImageUrl(car.type)} alt={`${car.make} ${car.model}`} className="w-full h-32 sm:h-40 object-contain rounded-lg bg-gray-50 p-2" />
// // // // //               </div>
// // // // //               <div className="sm:w-2/3 flex flex-col justify-between">
// // // // //                 <div className="grid grid-cols-2 gap-2 sm:gap-4">
// // // // //                   <div className="flex items-center space-x-2 text-gray-600">
// // // // //                     <FaUserFriends size={14} />
// // // // //                     <span className="text-xs sm:text-sm">{car.passengers} Passengers</span>
// // // // //                   </div>
// // // // //                   <div className="flex items-center space-x-2 text-gray-600">
// // // // //                     <FaSnowflake size={14} />
// // // // //                     <span className="text-xs sm:text-sm">{car.ac === "Yes" ? "Air Conditioning" : "No AC"}</span>
// // // // //                   </div>
// // // // //                   <div className="flex items-center space-x-2 text-gray-600">
// // // // //                     <FaCogs size={14} />
// // // // //                     <span className="text-xs sm:text-sm">{car.transmission}</span>
// // // // //                   </div>
// // // // //                   <div className="flex items-center space-x-2 text-gray-600">
// // // // //                     <FaStar size={14} className="text-yellow-400" />
// // // // //                     <span className="text-xs sm:text-sm">{car.ratings}/5</span>
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <div className="mt-3 sm:mt-4 flex items-center justify-end">
// // // // //                   <button
// // // // //                     onClick={() => toggleDeals(car.id)}
// // // // //                     className="flex items-center text-blue-600 font-semibold hover:text-blue-800 cursor-pointer transition-colors text-sm sm:text-base"
// // // // //                   >
// // // // //                     View Deals {expandedCarId === car.id ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />}
// // // // //                   </button>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>

// // // // //             {expandedCarId === car.id && (
// // // // //               <div className="mt-4 border-t pt-4">
// // // // //                 <h4 className="text-lg font-semibold mb-2">Available Agencies</h4>
// // // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// // // // //                   {carAgencies[`${car.make}-${car.model}`]
// // // // //                     .filter((deal, index, self) => 
// // // // //                       index === self.findIndex((d) => d.agency === deal.agency)
// // // // //                     )
// // // // //                     .slice(0, 5)
// // // // //                     .map((deal) => (
// // // // //                       <div key={deal.id} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
// // // // //                         <div>
// // // // //                           <p className="font-semibold">{deal.agency}</p>
// // // // //                           <p className="text-sm text-gray-600">₹{deal.price}/hour</p>
// // // // //                           <p className="text-sm text-gray-600">Fuel Policy: {deal.fuelPolicy}</p>
// // // // //                         </div>
// // // // //                         <button
// // // // //                           onClick={() => handleBookNow(car, deal)}
// // // // //                           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
// // // // //                         >
// // // // //                           Book Now
// // // // //                         </button>
// // // // //                       </div>
// // // // //                     ))}
// // // // //                 </div>
// // // // //               </div>
// // // // //             )}
// // // // //           </div>
// // // // //         ))
// // // // //       ) : (
// // // // //         <div className="bg-white rounded-xl p-6 sm:p-8 text-center shadow-md">
// // // // //           <p className="text-base sm:text-lg text-gray-800">No cars available for this location.</p>
// // // // //         </div>
// // // // //       )}
// // // // //     </>
// // // // //   );
// // // // // };

// // // // // export default CarCard;







// // // // import React, { useState, useEffect } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import { FaHeart, FaUserFriends, FaSnowflake, FaCogs, FaStar, FaChevronDown, FaChevronUp } from "react-icons/fa";
// // // // import axios from "axios";

// // // // const CarCard = ({ cars, locationState }) => {
// // // //   const navigate = useNavigate();
// // // //   const [expandedCarId, setExpandedCarId] = useState(null);
// // // //   const [activeMake, setActiveMake] = useState("Volkswagen");

// // // //   const toggleDeals = (carId) => {
// // // //     setExpandedCarId(expandedCarId === carId ? null : carId);
// // // //   };

// // // //   const getImageUrl = (type) => {
// // // //     switch (type) {
// // // //       case "SUV":
// // // //         return "https://i.pinimg.com/474x/0f/c8/36/0fc836701d156f6e42595709d7773b44.jpg";
// // // //       case "Sedan":
// // // //         return "https://i.pinimg.com/474x/fd/52/67/fd5267988393235258b7b32763b67d05.jpg";
// // // //       case "Luxury":
// // // //         return "https://i.pinimg.com/474x/c5/72/49/c572495a735f8c9a42c9419524c90b23.jpg";
// // // //       case "Hatchback":
// // // //         return "https://i.pinimg.com/474x/7a/3e/ba/7a3eba674c45f37f174582532d2671ed.jpg";
// // // //       default:
// // // //         return "https://i.pinimg.com/474x/0f/c8/36/0fc836701d156f6e42595709d7773b44.jpg";
// // // //     }
// // // //   };

// // // //   // Ensure up to 8 unique models for the active make
// // // //   const uniqueCars = [];
// // // //   const seenModels = new Set();
// // // //   const makeCars = cars.filter(car => car.make === activeMake); // Filter by active make
// // // //   makeCars.forEach((car) => {
// // // //     if (car.model && !seenModels.has(car.model) && uniqueCars.length < 8) {
// // // //       seenModels.add(car.model);
// // // //       uniqueCars.push(car); // Add first instance of each unique model
// // // //     }
// // // //   });
// // // //   // Pad with duplicates if less than 8 unique models
// // // //   if (uniqueCars.length < 8 && makeCars.length > 0) {
// // // //     console.warn("Only", uniqueCars.length, "unique models found for", activeMake, ". Expected 8. Available data:", makeCars.map(car => `${car.make} ${car.model}`));
// // // //     while (uniqueCars.length < 8 && makeCars.length > uniqueCars.length) {
// // // //       uniqueCars.push(makeCars[uniqueCars.length % makeCars.length]); // Cycle through available cars
// // // //     }
// // // //   }
// // // //   console.log("Displayed Models for", activeMake, ": ", uniqueCars.map(car => `${car.make} ${car.model}`)); // Debug

// // // //   // Filter agencies for the specific car, limited to 5 unique agencies
// // // //   const carAgencies = {};
// // // //   cars.forEach((car) => {
// // // //     const key = `${car.make}-${car.model}`; // Use make and model as key
// // // //     if (!carAgencies[key]) carAgencies[key] = [];
// // // //     if (!carAgencies[key].some(d => d.agency === car.agency)) {
// // // //       carAgencies[key].push({
// // // //         agency: car.agency,
// // // //         price: car.price,
// // // //         fuelPolicy: car.fuel_policy || "Not specified",
// // // //         id: car.id,
// // // //       });
// // // //     }
// // // //   });

// // // //   const toggleFavorite = (carId) => {
// // // //     setCars(prev => prev.map(car => car.id === carId ? { ...car, isFavorite: !car.isFavorite } : car));
// // // //   };

// // // //   const handleBookNow = (car, deal) => {
// // // //     navigate("/car-confirmation", {
// // // //       state: {
// // // //         ...locationState,
// // // //         car,
// // // //         selectedDeal: deal,
// // // //       },
// // // //     });
// // // //   };

// // // //   const makes = ["Volkswagen", "Toyota", "Ford", "Hyundai", "Honda"];

// // // //   return (
// // // //     <>
// // // //       {/* Tabs Section */}
// // // //       <div className="mb-4 flex space-x-2">
// // // //         {makes.map((make) => (
// // // //           <button
// // // //             key={make}
// // // //             onClick={() => setActiveMake(make)}
// // // //             className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeMake === make ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
// // // //           >
// // // //             {make}
// // // //           </button>
// // // //         ))}
// // // //       </div>

// // // //       {uniqueCars.length > 0 ? (
// // // //         uniqueCars.map((car) => (
// // // //           <div
// // // //             key={car.id}
// // // //             className="bg-white p-4 sm:p-6 rounded-2xl mb-4 sm:mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
// // // //           >
// // // //             <div className="flex items-center justify-between mb-3 sm:mb-4">
// // // //               <div className="flex items-center space-x-2 sm:space-x-3">
// // // //                 <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
// // // //                   {car.model} {/* Display only the model */}
// // // //                 </h3>
// // // //                 <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{car.type}</span>
// // // //               </div>
// // // //               <button onClick={() => toggleFavorite(car.id)} className="text-gray-400 hover:text-red-500 transition-colors">
// // // //                 <FaHeart size={20} />
// // // //               </button>
// // // //             </div>

// // // //             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">
// // // //               <div className="sm:w-1/3">
// // // //                 <img src={getImageUrl(car.type)} alt={`${car.make} ${car.model}`} className="w-full h-32 sm:h-40 object-contain rounded-lg bg-gray-50 p-2" />
// // // //               </div>
// // // //               <div className="sm:w-2/3 flex flex-col justify-between">
// // // //                 <div className="grid grid-cols-2 gap-2 sm:gap-4">
// // // //                   <div className="flex items-center space-x-2 text-gray-600">
// // // //                     <FaUserFriends size={14} />
// // // //                     <span className="text-xs sm:text-sm">{car.passengers} Passengers</span>
// // // //                   </div>
// // // //                   <div className="flex items-center space-x-2 text-gray-600">
// // // //                     <FaSnowflake size={14} />
// // // //                     <span className="text-xs sm:text-sm">{car.ac === "Yes" ? "Air Conditioning" : "No AC"}</span>
// // // //                   </div>
// // // //                   <div className="flex items-center space-x-2 text-gray-600">
// // // //                     <FaCogs size={14} />
// // // //                     <span className="text-xs sm:text-sm">{car.transmission}</span>
// // // //                   </div>
// // // //                   <div className="flex items-center space-x-2 text-gray-600">
// // // //                     <FaStar size={14} className="text-yellow-400" />
// // // //                     <span className="text-xs sm:text-sm">{car.ratings}/5</span>
// // // //                   </div>
// // // //                 </div>
// // // //                 <div className="mt-3 sm:mt-4 flex items-center justify-end">
// // // //                   <button
// // // //                     onClick={() => toggleDeals(car.id)}
// // // //                     className="flex items-center text-blue-600 font-semibold hover:text-blue-800 cursor-pointer transition-colors text-sm sm:text-base"
// // // //                   >
// // // //                     View Deals {expandedCarId === car.id ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />}
// // // //                   </button>
// // // //                 </div>
// // // //               </div>
// // // //             </div>

// // // //             {expandedCarId === car.id && (
// // // //               <div className="mt-4 border-t pt-4">
// // // //                 <h4 className="text-lg font-semibold mb-2">Available Agencies</h4>
// // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// // // //                   {carAgencies[`${car.make}-${car.model}`]
// // // //                     .filter((deal, index, self) => 
// // // //                       index === self.findIndex((d) => d.agency === deal.agency)
// // // //                     )
// // // //                     .slice(0, 5)
// // // //                     .map((deal) => (
// // // //                       <div key={deal.id} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
// // // //                         <div>
// // // //                           <p className="font-semibold">{deal.agency}</p>
// // // //                           <p className="text-sm text-gray-600">₹{deal.price}/hour</p>
// // // //                           <p className="text-sm text-gray-600">Fuel Policy: {deal.fuelPolicy}</p>
// // // //                         </div>
// // // //                         <button
// // // //                           onClick={() => handleBookNow(car, deal)}
// // // //                           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
// // // //                         >
// // // //                           Book Now
// // // //                         </button>
// // // //                       </div>
// // // //                     ))}
// // // //                 </div>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         ))
// // // //       ) : (
// // // //         <div className="bg-white rounded-xl p-6 sm:p-8 text-center shadow-md">
// // // //           <p className="text-base sm:text-lg text-gray-800">No cars available for this location.</p>
// // // //         </div>
// // // //       )}
// // // //     </>
// // // //   );
// // // // };

// // // // export default CarCard;





// // // import React, { useState, useEffect } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { FaHeart, FaUserFriends, FaSnowflake, FaCogs, FaStar, FaChevronDown, FaChevronUp } from "react-icons/fa";
// // // import axios from "axios";

// // // const CarCard = ({ cars, locationState }) => {
// // //   const navigate = useNavigate();
// // //   const [expandedCarId, setExpandedCarId] = useState(null);
// // //   const [activeMake, setActiveMake] = useState("Volkswagen");

// // //   const toggleDeals = (carId) => {
// // //     setExpandedCarId(expandedCarId === carId ? null : carId);
// // //   };

// // //   const getImageUrl = (type) => {
// // //     switch (type) {
// // //       case "SUV":
// // //         return "https://i.pinimg.com/474x/0f/c8/36/0fc836701d156f6e42595709d7773b44.jpg";
// // //       case "Sedan":
// // //         return "https://i.pinimg.com/474x/fd/52/67/fd5267988393235258b7b32763b67d05.jpg";
// // //       case "Luxury":
// // //         return "https://i.pinimg.com/474x/c5/72/49/c572495a735f8c9a42c9419524c90b23.jpg";
// // //       case "Hatchback":
// // //         return "https://i.pinimg.com/474x/7a/3e/ba/7a3eba674c45f37f174582532d2671ed.jpg";
// // //       default:
// // //         return "https://i.pinimg.com/474x/0f/c8/36/0fc836701d156f6e42595709d7773b44.jpg";
// // //     }
// // //   };

// // //   // Ensure only unique models for the active make (no padding)
// // //   const uniqueCars = [];
// // //   const seenModels = new Set();
// // //   const makeCars = cars.filter(car => car.make === activeMake); // Filter by active make
// // //   makeCars.forEach((car) => {
// // //     if (car.model && !seenModels.has(car.model) && uniqueCars.length < 8) {
// // //       seenModels.add(car.model);
// // //       uniqueCars.push(car); // Add first instance of each unique model
// // //     }
// // //   });
// // //   console.log("Displayed Models for", activeMake, ": ", uniqueCars.map(car => `${car.make} ${car.model}`)); // Debug
// // //   if (uniqueCars.length === 0) {
// // //     console.warn("No unique models found for", activeMake);
// // //   }

// // //   // Filter agencies for the specific car, limited to 5 unique agencies
// // //   const carAgencies = {};
// // //   cars.forEach((car) => {
// // //     const key = `${car.make}-${car.model}`; // Use make and model as key
// // //     if (!carAgencies[key]) carAgencies[key] = [];
// // //     if (!carAgencies[key].some(d => d.agency === car.agency)) {
// // //       carAgencies[key].push({
// // //         agency: car.agency,
// // //         price: car.price,
// // //         fuelPolicy: car.fuel_policy || "Not specified",
// // //         id: car.id,
// // //       });
// // //     }
// // //   });

// // //   const toggleFavorite = (carId) => {
// // //     setCars(prev => prev.map(car => car.id === carId ? { ...car, isFavorite: !car.isFavorite } : car));
// // //   };

// // //   const handleBookNow = (car, deal) => {
// // //     navigate("/car-confirmation", {
// // //       state: {
// // //         ...locationState,
// // //         car,
// // //         selectedDeal: deal,
// // //       },
// // //     });
// // //   };

// // //   const makes = ["Volkswagen", "Toyota", "Ford", "Hyundai", "Honda"];

// // //   return (
// // //     <>
// // //       {/* Tabs Section */}
// // //       <div className="mb-4 flex space-x-2">
// // //         {makes.map((make) => (
// // //           <button
// // //             key={make}
// // //             onClick={() => setActiveMake(make)}
// // //             className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeMake === make ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
// // //           >
// // //             {make}
// // //           </button>
// // //         ))}
// // //       </div>

// // //       {uniqueCars.length > 0 ? (
// // //         uniqueCars.map((car) => (
// // //           <div
// // //             key={car.id}
// // //             className="bg-white p-4 sm:p-6 rounded-2xl mb-4 sm:mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
// // //           >
// // //             <div className="flex items-center justify-between mb-3 sm:mb-4">
// // //               <div className="flex items-center space-x-2 sm:space-x-3">
// // //                 <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
// // //                   {car.model} {/* Display only the model */}
// // //                 </h3>
// // //                 <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{car.type}</span>
// // //               </div>
// // //               <button onClick={() => toggleFavorite(car.id)} className="text-gray-400 hover:text-red-500 transition-colors">
// // //                 <FaHeart size={20} />
// // //               </button>
// // //             </div>

// // //             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">
// // //               <div className="sm:w-1/3">
// // //                 <img src={getImageUrl(car.type)} alt={`${car.make} ${car.model}`} className="w-full h-32 sm:h-40 object-contain rounded-lg bg-gray-50 p-2" />
// // //               </div>
// // //               <div className="sm:w-2/3 flex flex-col justify-between">
// // //                 <div className="grid grid-cols-2 gap-2 sm:gap-4">
// // //                   <div className="flex items-center space-x-2 text-gray-600">
// // //                     <FaUserFriends size={14} />
// // //                     <span className="text-xs sm:text-sm">{car.passengers} Passengers</span>
// // //                   </div>
// // //                   <div className="flex items-center space-x-2 text-gray-600">
// // //                     <FaSnowflake size={14} />
// // //                     <span className="text-xs sm:text-sm">{car.ac === "Yes" ? "Air Conditioning" : "No AC"}</span>
// // //                   </div>
// // //                   <div className="flex items-center space-x-2 text-gray-600">
// // //                     <FaCogs size={14} />
// // //                     <span className="text-xs sm:text-sm">{car.transmission}</span>
// // //                   </div>
// // //                   <div className="flex items-center space-x-2 text-gray-600">
// // //                     <FaStar size={14} className="text-yellow-400" />
// // //                     <span className="text-xs sm:text-sm">{car.ratings}/5</span>
// // //                   </div>
// // //                 </div>
// // //                 <div className="mt-3 sm:mt-4 flex items-center justify-end">
// // //                   <button
// // //                     onClick={() => toggleDeals(car.id)}
// // //                     className="flex items-center text-blue-600 font-semibold hover:text-blue-800 cursor-pointer transition-colors text-sm sm:text-base"
// // //                   >
// // //                     View Deals {expandedCarId === car.id ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />}
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {expandedCarId === car.id && (
// // //               <div className="mt-4 border-t pt-4">
// // //                 <h4 className="text-lg font-semibold mb-2">Available Agencies</h4>
// // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// // //                   {carAgencies[`${car.make}-${car.model}`]
// // //                     .filter((deal, index, self) => 
// // //                       index === self.findIndex((d) => d.agency === deal.agency)
// // //                     )
// // //                     .slice(0, 5)
// // //                     .map((deal) => (
// // //                       <div key={deal.id} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
// // //                         <div>
// // //                           <p className="font-semibold">{deal.agency}</p>
// // //                           <p className="text-sm text-gray-600">₹{deal.price}/hour</p>
// // //                           <p className="text-sm text-gray-600">Fuel Policy: {deal.fuelPolicy}</p>
// // //                         </div>
// // //                         <button
// // //                           onClick={() => handleBookNow(car, deal)}
// // //                           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
// // //                         >
// // //                           Book Now
// // //                         </button>
// // //                       </div>
// // //                     ))}
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>
// // //         ))
// // //       ) : (
// // //         <div className="bg-white rounded-xl p-6 sm:p-8 text-center shadow-md">
// // //           <p className="text-base sm:text-lg text-gray-800">No cars available for this location.</p>
// // //         </div>
// // //       )}
// // //     </>
// // //   );
// // // };

// // // export default CarCard;








// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { FaHeart, FaUserFriends, FaSnowflake, FaCogs, FaStar, FaChevronDown, FaChevronUp } from "react-icons/fa";
// // import axios from "axios";

// // const CarCard = ({ cars, locationState }) => {
// //   const navigate = useNavigate();
// //   const [expandedCarId, setExpandedCarId] = useState(null);
// //   const [activeMake, setActiveMake] = useState("Volkswagen");

// //   const toggleDeals = (carId) => {
// //     setExpandedCarId(expandedCarId === carId ? null : carId);
// //   };

// //   // Mapping of car models to specific image URLs
// //   const modelImageMap = {
// //     // Volkswagen models
// //     "Golf": "https://i.pinimg.com/474x/7a/3e/ba/7a3eba674c45f37f174582532d2671ed.jpg",
// //     "Tiguan": "https://i.pinimg.com/474x/0f/c8/36/0fc836701d156f6e42595709d7773b44.jpg",
// //     "Passat": "https://i.pinimg.com/474x/fd/52/67/fd5267988393235258b7b32763b67d05.jpg",
// //     // Ford models
// //     "Endeavor": "https://i.pinimg.com/474x/c5/72/49/c572495a735f8c9a42c9419524c90b23.jpg",
// //     "Escape": "https://i.pinimg.com/474x/0f/c8/36/0fc836701d156f6e42595709d7773b44.jpg",
// //     "F-150": "https://i.pinimg.com/474x/7a/3e/ba/7a3eba674c45f37f174582532d2671ed.jpg",
// //     // Toyota models (example)
// //     "Camry": "https://i.pinimg.com/474x/fd/52/67/fd5267988393235258b7b32763b67d05.jpg",
// //     "RAV4": "https://i.pinimg.com/474x/c5/72/49/c572495a735f8c9a42c9419524c90b23.jpg",
// //     // Hyundai models (example)
// //     "Tucson": "https://i.pinimg.com/474x/0f/c8/36/0fc836701d156f6e42595709d7773b44.jpg",
// //     "Sonata": "https://i.pinimg.com/474x/7a/3e/ba/7a3eba674c45f37f174582532d2671ed.jpg",
// //     // Honda models (example)
// //     "Civic": "https://i.pinimg.com/474x/fd/52/67/fd5267988393235258b7b32763b67d05.jpg",
// //     "CR-V": "https://i.pinimg.com/474x/c5/72/49/c572495a735f8c9a42c9419524c90b23.jpg",
// //     // Default image if model not found
// //     "default": "https://i.pinimg.com/474x/0f/c8/36/0fc836701d156f6e42595709d7773b44.jpg",
// //   };

// //   const getImageUrl = (model) => {
// //     return modelImageMap[model] || modelImageMap["default"];
// //   };

// //   // Ensure only unique models for the active make (no padding)
// //   const uniqueCars = [];
// //   const seenModels = new Set();
// //   const makeCars = cars.filter(car => car.make === activeMake); // Filter by active make
// //   makeCars.forEach((car) => {
// //     if (car.model && !seenModels.has(car.model) && uniqueCars.length < 8) {
// //       seenModels.add(car.model);
// //       uniqueCars.push(car); // Add first instance of each unique model
// //     }
// //   });
// //   console.log("Displayed Models for", activeMake, ": ", uniqueCars.map(car => `${car.make} ${car.model}`)); // Debug
// //   if (uniqueCars.length === 0) {
// //     console.warn("No unique models found for", activeMake);
// //   }

// //   // Filter agencies for the specific car, limited to 5 unique agencies
// //   const carAgencies = {};
// //   cars.forEach((car) => {
// //     const key = `${car.make}-${car.model}`; // Use make and model as key
// //     if (!carAgencies[key]) carAgencies[key] = [];
// //     if (!carAgencies[key].some(d => d.agency === car.agency)) {
// //       carAgencies[key].push({
// //         agency: car.agency,
// //         price: car.price,
// //         fuelPolicy: car.fuel_policy || "Not specified",
// //         id: car.id,
// //       });
// //     }
// //   });

// //   const toggleFavorite = (carId) => {
// //     setCars(prev => prev.map(car => car.id === carId ? { ...car, isFavorite: !car.isFavorite } : car));
// //   };

// //   const handleBookNow = (car, deal) => {
// //     navigate("/car-confirmation", {
// //       state: {
// //         ...locationState,
// //         car,
// //         selectedDeal: deal,
// //       },
// //     });
// //   };

// //   const makes = ["Volkswagen", "Toyota", "Ford", "Hyundai", "Honda"];

// //   return (
// //     <>
// //       {/* Tabs Section */}
// //       <div className="mb-4 flex space-x-2">
// //         {makes.map((make) => (
// //           <button
// //             key={make}
// //             onClick={() => setActiveMake(make)}
// //             className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeMake === make ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
// //           >
// //             {make}
// //           </button>
// //         ))}
// //       </div>

// //       {uniqueCars.length > 0 ? (
// //         uniqueCars.map((car) => (
// //           <div
// //             key={car.id}
// //             className="bg-white p-4 sm:p-6 rounded-2xl mb-4 sm:mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
// //           >
// //             <div className="flex items-center justify-between mb-3 sm:mb-4">
// //               <div className="flex items-center space-x-2 sm:space-x-3">
// //                 <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
// //                   {car.model} {/* Display only the model */}
// //                 </h3>
// //                 <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{car.type}</span>
// //               </div>
// //               <button onClick={() => toggleFavorite(car.id)} className="text-gray-400 hover:text-red-500 transition-colors">
// //                 <FaHeart size={20} />
// //               </button>
// //             </div>

// //             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">
// //               <div className="sm:w-1/3">
// //                 <img src={getImageUrl(car.model)} alt={`${car.make} ${car.model}`} className="w-full h-32 sm:h-40 object-contain rounded-lg bg-gray-50 p-2" />
// //               </div>
// //               <div className="sm:w-2/3 flex flex-col justify-between">
// //                 <div className="grid grid-cols-2 gap-2 sm:gap-4">
// //                   <div className="flex items-center space-x-2 text-gray-600">
// //                     <FaUserFriends size={14} />
// //                     <span className="text-xs sm:text-sm">{car.passengers} Passengers</span>
// //                   </div>
// //                   <div className="flex items-center space-x-2 text-gray-600">
// //                     <FaSnowflake size={14} />
// //                     <span className="text-xs sm:text-sm">{car.ac === "Yes" ? "Air Conditioning" : "No AC"}</span>
// //                   </div>
// //                   <div className="flex items-center space-x-2 text-gray-600">
// //                     <FaCogs size={14} />
// //                     <span className="text-xs sm:text-sm">{car.transmission}</span>
// //                   </div>
// //                   <div className="flex items-center space-x-2 text-gray-600">
// //                     <FaStar size={14} className="text-yellow-400" />
// //                     <span className="text-xs sm:text-sm">{car.ratings}/5</span>
// //                   </div>
// //                 </div>
// //                 <div className="mt-3 sm:mt-4 flex items-center justify-end">
// //                   <button
// //                     onClick={() => toggleDeals(car.id)}
// //                     className="flex items-center text-blue-600 font-semibold hover:text-blue-800 cursor-pointer transition-colors text-sm sm:text-base"
// //                   >
// //                     View Deals {expandedCarId === car.id ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />}
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>

// //             {expandedCarId === car.id && (
// //               <div className="mt-4 border-t pt-4">
// //                 <h4 className="text-lg font-semibold mb-2">Available Agencies</h4>
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                   {carAgencies[`${car.make}-${car.model}`]
// //                     .filter((deal, index, self) => 
// //                       index === self.findIndex((d) => d.agency === deal.agency)
// //                     )
// //                     .slice(0, 5)
// //                     .map((deal) => (
// //                       <div key={deal.id} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
// //                         <div>
// //                           <p className="font-semibold">{deal.agency}</p>
// //                           <p className="text-sm text-gray-600">₹{deal.price}/hour</p>
// //                           <p className="text-sm text-gray-600">Fuel Policy: {deal.fuelPolicy}</p>
// //                         </div>
// //                         <button
// //                           onClick={() => handleBookNow(car, deal)}
// //                           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
// //                         >
// //                           Book Now
// //                         </button>
// //                       </div>
// //                     ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         ))
// //       ) : (
// //         <div className="bg-white rounded-xl p-6 sm:p-8 text-center shadow-md">
// //           <p className="text-base sm:text-lg text-gray-800">No cars available for this location.</p>
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default CarCard;







// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaHeart, FaUserFriends, FaSnowflake, FaCogs, FaStar, FaChevronDown, FaChevronUp } from "react-icons/fa";
// import axios from "axios";

// const CarCard = ({ cars, locationState }) => {
//   const navigate = useNavigate();
//   const [expandedCarId, setExpandedCarId] = useState(null);
//   const [activeMake, setActiveMake] = useState("Volkswagen");

//   const toggleDeals = (carId) => {
//     setExpandedCarId(expandedCarId === carId ? null : carId);
//   };

//   // Comprehensive mapping of car models to specific image URLs
//   const modelImageMap = {
//     // Volkswagen models
//     "Golf": "https://www.vw.com/en/models/golf/2024/gallery/exterior/01-golf-exterior-front-three-quarter.html", // Official VW Golf image
//     "Tiguan": "https://www.vw.com/en/models/tiguan/2024/gallery/exterior/01-tiguan-exterior-front-three-quarter.html", // Official VW Tiguan image
//     "Passat": "https://www.vw.com/en/models/passat/2024/gallery/exterior/01-passat-exterior-front-three-quarter.html", // Official VW Passat image
//     "Jetta": "https://www.vw.com/en/models/jetta/2024/gallery/exterior/01-jetta-exterior-front-three-quarter.html", // Official VW Jetta image
//     "Atlas": "https://www.vw.com/en/models/atlas/2024/gallery/exterior/01-atlas-exterior-front-three-quarter.html", // Official VW Atlas image
//     "ID.4": "https://www.vw.com/en/models/id4/2024/gallery/exterior/01-id4-exterior-front-three-quarter.html", // Official VW ID.4 image
//     "Touareg": "https://www.vw.com/en/models/touareg/2024/gallery/exterior/01-touareg-exterior-front-three-quarter.html", // Official VW Touareg image
//     "Arteon": "https://www.vw.com/en/models/arteon/2024/gallery/exterior/01-arteon-exterior-front-three-quarter.html", // Official VW Arteon image

//     // Toyota models
//     "Camry": "https://www.toyota.com/camry/2024/gallery/exterior/01-camry-exterior-front-three-quarter.jpg", // Official Toyota Camry image
//     "RAV4": "https://www.toyota.com/rav4/2024/gallery/exterior/01-rav4-exterior-front-three-quarter.jpg", // Official Toyota RAV4 image
//     "Corolla": "https://www.toyota.com/corolla/2024/gallery/exterior/01-corolla-exterior-front-three-quarter.jpg", // Official Toyota Corolla image
//     "Highlander": "https://www.toyota.com/highlander/2024/gallery/exterior/01-highlander-exterior-front-three-quarter.jpg", // Official Toyota Highlander image
//     "Tacoma": "https://www.toyota.com/tacoma/2024/gallery/exterior/01-tacoma-exterior-front-three-quarter.jpg", // Official Toyota Tacoma image
//     "Sienna": "https://www.toyota.com/sienna/2024/gallery/exterior/01-sienna-exterior-front-three-quarter.jpg", // Official Toyota Sienna image
//     "Prius": "https://www.toyota.com/prius/2024/gallery/exterior/01-prius-exterior-front-three-quarter.jpg", // Official Toyota Prius image
//     "4Runner": "https://www.toyota.com/4runner/2024/gallery/exterior/01-4runner-exterior-front-three-quarter.jpg", // Official Toyota 4Runner image

//     // Ford models
//     "Endeavor": "https://www.ford.com/cmslibs/content/dam/vdm_ford/live/en_us/ford/nameplate/endeavour/2024/collections/01-endeavour-exterior-front-three-quarter.jpg", // Ford Endeavour image (Note: Endeavour is marketed as Everest in some regions)
//     "Escape": "https://www.ford.com/cmslibs/content/dam/vdm_ford/live/en_us/ford/nameplate/escape/2024/collections/01-escape-exterior-front-three-quarter.jpg", // Official Ford Escape image
//     "F-150": "https://www.ford.com/cmslibs/content/dam/vdm_ford/live/en_us/ford/nameplate/f150/2024/collections/01-f150-exterior-front-three-quarter.jpg", // Official Ford F-150 image
//     "Explorer": "https://www.ford.com/cmslibs/content/dam/vdm_ford/live/en_us/ford/nameplate/explorer/2024/collections/01-explorer-exterior-front-three-quarter.jpg", // Official Ford Explorer image
//     "Mustang": "https://www.ford.com/cmslibs/content/dam/vdm_ford/live/en_us/ford/nameplate/mustang/2024/collections/01-mustang-exterior-front-three-quarter.jpg", // Official Ford Mustang image
//     "Edge": "https://www.ford.com/cmslibs/content/dam/vdm_ford/live/en_us/ford/nameplate/edge/2024/collections/01-edge-exterior-front-three-quarter.jpg", // Official Ford Edge image
//     "Ranger": "https://www.ford.com/cmslibs/content/dam/vdm_ford/live/en_us/ford/nameplate/ranger/2024/collections/01-ranger-exterior-front-three-quarter.jpg", // Official Ford Ranger image
//     "Bronco": "https://www.ford.com/cmslibs/content/dam/vdm_ford/live/en_us/ford/nameplate/bronco/2024/collections/01-bronco-exterior-front-three-quarter.jpg", // Official Ford Bronco image

//     // Hyundai models
//     "Tucson": "https://www.hyundaiusa.com/us/en/vehicles/tucson/2024/gallery/exterior/01-tucson-exterior-front-three-quarter.jpg", // Official Hyundai Tucson image
//     "Sonata": "https://www.hyundaiusa.com/us/en/vehicles/sonata/2024/gallery/exterior/01-sonata-exterior-front-three-quarter.jpg", // Official Hyundai Sonata image
//     "Elantra": "https://www.hyundaiusa.com/us/en/vehicles/elantra/2024/gallery/exterior/01-elantra-exterior-front-three-quarter.jpg", // Official Hyundai Elantra image
//     "Santa Fe": "https://www.hyundaiusa.com/us/en/vehicles/santa-fe/2024/gallery/exterior/01-santa-fe-exterior-front-three-quarter.jpg", // Official Hyundai Santa Fe image
//     "Kona": "https://www.hyundaiusa.com/us/en/vehicles/kona/2024/gallery/exterior/01-kona-exterior-front-three-quarter.jpg", // Official Hyundai Kona image
//     "Palisade": "https://www.hyundaiusa.com/us/en/vehicles/palisade/2024/gallery/exterior/01-palisade-exterior-front-three-quarter.jpg", // Official Hyundai Palisade image
//     "Venue": "https://www.hyundaiusa.com/us/en/vehicles/venue/2024/gallery/exterior/01-venue-exterior-front-three-quarter.jpg", // Official Hyundai Venue image
//     "Ioniq 5": "https://www.hyundaiusa.com/us/en/vehicles/ioniq-5/2024/gallery/exterior/01-ioniq5-exterior-front-three-quarter.jpg", // Official Hyundai Ioniq 5 image

//     // Honda models
//     "Civic": "https://automobiles.honda.com/civic-sedan/2024/gallery/exterior/01-civic-exterior-front-three-quarter.jpg", // Official Honda Civic image
//     "CR-V": "https://automobiles.honda.com/cr-v/2024/gallery/exterior/01-cr-v-exterior-front-three-quarter.jpg", // Official Honda CR-V image
//     "Accord": "https://automobiles.honda.com/accord-sedan/2024/gallery/exterior/01-accord-exterior-front-three-quarter.jpg", // Official Honda Accord image
//     "Pilot": "https://automobiles.honda.com/pilot/2024/gallery/exterior/01-pilot-exterior-front-three-quarter.jpg", // Official Honda Pilot image
//     "HR-V": "https://automobiles.honda.com/hr-v/2024/gallery/exterior/01-hr-v-exterior-front-three-quarter.jpg", // Official Honda HR-V image
//     "Odyssey": "https://automobiles.honda.com/odyssey/2024/gallery/exterior/01-odyssey-exterior-front-three-quarter.jpg", // Official Honda Odyssey image
//     "Ridgeline": "https://automobiles.honda.com/ridgeline/2024/gallery/exterior/01-ridgeline-exterior-front-three-quarter.jpg", // Official Honda Ridgeline image
//     "Passport": "https://automobiles.honda.com/passport/2024/gallery/exterior/01-passport-exterior-front-three-quarter.jpg", // Official Honda Passport image

//     // Default image if model not found
//     "default": "https://www.vw.com/en/models/golf/2024/gallery/exterior/01-golf-exterior-front-three-quarter.html", // Using Golf as default
//   };

//   const getImageUrl = (model) => {
//     return modelImageMap[model] || modelImageMap["default"];
//   };

//   // Ensure only unique models for the active make (no padding)
//   const uniqueCars = [];
//   const seenModels = new Set();
//   const makeCars = cars.filter(car => car.make === activeMake); // Filter by active make
//   makeCars.forEach((car) => {
//     if (car.model && !seenModels.has(car.model) && uniqueCars.length < 8) {
//       seenModels.add(car.model);
//       uniqueCars.push(car); // Add first instance of each unique model
//     }
//   });
//   console.log("Displayed Models for", activeMake, ": ", uniqueCars.map(car => `${car.make} ${car.model}`)); // Debug
//   if (uniqueCars.length === 0) {
//     console.warn("No unique models found for", activeMake);
//   }

//   // Filter agencies for the specific car, limited to 5 unique agencies
//   const carAgencies = {};
//   cars.forEach((car) => {
//     const key = `${car.make}-${car.model}`; // Use make and model as key
//     if (!carAgencies[key]) carAgencies[key] = [];
//     if (!carAgencies[key].some(d => d.agency === car.agency)) {
//       carAgencies[key].push({
//         agency: car.agency,
//         price: car.price,
//         fuelPolicy: car.fuel_policy || "Not specified",
//         id: car.id,
//       });
//     }
//   });

//   const toggleFavorite = (carId) => {
//     setCars(prev => prev.map(car => car.id === carId ? { ...car, isFavorite: !car.isFavorite } : car));
//   };

//   const handleBookNow = (car, deal) => {
//     navigate("/car-confirmation", {
//       state: {
//         ...locationState,
//         car,
//         selectedDeal: deal,
//       },
//     });
//   };

//   const makes = ["Volkswagen", "Toyota", "Ford", "Hyundai", "Honda"];

//   return (
//     <>
//       {/* Tabs Section */}
//       <div className="mb-4 flex space-x-2">
//         {makes.map((make) => (
//           <button
//             key={make}
//             onClick={() => setActiveMake(make)}
//             className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeMake === make ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
//           >
//             {make}
//           </button>
//         ))}
//       </div>

//       {uniqueCars.length > 0 ? (
//         uniqueCars.map((car) => (
//           <div
//             key={car.id}
//             className="bg-white p-4 sm:p-6 rounded-2xl mb-4 sm:mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
//           >
//             <div className="flex items-center justify-between mb-3 sm:mb-4">
//               <div className="flex items-center space-x-2 sm:space-x-3">
//                 <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
//                   {car.model} {/* Display only the model */}
//                 </h3>
//                 <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{car.type}</span>
//               </div>
//               <button onClick={() => toggleFavorite(car.id)} className="text-gray-400 hover:text-red-500 transition-colors">
//                 <FaHeart size={20} />
//               </button>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">
//               <div className="sm:w-1/3">
//                 <img src={getImageUrl(car.model)} alt={`${car.make} ${car.model}`} className="w-full h-32 sm:h-40 object-contain rounded-lg bg-gray-50 p-2" />
//               </div>
//               <div className="sm:w-2/3 flex flex-col justify-between">
//                 <div className="grid grid-cols-2 gap-2 sm:gap-4">
//                   <div className="flex items-center space-x-2 text-gray-600">
//                     <FaUserFriends size={14} />
//                     <span className="text-xs sm:text-sm">{car.passengers} Passengers</span>
//                   </div>
//                   <div className="flex items-center space-x-2 text-gray-600">
//                     <FaSnowflake size={14} />
//                     <span className="text-xs sm:text-sm">{car.ac === "Yes" ? "Air Conditioning" : "No AC"}</span>
//                   </div>
//                   <div className="flex items-center space-x-2 text-gray-600">
//                     <FaCogs size={14} />
//                     <span className="text-xs sm:text-sm">{car.transmission}</span>
//                   </div>
//                   <div className="flex items-center space-x-2 text-gray-600">
//                     <FaStar size={14} className="text-yellow-400" />
//                     <span className="text-xs sm:text-sm">{car.ratings}/5</span>
//                   </div>
//                 </div>
//                 <div className="mt-3 sm:mt-4 flex items-center justify-end">
//                   <button
//                     onClick={() => toggleDeals(car.id)}
//                     className="flex items-center text-blue-600 font-semibold hover:text-blue-800 cursor-pointer transition-colors text-sm sm:text-base"
//                   >
//                     View Deals {expandedCarId === car.id ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {expandedCarId === car.id && (
//               <div className="mt-4 border-t pt-4">
//                 <h4 className="text-lg font-semibold mb-2">Available Agencies</h4>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {carAgencies[`${car.make}-${car.model}`]
//                     .filter((deal, index, self) => 
//                       index === self.findIndex((d) => d.agency === deal.agency)
//                     )
//                     .slice(0, 5)
//                     .map((deal) => (
//                       <div key={deal.id} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
//                         <div>
//                           <p className="font-semibold">{deal.agency}</p>
//                           <p className="text-sm text-gray-600">₹{deal.price}/hour</p>
//                           <p className="text-sm text-gray-600">Fuel Policy: {deal.fuelPolicy}</p>
//                         </div>
//                         <button
//                           onClick={() => handleBookNow(car, deal)}
//                           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//                         >
//                           Book Now
//                         </button>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         ))
//       ) : (
//         <div className="bg-white rounded-xl p-6 sm:p-8 text-center shadow-md">
//           <p className="text-base sm:text-lg text-gray-800">No cars available for this location.</p>
//         </div>
//       )}
//     </>
//   );
// };

// export default CarCard;




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaUserFriends, FaSnowflake, FaCogs, FaStar, FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";

const CarCard = ({ cars, locationState }) => {
  const navigate = useNavigate();
  const [expandedCarId, setExpandedCarId] = useState(null);
  const [activeMake, setActiveMake] = useState("Volkswagen");

  const toggleDeals = (carId) => {
    setExpandedCarId(expandedCarId === carId ? null : carId);
  };

  // Updated mapping of car models to static image URLs
  const modelImageMap = {
    // Volkswagen models
    "Golf": "https://www.vw.com/content/dam/vw/us/presite/2023/golf-gti/images/2023-vw-golf-gti-exterior-front-three-quarter.jpg", // VW Golf GTI 2023
    "Tiguan": "https://www.vw.com/content/dam/vw/us/presite/2023/tiguan/images/2023-vw-tiguan-exterior-front-three-quarter.jpg", // VW Tiguan 2023
    "Passat": "https://www.vw.com/content/dam/vw/us/presite/2022/passat/images/2022-vw-passat-exterior-front-three-quarter.jpg", // VW Passat 2022
    "Jetta": "https://www.vw.com/content/dam/vw/us/presite/2023/jetta/images/2023-vw-jetta-exterior-front-three-quarter.jpg", // VW Jetta 2023
    "Atlas": "https://www.vw.com/content/dam/vw/us/presite/2023/atlas/images/2023-vw-atlas-exterior-front-three-quarter.jpg", // VW Atlas 2023
    "ID.4": "https://www.vw.com/content/dam/vw/us/presite/2023/id4/images/2023-vw-id4-exterior-front-three-quarter.jpg", // VW ID.4 2023
    "Touareg": "https://www.vw.com/content/dam/vw/us/presite/2022/touareg/images/2022-vw-touareg-exterior-front-three-quarter.jpg", // VW Touareg 2022
    "Arteon": "https://www.vw.com/content/dam/vw/us/presite/2022/arteon/images/2022-vw-arteon-exterior-front-three-quarter.jpg", // VW Arteon 2022

    // Toyota models
    "Camry": "https://www.toyota.com/imgix/cms/dev-2023-na-camry-mmp-01-exteriorfrontthreequarter-1.png", // Toyota Camry 2023
    "RAV4": "https://www.toyota.com/imgix/cms/dev-2023-na-rav4-mmp-01-exteriorfrontthreequarter-1.png", // Toyota RAV4 2023
    "Corolla": "https://www.toyota.com/imgix/cms/dev-2023-na-corolla-mmp-01-exteriorfrontthreequarter-1.png", // Toyota Corolla 2023
    "Highlander": "https://www.toyota.com/imgix/cms/dev-2023-na-highlander-mmp-01-exteriorfrontthreequarter-1.png", // Toyota Highlander 2023
    "Tacoma": "https://www.toyota.com/imgix/cms/dev-2023-na-tacoma-mmp-01-exteriorfrontthreequarter-1.png", // Toyota Tacoma 2023
    "Sienna": "https://www.toyota.com/imgix/cms/dev-2023-na-sienna-mmp-01-exteriorfrontthreequarter-1.png", // Toyota Sienna 2023
    "Prius": "https://www.toyota.com/imgix/cms/dev-2023-na-prius-mmp-01-exteriorfrontthreequarter-1.png", // Toyota Prius 2023
    "4Runner": "https://www.toyota.com/imgix/cms/dev-2023-na-4runner-mmp-01-exteriorfrontthreequarter-1.png", // Toyota 4Runner 2023

    // Ford models
    "Endeavor": "https://media.ford.com/content/fordmedia/ane/en_gb/news/2023/04/03/ford-everest-makes-australian-debut/_jcr_content/par/image_0.img.jpg", // Ford Everest (Endeavor) 2023
    "Escape": "https://media.ford.com/content/fordmedia/na/us/en/news/2023/02/02/2023-ford-escape/_jcr_content/par/image_0.img.jpg", // Ford Escape 2023
    "F-150": "https://media.ford.com/content/fordmedia/na/us/en/news/2023/01/12/2023-ford-f-150/_jcr_content/par/image_0.img.jpg", // Ford F-150 2023
    "Explorer": "https://media.ford.com/content/fordmedia/na/us/en/news/2023/03/01/2023-ford-explorer/_jcr_content/par/image_0.img.jpg", // Ford Explorer 2023
    "Mustang": "https://media.ford.com/content/fordmedia/na/us/en/news/2023/05/05/2023-ford-mustang/_jcr_content/par/image_0.img.jpg", // Ford Mustang 2023
    "Edge": "https://media.ford.com/content/fordmedia/na/us/en/news/2022/10/12/2023-ford-edge/_jcr_content/par/image_0.img.jpg", // Ford Edge 2023
    "Ranger": "https://media.ford.com/content/fordmedia/na/us/en/news/2023/04/04/2023-ford-ranger/_jcr_content/par/image_0.img.jpg", // Ford Ranger 2023
    "Bronco": "https://media.ford.com/content/fordmedia/na/us/en/news/2023/02/15/2023-ford-bronco/_jcr_content/par/image_0.img.jpg", // Ford Bronco 2023

    // Hyundai models
    "Tucson": "https://www.hyundai.com/worldwide/en/images/model/tucson/2023/exterior/01-tucson-exterior-front-three-quarter.jpg", // Hyundai Tucson 2023
    "Sonata": "https://www.hyundai.com/worldwide/en/images/model/sonata/2023/exterior/01-sonata-exterior-front-three-quarter.jpg", // Hyundai Sonata 2023
    "Elantra": "https://www.hyundai.com/worldwide/en/images/model/elantra/2023/exterior/01-elantra-exterior-front-three-quarter.jpg", // Hyundai Elantra 2023
    "Santa Fe": "https://www.hyundai.com/worldwide/en/images/model/santa-fe/2023/exterior/01-santa-fe-exterior-front-three-quarter.jpg", // Hyundai Santa Fe 2023
    "Kona": "https://www.hyundai.com/worldwide/en/images/model/kona/2023/exterior/01-kona-exterior-front-three-quarter.jpg", // Hyundai Kona 2023
    "Palisade": "https://www.hyundai.com/worldwide/en/images/model/palisade/2023/exterior/01-palisade-exterior-front-three-quarter.jpg", // Hyundai Palisade 2023
    "Venue": "https://www.hyundai.com/worldwide/en/images/model/venue/2023/exterior/01-venue-exterior-front-three-quarter.jpg", // Hyundai Venue 2023
    "Ioniq 5": "https://www.hyundai.com/worldwide/en/images/model/ioniq5/2023/exterior/01-ioniq5-exterior-front-three-quarter.jpg", // Hyundai Ioniq 5 2023

    // Honda models
    "Civic": "https://automobiles.honda.com/-/media/honda-automobiles/vehicles/2023/civic-sedan/images/2023-civic-sedan-exterior-front-three-quarter.jpg", // Honda Civic 2023
    "CR-V": "https://automobiles.honda.com/-/media/honda-automobiles/vehicles/2023/cr-v/images/2023-cr-v-exterior-front-three-quarter.jpg", // Honda CR-V 2023
    "Accord": "https://automobiles.honda.com/-/media/honda-automobiles/vehicles/2023/accord-sedan/images/2023-accord-sedan-exterior-front-three-quarter.jpg", // Honda Accord 2023
    "Pilot": "https://automobiles.honda.com/-/media/honda-automobiles/vehicles/2023/pilot/images/2023-pilot-exterior-front-three-quarter.jpg", // Honda Pilot 2023
    "HR-V": "https://automobiles.honda.com/-/media/honda-automobiles/vehicles/2023/hr-v/images/2023-hr-v-exterior-front-three-quarter.jpg", // Honda HR-V 2023
    "Odyssey": "https://automobiles.honda.com/-/media/honda-automobiles/vehicles/2023/odyssey/images/2023-odyssey-exterior-front-three-quarter.jpg", // Honda Odyssey 2023
    "Ridgeline": "https://automobiles.honda.com/-/media/honda-automobiles/vehicles/2023/ridgeline/images/2023-ridgeline-exterior-front-three-quarter.jpg", // Honda Ridgeline 2023
    "Passport": "https://automobiles.honda.com/-/media/honda-automobiles/vehicles/2023/passport/images/2023-passport-exterior-front-three-quarter.jpg", // Honda Passport 2023

    // Default image if model not found
    "default": "https://www.vw.com/content/dam/vw/us/presite/2023/golf-gti/images/2023-vw-golf-gti-exterior-front-three-quarter.jpg", // VW Golf as default
  };

  const getImageUrl = (model) => {
    return modelImageMap[model] || modelImageMap["default"];
  };

  // Ensure only unique models for the active make (no padding)
  const uniqueCars = [];
  const seenModels = new Set();
  const makeCars = cars.filter(car => car.make === activeMake); // Filter by active make
  makeCars.forEach((car) => {
    if (car.model && !seenModels.has(car.model) && uniqueCars.length < 8) {
      seenModels.add(car.model);
      uniqueCars.push(car); // Add first instance of each unique model
    }
  });
  console.log("Displayed Models for", activeMake, ": ", uniqueCars.map(car => `${car.make} ${car.model}`)); // Debug
  if (uniqueCars.length === 0) {
    console.warn("No unique models found for", activeMake);
  }

  // Filter agencies for the specific car, limited to 5 unique agencies
  const carAgencies = {};
  cars.forEach((car) => {
    const key = `${car.make}-${car.model}`; // Use make and model as key
    if (!carAgencies[key]) carAgencies[key] = [];
    if (!carAgencies[key].some(d => d.agency === car.agency)) {
      carAgencies[key].push({
        agency: car.agency,
        price: car.price,
        fuelPolicy: car.fuel_policy || "Not specified",
        id: car.id,
      });
    }
  });

  const toggleFavorite = (carId) => {
    setCars(prev => prev.map(car => car.id === carId ? { ...car, isFavorite: !car.isFavorite } : car));
  };

  const handleBookNow = (car, deal) => {
    navigate("/car-confirmation", {
      state: {
        ...locationState,
        car,
        selectedDeal: deal,
      },
    });
  };

  const makes = ["Volkswagen", "Toyota", "Ford", "Hyundai", "Honda"];

  return (
    <>
      {/* Tabs Section */}
      <div className="mb-4 flex space-x-2">
        {makes.map((make) => (
          <button
            key={make}
            onClick={() => setActiveMake(make)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeMake === make ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
          >
            {make}
          </button>
        ))}
      </div>

      {uniqueCars.length > 0 ? (
        uniqueCars.map((car) => (
          <div
            key={car.id}
            className="bg-white p-4 sm:p-6 rounded-2xl mb-4 sm:mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
                  {car.model} {/* Display only the model */}
                </h3>
                <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{car.type}</span>
              </div>
              <button onClick={() => toggleFavorite(car.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                <FaHeart size={20} />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="sm:w-1/3">
                <img src={getImageUrl(car.model)} alt={`${car.make} ${car.model}`} className="w-full h-32 sm:h-40 object-contain rounded-lg bg-gray-50 p-2" />
              </div>
              <div className="sm:w-2/3 flex flex-col justify-between">
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <FaUserFriends size={14} />
                    <span className="text-xs sm:text-sm">{car.passengers} Passengers</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <FaSnowflake size={14} />
                    <span className="text-xs sm:text-sm">{car.ac === "Yes" ? "Air Conditioning" : "No AC"}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <FaCogs size={14} />
                    <span className="text-xs sm:text-sm">{car.transmission}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <FaStar size={14} className="text-yellow-400" />
                    <span className="text-xs sm:text-sm">{car.ratings}/5</span>
                  </div>
                </div>
                <div className="mt-3 sm:mt-4 flex items-center justify-end">
                  <button
                    onClick={() => toggleDeals(car.id)}
                    className="flex items-center text-blue-600 font-semibold hover:text-blue-800 cursor-pointer transition-colors text-sm sm:text-base"
                  >
                    View Deals {expandedCarId === car.id ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />}
                  </button>
                </div>
              </div>
            </div>

            {expandedCarId === car.id && (
              <div className="mt-4 border-t pt-4">
                <h4 className="text-lg font-semibold mb-2">Available Agencies</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {carAgencies[`${car.make}-${car.model}`]
                    .filter((deal, index, self) => 
                      index === self.findIndex((d) => d.agency === deal.agency)
                    )
                    .slice(0, 5)
                    .map((deal) => (
                      <div key={deal.id} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{deal.agency}</p>
                          <p className="text-sm text-gray-600">₹{deal.price}/hour</p>
                          <p className="text-sm text-gray-600">Fuel Policy: {deal.fuelPolicy}</p>
                        </div>
                        <button
                          onClick={() => handleBookNow(car, deal)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                          Book Now
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="bg-white rounded-xl p-6 sm:p-8 text-center shadow-md">
          <p className="text-base sm:text-lg text-gray-800">No cars available for this location.</p>
        </div>
      )}
    </>
  );
};

export default CarCard;