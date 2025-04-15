// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { FaCheckCircle, FaPlaneDeparture, FaHotel, FaCar } from "react-icons/fa";

// // const BookingConfirmation = () => {
// //   const navigate = useNavigate();
// //   const [bookingDetails, setBookingDetails] = useState(null);

// //   // Retrieve booking details from sessionStorage on component mount
// //   useEffect(() => {
// //     const storedDetails = sessionStorage.getItem("bookingDetails");
// //     if (storedDetails) {
// //       setBookingDetails(JSON.parse(storedDetails));
// //       // Clear sessionStorage to avoid stale data
// //       sessionStorage.removeItem("bookingDetails");
// //     }
// //   }, []);

// //   // Handle case where booking details are missing
// //   if (!bookingDetails) {
// //     return (
// //       <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
// //         <div className="bg-white rounded-lg shadow-lg p-6 max-w-md text-center">
// //           <h2 className="text-2xl font-bold mb-4 text-red-500">Error</h2>
// //           <p>No booking details found. Please complete the booking process.</p>
// //           <button
// //             onClick={() => navigate("/")}
// //             className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
// //           >
// //             Go to Home
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const { selectedFlight, selectedFare, searchParams } = bookingDetails;
// //   const { tripType, from, to, departDate, returnDate, multiCityFlights } = searchParams;
// //   const firstLeg = tripType === "multicity" ? selectedFlight.multiCityFlights?.[0] : selectedFlight;

// //   let flightSummary = "";
// //   if (tripType === "multicity" && multiCityFlights) {
// //     flightSummary = multiCityFlights
// //       .map((flight) => `${flight.from} → ${flight.to} • ${flight.depart}`)
// //       .join(" | ");
// //   } else if (tripType === "return") {
// //     flightSummary = `${from} → ${to} • ${departDate} - ${returnDate}`;
// //   } else if (tripType === "oneway") {
// //     flightSummary = `${from} → ${to} • ${departDate}`;
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 pb-12">
// //       <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full mb-6">
// //         <div className="flex items-center justify-center mb-4">
// //           <FaCheckCircle className="text-green-500 text-4xl mr-2" />
// //           <h2 className="text-2xl font-bold text-green-700">Booking Confirmed!</h2>
// //         </div>

// //         <div className="mb-4">
// //           <h3 className="text-lg font-semibold flex items-center">
// //             <FaPlaneDeparture className="mr-2 text-blue-500" />
// //             Flight Details
// //           </h3>
// //           {tripType === "multicity" && selectedFlight.multiCityFlights ? (
// //             selectedFlight.multiCityFlights.map((leg, index) => (
// //               <p key={index} className="text-gray-700">
// //                 {leg.departure} → {leg.arrival} • {leg.airline} • {leg.departureDate} • Departure at {leg.departureTime} - Arrival at {leg.arrivalTime}
// //               </p>
// //             ))
// //           ) : tripType === "return" && selectedFlight.returnFlight ? (
// //             <>
// //               <p className="text-gray-700">
// //                 Outbound: {firstLeg.departure} → {firstLeg.arrival} • {firstLeg.airline} • {departDate} • Departure at {firstLeg.departureTime} - Arrival at {firstLeg.arrivalTime}
// //               </p>
// //               <p className="text-gray-700">
// //                 Return: {selectedFlight.returnFlight.departure} → {selectedFlight.returnFlight.arrival} • {selectedFlight.returnFlight.airline} • {returnDate} • Departure at {selectedFlight.returnFlight.departureTime} - Arrival at {selectedFlight.returnFlight.arrivalTime}
// //               </p>
// //             </>
// //           ) : (
// //             <p className="text-gray-700">
// //               {firstLeg.departure} → {firstLeg.arrival} • {firstLeg.airline} • {departDate} • Departure at {firstLeg.departureTime} - Arrival at {firstLeg.arrivalTime}
// //             </p>
// //           )}
// //         </div>

// //         <div className="mb-4">
// //           <h3 className="text-lg font-semibold">Fare Details</h3>
// //           <p className="text-gray-700">
// //             Fare Type: {selectedFare.type} • ₹{selectedFare.price.toLocaleString()}
// //           </p>
// //           <p className="text-gray-700">Trip Type: {tripType === "oneway" ? "One Way" : tripType === "return" ? "Return" : "Multi-city"}</p>
// //           <p className="text-gray-700">Summary: {flightSummary}</p>
// //         </div>

// //         <div className="text-center">
// //           <p className="text-gray-600 mb-4">Thank you for your booking! A confirmation email has been sent to your registered email address.</p>
// //           <button
// //             onClick={() => navigate("/")}
// //             className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-blue-700"
// //           >
// //             Back to Home
// //           </button>
// //         </div>
// //       </div>

// //       <div><h2 className="text-2xl font-bold mb-5">--- Complete your trip ---</h2></div>
      
// //       {/* Hotel Card */}
// //       <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full mb-6">
// //         <div className="flex flex-col items-center mb-4">
// //           <div className="bg-yellow-100 rounded-full p-4 mb-4">
// //             <FaHotel className="text-yellow-500 text-4xl" />
// //           </div>
// //         </div>

// //         <div className="mb-6 text-center">
// //           <h2 className="text-xl font-semibold mb-2">Need a place to stay in?</h2>
// //           <p className="text-gray-700">Explore hotels in the best spots nearby.</p>
// //         </div>

// //         <div className="text-center">
// //           <button
// //             onClick={() => navigate("/hotels")}
// //             className="bg-blue-600 text-white px-8 py-2 cursor-pointer rounded-lg hover:bg-blue-700"
// //           >
// //             Explore hotels
// //           </button>
// //         </div>
// //       </div>
      
// //       {/* Car Hire Card */}
// //       <div className="bg-gray-100 rounded-lg shadow-lg p-6 max-w-lg w-full">
// //         <div className="flex flex-col items-center mb-4">
// //           <div className="bg-blue-100 rounded-full p-4 mb-4">
// //             <FaCar className="text-blue-500 text-4xl" />
// //           </div>
// //           <h2 className="text-xl font-semibold">Complete your car journey</h2>
// //         </div>

// //         <div className="mb-6 text-center">
// //           <p className="text-gray-700">Skip the crowds on public transport and relax on the road.</p>
// //         </div>

// //         <div className="text-center">
// //           <button
// //             onClick={() => navigate("/carhire")}
// //             className="bg-blue-600 text-white px-8 py-2 cursor-pointer rounded-lg hover:bg-blue-700"
// //           >
// //             Find a car
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BookingConfirmed;





// import React from "react";
// import { Link, useLocation } from "react-router-dom";

// const BookingConfirmed = () => {
//   const location = useLocation();
//   console.log("Navigation State:", location.state); // Debug log to verify state

//   // Destructure with fallbacks based on CarConfirmation
//   const { 
//     pickupLocation = "Not specified", 
//     pickupDate = "Not specified", 
//     pickupTime = "Not specified", 
//     dropoffDate = "Not specified", 
//     dropoffTime = "Not specified", 
//     car = {}, 
//     selectedDeal = {}, 
//     extras = { additionalDriver: false, extraLuggage: false, childSeat: false } 
//   } = location.state || {};

//   // Extract details with fallbacks
//   const carDetails = {
//     make: car.make || "Not specified",
//     model: car.model || "Not specified",
//     type: car.type || "Not specified",
//     passengers: car.passengers || "Not specified",
//     transmission: car.transmission || "Not specified",
//     fuelPolicy: car.fuel_policy || "Not specified",
//     ratings: car.ratings || "Not specified",
//   };
//   const dealDetails = {
//     agency: selectedDeal.agency || "Not specified",
//     price: selectedDeal.price ? `₹${selectedDeal.price}/hour` : "Not specified",
//   };
//   const dropoffLoc = pickupLocation; // Assuming same location unless isDifferentLocation is passed
//   const selectedExtras = [];
//   if (extras.additionalDriver) selectedExtras.push("Additional Driver (₹500)");
//   if (extras.extraLuggage) selectedExtras.push("Extra Luggage (₹300)");
//   if (extras.childSeat) selectedExtras.push("Child Seat (₹400)");

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex items-center justify-center p-4">
//       <div className="bg-white rounded-xl shadow-2xl p-8 max-w-3xl w-full transform transition-all duration-300 hover:shadow-3xl">
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
//               <p><strong>Make:</strong> {carDetails.make}</p>
//               <p><strong>Model:</strong> {carDetails.model}</p>
//               <p><strong>Type:</strong> {carDetails.type}</p>
//               <p><strong>Passengers:</strong> {carDetails.passengers}</p>
//               <p><strong>Transmission:</strong> {carDetails.transmission}</p>
//               <p><strong>Fuel Policy:</strong> {carDetails.fuelPolicy}</p>
//               <p><strong>Ratings:</strong> {carDetails.ratings}/5</p>
//             </div>
//           </div>

//           {/* Agency and Price */}
//           <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
//             <h3 className="text-xl font-medium text-gray-700 mb-4">Rental Details</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
//               <p><strong>Agency:</strong> {dealDetails.agency}</p>
//               <p><strong>Price per Hour:</strong> {dealDetails.price}</p>
//             </div>
//           </div>

//           {/* Date and Time Details */}
//           <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
//             <h3 className="text-xl font-medium text-gray-700 mb-4">Schedule</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
//               <p><strong>Pick-up Location:</strong> {pickupLocation}</p>
//               <p><strong>Pick-up Date & Time:</strong> {`${pickupDate} ${pickupTime}`}</p>
//               <p><strong>Drop-off Location:</strong> {dropoffLoc}</p>
//               <p><strong>Drop-off Date & Time:</strong> {`${dropoffDate} ${dropoffTime}`}</p>
//             </div>
//           </div>

//           {/* Extras Details */}
//           {selectedExtras.length > 0 && (
//             <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-100">
//               <h3 className="text-xl font-medium text-gray-700 mb-4">Selected Extras</h3>
//               <ul className="list-disc list-inside text-gray-600">
//                 {selectedExtras.map((extra, index) => (
//                   <li key={index}>{extra}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

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

// export default BookingConfirmed;






import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import queryString from 'query-string';

const BookingConfirmed = () => {
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const sessionId = queryParams.session_id; // Stripe replaces {CHECKOUT_SESSION_ID}

  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve the last booking data from localStorage
    const storedData = localStorage.getItem('lastBooking');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setBookingDetails(parsedData);
      } catch (err) {
        setError('Failed to parse booking data');
        console.error('Error parsing localStorage:', err);
      } finally {
        setLoading(false);
        // Clear the data after use to prevent reuse
        localStorage.removeItem('lastBooking');
      }
    } else {
      setError('No booking data found');
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="text-center py-10 text-gray-800">Loading...</div>;
  if (error || !bookingDetails) return <div className="text-center py-10 text-gray-800">{error || 'No booking details found'}</div>;

  const { pickupLocation, pickupDate, pickupTime, dropoffDate, dropoffTime, car, selectedDeal, extras } = bookingDetails;
  const carDetails = car || {};
  const dealDetails = selectedDeal || {};
  const dropoffLoc = pickupLocation;
  const selectedExtras = [];
  if (extras.additionalDriver) selectedExtras.push("Additional Driver (₹500)");
  if (extras.extraLuggage) selectedExtras.push("Extra Luggage (₹300)");
  if (extras.childSeat) selectedExtras.push("Child Seat (₹400)");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-3xl w-full transform transition-all duration-300 hover:shadow-3xl">
        <div className="text-center">
          <div className="inline-block bg-green-100 p-3 rounded-full mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-green-600 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 text-lg">Your car rental has been successfully booked. Enjoy your trip!</p>
        </div>
        <div className="mt-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-green-200 pb-2">Booking Details</h2>
          <div className="p-6 bg-green-50 rounded-lg border border-green-100">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Car Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
              <p><strong>Make:</strong> {carDetails.make}</p>
              <p><strong>Model:</strong> {carDetails.model}</p>
              <p><strong>Type:</strong> {carDetails.type}</p>
              <p><strong>Passengers:</strong> {carDetails.passengers}</p>
              <p><strong>Transmission:</strong> {carDetails.transmission}</p>
              <p><strong>Fuel Policy:</strong> {carDetails.fuelPolicy}</p>
              <p><strong>Ratings:</strong> {carDetails.ratings}/5</p>
            </div>
          </div>
          <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Rental Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
              <p><strong>Agency:</strong> {dealDetails.agency}</p>
              <p><strong>Price per Hour:</strong> {dealDetails.price ? `₹${dealDetails.price}/hour` : "Not specified"}</p>
            </div>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Schedule</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
              <p><strong>Pick-up Location:</strong> {pickupLocation}</p>
              <p><strong>Pick-up Date & Time:</strong> {`${pickupDate} ${pickupTime}`}</p>
              <p><strong>Drop-off Location:</strong> {dropoffLoc}</p>
              <p><strong>Drop-off Date & Time:</strong> {`${dropoffDate} ${dropoffTime}`}</p>
            </div>
          </div>
          {selectedExtras.length > 0 && (
            <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-100">
              <h3 className="text-xl font-medium text-gray-700 mb-4">Selected Extras</h3>
              <ul className="list-disc list-inside text-gray-600">
                {selectedExtras.map((extra, index) => <li key={index}>{extra}</li>)}
              </ul>
            </div>
          )}
        </div>
        <Link to="/" className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg">Back to Home</Link>
      </div>
    </div>
  );
};

export default BookingConfirmed;