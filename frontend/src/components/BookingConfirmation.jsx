// // import React from "react";
// // import { Link } from "react-router-dom";

// // const BookingConfirmed = () => (
// //   <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //     <div className="text-center">
// //       <h1 className="text-3xl font-bold text-green-600">Booking Confirmed!</h1>
// //       <p className="mt-4 text-gray-600">Your car rental has been successfully booked.</p>
// //       <Link to="/" className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
// //         Back to Home
// //       </Link>
// //     </div>
// //   </div>
// // );

// // export default BookingConfirmed;





// import React from "react";
// import { Link, useLocation } from "react-router-dom";

// const BookingConfirmed = () => {
//   const location = useLocation();
//   const { car, selectedDeal, pickupLocation, pickupDate, pickupTime, dropoffDate, dropoffTime, dropoffLocation, isDifferentLocation } = location.state || {};

//   // Fallback values if state is missing
//   const carDetails = car || {};
//   const dealDetails = selectedDeal || {};
//   const pickupLoc = pickupLocation || "Not specified";
//   const dropoffLoc = isDifferentLocation && dropoffLocation ? dropoffLocation : pickupLocation || "Not specified";

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//       <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
//         <h1 className="text-3xl font-bold text-green-600">Booking Confirmed!</h1>
//         <p className="mt-4 text-gray-600">Your car rental has been successfully booked.</p>

//         {/* Booking Details Section */}
//         <div className="mt-6 text-left space-y-4">
//           <h2 className="text-xl font-semibold text-gray-800">Booking Details:</h2>
          
//           {/* Car Details */}
//           <div className="p-4 bg-gray-50 rounded-lg">
//             <p className="text-gray-700"><strong>Car Model:</strong> {carDetails.model || "Not specified"}</p>
//             <p className="text-gray-700"><strong>Make:</strong> {carDetails.make || "Not specified"}</p>
//             <p className="text-gray-700"><strong>Type:</strong> {carDetails.type || "Not specified"}</p>
//             <p className="text-gray-700"><strong>Passengers:</strong> {carDetails.passengers || "Not specified"}</p>
//             <p className="text-gray-700"><strong>Transmission:</strong> {carDetails.transmission || "Not specified"}</p>
//             <p className="text-gray-700"><strong>AC:</strong> {carDetails.ac === "Yes" ? "Yes" : "No"}</p>
//           </div>

//           {/* Agency and Price */}
//           <div className="p-4 bg-gray-50 rounded-lg">
//             <p className="text-gray-700"><strong>Agency:</strong> {dealDetails.agency || "Not specified"}</p>
//             <p className="text-gray-700"><strong>Price:</strong> ₹{dealDetails.price || "Not specified"}/hour</p>
//             <p className="text-gray-700"><strong>Fuel Policy:</strong> {dealDetails.fuelPolicy || "Not specified"}</p>
//           </div>

//           {/* Date and Time Details */}
//           <div className="p-4 bg-gray-50 rounded-lg">
//             <p className="text-gray-700"><strong>Pick-up Location:</strong> {pickupLoc}</p>
//             <p className="text-gray-700"><strong>Pick-up Date:</strong> {pickupDate || "Not specified"}</p>
//             <p className="text-gray-700"><strong>Pick-up Time:</strong> {pickupTime || "Not specified"}</p>
//             <p className="text-gray-700"><strong>Drop-off Location:</strong> {dropoffLoc}</p>
//             <p className="text-gray-700"><strong>Drop-off Date:</strong> {dropoffDate || "Not specified"}</p>
//             <p className="text-gray-700"><strong>Drop-off Time:</strong> {dropoffTime || "Not specified"}</p>
//           </div>
//         </div>

//         <Link
//           to="/"
//           className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           Back to Home
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default BookingConfirmed;





import React from "react";
import { Link, useLocation } from "react-router-dom";

const BookingConfirmed = () => {
  const location = useLocation();
  console.log("Navigation State:", location.state); // Debug log to check state

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
    isDifferentLocation = false 
  } = location.state || {};

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
  const dropoffLoc = isDifferentLocation && dropoffLocation ? dropoffLocation : pickupLocation;

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

export default BookingConfirmed;