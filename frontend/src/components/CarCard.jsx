// import React, { useState, useEffect } from "react";
// import { FaHeart, FaUserFriends, FaSnowflake, FaCogs, FaStar, FaChevronDown } from "react-icons/fa";
// import axios from "axios";

// const CarCard = ({ filteredCars }) => {
//   const [cars, setCars] = useState([]);
//   const [activeMake, setActiveMake] = useState("Volkswagen"); // Default active make

//   // Fetch data from backend
//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const response = await axios.get("http://localhost:5001"); // Replace with your backend API endpoint
//         const fetchedCars = response.data.map(car => ({
//           id: car.id,
//           make: car.make,
//           model: car.model,
//           type: car.type,
//           rating: car.rating,
//           passengers: car.passengers,
//           transmission: car.transmission,
//           image: getImageUrl(car.type), // Assign image based on type
//           isFavorite: false, // Default value
//         }));
//         setCars(fetchedCars);
//       } catch (error) {
//         console.error("Error fetching cars:", error);
//       }
//     };
//     fetchCars();
//   }, []);

//   // Function to assign image URL based on car type
//   const getImageUrl = (type) => {
//     switch (type) {
//       case "SUV":
//         return "https://i.pinimg.com/474x/0f/c8/36/0fc836701d156f6e42595709d7773b44.jpg"; // Toyota Innova
//       case "Sedan":
//         return "https://i.pinimg.com/474x/fd/52/67/fd5267988393235258b7b32763b67d05.jpg"; // Honda Civic
//       case "Luxury":
//         return "https://i.pinimg.com/474x/c5/72/49/c572495a735f8c9a42c9419524c90b23.jpg"; // Mercedes Benz X Class
//       case "Hatchback":
//         return "https://i.pinimg.com/474x/7a/3e/ba/7a3eba674c45f37f174582532d2671ed.jpg"; // Volkswagen Polo
//       default:
//         return "https://i.pinimg.com/474x/0f/c8/36/0fc836701d156f6e42595709d7773b44.jpg"; // Default to SUV image
//     }
//   };

//   const toggleFavorite = (carId) => {
//     setCars(prev => prev.map(car => car.id === carId ? { ...car, isFavorite: !car.isFavorite } : car));
//   };

//   const toggleDeals = (carId) => {
//     // Placeholder for future expansion
//     console.log(`View deals for car ID: ${carId}`);
//   };

//   // Filter cars by active make
//   const filteredCars = cars.filter(car => 
//     activeMake === "Ford" || car.carMake === activeMake
//   );

//   // Tabs array
//   const makes = ["Volkswagen", "Toyota", "Ford", "Honda", "Hyundai"];

//   return (
//     <>
//       {/* Tabs Section */}
//       <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6">
//         {makes.map(make => (
//           <button
//             key={make}
//             onClick={() => setActiveMake(make)}
//             className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-semibold transition-colors ${
//               activeMake === make
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 text-gray-800 hover:bg-gray-300"
//             }`}
//           >
//             {make}
//           </button>
//         ))}
//       </div>

//       {cars.length > 0 ? (
//         cars.map(car => (
//           <div
//             key={car.id}
//             className="bg-white p-4 sm:p-6 rounded-2xl mb-4 sm:mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
//           >
//             <div className="flex items-center justify-between mb-3 sm:mb-4">
//               <div className="flex items-center space-x-2 sm:space-x-3">
//                 <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">{car.model}</h3>
//                 <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{car.type}</span>
//               </div>
//               <button onClick={() => toggleFavorite(car.id)} className="text-gray-400 hover:text-red-500 transition-colors">
//                 <FaHeart className={car.isFavorite ? "text-red-500" : ""} size={20} />
//               </button>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">
//               <div className="sm:w-1/3">
//                 <img src={car.image} alt={car.model} className="w-full h-32 sm:h-40 object-contain rounded-lg bg-gray-50 p-2" />
//               </div>
//               <div className="sm:w-2/3 flex flex-col justify-between">
//                 <div className="grid grid-cols-2 gap-2 sm:gap-4">
//                   <div className="flex items-center space-x-2 text-gray-600">
//                     <FaUserFriends size={14} />
//                     <span className="text-xs sm:text-sm">{car.passengers} Passengers</span>
//                   </div>
//                   <div className="flex items-center space-x-2 text-gray-600">
//                     <FaSnowflake size={14} />
//                     <span className="text-xs sm:text-sm">Air Conditioning</span>
//                   </div>
//                   <div className="flex items-center space-x-2 text-gray-600">
//                     <FaCogs size={14} />
//                     <span className="text-xs sm:text-sm">{car.transmission}</span>
//                   </div>
//                   <div className="flex items-center space-x-2 text-gray-600">
//                     <FaStar size={14} className="text-yellow-400" />
//                     <span className="text-xs sm:text-sm">{car.rating}/5</span>
//                   </div>
//                 </div>
//                 <div className="mt-3 sm:mt-4 flex items-center justify-end">
//                   <button
//                     onClick={() => toggleDeals(car.id)}
//                     className="flex items-center text-blue-600 font-semibold hover:text-blue-800 cursor-pointer transition-colors text-sm sm:text-base"
//                   >
//                     View Deals <FaChevronDown className="ml-1 sm:ml-2 cursor-pointer" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div className="bg-white rounded-xl p-6 sm:p-8 text-center shadow-md">
//           <p className="text-base sm:text-lg text-gray-800">No cars available.</p>
//         </div>
//       )}
//     </>
//   );
// };

// export default CarCard;



import React, { useState, useEffect } from "react";
import { FaHeart, FaUserFriends, FaSnowflake, FaCogs, FaStar, FaChevronDown } from "react-icons/fa";
import axios from "axios";

const CarCard = () => { // Removed unused `filteredCars` prop
  const [cars, setCars] = useState([]);
  const [activeMake, setActiveMake] = useState("Volkswagen"); // Default active make

  // Fetch data from backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:5001"); // Your backend API endpoint
        const fetchedCars = response.data.map(car => ({
          id: car.id,
          make: car.make, 
          model: car.model,
          type: car.type,
          rating: car.rating,
          passengers: car.passengers,
          transmission: car.transmission,
          image: getImageUrl(car.type),
          isFavorite: false,
        }));
        console.log("Fetched Cars:", fetchedCars); // Debug: Check data
        setCars(fetchedCars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  // Function to assign image URL based on car type
  const getImageUrl = (type) => {
    switch (type) {
      case "SUV":
        return "https://i.pinimg.com/474x/0f/c8/36/0fc836701d156f6e42595709d7773b44.jpg";
      case "Sedan":
        return "https://i.pinimg.com/474x/fd/52/67/fd5267988393235258b7b32763b67d05.jpg";
      case "Luxury":
        return "https://i.pinimg.com/474x/c5/72/49/c572495a735f8c9a42c9419524c90b23.jpg";
      case "Hatchback":
        return "https://i.pinimg.com/474x/7a/3e/ba/7a3eba674c45f37f174582532d2671ed.jpg";
      default:
        return "https://i.pinimg.com/474x/0f/c8/36/0fc836701d156f6e42595709d7773b44.jpg";
    }
  };

  const toggleFavorite = (carId) => {
    setCars(prev => prev.map(car => car.id === carId ? { ...car, isFavorite: !car.isFavorite } : car));
  };

  const toggleDeals = (carId) => {
    console.log(`View deals for car ID: ${carId}`);
  };

  // Filter cars by active make
  const carsFilteredByMake = cars.filter(car => 
    car.make.toLowerCase() === activeMake.toLowerCase()
     // Case-insensitive match
  );

  // Tabs array
  const makes = ["Volkswagen", "Toyota", "Ford", "Honda", "Hyundai"];

  return (
    <>
      {/* Tabs Section */}
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6">
        {makes.map(make => (
          <button
            key={make}
            onClick={() => {
              setActiveMake(make);
              console.log("Selected Make:", make); // Debug: Check selected make
            }}
            className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-semibold transition-colors ${
              activeMake === make
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {make}
          </button>
        ))}
      </div>

      {/* Car Cards */}
      {carsFilteredByMake.length > 0 ? (
        carsFilteredByMake.map(car => (
          <div
            key={car.id}
            className="bg-white p-4 sm:p-6 rounded-2xl mb-4 sm:mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">{car.model}</h3>
                <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{car.type}</span>
              </div>
              <button onClick={() => toggleFavorite(car.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                <FaHeart className={car.isFavorite ? "text-red-500" : ""} size={20} />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="sm:w-1/3">
                <img src={car.image} alt={car.model} className="w-full h-32 sm:h-40 object-contain rounded-lg bg-gray-50 p-2" />
              </div>
              <div className="sm:w-2/3 flex flex-col justify-between">
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <FaUserFriends size={14} />
                    <span className="text-xs sm:text-sm">{car.passengers} Passengers</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <FaSnowflake size={14} />
                    <span className="text-xs sm:text-sm">Air Conditioning</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <FaCogs size={14} />
                    <span className="text-xs sm:text-sm">{car.transmission}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <FaStar size={14} className="text-yellow-400" />
                    <span className="text-xs sm:text-sm">{car.rating}/5</span>
                  </div>
                </div>
                <div className="mt-3 sm:mt-4 flex items-center justify-end">
                  <button
                    onClick={() => toggleDeals(car.id)}
                    className="flex items-center text-blue-600 font-semibold hover:text-blue-800 cursor-pointer transition-colors text-sm sm:text-base"
                  >
                    View Deals <FaChevronDown className="ml-1 sm:ml-2 cursor-pointer" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white rounded-xl p-6 sm:p-8 text-center shadow-md">
          <p className="text-base sm:text-lg text-gray-800">No cars available for {activeMake}.</p>
        </div>
      )}
    </>
  );
};

export default CarCard;