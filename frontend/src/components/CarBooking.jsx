// import React from "react";
// import { Link, useLocation } from "react-router-dom";

// const CarBooking = () => {
//   const location = useLocation();
//   console.log("Navigation State:", location.state); // Debug log to check state

//   // Destructure with fallbacks
//   const { 
//     car = {}, 
//     selectedDeal = {}, 
//     pickupLocation = "Not specified", 
//     pickupDate = "Not specified", 
//     pickupTime = "Not specified", 
//     dropoffDate = "Not specified", 
//     dropoffTime = "Not specified", 
//     dropoffLocation = "Not specified", 
//     isDifferentLocation = false 
//   } = location.state || {};

//   // Extract car and deal details with fallbacks
//   const carDetails = {
//     model: car.model || "Not specified",
//     make: car.make || "Not specified",
//     type: car.type || "Not specified",
//     passengers: car.passengers || "Not specified",
//     transmission: car.transmission || "Not specified",
//     ac: car.ac || "Not specified",
//   };

//   const dealDetails = {
//     agency: selectedDeal.agency || "Not specified",
//     price: selectedDeal.price ? `₹${selectedDeal.price}/hour` : "Not specified",
//     fuelPolicy: selectedDeal.fuelPolicy || "Not specified",
//   };

//   const dropoffLoc = isDifferentLocation && dropoffLocation ? dropoffLocation : pickupLocation;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex items-center justify-center p-4">
//       <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full transform transition-all duration-300 hover:shadow-3xl">
//         <div className="text-center">
//           <div className="inline-block bg-green-100 p-3 rounded-full mb-4">
//             <svg
//               className="w-10 h-10 text-green-600"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M5 13l4 4L19 7"
//               ></path>
//             </svg>
//           </div>
//           <h1 className="text-4xl font-bold text-green-600 mb-2">Booking Confirmed!</h1>
//           <p className="text-gray-600 text-lg">Your car rental has been successfully booked. Enjoy your trip!</p>
//         </div>

//         {/* Booking Details Section */}
//         <div className="mt-6 space-y-6">
//           <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-green-200 pb-2">Booking Details</h2>

//           {/* Car Details */}
//           <div className="p-6 bg-green-50 rounded-lg border border-green-100">
//             <h3 className="text-xl font-medium text-gray-700 mb-4">Car Information</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
//               <p><strong>Model:</strong> {carDetails.model}</p>
//               <p><strong>Make:</strong> {carDetails.make}</p>
//               <p><strong>Type:</strong> {carDetails.type}</p>
//               <p><strong>Passengers:</strong> {carDetails.passengers}</p>
//               <p><strong>Transmission:</strong> {carDetails.transmission}</p>
//               <p><strong>AC:</strong> {carDetails.ac}</p>
//             </div>
//           </div>

//           {/* Agency and Price */}
//           <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
//             <h3 className="text-xl font-medium text-gray-700 mb-4">Rental Details</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
//               <p><strong>Agency:</strong> {dealDetails.agency}</p>
//               <p><strong>Price:</strong> {dealDetails.price}</p>
//               <p><strong>Fuel Policy:</strong> {dealDetails.fuelPolicy}</p>
//             </div>
//           </div>

//           {/* Date and Time Details */}
//           <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
//             <h3 className="text-xl font-medium text-gray-700 mb-4">Schedule</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
//               <p><strong>Pick-up Location:</strong> {pickupLocation}</p>
//               <p><strong>Pick-up Date:</strong> {pickupDate}</p>
//               <p><strong>Pick-up Time:</strong> {pickupTime}</p>
//               <p><strong>Drop-off Location:</strong> {dropoffLoc}</p>
//               <p><strong>Drop-off Date:</strong> {dropoffDate}</p>
//               <p><strong>Drop-off Time:</strong> {dropoffTime}</p>
//             </div>
//           </div>
//         </div>

//         <Link
//           to="/"
//           className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
//         >
//           Back to Home
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default CarBooking;


import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const CarBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Debug log to check state
  console.log("Navigation State:", location.state);

  // Check if location.state is missing
  if (!location.state) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">No booking details provided. Please book a car first.</p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Destructure with fallbacks
  const {
    car = {},
    selectedDeal = {},
    pickupLocation = "Not specified",
    pickupDate = "Not specified",
    pickupTime = "Not specified",
    dropoffDate = "Not specified",
    dropoffTime = "Not specified",
    dropoffLocation = "Not specified",
    isDifferentLocation = false,
  } = location.state;

  // Extract car and deal details with fallbacks
  const carDetails = {
    model: car.model || "Not specified",
    make: car.make || "Not specified",
    type: car.type || "Not specified",
    passengers: car.passengers || "Not specified",
    transmission: car.transmission || "Not specified",
    ac: car.ac || "Not specified",
  };

  const dealDetails = {
    agency: selectedDeal.agency || "Not specified",
    price: selectedDeal.price ? `₹${selectedDeal.price}/hour` : "Not specified",
    fuelPolicy: selectedDeal.fuelPolicy || "Not specified",
  };

  // Compute drop-off location with explicit fallback
  const dropoffLoc = isDifferentLocation && dropoffLocation !== "Not specified" ? dropoffLocation : pickupLocation;

  // Optional: Redirect to home if state is invalid (uncomment if needed)
  /*
  if (!car.model || !selectedDeal.agency) {
    navigate("/", { replace: true });
    return null;
  }
  */

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full transform transition-all duration-300 hover:shadow-3xl">
        <div className="text-center">
          <div className="inline-block bg-green-100 p-3 rounded-full mb-4">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-green-600 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 text-lg">Your car rental has been successfully booked. Enjoy your trip!</p>
        </div>

        {/* Booking Details Section */}
        <div className="mt-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-green-200 pb-2">Booking Details</h2>

          {/* Car Details */}
          <div className="p-6 bg-green-50 rounded-lg border border-green-100">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Car Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
              <p><strong>Model:</strong> {carDetails.model}</p>
              <p><strong>Make:</strong> {carDetails.make}</p>
              <p><strong>Type:</strong> {carDetails.type}</p>
              <p><strong>Passengers:</strong> {carDetails.passengers}</p>
              <p><strong>Transmission:</strong> {carDetails.transmission}</p>
              <p><strong>AC:</strong> {carDetails.ac}</p>
            </div>
          </div>

          {/* Agency and Price */}
          <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Rental Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
              <p><strong>Agency:</strong> {dealDetails.agency}</p>
              <p><strong>Price:</strong> {dealDetails.price}</p>
              <p><strong>Fuel Policy:</strong> {dealDetails.fuelPolicy}</p>
            </div>
          </div>

          {/* Date and Time Details */}
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Schedule</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
              <p><strong>Pick-up Location:</strong> {pickupLocation}</p>
              <p><strong>Pick-up Date:</strong> {pickupDate}</p>
              <p><strong>Pick-up Time:</strong> {pickupTime}</p>
              <p><strong>Drop-off Location:</strong> {dropoffLoc}</p>
              <p><strong>Drop-off Date:</strong> {dropoffDate}</p>
              <p><strong>Drop-off Time:</strong> {dropoffTime}</p>
            </div>
          </div>
        </div>

        <Link
          to="/"
          className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default CarBooking;