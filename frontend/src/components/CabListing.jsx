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
    </div>
  );
};

export default CabListing;