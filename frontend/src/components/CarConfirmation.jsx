// import React from "react";

// const CarConfirmation = ({ onCheckout }) => {
//   return (
//     <div>
//       <h1>Car Confirmation</h1>
//       <button onClick={onCheckout}>Proceed to Payment</button>
//     </div>
//   );
// };

// export default CarConfirmation;




// // src/components/CarConfirmation.js
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaUserFriends, FaSuitcase, FaCogs, FaMapMarkerAlt, FaStar } from "react-icons/fa";
// import Footer from "./Footer";

// const CarConfirmation = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { 
//     pickupLocation, 
//     pickupDate, 
//     pickupTime, 
//     dropoffDate, 
//     dropoffTime, 
//     carId, 
//     selectedDeal 
//   } = location.state || {};

//   const [carData, setCarData] = useState(null);
//   const [addOns, setAddOns] = useState({
//     addDriver: false,
//     childSeat: false,
//     luggageCarrier: false
//   });
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCarData = async () => {
//       try {
//         // Assuming your Flask API has an endpoint for individual car details
//         const response = await axios.get(`http://localhost:500/api/car/${carId}`);
//         setCarData(response.data);
//         calculatePrice(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching car data:", error);
//         setLoading(false);
//       }
//     };

//     if (carId) {
//       fetchCarData();
//     }
//   }, [carId]);

//   const calculatePrice = (car) => {
//     if (!car || !pickupDate || !dropoffDate) return;

//     const pickup = new Date(`${pickupDate}T${pickupTime}`);
//     const dropoff = new Date(`${dropoffDate}T${dropoffTime}`);
//     const hours = (dropoff - pickup) / (1000 * 60 * 60);
//     const days = Math.ceil(hours / 24);

//     let basePrice = days * (selectedDeal?.price || car.pricePerDay);
//     let additionalCost = 0;

//     if (addOns.addDriver) additionalCost += 2000; // ₹2000 for additional driver
//     if (addOns.childSeat) additionalCost += 500;  // ₹500 for child seat
//     if (addOns.luggageCarrier) additionalCost += 1000; // ₹1000 for luggage carrier

//     setTotalPrice(basePrice + additionalCost);
//   };

//   const handleAddOnChange = (e) => {
//     const { name, checked } = e.target;
//     setAddOns(prev => ({
//       ...prev,
//       [name]: checked
//     }));
//   };

//   useEffect(() => {
//     if (carData) calculatePrice(carData);
//   }, [addOns, carData]);

//   const handleConfirmBooking = () => {
//     const bookingDetails = {
//       pickupLocation,
//       pickupDate,
//       pickupTime,
//       dropoffDate,
//       dropoffTime,
//       carId,
//       carMake: carData.carMake,
//       carModel: carData.model,
//       totalPrice,
//       addOns,
//       agency: selectedDeal?.agency
//     };
//     // Here you could send bookingDetails to your backend
//     // For now, we'll just navigate back with a success message
//     navigate("/cabs", { 
//       state: { 
//         ...location.state, 
//         bookingConfirmed: true, 
//         bookingDetails 
//       } 
//     });
//   };

//   if (loading) return <div className="text-center py-10">Loading...</div>;
//   if (!carData) return <div className="text-center py-10">Car not found</div>;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto max-w-7xl px-4 py-8">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">Confirm Your Booking</h2>

//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Car Details */}
//             <div>
//               <div className="flex items-center space-x-3 mb-4">
//                 <h3 className="text-xl font-semibold text-gray-800">
//                   {carData.carMake} {carData.model}
//                 </h3>
//                 <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
//                   {carData.type}
//                 </span>
//               </div>
              
//               <img 
//                 src={carData.image} 
//                 alt={`${carData.carMake} ${carData.model}`} 
//                 className="w-full h-40 object-contain rounded-lg bg-gray-50 p-2 mb-4"
//               />

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="flex items-center space-x-2 text-gray-600">
//                   <FaUserFriends size={14} />
//                   <span className="text-sm">{carData.passengers} Passengers</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-gray-600">
//                   <FaSuitcase size={14} />
//                   <span className="text-sm">{carData.luggage} Luggage</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-gray-600">
//                   <FaCogs size={14} />
//                   <span className="text-sm">{carData.transmission}</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-gray-600">
//                   <FaMapMarkerAlt size={14} />
//                   <span className="text-sm">{carData.mileage}</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-gray-600">
//                   <FaStar size={14} className="text-yellow-400" />
//                   <span className="text-sm">
//                     {carData.rating}/10 ({carData.reviews.toLocaleString()} reviews)
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Booking Details */}
//             <div>
//               <h4 className="text-lg font-semibold text-gray-800 mb-4">Booking Details</h4>
//               <div className="space-y-3">
//                 <p className="text-gray-600">
//                   <span className="font-medium">Pickup:</span> {pickupLocation} on {pickupDate} at {pickupTime}
//                 </p>
//                 <p className="text-gray-600">
//                   <span className="font-medium">Dropoff:</span> {pickupLocation} on {dropoffDate} at {dropoffTime}
//                 </p>
//                 <p className="text-gray-600">
//                   <span className="font-medium">Agency:</span> {selectedDeal?.agency}
//                 </p>
//                 <p className="text-gray-600">
//                   <span className="font-medium">Base Price:</span> ₹{selectedDeal?.price.toLocaleString()}/day
//                 </p>
//               </div>

//               {/* Add-ons */}
//               <div className="mt-6">
//                 <h4 className="text-lg font-semibold text-gray-800 mb-3">Additional Options</h4>
//                 <div className="space-y-3">
//                   <label className="flex items-center text-gray-800">
//                     <input
//                       type="checkbox"
//                       name="addDriver"
//                       checked={addOns.addDriver}
//                       onChange={handleAddOnChange}
//                       className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
//                     />
//                     Additional Driver (₹2000)
//                   </label>
//                   <label className="flex items-center text-gray-800">
//                     <input
//                       type="checkbox"
//                       name="childSeat"
//                       checked={addOns.childSeat}
//                       onChange={handleAddOnChange}
//                       className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
//                     />
//                     Child Seat (₹500)
//                   </label>
//                   <label className="flex items-center text-gray-800">
//                     <input
//                       type="checkbox"
//                       name="luggageCarrier"
//                       checked={addOns.luggageCarrier}
//                       onChange={handleAddOnChange}
//                       className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
//                     />
//                     Luggage Carrier (₹1000)
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Price Summary */}
//           <div className="mt-6 border-t pt-4">
//             <div className="flex justify-between items-center">
//               <h4 className="text-lg font-semibold text-gray-800">Total Price</h4>
//               <span className="text-2xl font-bold text-gray-800">
//                 ₹{totalPrice.toLocaleString()}
//               </span>
//             </div>
//             <button
//               onClick={handleConfirmBooking}
//               className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//             >
//               Confirm Booking
//             </button>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default CarConfirmation;




import React, { useState, useEffect } from "react";
 import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // For future backend use
import { FaUserFriends, FaSuitcase, FaCogs, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import Footer from "./Footer";

const CarConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pickupLocation, pickupDate, pickupTime, dropoffDate, dropoffTime, car, selectedDeal } = location.state || {};

  const [carData, setCarData] = useState(car); // Use passed car data
  const [addOns, setAddOns] = useState({
    addDriver: false,
    childSeat: false,
    luggageCarrier: false,
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

 console.log("Location state:", location.state);

  // Optional backend fetch (commented out)
  /*
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:500/api/car/${car.id}`);
        console.log("API response:", response.data);
        setCarData(response.data);
      } catch (error) {
        console.error("Error fetching car data:", error);
        setCarData(car); // Fallback to passed data
      } finally {
        setLoading(false);
      }
    };
    // fetchCarData(); // Uncomment when backend is ready
  }, [car]);
  */

  const calculatePrice = (car) => {
    if (!car || !pickupDate || !dropoffDate) {
      console.log("Missing data for price calculation:", { car, pickupDate, dropoffDate });
      return;
    }
    const pickup = new Date(`${pickupDate}T${pickupTime}`);
    const dropoff = new Date(`${dropoffDate}T${dropoffTime}`);
    const hours = (dropoff - pickup) / (1000 * 60 * 60);
    const days = Math.ceil(hours / 24);
    let basePrice = days * (selectedDeal?.price || car.pricePerDay);
    let additionalCost = 0;

    if (addOns.addDriver) additionalCost += 2000;
    if (addOns.childSeat) additionalCost += 500;
    if (addOns.luggageCarrier) additionalCost += 1000;

    setTotalPrice(basePrice + additionalCost);
  };

  useEffect(() => {
    if (carData) calculatePrice(carData);
  }, [addOns, carData]);

  const handleAddOnChange = (e) => {
    const { name, checked } = e.target;
    setAddOns(prev => ({ ...prev, [name]: checked }));
  };

  const handleConfirmBooking = () => {
    const bookingDetails = {
      pickupLocation,
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
      carId: carData?.id,
      carMake: carData?.carMake,
      carModel: carData?.model,
      totalPrice,
      addOns,
      agency: selectedDeal?.agency,
    };
    navigate("/cabs", { state: { ...location.state, bookingConfirmed: true, bookingDetails } });
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!carData) return <div className="text-center py-10">Car not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Confirm Your Booking</h2>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {carData.carMake} {carData.model}
                </h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {carData.type}
                </span>
              </div>
              <img src={carData.image} alt={`${carData.carMake} ${carData.model}`} className="w-full h-40 object-contain rounded-lg bg-gray-50 p-2 mb-4" />
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <FaUserFriends size={14} />
                  <span className="text-sm">{carData.passengers} Passengers</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <FaSuitcase size={14} />
                  <span className="text-sm">{carData.luggage} Luggage</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <FaCogs size={14} />
                  <span className="text-sm">{carData.transmission}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <FaMapMarkerAlt size={14} />
                  <span className="text-sm">{carData.mileage}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <FaStar size={14} className="text-yellow-400" />
                  <span className="text-sm">{carData.rating}/10 ({carData.reviews.toLocaleString()} reviews)</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Booking Details</h4>
              <div className="space-y-3">
                <p className="text-gray-600"><span className="font-medium">Pickup:</span> {pickupLocation} on {pickupDate} at {pickupTime}</p>
                <p className="text-gray-600"><span className="font-medium">Dropoff:</span> {pickupLocation} on {dropoffDate} at {dropoffTime}</p>
                <p className="text-gray-600"><span className="font-medium">Agency:</span> {selectedDeal?.agency}</p>
                <p className="text-gray-600"><span className="font-medium">Base Price:</span> ₹{selectedDeal?.price.toLocaleString()}/day</p>
              </div>
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Additional Options</h4>
//                 <div className="space-y-3">
//                   <label className="flex items-center text-gray-800">
//                     <input type="checkbox" name="addDriver" checked={addOns.addDriver} onChange={handleAddOnChange} className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500" />
//                     Additional Driver (₹2000)
//                   </label>
//                   <label className="flex items-center text-gray-800">
//                     <input type="checkbox" name="childSeat" checked={addOns.childSeat} onChange={handleAddOnChange} className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500" />
//                     Child Seat (₹500)
//                   </label>
//                   <label className="flex items-center text-gray-800">
//                     <input type="checkbox" name="luggageCarrier" checked={addOns.luggageCarrier} onChange={handleAddOnChange} className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500" />
//                     Luggage Carrier (₹1000)
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="mt-6 border-t pt-4">
//             <div className="flex justify-between items-center">
//               <h4 className="text-lg font-semibold text-gray-800">Total Price</h4>
//               <span className="text-2xl font-bold text-gray-800">₹{totalPrice.toLocaleString()}</span>
//             </div>
//             <button onClick={handleConfirmBooking} className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
//               Confirm Booking
//             </button>
//           </div>
         </div>
      </div>
      <Footer />
   </div>
  );
};

export default CarConfirmation;