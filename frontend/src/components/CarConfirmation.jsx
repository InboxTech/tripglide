// // // // // // // // // // // // // // // // src/components/CarConfirmation.js
// // // // // // // // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // // // // // // // import { useLocation, useNavigate } from "react-router-dom";
// // // // // // // // // // // // // // // import axios from "axios";
// // // // // // // // // // // // // // // import { FaUserFriends, FaSuitcase, FaCogs, FaMapMarkerAlt, FaStar } from "react-icons/fa";
// // // // // // // // // // // // // // // import Footer from "./Footer";

// // // // // // // // // // // // // // // const CarConfirmation = () => {
// // // // // // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // // // // // //   const navigate = useNavigate();
// // // // // // // // // // // // // // //   const {
// // // // // // // // // // // // // // //     pickupLocation,
// // // // // // // // // // // // // // //     pickupDate,
// // // // // // // // // // // // // // //     pickupTime,
// // // // // // // // // // // // // // //     dropoffDate,
// // // // // // // // // // // // // // //     dropoffTime,
// // // // // // // // // // // // // // //     carId,
// // // // // // // // // // // // // // //     selectedDeal
// // // // // // // // // // // // // // //   } = location.state || {};

// // // // // // // // // // // // // // //   const [carData, setCarData] = useState(null);
// // // // // // // // // // // // // // //   const [addOns, setAddOns] = useState({
// // // // // // // // // // // // // // //     addDriver: false,
// // // // // // // // // // // // // // //     childSeat: false,
// // // // // // // // // // // // // // //     luggageCarrier: false
// // // // // // // // // // // // // // //   });
// // // // // // // // // // // // // // //   const [totalPrice, setTotalPrice] = useState(0);
// // // // // // // // // // // // // // //   const [loading, setLoading] = useState(true);

// // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // //     const fetchCarData = async () => {
// // // // // // // // // // // // // // //       try {
// // // // // // // // // // // // // // //         // Assuming your Flask API has an endpoint for individual car details
// // // // // // // // // // // // // // //         const response = await axios.get(`http://localhost:500/api/car/${carId}`);
// // // // // // // // // // // // // // //         setCarData(response.data);
// // // // // // // // // // // // // // //         calculatePrice(response.data);
// // // // // // // // // // // // // // //         setLoading(false);
// // // // // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // // // // //         console.error("Error fetching car data:", error);
// // // // // // // // // // // // // // //         setLoading(false);
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // //     if (carId) {
// // // // // // // // // // // // // // //       fetchCarData();
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   }, [carId]);

// // // // // // // // // // // // // // //   const calculatePrice = (car) => {
// // // // // // // // // // // // // // //     if (!car || !pickupDate || !dropoffDate) return;

// // // // // // // // // // // // // // //     const pickup = new Date(`${pickupDate}T${pickupTime}`);
// // // // // // // // // // // // // // //     const dropoff = new Date(`${dropoffDate}T${dropoffTime}`);
// // // // // // // // // // // // // // //     const hours = (dropoff - pickup) / (1000 * 60 * 60);
// // // // // // // // // // // // // // //     const days = Math.ceil(hours / 24);

// // // // // // // // // // // // // // //     let basePrice = days * (selectedDeal?.price || car.pricePerDay);
// // // // // // // // // // // // // // //     let additionalCost = 0;

// // // // // // // // // // // // // // //     if (addOns.addDriver) additionalCost += 2000; // ₹2000 for additional driver
// // // // // // // // // // // // // // //     if (addOns.childSeat) additionalCost += 500;  // ₹500 for child seat
// // // // // // // // // // // // // // //     if (addOns.luggageCarrier) additionalCost += 1000; // ₹1000 for luggage carrier

// // // // // // // // // // // // // // //     setTotalPrice(basePrice + additionalCost);
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const handleAddOnChange = (e) => {
// // // // // // // // // // // // // // //     const { name, checked } = e.target;
// // // // // // // // // // // // // // //     setAddOns(prev => ({
// // // // // // // // // // // // // // //       ...prev,
// // // // // // // // // // // // // // //       [name]: checked
// // // // // // // // // // // // // // //     }));
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // //     if (carData) calculatePrice(carData);
// // // // // // // // // // // // // // //   }, [addOns, carData]);

// // // // // // // // // // // // // // //   const handleConfirmBooking = () => {
// // // // // // // // // // // // // // //     const bookingDetails = {
// // // // // // // // // // // // // // //       pickupLocation,
// // // // // // // // // // // // // // //       pickupDate,
// // // // // // // // // // // // // // //       pickupTime,
// // // // // // // // // // // // // // //       dropoffDate,
// // // // // // // // // // // // // // //       dropoffTime,
// // // // // // // // // // // // // // //       carId,
// // // // // // // // // // // // // // //       carMake: carData.carMake,
// // // // // // // // // // // // // // //       carModel: carData.model,
// // // // // // // // // // // // // // //       totalPrice,
// // // // // // // // // // // // // // //       addOns,
// // // // // // // // // // // // // // //       agency: selectedDeal?.agency
// // // // // // // // // // // // // // //     };
// // // // // // // // // // // // // // //     // Here you could send bookingDetails to your backend
// // // // // // // // // // // // // // //     // For now, we'll just navigate back with a success message
// // // // // // // // // // // // // // //     navigate("/cabs", {
// // // // // // // // // // // // // // //       state: {
// // // // // // // // // // // // // // //         ...location.state,
// // // // // // // // // // // // // // //         bookingConfirmed: true,
// // // // // // // // // // // // // // //         bookingDetails
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     });
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   if (loading) return <div className="text-center py-10">Loading...</div>;
// // // // // // // // // // // // // // //   if (!carData) return <div className="text-center py-10">Car not found</div>;

// // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // //     <div className="min-h-screen bg-gray-50">
// // // // // // // // // // // // // // //       <div className="container mx-auto max-w-7xl px-4 py-8">
// // // // // // // // // // // // // // //         <h2 className="text-3xl font-bold text-gray-800 mb-6">Confirm Your Booking</h2>

// // // // // // // // // // // // // // //         <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
// // // // // // // // // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // // // // // // // // // // // //             {/* Car Details */}
// // // // // // // // // // // // // // //             <div>
// // // // // // // // // // // // // // //               <div className="flex items-center space-x-3 mb-4">
// // // // // // // // // // // // // // //                 <h3 className="text-xl font-semibold text-gray-800">
// // // // // // // // // // // // // // //                   {carData.carMake} {carData.model}
// // // // // // // // // // // // // // //                 </h3>
// // // // // // // // // // // // // // //                 <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
// // // // // // // // // // // // // // //                   {carData.type}
// // // // // // // // // // // // // // //                 </span>
// // // // // // // // // // // // // // //               </div>

// // // // // // // // // // // // // // //               <img
// // // // // // // // // // // // // // //                 src={carData.image}
// // // // // // // // // // // // // // //                 alt={`${carData.carMake} ${carData.model}`}
// // // // // // // // // // // // // // //                 className="w-full h-40 object-contain rounded-lg bg-gray-50 p-2 mb-4"
// // // // // // // // // // // // // // //               />

// // // // // // // // // // // // // // //               <div className="grid grid-cols-2 gap-4">
// // // // // // // // // // // // // // //                 <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // // // // //                   <FaUserFriends size={14} />
// // // // // // // // // // // // // // //                   <span className="text-sm">{carData.passengers} Passengers</span>
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //                 <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // // // // //                   <FaSuitcase size={14} />
// // // // // // // // // // // // // // //                   <span className="text-sm">{carData.luggage} Luggage</span>
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //                 <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // // // // //                   <FaCogs size={14} />
// // // // // // // // // // // // // // //                   <span className="text-sm">{carData.transmission}</span>
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //                 <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // // // // //                   <FaMapMarkerAlt size={14} />
// // // // // // // // // // // // // // //                   <span className="text-sm">{carData.mileage}</span>
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //                 <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // // // // //                   <FaStar size={14} className="text-yellow-400" />
// // // // // // // // // // // // // // //                   <span className="text-sm">
// // // // // // // // // // // // // // //                     {carData.rating}/10 ({carData.reviews.toLocaleString()} reviews)
// // // // // // // // // // // // // // //                   </span>
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //             </div>

// // // // // // // // // // // // // // //             {/* Booking Details */}
// // // // // // // // // // // // // // //             <div>
// // // // // // // // // // // // // // //               <h4 className="text-lg font-semibold text-gray-800 mb-4">Booking Details</h4>
// // // // // // // // // // // // // // //               <div className="space-y-3">
// // // // // // // // // // // // // // //                 <p className="text-gray-600">
// // // // // // // // // // // // // // //                   <span className="font-medium">Pickup:</span> {pickupLocation} on {pickupDate} at {pickupTime}
// // // // // // // // // // // // // // //                 </p>
// // // // // // // // // // // // // // //                 <p className="text-gray-600">
// // // // // // // // // // // // // // //                   <span className="font-medium">Dropoff:</span> {pickupLocation} on {dropoffDate} at {dropoffTime}
// // // // // // // // // // // // // // //                 </p>
// // // // // // // // // // // // // // //                 <p className="text-gray-600">
// // // // // // // // // // // // // // //                   <span className="font-medium">Agency:</span> {selectedDeal?.agency}
// // // // // // // // // // // // // // //                 </p>
// // // // // // // // // // // // // // //                 <p className="text-gray-600">
// // // // // // // // // // // // // // //                   <span className="font-medium">Base Price:</span> ₹{selectedDeal?.price.toLocaleString()}/day
// // // // // // // // // // // // // // //                 </p>
// // // // // // // // // // // // // // //               </div>

// // // // // // // // // // // // // // //               {/* Add-ons */}
// // // // // // // // // // // // // // //               <div className="mt-6">
// // // // // // // // // // // // // // //                 <h4 className="text-lg font-semibold text-gray-800 mb-3">Additional Options</h4>
// // // // // // // // // // // // // // //                 <div className="space-y-3">
// // // // // // // // // // // // // // //                   <label className="flex items-center text-gray-800">
// // // // // // // // // // // // // // //                     <input
// // // // // // // // // // // // // // //                       type="checkbox"
// // // // // // // // // // // // // // //                       name="addDriver"
// // // // // // // // // // // // // // //                       checked={addOns.addDriver}
// // // // // // // // // // // // // // //                       onChange={handleAddOnChange}
// // // // // // // // // // // // // // //                       className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
// // // // // // // // // // // // // // //                     />
// // // // // // // // // // // // // // //                     Additional Driver (₹2000)
// // // // // // // // // // // // // // //                   </label>
// // // // // // // // // // // // // // //                   <label className="flex items-center text-gray-800">
// // // // // // // // // // // // // // //                     <input
// // // // // // // // // // // // // // //                       type="checkbox"
// // // // // // // // // // // // // // //                       name="childSeat"
// // // // // // // // // // // // // // //                       checked={addOns.childSeat}
// // // // // // // // // // // // // // //                       onChange={handleAddOnChange}
// // // // // // // // // // // // // // //                       className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
// // // // // // // // // // // // // // //                     />
// // // // // // // // // // // // // // //                     Child Seat (₹500)
// // // // // // // // // // // // // // //                   </label>
// // // // // // // // // // // // // // //                   <label className="flex items-center text-gray-800">
// // // // // // // // // // // // // // //                     <input
// // // // // // // // // // // // // // //                       type="checkbox"
// // // // // // // // // // // // // // //                       name="luggageCarrier"
// // // // // // // // // // // // // // //                       checked={addOns.luggageCarrier}
// // // // // // // // // // // // // // //                       onChange={handleAddOnChange}
// // // // // // // // // // // // // // //                       className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
// // // // // // // // // // // // // // //                     />
// // // // // // // // // // // // // // //                     Luggage Carrier (₹1000)
// // // // // // // // // // // // // // //                   </label>
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // //           </div>

// // // // // // // // // // // // // // //           {/* Price Summary */}
// // // // // // // // // // // // // // //           <div className="mt-6 border-t pt-4">
// // // // // // // // // // // // // // //             <div className="flex justify-between items-center">
// // // // // // // // // // // // // // //               <h4 className="text-lg font-semibold text-gray-800">Total Price</h4>
// // // // // // // // // // // // // // //               <span className="text-2xl font-bold text-gray-800">
// // // // // // // // // // // // // // //                 ₹{totalPrice.toLocaleString()}
// // // // // // // // // // // // // // //               </span>
// // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // //             <button
// // // // // // // // // // // // // // //               onClick={handleConfirmBooking}
// // // // // // // // // // // // // // //               className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
// // // // // // // // // // // // // // //             >
// // // // // // // // // // // // // // //               Confirm Booking
// // // // // // // // // // // // // // //             </button>
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // //       <Footer />
// // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // export default CarConfirmation;

// // // // // // // // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // // // // // // // import { useLocation, useNavigate } from "react-router-dom";
// // // // // // // // // // // // // // // import axios from "axios"; // For future backend use
// // // // // // // // // // // // // // // import { FaUserFriends, FaSuitcase, FaCogs, FaMapMarkerAlt, FaStar } from "react-icons/fa";
// // // // // // // // // // // // // // // import Footer from "./Footer";

// // // // // // // // // // // // // // // const CarConfirmation = () => {
// // // // // // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // // // // // //   const navigate = useNavigate();
// // // // // // // // // // // // // // //   const { pickupLocation, pickupDate, pickupTime, dropoffDate, dropoffTime, car, selectedDeal } = location.state || {};

// // // // // // // // // // // // // // //   const [carData, setCarData] = useState(car); // Use passed car data
// // // // // // // // // // // // // // //   const [addOns, setAddOns] = useState({
// // // // // // // // // // // // // // //     addDriver: false,
// // // // // // // // // // // // // // //     childSeat: false,
// // // // // // // // // // // // // // //     luggageCarrier: false,
// // // // // // // // // // // // // // //   });
// // // // // // // // // // // // // // //   const [totalPrice, setTotalPrice] = useState(0);
// // // // // // // // // // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // // // // // // // // // //   console.log("Location state:", location.state);

// // // // // // // // // // // // // // // Optional backend fetch (commented out)
// // // // // // // // // // // // // // /*
// // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // //     const fetchCarData = async () => {
// // // // // // // // // // // // // //       try {
// // // // // // // // // // // // // //         setLoading(true);
// // // // // // // // // // // // // //         const response = await axios.get(`http://localhost:500/api/car/${car.id}`);
// // // // // // // // // // // // // //         console.log("API response:", response.data);
// // // // // // // // // // // // // //         setCarData(response.data);
// // // // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // // // //         console.error("Error fetching car data:", error);
// // // // // // // // // // // // // //         setCarData(car); // Fallback to passed data
// // // // // // // // // // // // // //       } finally {
// // // // // // // // // // // // // //         setLoading(false);
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     };
// // // // // // // // // // // // // //     // fetchCarData(); // Uncomment when backend is ready
// // // // // // // // // // // // // //   }, [car]);
// // // // // // // // // // // // // //   */

// // // // // // // // // // // // // // //   const calculatePrice = (car) => {
// // // // // // // // // // // // // // //     if (!car || !pickupDate || !dropoffDate) {
// // // // // // // // // // // // // // //       console.log("Missing data for price calculation:", { car, pickupDate, dropoffDate });
// // // // // // // // // // // // // // //       return;
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //     const pickup = new Date(`${pickupDate}T${pickupTime}`);
// // // // // // // // // // // // // // //     const dropoff = new Date(`${dropoffDate}T${dropoffTime}`);
// // // // // // // // // // // // // // //     const hours = (dropoff - pickup) / (1000 * 60 * 60);
// // // // // // // // // // // // // // //     const days = Math.ceil(hours / 24);
// // // // // // // // // // // // // // //     let basePrice = days * (selectedDeal?.price || car.pricePerDay);
// // // // // // // // // // // // // // //     let additionalCost = 0;

// // // // // // // // // // // // // // //     if (addOns.addDriver) additionalCost += 2000;
// // // // // // // // // // // // // // //     if (addOns.childSeat) additionalCost += 500;
// // // // // // // // // // // // // // //     if (addOns.luggageCarrier) additionalCost += 1000;

// // // // // // // // // // // // // // //     setTotalPrice(basePrice + additionalCost);
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // //     if (carData) calculatePrice(carData);
// // // // // // // // // // // // // // //   }, [addOns, carData]);

// // // // // // // // // // // // // // //   const handleAddOnChange = (e) => {
// // // // // // // // // // // // // // //     const { name, checked } = e.target;
// // // // // // // // // // // // // // //     setAddOns(prev => ({ ...prev, [name]: checked }));
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const handleConfirmBooking = () => {
// // // // // // // // // // // // // // //     const bookingDetails = {
// // // // // // // // // // // // // // //       pickupLocation,
// // // // // // // // // // // // // // //       pickupDate,
// // // // // // // // // // // // // // //       pickupTime,
// // // // // // // // // // // // // // //       dropoffDate,
// // // // // // // // // // // // // // //       dropoffTime,
// // // // // // // // // // // // // // //       carId: carData?.id,
// // // // // // // // // // // // // // //       carMake: carData?.carMake,
// // // // // // // // // // // // // // //       carModel: carData?.model,
// // // // // // // // // // // // // // //       totalPrice,
// // // // // // // // // // // // // // //       addOns,
// // // // // // // // // // // // // // //       agency: selectedDeal?.agency,
// // // // // // // // // // // // // // //     };
// // // // // // // // // // // // // // //     navigate("/cabs", { state: { ...location.state, bookingConfirmed: true, bookingDetails } });
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   if (loading) return <div className="text-center py-10">Loading...</div>;
// // // // // // // // // // // // // // //   if (!carData) return <div className="text-center py-10">Car not found</div>;

// // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // //     <div className="min-h-screen bg-gray-50">
// // // // // // // // // // // // // // //       <div className="container mx-auto max-w-7xl px-4 py-8">
// // // // // // // // // // // // // // //         <h2 className="text-3xl font-bold text-gray-800 mb-6">Confirm Your Booking</h2>
// // // // // // // // // // // // // // //         <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
// // // // // // // // // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // // // // // // // // // // // //             <div>
// // // // // // // // // // // // // // //               <div className="flex items-center space-x-3 mb-4">
// // // // // // // // // // // // // // //                 <h3 className="text-xl font-semibold text-gray-800">
// // // // // // // // // // // // // // //                   {carData.carMake} {carData.model}
// // // // // // // // // // // // // // //                 </h3>
// // // // // // // // // // // // // // //                 <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
// // // // // // // // // // // // // // //                   {carData.type}
// // // // // // // // // // // // // // //                 </span>
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //               <img src={carData.image} alt={`${carData.carMake} ${carData.model}`} className="w-full h-40 object-contain rounded-lg bg-gray-50 p-2 mb-4" />
// // // // // // // // // // // // // // //               <div className="grid grid-cols-2 gap-4">
// // // // // // // // // // // // // // //                 <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // // // // //                   <FaUserFriends size={14} />
// // // // // // // // // // // // // // //                   <span className="text-sm">{carData.passengers} Passengers</span>
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //                 <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // // // // //                   <FaSuitcase size={14} />
// // // // // // // // // // // // // // //                   <span className="text-sm">{carData.luggage} Luggage</span>
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //                 <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // // // // //                   <FaCogs size={14} />
// // // // // // // // // // // // // // //                   <span className="text-sm">{carData.transmission}</span>
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //                 <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // // // // //                   <FaMapMarkerAlt size={14} />
// // // // // // // // // // // // // // //                   <span className="text-sm">{carData.mileage}</span>
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //                 <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // // // // //                   <FaStar size={14} className="text-yellow-400" />
// // // // // // // // // // // // // // //                   <span className="text-sm">{carData.rating}/10 ({carData.reviews.toLocaleString()} reviews)</span>
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // //             <div>
// // // // // // // // // // // // // // //               <h4 className="text-lg font-semibold text-gray-800 mb-4">Booking Details</h4>
// // // // // // // // // // // // // // //               <div className="space-y-3">
// // // // // // // // // // // // // // //                 <p className="text-gray-600"><span className="font-medium">Pickup:</span> {pickupLocation} on {pickupDate} at {pickupTime}</p>
// // // // // // // // // // // // // // //                 <p className="text-gray-600"><span className="font-medium">Dropoff:</span> {pickupLocation} on {dropoffDate} at {dropoffTime}</p>
// // // // // // // // // // // // // // //                 <p className="text-gray-600"><span className="font-medium">Agency:</span> {selectedDeal?.agency}</p>
// // // // // // // // // // // // // // //                 <p className="text-gray-600"><span className="font-medium">Base Price:</span> ₹{selectedDeal?.price.toLocaleString()}/day</p>
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //               <div className="mt-6">
// // // // // // // // // // // // // // //                 <h4 className="text-lg font-semibold text-gray-800 mb-3">Additional Options</h4>
// // // // // // // // // // // // // // //                 <div className="space-y-3">
// // // // // // // // // // // // // // //                   <label className="flex items-center text-gray-800">
// // // // // // // // // // // // // // //                     <input type="checkbox" name="addDriver" checked={addOns.addDriver} onChange={handleAddOnChange} className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500" />
// // // // // // // // // // // // // // //                     Additional Driver (₹2000)
// // // // // // // // // // // // // // //                   </label>
// // // // // // // // // // // // // // //                   <label className="flex items-center text-gray-800">
// // // // // // // // // // // // // // //                     <input type="checkbox" name="childSeat" checked={addOns.childSeat} onChange={handleAddOnChange} className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500" />
// // // // // // // // // // // // // // //                     Child Seat (₹500)
// // // // // // // // // // // // // // //                   </label>
// // // // // // // // // // // // // // //                   <label className="flex items-center text-gray-800">
// // // // // // // // // // // // // // //                     <input type="checkbox" name="luggageCarrier" checked={addOns.luggageCarrier} onChange={handleAddOnChange} className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500" />
// // // // // // // // // // // // // // //                     Luggage Carrier (₹1000)
// // // // // // // // // // // // // // //                   </label>
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //           <div className="mt-6 border-t pt-4">
// // // // // // // // // // // // // // //             <div className="flex justify-between items-center">
// // // // // // // // // // // // // // //               <h4 className="text-lg font-semibold text-gray-800">Total Price</h4>
// // // // // // // // // // // // // // //               <span className="text-2xl font-bold text-gray-800">₹{totalPrice.toLocaleString()}</span>
// // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // //             <button onClick={handleConfirmBooking} className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
// // // // // // // // // // // // // // //               Confirm Booking
// // // // // // // // // // // // // // //             </button>
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // //       <Footer />
// // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // export default CarConfirmation;

// // // // // // // // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // // // // // // // import { useLocation, useNavigate } from "react-router-dom";
// // // // // // // // // // // // // // // import axios from "axios";
// // // // // // // // // // // // // // // import { FaUserFriends, FaSuitcase, FaCogs, FaMapMarkerAlt, FaStar, FaChevronDown, FaChevronUp } from "react-icons/fa";
// // // // // // // // // // // // // // // import Footer from "./Footer";

// // // // // // // // // // // // // // // const CarConfirmation = () => {
// // // // // // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // // // // // //   const navigate = useNavigate();
// // // // // // // // // // // // // // //   const { pickupLocation, pickupDate, pickupTime, dropoffDate, dropoffTime, car, selectedDeal } = location.state || {};
// // // // // // // // // // // // // // //   const [carData, setCarData] = useState(car || {});
// // // // // // // // // // // // // // //   const [addOns, setAddOns] = useState({
// // // // // // // // // // // // // // //     addDriver: false,
// // // // // // // // // // // // // // //     childSeat: false,
// // // // // // // // // // // // // // //     luggageCarrier: false,
// // // // // // // // // // // // // // //   });
// // // // // // // // // // // // // // //   const [totalPrice, setTotalPrice] = useState(0);
// // // // // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // // // // //   const [terminals, setTerminals] = useState([]);
// // // // // // // // // // // // // // //   const [selectedTerminal, setSelectedTerminal] = useState(pickupLocation || "");
// // // // // // // // // // // // // // //   const [showDriverDetails, setShowDriverDetails] = useState(false);

// // // // // // // // // // // // // // //   // Fetch terminal names from backend
// // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // //     const fetchTerminals = async () => {
// // // // // // // // // // // // // // //       try {
// // // // // // // // // // // // // // //         const response = await axios.get("http://localhost:5001/locations/terminals");
// // // // // // // // // // // // // // //         setTerminals(response.data.terminals || []);
// // // // // // // // // // // // // // //         if (pickupLocation && !response.data.terminals.includes(pickupLocation)) {
// // // // // // // // // // // // // // //           setSelectedTerminal(response.data.terminals[0] || "");
// // // // // // // // // // // // // // //         } else {
// // // // // // // // // // // // // // //           setSelectedTerminal(pickupLocation || "");
// // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // // // // //         console.error("Error fetching terminals:", error);
// // // // // // // // // // // // // // //         setTerminals([]);
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     };
// // // // // // // // // // // // // // //     fetchTerminals();
// // // // // // // // // // // // // // //     setLoading(false);
// // // // // // // // // // // // // // //   }, [pickupLocation]);

// // // // // // // // // // // // // // //   // Calculate price
// // // // // // // // // // // // // // //   const calculatePrice = () => {
// // // // // // // // // // // // // // //     if (!carData || !pickupDate || !dropoffDate || !selectedDeal?.price) return 0;
// // // // // // // // // // // // // // //     const pickup = new Date(`${pickupDate}T${pickupTime}`);
// // // // // // // // // // // // // // //     const dropoff = new Date(`${dropoffDate}T${dropoffTime}`);
// // // // // // // // // // // // // // //     const hours = (dropoff - pickup) / (1000 * 60 * 60);
// // // // // // // // // // // // // // //     const days = Math.ceil(hours / 24);
// // // // // // // // // // // // // // //     let basePrice = days * selectedDeal.price;
// // // // // // // // // // // // // // //     let additionalCost = 0;

// // // // // // // // // // // // // // //     if (addOns.addDriver) additionalCost += 2000;
// // // // // // // // // // // // // // //     if (addOns.childSeat) additionalCost += 500;
// // // // // // // // // // // // // // //     if (addOns.luggageCarrier) additionalCost += 1000;

// // // // // // // // // // // // // // //     const total = basePrice + additionalCost;
// // // // // // // // // // // // // // //     setTotalPrice(total);
// // // // // // // // // // // // // // //     return { basePrice, additionalCost, total };
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // //     calculatePrice();
// // // // // // // // // // // // // // //   }, [addOns, carData, pickupDate, pickupTime, dropoffDate, dropoffTime, selectedDeal]);

// // // // // // // // // // // // // // //   const handleAddOnChange = (e) => {
// // // // // // // // // // // // // // //     const { name, checked } = e.target;
// // // // // // // // // // // // // // //     setAddOns((prev) => ({ ...prev, [name]: checked }));
// // // // // // // // // // // // // // //     if (name === "addDriver" && !checked) setShowDriverDetails(false);
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const handleConfirmBooking = () => {
// // // // // // // // // // // // // // //     const bookingDetails = {
// // // // // // // // // // // // // // //       pickupLocation: selectedTerminal,
// // // // // // // // // // // // // // //       pickupDate,
// // // // // // // // // // // // // // //       pickupTime,
// // // // // // // // // // // // // // //       dropoffDate,
// // // // // // // // // // // // // // //       dropoffTime,
// // // // // // // // // // // // // // //       carId: carData.id,
// // // // // // // // // // // // // // //       carMake: carData.make,
// // // // // // // // // // // // // // //       carModel: carData.model,
// // // // // // // // // // // // // // //       totalPrice,
// // // // // // // // // // // // // // //       addOns,
// // // // // // // // // // // // // // //       agency: selectedDeal.agency,
// // // // // // // // // // // // // // //     };
// // // // // // // // // // // // // // //     navigate("/cabs", { state: { ...location.state, bookingConfirmed: true, bookingDetails } });
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   if (loading) return <div className="text-center py-10">Loading...</div>;
// // // // // // // // // // // // // // //   if (!carData || !selectedDeal) return <div className="text-center py-10">Car or deal not found</div>;

// // // // // // // // // // // // // // //   const { basePrice, additionalCost, total } = calculatePrice();

// // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // //     <div className="min-h-screen bg-gray-50">
// // // // // // // // // // // // // // //       <div className="container mx-auto max-w-7xl px-4 py-8">
// // // // // // // // // // // // // // //         <h2 className="text-3xl font-bold text-gray-800 mb-6">Confirm Your Booking</h2>
// // // // // // // // // // // // // // //         <div className="bg-white rounded-2xl shadow-lg p-6">
// // // // // // // // // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

// // // // // // // // // // // // // // //             {/* Left 1/4 - Pickup Info and Price */}
// // // // // // // // // // // // // // //             <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
// // // // // // // // // // // // // // //               <div className="mb-4">
// // // // // // // // // // // // // // //                 <label className="block text-gray-800 font-semibold mb-2">Pick-up Location</label>
// // // // // // // // // // // // // // //                 <select
// // // // // // // // // // // // // // //                   value={selectedTerminal}
// // // // // // // // // // // // // // //                   onChange={(e) => setSelectedTerminal(e.target.value)}
// // // // // // // // // // // // // // //                   className="w-full p-3 rounded-lg bg-white text-black border border-gray-200"
// // // // // // // // // // // // // // //                 >
// // // // // // // // // // // // // // //                   {terminals.map((terminal) => (
// // // // // // // // // // // // // // //                     <option key={terminal} value={terminal}>
// // // // // // // // // // // // // // //                       {terminal}
// // // // // // // // // // // // // // //                     </option>
// // // // // // // // // // // // // // //                   ))}
// // // // // // // // // // // // // // //                 </select>
// // // // // // // // // // // // // // //                 <p className="text-gray-600 mt-2">
// // // // // // // // // // // // // // //                   <span className="font-medium">Date:</span> {pickupDate} at {pickupTime}
// // // // // // // // // // // // // // //                 </p>
// // // // // // // // // // // // // // //                 <p className="text-gray-600">
// // // // // // // // // // // // // // //                   <span className="font-medium">Drop-off:</span> {dropoffDate} at {dropoffTime}
// // // // // // // // // // // // // // //                 </p>
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //               <div className="mt-6">
// // // // // // // // // // // // // // //                 <h4 className="text-lg font-semibold text-gray-800 mb-3">Price Breakdown</h4>
// // // // // // // // // // // // // // //                 <div className="space-y-2">
// // // // // // // // // // // // // // //                   <p className="text-gray-600">Rental Cost: ₹{basePrice.toLocaleString()}</p>
// // // // // // // // // // // // // // //                   <p className="text-gray-600">Extras: ₹{additionalCost.toLocaleString()}</p>
// // // // // // // // // // // // // // //                   <p className="text-2xl font-bold text-gray-800">Total: ₹{total.toLocaleString()}</p>
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //             </div>

// // // // // // // // // // // // // // //             {/* Right 3/4 - Car Details and Booking Info */}
// // // // // // // // // // // // // // //             <div className="md:col-span-3">
// // // // // // // // // // // // // // //               <div className="flex flex-col md:flex-row gap-6">
// // // // // // // // // // // // // // //                 <div className="md:w-1/3">
// // // // // // // // // // // // // // //                   <img
// // // // // // // // // // // // // // //                     src={carData.image}
// // // // // // // // // // // // // // //                     alt={`${carData.make} ${carData.model}`}
// // // // // // // // // // // // // // //                     className="w-full h-48 object-contain rounded-lg bg-gray-50 p-2 mb-4"
// // // // // // // // // // // // // // //                   />
// // // // // // // // // // // // // // //                   <button
// // // // // // // // // // // // // // //                     onClick={() => navigate(-1)}
// // // // // // // // // // // // // // //                     className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
// // // // // // // // // // // // // // //                   >
// // // // // // // // // // // // // // //                     Back to Search Results
// // // // // // // // // // // // // // //                   </button>
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //                 <div className="md:w-2/3">
// // // // // // // // // // // // // // //                   <div className="flex items-center space-x-3 mb-4">
// // // // // // // // // // // // // // //                     <h3 className="text-xl font-semibold text-gray-800">
// // // // // // // // // // // // // // //                       {carData.make} {carData.model}
// // // // // // // // // // // // // // //                     </h3>
// // // // // // // // // // // // // // //                     <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
// // // // // // // // // // // // // // //                       {carData.type}
// // // // // // // // // // // // // // //                     </span>
// // // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // // //                   <div className="grid grid-cols-2 gap-4 mb-4">
// // // // // // // // // // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // // // // //                       <FaUserFriends size={14} />
// // // // // // // // // // // // // // //                       <span className="text-sm">{carData.passengers} Passengers</span>
// // // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // // // // //                       <FaSuitcase size={14} />
// // // // // // // // // // // // // // //                       <span className="text-sm">4 Luggage</span> {/* Placeholder; fetch if available */}
// // // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // // // // //                       <FaCogs size={14} />
// // // // // // // // // // // // // // //                       <span className="text-sm">{carData.transmission}</span>
// // // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // // // // //                       <FaMapMarkerAlt size={14} />
// // // // // // // // // // // // // // //                       <span className="text-sm">Unlimited Mileage</span> {/* Placeholder */}
// // // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // // // // //                       <FaStar size={14} className="text-yellow-400" />
// // // // // // // // // // // // // // //                       <span className="text-sm">{carData.ratings}/10</span>
// // // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // // //                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
// // // // // // // // // // // // // // //                     <p className="text-gray-800 font-semibold">Agency: {selectedDeal.agency}</p>
// // // // // // // // // // // // // // //                     <p className="text-gray-600">Fuel Policy: {carData.fuel_policy}</p>
// // // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // // //                   <div className="space-y-3">
// // // // // // // // // // // // // // //                     <h4 className="text-lg font-semibold text-gray-800 mb-3">Additional Options</h4>
// // // // // // // // // // // // // // //                     <label className="flex items-center text-gray-800">
// // // // // // // // // // // // // // //                       <input
// // // // // // // // // // // // // // //                         type="checkbox"
// // // // // // // // // // // // // // //                         name="addDriver"
// // // // // // // // // // // // // // //                         checked={addOns.addDriver}
// // // // // // // // // // // // // // //                         onChange={handleAddOnChange}
// // // // // // // // // // // // // // //                         className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
// // // // // // // // // // // // // // //                       />
// // // // // // // // // // // // // // //                       Additional Driver (₹2000)
// // // // // // // // // // // // // // //                     </label>
// // // // // // // // // // // // // // //                     <label className="flex items-center text-gray-800">
// // // // // // // // // // // // // // //                       <input
// // // // // // // // // // // // // // //                         type="checkbox"
// // // // // // // // // // // // // // //                         name="childSeat"
// // // // // // // // // // // // // // //                         checked={addOns.childSeat}
// // // // // // // // // // // // // // //                         onChange={handleAddOnChange}
// // // // // // // // // // // // // // //                         className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
// // // // // // // // // // // // // // //                       />
// // // // // // // // // // // // // // //                       Child Seat (₹500)
// // // // // // // // // // // // // // //                     </label>
// // // // // // // // // // // // // // //                     <label className="flex items-center text-gray-800">
// // // // // // // // // // // // // // //                       <input
// // // // // // // // // // // // // // //                         type="checkbox"
// // // // // // // // // // // // // // //                         name="luggageCarrier"
// // // // // // // // // // // // // // //                         checked={addOns.luggageCarrier}
// // // // // // // // // // // // // // //                         onChange={handleAddOnChange}
// // // // // // // // // // // // // // //                         className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
// // // // // // // // // // // // // // //                       />
// // // // // // // // // // // // // // //                       Luggage Carrier (₹1000)
// // // // // // // // // // // // // // //                     </label>
// // // // // // // // // // // // // // //                   </div>

// // // // // // // // // // // // // // //                   {/* Driver Details Section */}
// // // // // // // // // // // // // // //                   {addOns.addDriver && (
// // // // // // // // // // // // // // //                     <div className="mt-4 p-4 bg-gray-50 rounded-lg">
// // // // // // // // // // // // // // //                       <button
// // // // // // // // // // // // // // //                         onClick={() => setShowDriverDetails(!showDriverDetails)}
// // // // // // // // // // // // // // //                         className="flex items-center text-blue-600 font-semibold mb-2"
// // // // // // // // // // // // // // //                       >
// // // // // // // // // // // // // // //                         Driver Details {showDriverDetails ? <FaChevronUp /> : <FaChevronDown />}
// // // // // // // // // // // // // // //                       </button>
// // // // // // // // // // // // // // //                       {showDriverDetails && (
// // // // // // // // // // // // // // //                         <div className="text-gray-600 space-y-2">
// // // // // // // // // // // // // // //                           <p><span className="font-medium">Name:</span> John Doe</p>
// // // // // // // // // // // // // // //                           <p><span className="font-medium">License #:</span> DL123456</p>
// // // // // // // // // // // // // // //                           <p><span className="font-medium">Contact:</span> +91 9876543210</p>
// // // // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // // // //                       )}
// // // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // // //                   )}

// // // // // // // // // // // // // // //                   {/* Policy Terms and Cancellation Policy */}
// // // // // // // // // // // // // // //                   <div className="mt-6">
// // // // // // // // // // // // // // //                     <h4 className="text-lg font-semibold text-gray-800 mb-3">Policy Terms</h4>
// // // // // // // // // // // // // // //                     <p className="text-gray-600">
// // // // // // // // // // // // // // //                       - Minimum age to rent: 25 years.<br />
// // // // // // // // // // // // // // //                       - Valid driver’s license required.<br />
// // // // // // // // // // // // // // //                       - Insurance included.
// // // // // // // // // // // // // // //                     </p>
// // // // // // // // // // // // // // //                     <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-3">Cancellation Policy</h4>
// // // // // // // // // // // // // // //                     <p className="text-gray-600">
// // // // // // // // // // // // // // //                       - Free cancellation up to 48 hours before pickup.<br />
// // // // // // // // // // // // // // //                       - 50% refund within 24 hours.<br />
// // // // // // // // // // // // // // //                       - No refund within 24 hours.
// // // // // // // // // // // // // // //                     </p>
// // // // // // // // // // // // // // //                   </div>

// // // // // // // // // // // // // // //                   <div className="mt-6 border-t pt-4">
// // // // // // // // // // // // // // //                     <div className="flex justify-between items-center">
// // // // // // // // // // // // // // //                       <h4 className="text-lg font-semibold text-gray-800">Total Price</h4>
// // // // // // // // // // // // // // //                       <span className="text-2xl font-bold text-gray-800">₹{total.toLocaleString()}</span>
// // // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // // //                     <button
// // // // // // // // // // // // // // //                       onClick={handleConfirmBooking}
// // // // // // // // // // // // // // //                       className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
// // // // // // // // // // // // // // //                     >
// // // // // // // // // // // // // // //                       Confirm Booking
// // // // // // // // // // // // // // //                     </button>
// // // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // //       <Footer />
// // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // export default CarConfirmation;

// // // // // // // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // // // // // // import { useLocation, useNavigate } from "react-router-dom";
// // // // // // // // // // // // // // import axios from "axios";
// // // // // // // // // // // // // // import { FaUserFriends, FaSuitcase, FaCogs, FaMapMarkerAlt, FaStar } from "react-icons/fa";
// // // // // // // // // // // // // // import Footer from "./Footer";

// // // // // // // // // // // // // // const CarConfirmation = () => {
// // // // // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // // // // //   const navigate = useNavigate();
// // // // // // // // // // // // // //   const {
// // // // // // // // // // // // // //     pickupLocation,
// // // // // // // // // // // // // //     pickupDate,
// // // // // // // // // // // // // //     pickupTime,
// // // // // // // // // // // // // //     dropoffDate,
// // // // // // // // // // // // // //     dropoffTime,
// // // // // // // // // // // // // //     car = {},
// // // // // // // // // // // // // //     selectedDeal = {},
// // // // // // // // // // // // // //   } = location.state || {};
// // // // // // // // // // // // // //   const [carData, setCarData] = useState(car || {});
// // // // // // // // // // // // // //   const [addOns, setAddOns] = useState({
// // // // // // // // // // // // // //     addDriver: false,
// // // // // // // // // // // // // //     childSeat: false,
// // // // // // // // // // // // // //     luggageCarrier: false,
// // // // // // // // // // // // // //   });
// // // // // // // // // // // // // //   const [totalPrice, setTotalPrice] = useState(0);
// // // // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // // // //   const [terminals, setTerminals] = useState([]);
// // // // // // // // // // // // // //   const [selectedTerminal, setSelectedTerminal] = useState(
// // // // // // // // // // // // // //     pickupLocation || ""
// // // // // // // // // // // // // //   );
// // // // // // // // // // // // // //   const [showDriverDetails, setShowDriverDetails] = useState(false);

// // // // // // // // // // // // // //   // Debug initial state
// // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // //     console.log("Initial location.state:", location.state);
// // // // // // // // // // // // // //     console.log("Initial car:", car);
// // // // // // // // // // // // // //     console.log("Initial selectedDeal:", selectedDeal);
// // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // //   // Fetch terminal names from backend
// // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // //     const fetchTerminals = async () => {
// // // // // // // // // // // // // //       try {
// // // // // // // // // // // // // //         console.log("Fetching terminals...");
// // // // // // // // // // // // // //         const response = await axios.get(
// // // // // // // // // // // // // //           "http://localhost:5001/locations/terminals"
// // // // // // // // // // // // // //         );
// // // // // // // // // // // // // //         console.log("Terminals response:", response.data);
// // // // // // // // // // // // // //         setTerminals(response.data.terminals || []);
// // // // // // // // // // // // // //         if (
// // // // // // // // // // // // // //           pickupLocation &&
// // // // // // // // // // // // // //           !response.data.terminals.includes(pickupLocation)
// // // // // // // // // // // // // //         ) {
// // // // // // // // // // // // // //           setSelectedTerminal(response.data.terminals[0] || "");
// // // // // // // // // // // // // //         } else {
// // // // // // // // // // // // // //           setSelectedTerminal(pickupLocation || "");
// // // // // // // // // // // // // //         }
// // // // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // // // //         console.error("Error fetching terminals:", error);
// // // // // // // // // // // // // //         setTerminals([]);
// // // // // // // // // // // // // //       } finally {
// // // // // // // // // // // // // //         setLoading(false);
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     };
// // // // // // // // // // // // // //     fetchTerminals();
// // // // // // // // // // // // // //   }, [pickupLocation]);

// // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // //     const calculatePrice = () => {
// // // // // // // // // // // // // //       let basePrice = 0;
// // // // // // // // // // // // // //       let additionalCost = 0;
// // // // // // // // // // // // // //       let total = 0;

// // // // // // // // // // // // // //       if (pickupDate === "N/A" || dropoffDate === "N/A") {
// // // // // // // // // // // // // //         console.warn("🚨 Missing pickup or dropoff date:", {
// // // // // // // // // // // // // //           pickupDate,
// // // // // // // // // // // // // //           dropoffDate,
// // // // // // // // // // // // // //         });
// // // // // // // // // // // // // //         setTotalPrice(0);
// // // // // // // // // // // // // //         return;
// // // // // // // // // // // // // //       }

// // // // // // // // // // // // // //       if (carData && selectedDeal?.price) {
// // // // // // // // // // // // // //         const pickup = new Date(`${pickupDate} ${pickupTime || "00:00"}`);
// // // // // // // // // // // // // //         const dropoff = new Date(`${dropoffDate} ${dropoffTime || "00:00"}`);

// // // // // // // // // // // // // //         if (isNaN(pickup.getTime()) || isNaN(dropoff.getTime())) {
// // // // // // // // // // // // // //           console.warn("❌ Invalid date format:", { pickup, dropoff });
// // // // // // // // // // // // // //         } else if (pickup < dropoff) {
// // // // // // // // // // // // // //           const hours = (dropoff - pickup) / (1000 * 60 * 60);
// // // // // // // // // // // // // //           const days = Math.ceil(hours / 24);
// // // // // // // // // // // // // //           basePrice = days * selectedDeal.price;
// // // // // // // // // // // // // //         } else {
// // // // // // // // // // // // // //           console.warn("❌ Dropoff date is before pickup.");
// // // // // // // // // // // // // //         }
// // // // // // // // // // // // // //       } else {
// // // // // // // // // // // // // //         console.warn("❌ Missing carData or selectedDeal.price", {
// // // // // // // // // // // // // //           carData,
// // // // // // // // // // // // // //           selectedDeal,
// // // // // // // // // // // // // //         });
// // // // // // // // // // // // // //       }

// // // // // // // // // // // // // //       if (addOns.addDriver) additionalCost += 2000;
// // // // // // // // // // // // // //       if (addOns.childSeat) additionalCost += 500;
// // // // // // // // // // // // // //       if (addOns.luggageCarrier) additionalCost += 1000;

// // // // // // // // // // // // // //       total = basePrice + additionalCost;
// // // // // // // // // // // // // //       setTotalPrice(total);
// // // // // // // // // // // // // //     };

// // // // // // // // // // // // // //     calculatePrice();
// // // // // // // // // // // // // //   }, [
// // // // // // // // // // // // // //     addOns,
// // // // // // // // // // // // // //     carData,
// // // // // // // // // // // // // //     pickupDate,
// // // // // // // // // // // // // //     pickupTime,
// // // // // // // // // // // // // //     dropoffDate,
// // // // // // // // // // // // // //     dropoffTime,
// // // // // // // // // // // // // //     selectedDeal,
// // // // // // // // // // // // // //   ]);

// // // // // // // // // // // // // //   // Calculate price when dependencies change
// // // // // // // // // // // // // //   // useEffect(() => {
// // // // // // // // // // // // // //   //   const calculatePrice = () => {
// // // // // // // // // // // // // //   //     let basePrice = 0;
// // // // // // // // // // // // // //   //     let additionalCost = 0;
// // // // // // // // // // // // // //   //     let total = 0;

// // // // // // // // // // // // // //   //     // Only calculate base price if all required data is present
// // // // // // // // // // // // // //   //     if (carData && pickupDate && dropoffDate && selectedDeal?.price) {
// // // // // // // // // // // // // //   //       const pickup = new Date(`${pickupDate}T${pickupTime || "00:00"}`);
// // // // // // // // // // // // // //   //       const dropoff = new Date(`${dropoffDate}T${dropoffTime || "00:00"}`);
// // // // // // // // // // // // // //   //       if (isNaN(pickup.getTime()) || isNaN(dropoff.getTime())) {
// // // // // // // // // // // // // //   //         console.warn("Invalid date format, using default price.");
// // // // // // // // // // // // // //   //       } else if (pickup < dropoff) {
// // // // // // // // // // // // // //   //         const hours = (dropoff - pickup) / (1000 * 60 * 60);
// // // // // // // // // // // // // //   //         const days = Math.ceil(hours / 24);
// // // // // // // // // // // // // //   //         basePrice = days * (selectedDeal.price || 0);
// // // // // // // // // // // // // //   //       } else {
// // // // // // // // // // // // // //   //         console.warn("Dropoff date is before pickup date, using default price.");
// // // // // // // // // // // // // //   //       }
// // // // // // // // // // // // // //   //     } else {
// // // // // // // // // // // // // //   //       console.warn("Missing data for price calculation:", { carData, pickupDate, dropoffDate, selectedDeal });
// // // // // // // // // // // // // //   //     }

// // // // // // // // // // // // // //   //     // Add additional costs
// // // // // // // // // // // // // //   //     if (addOns.addDriver) additionalCost += 2000;
// // // // // // // // // // // // // //   //     if (addOns.childSeat) additionalCost += 500;
// // // // // // // // // // // // // //   //     if (addOns.luggageCarrier) additionalCost += 1000;

// // // // // // // // // // // // // //   //     total = basePrice + additionalCost;
// // // // // // // // // // // // // //   //     setTotalPrice(total);
// // // // // // // // // // // // // //   //     return { basePrice, additionalCost, total };
// // // // // // // // // // // // // //   //   };

// // // // // // // // // // // // // //   //   calculatePrice();
// // // // // // // // // // // // // //   // }, [addOns, carData, pickupDate, pickupTime, dropoffDate, dropoffTime, selectedDeal]);

// // // // // // // // // // // // // //   const handleAddOnChange = (e) => {
// // // // // // // // // // // // // //     const { name, checked } = e.target;
// // // // // // // // // // // // // //     setAddOns((prev) => ({ ...prev, [name]: checked }));
// // // // // // // // // // // // // //     if (name === "addDriver" && !checked) setShowDriverDetails(false);
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   const handleConfirmBooking = async () => {
// // // // // // // // // // // // // //     const bookingDetails = {
// // // // // // // // // // // // // //       pickupLocation: selectedTerminal,
// // // // // // // // // // // // // //       pickupDate,
// // // // // // // // // // // // // //       pickupTime,
// // // // // // // // // // // // // //       dropoffDate,
// // // // // // // // // // // // // //       dropoffTime,
// // // // // // // // // // // // // //       carId: carData.id,
// // // // // // // // // // // // // //       carMake: carData.make,
// // // // // // // // // // // // // //       carModel: carData.model,
// // // // // // // // // // // // // //       totalPrice,
// // // // // // // // // // // // // //       addOns,
// // // // // // // // // // // // // //       agency: selectedDeal.agency,
// // // // // // // // // // // // // //     };

// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //       setPaymentError(null);
// // // // // // // // // // // // // //       sessionStorage.setItem(
// // // // // // // // // // // // // //         "carBookingDetails",
// // // // // // // // // // // // // //         JSON.stringify(bookingDetails)
// // // // // // // // // // // // // //       );

// // // // // // // // // // // // // //       const response = await axios.post(
// // // // // // // // // // // // // //         "http://localhost:5001/create-checkout-session",
// // // // // // // // // // // // // //         bookingDetails
// // // // // // // // // // // // // //       );
// // // // // // // // // // // // // //       const sessionId = response.data.id;

// // // // // // // // // // // // // //       const stripe = window.Stripe(
// // // // // // // // // // // // // //         "pk_test_51RBq3dPlQbJhRZQumwQFlV6uBA7rekmsFfXhxYG3fyxau7bPHQgoV86IaD5cbhvdM394vHEDKi3KhiqskSxT16Cf00rWlbxKrL"
// // // // // // // // // // // // // //       );
// // // // // // // // // // // // // //       const { error } = await stripe.redirectToCheckout({ sessionId });

// // // // // // // // // // // // // //       if (error) {
// // // // // // // // // // // // // //         console.error("Stripe redirect error:", error);
// // // // // // // // // // // // // //         setPaymentError("Failed to redirect to payment page: " + error.message);
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // // // //       console.error("Error initiating checkout:", err);
// // // // // // // // // // // // // //       setPaymentError("Failed to initiate payment. Please try again.");
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //     if (loading) return <div className="text-center py-10 text-gray-800">Loading...</div>;
// // // // // // // // // // // // // //     if (!carData || !selectedDeal)
// // // // // // // // // // // // // //       return <div className="text-center py-10 text-gray-800">Car or deal not found</div>;


// // // // // // // // // // // // // // const { basePrice, additionalCost } = { basePrice: 0, additionalCost: 0, total: totalPrice }; // Default values

// // // // // // // // // // // // // // return (
// // // // // // // // // // // // // //   <div className="min-h-screen bg-gray-50">
// // // // // // // // // // // // // //     <div className="container mx-auto max-w-7xl px-4 py-8">
// // // // // // // // // // // // // //       <h2 className="text-3xl font-bold text-gray-800 mb-6">
// // // // // // // // // // // // // //         Confirm Your Booking
// // // // // // // // // // // // // //       </h2>
// // // // // // // // // // // // // //       <div className="bg-white rounded-2xl shadow-lg p-6">
// // // // // // // // // // // // // //         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
// // // // // // // // // // // // // //           {/* Left 1/4 - Pickup Info and Price */}

// // // // // // // // // // // // // //         {/* Left 1/4 - Fixed Pickup Info and Price */}
// // // // // // // // // // // // // //         <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg sticky top-20">
// // // // // // // // // // // // // //               <div className="mb-4">
// // // // // // // // // // // // // //                 <label className="block text-gray-800 font-semibold mb-2">Pick-up Location</label>
// // // // // // // // // // // // // //                 <p className="text-gray-800 font-medium">{pickupLocation || "N/A"}</p>
// // // // // // // // // // // // // //                 <p className="text-gray-600 mt-2">
// // // // // // // // // // // // // //                   <span className="font-medium">Date:</span> {pickupDate || "N/A"} at {pickupTime || "N/A"}
// // // // // // // // // // // // // //                 </p>
// // // // // // // // // // // // // //                 <p className="text-gray-600">
// // // // // // // // // // // // // //                   <span className="font-medium">Drop-off:</span> {dropoffDate || "N/A"} at {dropoffTime || "N/A"}
// // // // // // // // // // // // // //                 </p>
// // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // //               <div className="mt-6">
// // // // // // // // // // // // // //                 <h4 className="text-lg font-semibold text-gray-800 mb-3">Price Breakdown</h4>
// // // // // // // // // // // // // //                 <div className="space-y-2">
// // // // // // // // // // // // // //                   <p className="text-gray-600">Rental Cost: ₹{basePrice.toLocaleString()}</p>
// // // // // // // // // // // // // //                   <p className="text-gray-600">Extras: ₹{additionalCost.toLocaleString()}</p>
// // // // // // // // // // // // // //                   <p className="text-2xl font-bold text-gray-800">Total: ₹{totalPrice.toLocaleString()}</p>
// // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // //             </div>


// // // // // // // // // // // // // //           {/* <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
// // // // // // // // // // // // // //             <div className="mb-4">
// // // // // // // // // // // // // //               <label className="block text-gray-800 font-semibold mb-2">
// // // // // // // // // // // // // //                 Pick-up Location
// // // // // // // // // // // // // //               </label>
// // // // // // // // // // // // // //               <select
// // // // // // // // // // // // // //                 value={selectedTerminal}
// // // // // // // // // // // // // //                 onChange={(e) => setSelectedTerminal(e.target.value)}
// // // // // // // // // // // // // //                 className="w-full p-3 rounded-lg bg-white text-black border border-gray-200"
// // // // // // // // // // // // // //               >
// // // // // // // // // // // // // //                 <option value="">Select Terminal</option>
// // // // // // // // // // // // // //                 {terminals.map((terminal) => (
// // // // // // // // // // // // // //                   <option key={terminal} value={terminal}>
// // // // // // // // // // // // // //                     {terminal}
// // // // // // // // // // // // // //                   </option>
// // // // // // // // // // // // // //                 ))}
// // // // // // // // // // // // // //               </select>
// // // // // // // // // // // // // //               <p className="text-gray-600 mt-2">
// // // // // // // // // // // // // //                 <span className="font-medium">Date:</span> {pickupDate || "N/A"}{" "}
// // // // // // // // // // // // // //                 at {pickupTime || "N/A"}
// // // // // // // // // // // // // //               </p>
// // // // // // // // // // // // // //               <p className="text-gray-600">
// // // // // // // // // // // // // //                 <span className="font-medium">Drop-off:</span>{" "}
// // // // // // // // // // // // // //                 {dropoffDate || "N/A"} at {dropoffTime || "N/A"}
// // // // // // // // // // // // // //               </p>
// // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // //             <div className="mt-6">
// // // // // // // // // // // // // //               <h4 className="text-lg font-semibold text-gray-800 mb-3">
// // // // // // // // // // // // // //                 Price Breakdown
// // // // // // // // // // // // // //               </h4>
// // // // // // // // // // // // // //               <div className="space-y-2">
// // // // // // // // // // // // // //                 <p className="text-gray-600">
// // // // // // // // // // // // // //                   Rental Cost: ₹{basePrice.toLocaleString()}
// // // // // // // // // // // // // //                 </p>
// // // // // // // // // // // // // //                 <p className="text-gray-600">
// // // // // // // // // // // // // //                   Extras: ₹{additionalCost.toLocaleString()}
// // // // // // // // // // // // // //                 </p>
// // // // // // // // // // // // // //                 <p className="text-2xl font-bold text-gray-800">
// // // // // // // // // // // // // //                   Total: ₹{totalPrice.toLocaleString()}
// // // // // // // // // // // // // //                 </p>
// // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // //           </div> */}

// // // // // // // // // // // // // //           {/* Right 3/4 - Car Details and Booking Info */}
// // // // // // // // // // // // // //           <div className="md:col-span-3">
// // // // // // // // // // // // // //             <div className="flex flex-col md:flex-row gap-6">
// // // // // // // // // // // // // //               <div className="md:w-1/3">
// // // // // // // // // // // // // //                 <img
// // // // // // // // // // // // // //                   src={carData.image || "https://via.placeholder.com/300x200"}
// // // // // // // // // // // // // //                   alt={`${carData.make || "Unknown"} ${
// // // // // // // // // // // // // //                     carData.model || "Model"
// // // // // // // // // // // // // //                   }`}
// // // // // // // // // // // // // //                   className="w-full h-48 object-contain rounded-lg bg-gray-50 p-2 mb-4"
// // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // //                 <button
// // // // // // // // // // // // // //                   onClick={() => navigate(-1)}
// // // // // // // // // // // // // //                   className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
// // // // // // // // // // // // // //                 >
// // // // // // // // // // // // // //                   Back to Search Results
// // // // // // // // // // // // // //                 </button>
// // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // //               <div className="md:w-2/3">
// // // // // // // // // // // // // //                 <div className="flex items-center space-x-3 mb-4">
// // // // // // // // // // // // // //                   <h3 className="text-xl font-semibold text-gray-800">
// // // // // // // // // // // // // //                     {carData.make || "Unknown"} {carData.model || "Model"}
// // // // // // // // // // // // // //                   </h3>
// // // // // // // // // // // // // //                   <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
// // // // // // // // // // // // // //                     {carData.type || "N/A"}
// // // // // // // // // // // // // //                   </span>
// // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // //                 <div className="grid grid-cols-2 gap-4 mb-4">
// // // // // // // // // // // // // //                   <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // // // //                     <FaUserFriends size={14} />
// // // // // // // // // // // // // //                     <span className="text-sm">
// // // // // // // // // // // // // //                       {carData.passengers || "N/A"} Passengers
// // // // // // // // // // // // // //                     </span>
// // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // //                   <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // // // //                     <FaSuitcase size={14} />
// // // // // // // // // // // // // //                     <span className="text-sm">4 Luggage</span>
// // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // //                   <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // // // //                     <FaCogs size={14} />
// // // // // // // // // // // // // //                     <span className="text-sm">
// // // // // // // // // // // // // //                       {carData.transmission || "N/A"}
// // // // // // // // // // // // // //                     </span>
// // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // //                   <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // // // //                     <FaMapMarkerAlt size={14} />
// // // // // // // // // // // // // //                     <span className="text-sm">Unlimited Mileage</span>
// // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // //                   <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // // // //                     <FaStar size={14} className="text-yellow-400" />
// // // // // // // // // // // // // //                     <span className="text-sm">
// // // // // // // // // // // // // //                       {carData.ratings || "N/A"}/10
// // // // // // // // // // // // // //                     </span>
// // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // //                 <div className="bg-gray-100 p-4 rounded-lg mb-4">
// // // // // // // // // // // // // //                   <p className="text-gray-800 font-semibold">
// // // // // // // // // // // // // //                     Agency: {selectedDeal.agency || "N/A"}
// // // // // // // // // // // // // //                   </p>
// // // // // // // // // // // // // //                   <p className="text-gray-600">
// // // // // // // // // // // // // //                     Fuel Policy: {carData.fuel_policy || "N/A"}
// // // // // // // // // // // // // //                   </p>
// // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // //                 <div className="space-y-3">
// // // // // // // // // // // // // //                   <h4 className="text-lg font-semibold text-gray-800 mb-3">
// // // // // // // // // // // // // //                     Additional Options
// // // // // // // // // // // // // //                   </h4>
// // // // // // // // // // // // // //                   <label className="flex items-center text-gray-800">
// // // // // // // // // // // // // //                     <input
// // // // // // // // // // // // // //                       type="checkbox"
// // // // // // // // // // // // // //                       name="addDriver"
// // // // // // // // // // // // // //                       checked={addOns.addDriver}
// // // // // // // // // // // // // //                       onChange={handleAddOnChange}
// // // // // // // // // // // // // //                       className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
// // // // // // // // // // // // // //                     />
// // // // // // // // // // // // // //                     Additional Driver (₹2000)
// // // // // // // // // // // // // //                   </label>
// // // // // // // // // // // // // //                   <label className="flex items-center text-gray-800">
// // // // // // // // // // // // // //                     <input
// // // // // // // // // // // // // //                       type="checkbox"
// // // // // // // // // // // // // //                       name="childSeat"
// // // // // // // // // // // // // //                       checked={addOns.childSeat}
// // // // // // // // // // // // // //                       onChange={handleAddOnChange}
// // // // // // // // // // // // // //                       className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
// // // // // // // // // // // // // //                     />
// // // // // // // // // // // // // //                     Child Seat (₹500)
// // // // // // // // // // // // // //                   </label>
// // // // // // // // // // // // // //                   <label className="flex items-center text-gray-800">
// // // // // // // // // // // // // //                     <input
// // // // // // // // // // // // // //                       type="checkbox"
// // // // // // // // // // // // // //                       name="luggageCarrier"
// // // // // // // // // // // // // //                       checked={addOns.luggageCarrier}
// // // // // // // // // // // // // //                       onChange={handleAddOnChange}
// // // // // // // // // // // // // //                       className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
// // // // // // // // // // // // // //                     />
// // // // // // // // // // // // // //                     Luggage Carrier (₹1000)
// // // // // // // // // // // // // //                   </label>
// // // // // // // // // // // // // //                 </div>

// // // // // // // // // // // // // //                 {/* Driver Details Section */}
// // // // // // // // // // // // // //                 {addOns.addDriver && (
// // // // // // // // // // // // // //                   <div className="mt-4 p-4 bg-gray-50 rounded-lg">
// // // // // // // // // // // // // //                     <button
// // // // // // // // // // // // // //                       onClick={() => setShowDriverDetails(!showDriverDetails)}
// // // // // // // // // // // // // //                       className="flex items-center text-blue-600 font-semibold mb-2"
// // // // // // // // // // // // // //                     >
// // // // // // // // // // // // // //                       Driver Details{" "}
// // // // // // // // // // // // // //                       {showDriverDetails ? <FaChevronUp /> : <FaChevronDown />}
// // // // // // // // // // // // // //                     </button>
// // // // // // // // // // // // // //                     {showDriverDetails && (
// // // // // // // // // // // // // //                       <div className="text-gray-600 space-y-2">
// // // // // // // // // // // // // //                         <p>
// // // // // // // // // // // // // //                           <span className="font-medium">Name:</span> John Doe
// // // // // // // // // // // // // //                         </p>
// // // // // // // // // // // // // //                         <p>
// // // // // // // // // // // // // //                           <span className="font-medium">License #:</span>{" "}
// // // // // // // // // // // // // //                           DL123456
// // // // // // // // // // // // // //                         </p>
// // // // // // // // // // // // // //                         <p>
// // // // // // // // // // // // // //                           <span className="font-medium">Contact:</span> +91
// // // // // // // // // // // // // //                           9876543210
// // // // // // // // // // // // // //                         </p>
// // // // // // // // // // // // // //                       </div>
// // // // // // // // // // // // // //                     )}
// // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // //                 )}

// // // // // // // // // // // // // //                 {/* Policy Terms and Cancellation Policy */}
// // // // // // // // // // // // // //                 <div className="mt-6">
// // // // // // // // // // // // // //                   <h4 className="text-lg font-semibold text-gray-800 mb-3">
// // // // // // // // // // // // // //                     Policy Terms
// // // // // // // // // // // // // //                   </h4>
// // // // // // // // // // // // // //                   <p className="text-gray-600">
// // // // // // // // // // // // // //                     - Minimum age to rent: 25 years.
// // // // // // // // // // // // // //                     <br />
// // // // // // // // // // // // // //                     - Valid driver’s license required.
// // // // // // // // // // // // // //                     <br />- Insurance included.
// // // // // // // // // // // // // //                   </p>
// // // // // // // // // // // // // //                   <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-3">
// // // // // // // // // // // // // //                     Cancellation Policy
// // // // // // // // // // // // // //                   </h4>
// // // // // // // // // // // // // //                   <p className="text-gray-600">
// // // // // // // // // // // // // //                     - Free cancellation up to 48 hours before pickup.
// // // // // // // // // // // // // //                     <br />
// // // // // // // // // // // // // //                     - 50% refund within 24 hours.
// // // // // // // // // // // // // //                     <br />- No refund within 24 hours.
// // // // // // // // // // // // // //                   </p>
// // // // // // // // // // // // // //                 </div>

// // // // // // // // // // // // // //                 <div className="mt-6 border-t pt-4">
// // // // // // // // // // // // // //                   <div className="flex justify-between items-center">
// // // // // // // // // // // // // //                     <h2 className="text-lg font-semibold text-gray-800">
// // // // // // // // // // // // // //                       Total Price
// // // // // // // // // // // // // //                     </h2>
// // // // // // // // // // // // // //                     <span className="text-2xl font-bold text-gray-800">
// // // // // // // // // // // // // //                       ₹{totalPrice.toLocaleString()}
// // // // // // // // // // // // // //                     </span>
// // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // //                   <button
// // // // // // // // // // // // // //                     onClick={handleConfirmBooking}
// // // // // // // // // // // // // //                     className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
// // // // // // // // // // // // // //                   >
// // // // // // // // // // // // // //                     Confirm Booking
// // // // // // // // // // // // // //                   </button>
// // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // //     <Footer />
// // // // // // // // // // // // // //   </div>
// // // // // // // // // // // // // // );}

// // // // // // // // // // // // // // export default CarConfirmation;











// // // // // // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // // // // // import { useLocation, useNavigate } from "react-router-dom";
// // // // // // // // // // // // // import axios from "axios";
// // // // // // // // // // // // // import { FaUserFriends, FaSuitcase, FaCogs, FaMapMarkerAlt, FaStar, FaChevronDown, FaChevronUp } from "react-icons/fa";
// // // // // // // // // // // // // import Footer from "./Footer";

// // // // // // // // // // // // // const CarConfirmation = () => {
// // // // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // // // //   const navigate = useNavigate();
// // // // // // // // // // // // //   const { pickupLocation, pickupDate, pickupTime, dropoffDate, dropoffTime, car = {}, selectedDeal = {} } = location.state || {};
// // // // // // // // // // // // //   const [carData, setCarData] = useState(car || {});
// // // // // // // // // // // // //   const [addOns, setAddOns] = useState({
// // // // // // // // // // // // //     addDriver: false,
// // // // // // // // // // // // //     childSeat: false,
// // // // // // // // // // // // //     luggageCarrier: false,
// // // // // // // // // // // // //   });
// // // // // // // // // // // // //   const [totalPrice, setTotalPrice] = useState(0);
// // // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // // //   const [terminals, setTerminals] = useState([]);
// // // // // // // // // // // // //   const [showDriverDetails, setShowDriverDetails] = useState(false);

// // // // // // // // // // // // //   // Debug initial state
// // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // //     console.log("Initial location.state:", location.state);
// // // // // // // // // // // // //     console.log("Initial car:", car);
// // // // // // // // // // // // //     console.log("Initial selectedDeal:", selectedDeal);
// // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // //   // Fetch terminal names from backend (optional, kept for context)
// // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // //     const fetchTerminals = async () => {
// // // // // // // // // // // // //       try {
// // // // // // // // // // // // //         console.log("Fetching terminals...");
// // // // // // // // // // // // //         const response = await axios.get("http://localhost:5001/locations/terminals");
// // // // // // // // // // // // //         console.log("Terminals response:", response.data);
// // // // // // // // // // // // //         setTerminals(response.data.terminals || []);
// // // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // // //         console.error("Error fetching terminals:", error);
// // // // // // // // // // // // //         setTerminals([]);
// // // // // // // // // // // // //       } finally {
// // // // // // // // // // // // //         setLoading(false);
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     };
// // // // // // // // // // // // //     fetchTerminals();
// // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // //   // Calculate price when dependencies change
// // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // //     const calculatePrice = () => {
// // // // // // // // // // // // //       let basePrice = 0;
// // // // // // // // // // // // //       let additionalCost = 0;
// // // // // // // // // // // // //       let total = 0;

// // // // // // // // // // // // //       // Calculate base price based on hourly rate
// // // // // // // // // // // // //       if (carData && pickupDate && dropoffDate && pickupTime && dropoffTime && selectedDeal?.price) {
// // // // // // // // // // // // //         const pickup = new Date(`${pickupDate}T${pickupTime}`);
// // // // // // // // // // // // //         const dropoff = new Date(`${dropoffDate}T${dropoffTime}`);
// // // // // // // // // // // // //         if (isNaN(pickup.getTime()) || isNaN(dropoff.getTime())) {
// // // // // // // // // // // // //           console.warn("Invalid date format, using default price.");
// // // // // // // // // // // // //         } else if (pickup < dropoff) {
// // // // // // // // // // // // //           const diffMs = dropoff - pickup; // Difference in milliseconds
// // // // // // // // // // // // //           const hours = Math.ceil(diffMs / (1000 * 60 * 60)); // Convert to hours
// // // // // // // // // // // // //           basePrice = hours * parseFloat(selectedDeal.price || 0);
// // // // // // // // // // // // //         } else {
// // // // // // // // // // // // //           console.warn("Dropoff date/time is before pickup date/time, using default price.");
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //       } else {
// // // // // // // // // // // // //         console.warn("Missing data for price calculation:", { carData, pickupDate, pickupTime, dropoffDate, dropoffTime, selectedDeal });
// // // // // // // // // // // // //       }

// // // // // // // // // // // // //       // Add additional costs
// // // // // // // // // // // // //       if (addOns.addDriver) additionalCost += 2000;
// // // // // // // // // // // // //       if (addOns.childSeat) additionalCost += 500;
// // // // // // // // // // // // //       if (addOns.luggageCarrier) additionalCost += 1000;

// // // // // // // // // // // // //       total = basePrice + additionalCost;
// // // // // // // // // // // // //       setTotalPrice(total);
// // // // // // // // // // // // //       return { basePrice, additionalCost, total };
// // // // // // // // // // // // //     };

// // // // // // // // // // // // //     calculatePrice();
// // // // // // // // // // // // //   }, [addOns, carData, pickupDate, pickupTime, dropoffDate, dropoffTime, selectedDeal]);

// // // // // // // // // // // // //   const handleAddOnChange = (e) => {
// // // // // // // // // // // // //     const { name, checked } = e.target;
// // // // // // // // // // // // //     setAddOns((prev) => ({ ...prev, [name]: checked }));
// // // // // // // // // // // // //     if (name === "addDriver" && !checked) setShowDriverDetails(false);
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleConfirmBooking = () => {
// // // // // // // // // // // // //     const bookingDetails = {
// // // // // // // // // // // // //       pickupLocation,
// // // // // // // // // // // // //       pickupDate,
// // // // // // // // // // // // //       pickupTime,
// // // // // // // // // // // // //       dropoffDate,
// // // // // // // // // // // // //       dropoffTime,
// // // // // // // // // // // // //       carId: carData.id,
// // // // // // // // // // // // //       carMake: carData.make,
// // // // // // // // // // // // //       carModel: carData.model,
// // // // // // // // // // // // //       totalPrice,
// // // // // // // // // // // // //       addOns,
// // // // // // // // // // // // //       agency: selectedDeal.agency,
// // // // // // // // // // // // //     };
// // // // // // // // // // // // //     navigate("/cabs", { state: { ...location.state, bookingConfirmed: true, bookingDetails } });
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   if (loading) return <div className="text-center py-10 text-gray-800">Loading...</div>;
// // // // // // // // // // // // //   if (!carData || !selectedDeal) {
// // // // // // // // // // // // //     console.log("Car or deal missing, rendering fallback:", { carData, selectedDeal });
// // // // // // // // // // // // //     return <div className="text-center py-10 text-gray-800">Car or deal not found</div>;
// // // // // // // // // // // // //   }

// // // // // // // // // // // // //   const { basePrice, additionalCost } = { basePrice: 0, additionalCost: 0, total: totalPrice }; // Default values

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <div className="min-h-screen bg-gray-50">
// // // // // // // // // // // // //       <div className="container mx-auto max-w-7xl px-4 py-8">
// // // // // // // // // // // // //         <h2 className="text-3xl font-bold text-gray-800 mb-6">Confirm Your Booking</h2>
// // // // // // // // // // // // //         <div className="bg-white rounded-2xl shadow-lg p-6">
// // // // // // // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
// // // // // // // // // // // // //             {/* Left 1/4 - Fixed Pickup Info and Price */}
// // // // // // // // // // // // //             <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg sticky top-20">
// // // // // // // // // // // // //               <div className="mb-4">
// // // // // // // // // // // // //                 <h4 className="text-lg font-semibold text-gray-800 mb-2">Booking Details</h4>
// // // // // // // // // // // // //                 <p className="text-gray-800 font-medium">Location: {pickupLocation || "N/A"}</p>
// // // // // // // // // // // // //                 <p className="text-gray-600 mt-2">
// // // // // // // // // // // // //                   <span className="font-medium">Pickup:</span> {pickupDate ? `${pickupDate} ${pickupTime}` : "N/A"}
// // // // // // // // // // // // //                 </p>
// // // // // // // // // // // // //                 <p className="text-gray-600">
// // // // // // // // // // // // //                   <span className="font-medium">Dropoff:</span> {dropoffDate ? `${dropoffDate} ${dropoffTime}` : "N/A"}
// // // // // // // // // // // // //                 </p>
// // // // // // // // // // // // //               </div>
// // // // // // // // // // // // //               <div className="mt-6">
// // // // // // // // // // // // //                 <h4 className="text-lg font-semibold text-gray-800 mb-3">Price Breakdown</h4>
// // // // // // // // // // // // //                 <div className="space-y-2">
// // // // // // // // // // // // //                   <p className="text-gray-600">Rental Cost: ₹{basePrice.toLocaleString()}</p>
// // // // // // // // // // // // //                   <p className="text-gray-600">Extras: ₹{additionalCost.toLocaleString()}</p>
// // // // // // // // // // // // //                   <p className="text-2xl font-bold text-gray-800">Total: ₹{totalPrice.toLocaleString()}</p>
// // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // //               </div>
// // // // // // // // // // // // //             </div>

// // // // // // // // // // // // //             {/* Right 3/4 - Scrollable Car Details and Booking Info */}
// // // // // // // // // // // // //             <div className="md:col-span-3 overflow-y-auto max-h-[calc(100vh-12rem)]">
// // // // // // // // // // // // //               <div className="flex flex-col md:flex-row gap-6">
// // // // // // // // // // // // //                 <div className="md:w-1/3">
// // // // // // // // // // // // //                   <img
// // // // // // // // // // // // //                     src={carData.image || "https://via.placeholder.com/300x200"}
// // // // // // // // // // // // //                     alt={`${carData.make || "Unknown"} ${carData.model || "Model"}`}
// // // // // // // // // // // // //                     className="w-full h-48 object-contain rounded-lg bg-gray-50 p-2 mb-4"
// // // // // // // // // // // // //                   />
// // // // // // // // // // // // //                   <button
// // // // // // // // // // // // //                     onClick={() => navigate(-1)}
// // // // // // // // // // // // //                     className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
// // // // // // // // // // // // //                   >
// // // // // // // // // // // // //                     Back to Search Results
// // // // // // // // // // // // //                   </button>
// // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // //                 <div className="md:w-2/3">
// // // // // // // // // // // // //                   <div className="flex items-center space-x-3 mb-4">
// // // // // // // // // // // // //                     <h3 className="text-xl font-semibold text-gray-800">
// // // // // // // // // // // // //                       {carData.make || "Unknown"} {carData.model || "Model"}
// // // // // // // // // // // // //                     </h3>
// // // // // // // // // // // // //                     <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
// // // // // // // // // // // // //                       {carData.type || "N/A"}
// // // // // // // // // // // // //                     </span>
// // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // //                   <div className="grid grid-cols-2 gap-4 mb-4">
// // // // // // // // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // // //                       <FaUserFriends size={14} />
// // // // // // // // // // // // //                       <span className="text-sm">{carData.passengers || "N/A"} Passengers</span>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // // //                       <FaSuitcase size={14} />
// // // // // // // // // // // // //                       <span className="text-sm">4 Luggage</span>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // // //                       <FaCogs size={14} />
// // // // // // // // // // // // //                       <span className="text-sm">{carData.transmission || "N/A"}</span>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // // //                       <FaMapMarkerAlt size={14} />
// // // // // // // // // // // // //                       <span className="text-sm">Unlimited Mileage</span>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // // //                       <FaStar size={14} className="text-yellow-400" />
// // // // // // // // // // // // //                       <span className="text-sm">{carData.ratings || "N/A"}/10</span>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // //                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
// // // // // // // // // // // // //                     <p className="text-gray-800 font-semibold">Agency: {selectedDeal.agency || "N/A"}</p>
// // // // // // // // // // // // //                     <p className="text-gray-600">Fuel Policy: {carData.fuel_policy || "N/A"}</p>
// // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // //                   <div className="space-y-3">
// // // // // // // // // // // // //                     <h4 className="text-lg font-semibold text-gray-800 mb-3">Additional Options</h4>
// // // // // // // // // // // // //                     <label className="flex items-center text-gray-800">
// // // // // // // // // // // // //                       <input
// // // // // // // // // // // // //                         type="checkbox"
// // // // // // // // // // // // //                         name="addDriver"
// // // // // // // // // // // // //                         checked={addOns.addDriver}
// // // // // // // // // // // // //                         onChange={handleAddOnChange}
// // // // // // // // // // // // //                         className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
// // // // // // // // // // // // //                       />
// // // // // // // // // // // // //                       Additional Driver (₹2000)
// // // // // // // // // // // // //                     </label>
// // // // // // // // // // // // //                     <label className="flex items-center text-gray-800">
// // // // // // // // // // // // //                       <input
// // // // // // // // // // // // //                         type="checkbox"
// // // // // // // // // // // // //                         name="childSeat"
// // // // // // // // // // // // //                         checked={addOns.childSeat}
// // // // // // // // // // // // //                         onChange={handleAddOnChange}
// // // // // // // // // // // // //                         className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
// // // // // // // // // // // // //                       />
// // // // // // // // // // // // //                       Child Seat (₹500)
// // // // // // // // // // // // //                     </label>
// // // // // // // // // // // // //                     <label className="flex items-center text-gray-800">
// // // // // // // // // // // // //                       <input
// // // // // // // // // // // // //                         type="checkbox"
// // // // // // // // // // // // //                         name="luggageCarrier"
// // // // // // // // // // // // //                         checked={addOns.luggageCarrier}
// // // // // // // // // // // // //                         onChange={handleAddOnChange}
// // // // // // // // // // // // //                         className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
// // // // // // // // // // // // //                       />
// // // // // // // // // // // // //                       Luggage Carrier (₹1000)
// // // // // // // // // // // // //                     </label>
// // // // // // // // // // // // //                   </div>

// // // // // // // // // // // // //                   {/* Driver Details Section */}
// // // // // // // // // // // // //                   {addOns.addDriver && (
// // // // // // // // // // // // //                     <div className="mt-4 p-4 bg-gray-50 rounded-lg">
// // // // // // // // // // // // //                       <button
// // // // // // // // // // // // //                         onClick={() => setShowDriverDetails(!showDriverDetails)}
// // // // // // // // // // // // //                         className="flex items-center text-blue-600 font-semibold mb-2"
// // // // // // // // // // // // //                       >
// // // // // // // // // // // // //                         Driver Details {showDriverDetails ? <FaChevronUp /> : <FaChevronDown />}
// // // // // // // // // // // // //                       </button>
// // // // // // // // // // // // //                       {showDriverDetails && (
// // // // // // // // // // // // //                         <div className="text-gray-600 space-y-2">
// // // // // // // // // // // // //                           <p><span className="font-medium">Name:</span> John Doe</p>
// // // // // // // // // // // // //                           <p><span className="font-medium">License #:</span> DL123456</p>
// // // // // // // // // // // // //                           <p><span className="font-medium">Contact:</span> +91 9876543210</p>
// // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // //                       )}
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                   )}

// // // // // // // // // // // // //                   {/* Policy Terms and Cancellation Policy */}
// // // // // // // // // // // // //                   <div className="mt-6">
// // // // // // // // // // // // //                     <h4 className="text-lg font-semibold text-gray-800 mb-3">Policy Terms</h4>
// // // // // // // // // // // // //                     <p className="text-gray-600">
// // // // // // // // // // // // //                       - Minimum age to rent: 25 years.<br />
// // // // // // // // // // // // //                       - Valid driver’s license required.<br />
// // // // // // // // // // // // //                       - Insurance included.
// // // // // // // // // // // // //                     </p>
// // // // // // // // // // // // //                     <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-3">Cancellation Policy</h4>
// // // // // // // // // // // // //                     <p className="text-gray-600">
// // // // // // // // // // // // //                       - Free cancellation up to 48 hours before pickup.<br />
// // // // // // // // // // // // //                       - 50% refund within 24 hours.<br />
// // // // // // // // // // // // //                       - No refund within 24 hours.
// // // // // // // // // // // // //                     </p>
// // // // // // // // // // // // //                   </div>

// // // // // // // // // // // // //                   <div className="mt-6 border-t pt-4">
// // // // // // // // // // // // //                     <div className="flex justify-between items-center">
// // // // // // // // // // // // //                       <h2 className="text-lg font-semibold text-gray-800">Total Price</h2>
// // // // // // // // // // // // //                       <span className="text-2xl font-bold text-gray-800">₹{totalPrice.toLocaleString()}</span>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                     <button
// // // // // // // // // // // // //                       onClick={handleConfirmBooking}
// // // // // // // // // // // // //                       className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
// // // // // // // // // // // // //                     >
// // // // // // // // // // // // //                       Confirm Booking
// // // // // // // // // // // // //                     </button>
// // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // //               </div>
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //       </div>
// // // // // // // // // // // // //       <Footer />
// // // // // // // // // // // // //     </div>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export default CarConfirmation;

















// // // // // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // // // // import { useLocation, useNavigate } from "react-router-dom";
// // // // // // // // // // // // import axios from "axios";
// // // // // // // // // // // // import { FaUserFriends, FaSuitcase, FaCogs, FaMapMarkerAlt, FaStar, FaChevronDown, FaChevronUp } from "react-icons/fa";
// // // // // // // // // // // // import Footer from "./Footer";

// // // // // // // // // // // // const CarConfirmation = () => {
// // // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // // //   const navigate = useNavigate();
// // // // // // // // // // // //   const { pickupLocation, pickupDate, pickupTime, dropoffDate, dropoffTime, car = {}, selectedDeal = {} } = location.state || {};
// // // // // // // // // // // //   const [carData, setCarData] = useState(car || {});
// // // // // // // // // // // //   const [addOns, setAddOns] = useState({
// // // // // // // // // // // //     addDriver: false,
// // // // // // // // // // // //     childSeat: false,
// // // // // // // // // // // //     luggageCarrier: false,
// // // // // // // // // // // //   });
// // // // // // // // // // // //   const [totalPrice, setTotalPrice] = useState(0);
// // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // //   const [terminals, setTerminals] = useState([]);
// // // // // // // // // // // //   const [showDriverDetails, setShowDriverDetails] = useState(false);

// // // // // // // // // // // //   // Debug initial state
// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     console.log("Initial location.state in CarConfirmation:", location.state);
// // // // // // // // // // // //     console.log("Initial car:", car);
// // // // // // // // // // // //     console.log("Initial selectedDeal:", selectedDeal);
// // // // // // // // // // // //   }, []);

// // // // // // // // // // // //   // Fetch terminal names from backend (optional, kept for context)
// // // // // // // // // // // //   // useEffect(() => {
// // // // // // // // // // // //   //   const fetchTerminals = async () => {
// // // // // // // // // // // //   //     try {
// // // // // // // // // // // //   //       console.log("Fetching terminals...");
// // // // // // // // // // // //   //       const response = await axios.get("http://localhost:5001/locations/terminals");
// // // // // // // // // // // //   //       console.log("Terminals response:", response.data);
// // // // // // // // // // // //   //       setTerminals(response.data.terminals || []);
// // // // // // // // // // // //   //     } catch (error) {
// // // // // // // // // // // //   //       console.error("Error fetching terminals:", error);
// // // // // // // // // // // //   //       setTerminals([]);
// // // // // // // // // // // //   //     } finally {
// // // // // // // // // // // //   //       setLoading(false);
// // // // // // // // // // // //   //     }
// // // // // // // // // // // //   //   };
// // // // // // // // // // // //   //   fetchTerminals();
// // // // // // // // // // // //   // }, []);

// // // // // // // // // // // //   // Calculate price when dependencies change
// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     const calculatePrice = () => {
// // // // // // // // // // // //       let basePrice = 200;
// // // // // // // // // // // //       let additionalCost = 0;
// // // // // // // // // // // //       let total = 0;

// // // // // // // // // // // //       // Calculate base price based on hourly rate
// // // // // // // // // // // //       // if (carData && pickupDate && dropoffDate && pickupTime && dropoffTime && selectedDeal?.price) {
// // // // // // // // // // // //       //   const pickup = new Date(`${pickupDate}-${pickupTime}`);
// // // // // // // // // // // //       //   const dropoff = new Date(`${dropoffDate}-${dropoffTime}`);
// // // // // // // // // // // //       //   if (isNaN(pickup.getTime()) || isNaN(dropoff.getTime())) {
// // // // // // // // // // // //       //     console.warn("Invalid date format, using default price.");
// // // // // // // // // // // //       //   } else if (pickup < dropoff) {
// // // // // // // // // // // //       //     const diffMs = dropoff - pickup; // Difference in milliseconds
// // // // // // // // // // // //       //     const hours = Math.ceil(diffMs / (1000 * 60 * 60)); // Convert to hours
// // // // // // // // // // // //       //     basePrice = hours * parseFloat(selectedDeal.price || 0);
// // // // // // // // // // // //       //   } else {
// // // // // // // // // // // //       //     console.warn("Dropoff date/time is before pickup date/time, using default price.");
// // // // // // // // // // // //       //   }
// // // // // // // // // // // //       // } else {
// // // // // // // // // // // //       //   console.warn("Missing data for price calculation:", { carData, pickupDate, pickupTime, dropoffDate, dropoffTime, selectedDeal });
// // // // // // // // // // // //       // }

// // // // // // // // // // // //       // Add additional costs
// // // // // // // // // // // //       if (addOns.addDriver) additionalCost += 2000;
// // // // // // // // // // // //       if (addOns.childSeat) additionalCost += 500;
// // // // // // // // // // // //       if (addOns.luggageCarrier) additionalCost += 1000;

// // // // // // // // // // // //       total = additionalCost;
// // // // // // // // // // // //       setTotalPrice(total);
// // // // // // // // // // // //       return { basePrice, additionalCost, total };
// // // // // // // // // // // //     };

// // // // // // // // // // // //     calculatePrice();
// // // // // // // // // // // //   }, [addOns, carData, pickupDate, pickupTime, dropoffDate, dropoffTime, selectedDeal]);

// // // // // // // // // // // //   const handleAddOnChange = (e) => {
// // // // // // // // // // // //     const { name, checked } = e.target;
// // // // // // // // // // // //     setAddOns((prev) => ({ ...prev, [name]: checked }));
// // // // // // // // // // // //     if (name === "addDriver" && !checked) setShowDriverDetails(false);
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleConfirmBooking = () => {
// // // // // // // // // // // //     const bookingDetails = {
// // // // // // // // // // // //       pickupLocation,
// // // // // // // // // // // //       pickupDate,
// // // // // // // // // // // //       pickupTime,
// // // // // // // // // // // //       dropoffDate,
// // // // // // // // // // // //       dropoffTime,
// // // // // // // // // // // //       carId: carData.id,
// // // // // // // // // // // //       carMake: carData.make,
// // // // // // // // // // // //       carModel: carData.model,
// // // // // // // // // // // //       totalPrice,
// // // // // // // // // // // //       addOns,
// // // // // // // // // // // //       agency: selectedDeal.agency,
// // // // // // // // // // // //     };
// // // // // // // // // // // //     navigate("/cabs", { state: { ...location.state, bookingConfirmed: true, bookingDetails } });
// // // // // // // // // // // //   };

// // // // // // // // // // // //   if (loading) return <div className="text-center py-10 text-gray-800">Loading...</div>;
// // // // // // // // // // // //   if (!carData || !selectedDeal) {
// // // // // // // // // // // //     console.log("Car or deal missing, rendering fallback:", { carData, selectedDeal });
// // // // // // // // // // // //     return <div className="text-center py-10 text-gray-800">Car or deal not found</div>;
// // // // // // // // // // // //   }

// // // // // // // // // // // //   const { basePrice, additionalCost } = { basePrice: 0, additionalCost: 0, total: totalPrice }; // Default values

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div className="min-h-screen bg-gray-50">
// // // // // // // // // // // //       <div className="container mx-auto max-w-7xl px-4 py-8">
// // // // // // // // // // // //         <h2 className="text-3xl font-bold text-gray-800 mb-6">Confirm Your Booking</h2>
// // // // // // // // // // // //         <div className="bg-white rounded-2xl shadow-lg p-6">
// // // // // // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
// // // // // // // // // // // //             {/* Left 1/4 - Fixed Pickup Info and Price */}
// // // // // // // // // // // //             <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg sticky top-20">
// // // // // // // // // // // //               <div className="mb-4">
// // // // // // // // // // // //                 <h4 className="text-lg font-semibold text-gray-800 mb-2">Booking Details</h4>
// // // // // // // // // // // //                 <p className="text-gray-800 font-medium">Location: {pickupLocation || "Chennai"}</p>
// // // // // // // // // // // //                 <p className="text-gray-600 mt-2">
// // // // // // // // // // // //                   <span className="font-medium">Pickup:</span> {pickupDate ? `${pickupDate} ${pickupTime}` : "2023-10-01 10:00 AM"}
// // // // // // // // // // // //                 </p>
// // // // // // // // // // // //                 <p className="text-gray-600">
// // // // // // // // // // // //                   <span className="font-medium">Dropoff:</span> {dropoffDate ? `${dropoffDate} ${dropoffTime}` : "2023-10-02 10:00 AM"}
// // // // // // // // // // // //                 </p>
// // // // // // // // // // // //               </div>
// // // // // // // // // // // //               <div className="mt-6">
// // // // // // // // // // // //                 <h4 className="text-lg font-semibold text-gray-800 mb-3">Price Breakdown</h4>
// // // // // // // // // // // //                 <div className="space-y-2">
// // // // // // // // // // // //                   <p className="text-gray-600">Rental Cost: ₹{basePrice.toLocaleString()}</p>
// // // // // // // // // // // //                   <p className="text-gray-600">Extras: ₹{additionalCost.toLocaleString()}</p>
// // // // // // // // // // // //                   <p className="text-2xl font-bold text-gray-800">Total: ₹{totalPrice.toLocaleString()}</p>
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //               </div>
// // // // // // // // // // // //             </div>

// // // // // // // // // // // //             {/* Right 3/4 - Scrollable Car Details and Booking Info */}
// // // // // // // // // // // //             <div className="md:col-span-3 overflow-y-auto max-h-[calc(100vh-12rem)]">
// // // // // // // // // // // //               <div className="flex flex-col md:flex-row gap-6">
// // // // // // // // // // // //                 <div className="md:w-1/3">
// // // // // // // // // // // //                   <img
// // // // // // // // // // // //                     src={carData.image || "https://via.placeholder.com/300x200"}
// // // // // // // // // // // //                     alt={`${carData.make || "Unknown"} ${carData.model || "Model"}`}
// // // // // // // // // // // //                     className="w-full h-48 object-contain rounded-lg bg-gray-50 p-2 mb-4"
// // // // // // // // // // // //                   />
// // // // // // // // // // // //                   <button
// // // // // // // // // // // //                     onClick={() => navigate(-1)}
// // // // // // // // // // // //                     className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
// // // // // // // // // // // //                   >
// // // // // // // // // // // //                     Back to Search Results
// // // // // // // // // // // //                   </button>
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //                 <div className="md:w-2/3">
// // // // // // // // // // // //                   <div className="flex items-center space-x-3 mb-4">
// // // // // // // // // // // //                     <h3 className="text-xl font-semibold text-gray-800">
// // // // // // // // // // // //                       {carData.make || "Unknown"} {carData.model || "Model"}
// // // // // // // // // // // //                     </h3>
// // // // // // // // // // // //                     <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
// // // // // // // // // // // //                       {carData.type || "N/A"}
// // // // // // // // // // // //                     </span>
// // // // // // // // // // // //                   </div>
// // // // // // // // // // // //                   <div className="grid grid-cols-2 gap-4 mb-4">
// // // // // // // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // //                       <FaUserFriends size={14} />
// // // // // // // // // // // //                       <span className="text-sm">{carData.passengers || "N/A"} Passengers</span>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // //                       <FaSuitcase size={14} />
// // // // // // // // // // // //                       <span className="text-sm">4 Luggage</span>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // //                       <FaCogs size={14} />
// // // // // // // // // // // //                       <span className="text-sm">{carData.transmission || "N/A"}</span>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // //                       <FaMapMarkerAlt size={14} />
// // // // // // // // // // // //                       <span className="text-sm">Unlimited Mileage</span>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // // // // //                       <FaStar size={14} className="text-yellow-400" />
// // // // // // // // // // // //                       <span className="text-sm">{carData.ratings || "N/A"}/10</span>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                   </div>
// // // // // // // // // // // //                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
// // // // // // // // // // // //                     <p className="text-gray-800 font-semibold">Agency: {selectedDeal.agency || "N/A"}</p>
// // // // // // // // // // // //                     <p className="text-gray-600">Fuel Policy: {carData.fuel_policy || "N/A"}</p>
// // // // // // // // // // // //                   </div>
// // // // // // // // // // // //                   <div className="space-y-3">
// // // // // // // // // // // //                     <h4 className="text-lg font-semibold text-gray-800 mb-3">Additional Options</h4>
// // // // // // // // // // // //                     <label className="flex items-center text-gray-800">
// // // // // // // // // // // //                       <input
// // // // // // // // // // // //                         type="checkbox"
// // // // // // // // // // // //                         name="addDriver"
// // // // // // // // // // // //                         checked={addOns.addDriver}
// // // // // // // // // // // //                         onChange={handleAddOnChange}
// // // // // // // // // // // //                         className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
// // // // // // // // // // // //                       />
// // // // // // // // // // // //                       Additional Driver (₹2000)
// // // // // // // // // // // //                     </label>
// // // // // // // // // // // //                     <label className="flex items-center text-gray-800">
// // // // // // // // // // // //                       <input
// // // // // // // // // // // //                         type="checkbox"
// // // // // // // // // // // //                         name="childSeat"
// // // // // // // // // // // //                         checked={addOns.childSeat}
// // // // // // // // // // // //                         onChange={handleAddOnChange}
// // // // // // // // // // // //                         className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
// // // // // // // // // // // //                       />
// // // // // // // // // // // //                       Child Seat (₹500)
// // // // // // // // // // // //                     </label>
// // // // // // // // // // // //                     <label className="flex items-center text-gray-800">
// // // // // // // // // // // //                       <input
// // // // // // // // // // // //                         type="checkbox"
// // // // // // // // // // // //                         name="luggageCarrier"
// // // // // // // // // // // //                         checked={addOns.luggageCarrier}
// // // // // // // // // // // //                         onChange={handleAddOnChange}
// // // // // // // // // // // //                         className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
// // // // // // // // // // // //                       />
// // // // // // // // // // // //                       Luggage Carrier (₹1000)
// // // // // // // // // // // //                     </label>
// // // // // // // // // // // //                   </div>

// // // // // // // // // // // //                   {/* Driver Details Section */}
// // // // // // // // // // // //                   {addOns.addDriver && (
// // // // // // // // // // // //                     <div className="mt-4 p-4 bg-gray-50 rounded-lg">
// // // // // // // // // // // //                       <button
// // // // // // // // // // // //                         onClick={() => setShowDriverDetails(!showDriverDetails)}
// // // // // // // // // // // //                         className="flex items-center text-blue-600 font-semibold mb-2"
// // // // // // // // // // // //                       >
// // // // // // // // // // // //                         Driver Details {showDriverDetails ? <FaChevronUp /> : <FaChevronDown />}
// // // // // // // // // // // //                       </button>
// // // // // // // // // // // //                       {showDriverDetails && (
// // // // // // // // // // // //                         <div className="text-gray-600 space-y-2">
// // // // // // // // // // // //                           <p><span className="font-medium">Name:</span> John Doe</p>
// // // // // // // // // // // //                           <p><span className="font-medium">License #:</span> DL123456</p>
// // // // // // // // // // // //                           <p><span className="font-medium">Contact:</span> +91 9876543210</p>
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                       )}
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                   )}

// // // // // // // // // // // //                   {/* Policy Terms and Cancellation Policy */}
// // // // // // // // // // // //                   <div className="mt-6">
// // // // // // // // // // // //                     <h4 className="text-lg font-semibold text-gray-800 mb-3">Policy Terms</h4>
// // // // // // // // // // // //                     <p className="text-gray-600">
// // // // // // // // // // // //                       - Minimum age to rent: 25 years.<br />
// // // // // // // // // // // //                       - Valid driver’s license required.<br />
// // // // // // // // // // // //                       - Insurance included.
// // // // // // // // // // // //                     </p>
// // // // // // // // // // // //                     <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-3">Cancellation Policy</h4>
// // // // // // // // // // // //                     <p className="text-gray-600">
// // // // // // // // // // // //                       - Free cancellation up to 48 hours before pickup.<br />
// // // // // // // // // // // //                       - 50% refund within 24 hours.<br />
// // // // // // // // // // // //                       - No refund within 24 hours.
// // // // // // // // // // // //                     </p>
// // // // // // // // // // // //                   </div>

// // // // // // // // // // // //                   <div className="mt-6 border-t pt-4">
// // // // // // // // // // // //                     <div className="flex justify-between items-center">
// // // // // // // // // // // //                       <h2 className="text-lg font-semibold text-gray-800">Total Price</h2>
// // // // // // // // // // // //                       <span className="text-2xl font-bold text-gray-800">₹{totalPrice.toLocaleString()}</span>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                     <button
// // // // // // // // // // // //                       onClick={handleConfirmBooking}
// // // // // // // // // // // //                       className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
// // // // // // // // // // // //                     >
// // // // // // // // // // // //                       Confirm Booking
// // // // // // // // // // // //                     </button>
// // // // // // // // // // // //                   </div>
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //               </div>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //       <Footer />
// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // };

// // // // // // // // // // // // export default CarConfirmation;











// // // // // // // // // // // import React, { useEffect } from "react";
// // // // // // // // // // // import { useLocation, useNavigate } from "react-router-dom";
// // // // // // // // // // // import Footer from "./Footer";

// // // // // // // // // // // const CarConfirmation = () => {
// // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // //   const navigate = useNavigate();
// // // // // // // // // // //   const {
// // // // // // // // // // //     pickupLocation,
// // // // // // // // // // //     pickupDate,
// // // // // // // // // // //     pickupTime,
// // // // // // // // // // //     dropoffDate,
// // // // // // // // // // //     dropoffTime,
// // // // // // // // // // //     car = {},
// // // // // // // // // // //     selectedDeal = {},
// // // // // // // // // // //   } = location.state || {};

// // // // // // // // // // //   // Debug the received state
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     console.log("CarConfirmation location.state:", JSON.stringify(location.state, null, 2));
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   // Fallback values if data is missing
// // // // // // // // // // //   const safePickupLocation = pickupLocation || "Not specified";
// // // // // // // // // // //   const safePickupDateTime = pickupDate && pickupTime ? `${pickupDate} ${pickupTime}` : "Not specified";
// // // // // // // // // // //   const safeDropoffDateTime = dropoffDate && dropoffTime ? `${dropoffDate} ${dropoffTime}` : "Not specified";
// // // // // // // // // // //   const safeCarMake = car.make || "Unknown";
// // // // // // // // // // //   const safeCarModel = car.model || "Unknown";
// // // // // // // // // // //   const safeCarType = car.type || "Unknown";
// // // // // // // // // // //   const safePrice = selectedDeal.price || "Not available";

// // // // // // // // // // //   const handleBack = () => {
// // // // // // // // // // //     navigate(-1);
// // // // // // // // // // //   };


// // // // // // // // // // //   const handleConfirmBooking = () => {
// // // // // // // // // // //         const bookingDetails = {
// // // // // // // // // // //           // pickupLocation,
// // // // // // // // // // //           // pickupDate,
// // // // // // // // // // //           // pickupTime,
// // // // // // // // // // //           // dropoffDate,
// // // // // // // // // // //           // dropoffTime,
// // // // // // // // // // //           carId: carData.id,
// // // // // // // // // // //           carMake: carData.make,
// // // // // // // // // // //           carModel: carData.model,
// // // // // // // // // // //           totalPrice,
// // // // // // // // // // //           addOns,
// // // // // // // // // // //           agency: selectedDeal.agency,
// // // // // // // // // // //         };
// // // // // // // // // // //         navigate("/cabs", { state: { ...location.state, bookingConfirmed: true, bookingDetails } });   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="min-h-screen bg-gray-50">
// // // // // // // // // // //       <div className="container mx-auto max-w-7xl px-4 py-8">
// // // // // // // // // // //         <h2 className="text-3xl font-bold text-gray-800 mb-6">Confirm Your Booking</h2>
// // // // // // // // // // //         <div className="bg-white rounded-2xl shadow-lg p-6">
// // // // // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // // // // // // // //             {/* Booking Details */}
// // // // // // // // // // //             <div className="md:col-span-1">
// // // // // // // // // // //               <h3 className="text-xl font-semibold text-gray-800 mb-4">Booking Details</h3>
// // // // // // // // // // //               <p className="text-gray-600 mb-2">
// // // // // // // // // // //                 <span className="font-medium">Pickup Location:</span> {safePickupLocation}
// // // // // // // // // // //               </p>
// // // // // // // // // // //               <p className="text-gray-600 mb-2">
// // // // // // // // // // //                 <span className="font-medium">Pickup Date & Time:</span> {safePickupDateTime}
// // // // // // // // // // //               </p>
// // // // // // // // // // //               <p className="text-gray-600 mb-2">
// // // // // // // // // // //                 <span className="font-medium">Dropoff Date & Time:</span> {safeDropoffDateTime}
// // // // // // // // // // //               </p>
// // // // // // // // // // //             </div>

// // // // // // // // // // //             {/* Car Details */}
// // // // // // // // // // //             <div className="md:col-span-1">
// // // // // // // // // // //               <h3 className="text-xl font-semibold text-gray-800 mb-4">Car Details</h3>
// // // // // // // // // // //               <p className="text-gray-600 mb-2">
// // // // // // // // // // //                 <span className="font-medium">Make:</span> {safeCarMake}
// // // // // // // // // // //               </p>
// // // // // // // // // // //               <p className="text-gray-600 mb-2">
// // // // // // // // // // //                 <span className="font-medium">Model:</span> {safeCarModel}
// // // // // // // // // // //               </p>
// // // // // // // // // // //               <p className="text-gray-600 mb-2">
// // // // // // // // // // //                 <span className="font-medium">Type:</span> {safeCarType}
// // // // // // // // // // //               </p>
// // // // // // // // // // //               <p className="text-gray-600 mb-2">
// // // // // // // // // // //                 <span className="font-medium">Price:</span> ₹{safePrice}/hour
// // // // // // // // // // //               </p>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </div>

// // // // // // // // // // //           <div className="mt-6 border-t pt-4">
// // // // // // // // // // //             <button
// // // // // // // // // // //               onClick={handleBack}
// // // // // // // // // // //               className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
// // // // // // // // // // //             >
// // // // // // // // // // //               Back to Search Results
// // // // // // // // // // //             </button>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>
// // // // // // // // // // //       <button
// // // // // // // // // // //                        onClick={handleConfirmBooking}
// // // // // // // // // // //                       className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
// // // // // // // // // // //                     >
// // // // // // // // // // //                       Confirm Booking
// // // // // // // // // // //                     </button>
// // // // // // // // // // //       <Footer />
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default CarConfirmation;







// // // // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // // // import { useLocation, useNavigate } from "react-router-dom";
// // // // // // // // // // import Footer from "./Footer";
// // // // // // // // // // import { loadStripe } from "@stripe/stripe-js";

// // // // // // // // // // // Load Stripe with your publishable key
// // // // // // // // // // const stripePromise = loadStripe("pk_test_51RBq3dPlQbJhRZQumwQFlV6uBA7rekmsFfXhxYG3fyxau7bPHQgoV86IaD5cbhvdM394vHEDKi3KhiqskSxT16Cf00rWlbxKrL"); // Replace with your Stripe Publishable Key

// // // // // // // // // // const CarConfirmation = () => {
// // // // // // // // // //   const location = useLocation();
// // // // // // // // // //   const navigate = useNavigate();
// // // // // // // // // //   const { car = {}, selectedDeal = {} } = location.state || {};
// // // // // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // // // // //   const [error, setError] = useState(null);

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     console.log("CarConfirmation location.state:", JSON.stringify(location.state, null, 2));
// // // // // // // // // //   }, []);

// // // // // // // // // //   // Fallback values
// // // // // // // // // //   const safeCarMake = car.make || "Unknown";
// // // // // // // // // //   const safeCarModel = car.model || "Unknown";
// // // // // // // // // //   const safeCarType = car.type || "Unknown";
// // // // // // // // // //   const safePrice = selectedDeal.price || "Not available";

// // // // // // // // // //   if (!car || !safePrice || safePrice === "Not available") {
// // // // // // // // // //     return <div className="p-4 text-center">No valid car selected. Please go back and select a car.</div>;
// // // // // // // // // //   }

// // // // // // // // // //   const handleBookNow = async () => {
// // // // // // // // // //     setLoading(true);
// // // // // // // // // //     setError(null);

// // // // // // // // // //     try {
// // // // // // // // // //       console.log("Creating checkout session with amount:", parseFloat(safePrice.replace(/[^0-9.-]+/g, "")) * 100);
// // // // // // // // // //       console.log("Request body:", {
// // // // // // // // // //         amount: parseFloat(safePrice.replace(/[^0-9.-]+/g, "")) * 100,
// // // // // // // // // //         description: `Car Rental - ${safeCarMake} ${safeCarModel}`,
// // // // // // // // // //       });

// // // // // // // // // //       // Store booking details in sessionStorage before redirecting to Stripe Checkout
// // // // // // // // // //       const bookingDetails = {
// // // // // // // // // //         car,
// // // // // // // // // //         selectedDeal,
// // // // // // // // // //       };
// // // // // // // // // //       sessionStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));

// // // // // // // // // //       // Create a Checkout Session on the backend
// // // // // // // // // //       const response = await fetch("http://localhost:5001/create-checkout-session", {
// // // // // // // // // //         method: "POST",
// // // // // // // // // //         headers: { "Content-Type": "application/json" },
// // // // // // // // // //         body: JSON.stringify({
// // // // // // // // // //           amount: parseFloat(safePrice.replace(/[^0-9.-]+/g, "")) * 100, // Amount in cents
// // // // // // // // // //           description: `Car Rental - ${safeCarMake} ${safeCarModel}`,
// // // // // // // // // //         }),
// // // // // // // // // //       });

// // // // // // // // // //       if (!response.ok) {
// // // // // // // // // //         const errorText = await response.text();
// // // // // // // // // //         throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
// // // // // // // // // //       }

// // // // // // // // // //       const { sessionId } = await response.json();
// // // // // // // // // //       console.log("Received sessionId:", sessionId);

// // // // // // // // // //       // Redirect to Stripe Checkout
// // // // // // // // // //       const stripe = await stripePromise;
// // // // // // // // // //       const { error } = await stripe.redirectToCheckout({ sessionId });

// // // // // // // // // //       if (error) {
// // // // // // // // // //         throw new Error(`Stripe redirect error: ${error.message}`);
// // // // // // // // // //       }
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error("Error creating checkout session:", error);
// // // // // // // // // //       setError(`Failed to initiate payment: ${error.message}`);
// // // // // // // // // //     } finally {
// // // // // // // // // //       setLoading(false);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const handleBack = () => {
// // // // // // // // // //     console.log("handleBack called, navigating back with state:", location.state);
// // // // // // // // // //     navigate(-1, { state: location.state });
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="min-h-screen bg-gray-50">
// // // // // // // // // //       <div className="container mx-auto max-w-7xl px-4 py-8">
// // // // // // // // // //         <h2 className="text-3xl font-bold text-gray-800 mb-6">Confirm Your Booking</h2>
// // // // // // // // // //         <div className="bg-white rounded-2xl shadow-lg p-6">
// // // // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
// // // // // // // // // //             <div className="md:col-span-1">
// // // // // // // // // //               <h3 className="text-xl font-semibold text-gray-800 mb-4">Car Details</h3>
// // // // // // // // // //               <p className="text-gray-600 mb-2">
// // // // // // // // // //                 <span className="font-medium">Make:</span> {safeCarMake}
// // // // // // // // // //               </p>
// // // // // // // // // //               <p className="text-gray-600 mb-2">
// // // // // // // // // //                 <span className="font-medium">Model:</span> {safeCarModel}
// // // // // // // // // //               </p>
// // // // // // // // // //               <p className="text-gray-600 mb-2">
// // // // // // // // // //                 <span className="font-medium">Type:</span> {safeCarType}
// // // // // // // // // //               </p>
// // // // // // // // // //               <p className="text-gray-600 mb-2">
// // // // // // // // // //                 <span className="font-medium">Price:</span> ₹{safePrice}/hour
// // // // // // // // // //               </p>
// // // // // // // // // //             </div>
// // // // // // // // // //           </div>

// // // // // // // // // //           {error && <div className="p-4 text-red-500">{error}</div>}

// // // // // // // // // //           <div className="flex justify-between items-center p-4 border-t">
// // // // // // // // // //             <p className="text-xl font-bold">
// // // // // // // // // //               ₹ {safePrice} <span className="text-sm font-normal">FOR RENTAL</span>
// // // // // // // // // //             </p>
// // // // // // // // // //             <div>
// // // // // // // // // //               <button
// // // // // // // // // //                 onClick={handleBookNow}
// // // // // // // // // //                 className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
// // // // // // // // // //                 disabled={loading}
// // // // // // // // // //               >
// // // // // // // // // //                 {loading ? "Processing..." : "Confirm Booking"}
// // // // // // // // // //               </button>
// // // // // // // // // //             </div>
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //       <Footer />
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default CarConfirmation;







// // // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // // import { useLocation, useNavigate } from "react-router-dom";
// // // // // // // // // import Footer from "./Footer";
// // // // // // // // // import { loadStripe } from "@stripe/stripe-js";

// // // // // // // // // // Load Stripe with your publishable key
// // // // // // // // // const stripePromise = loadStripe("pk_test_51R9gCp2RiOcrGJvieLzKDxaRl6BUuUMsLgqRw9JtzVE7ODz7SJSy7NPqSfTySDpE42Z66YlDFTHSTqZakuWN58u200VoXJx5zQ"); // Replace with your Stripe Publishable Key

// // // // // // // // // const CarConfirmation = () => {
// // // // // // // // //   const location = useLocation();
// // // // // // // // //   const navigate = useNavigate();
// // // // // // // // //   const { car = {}, selectedDeal = {} } = location.state || {};
// // // // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // // // //   const [error, setError] = useState(null);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     console.log("CarConfirmation location.state:", JSON.stringify(location.state, null, 2));
// // // // // // // // //   }, []);

// // // // // // // // //   // Fallback values
// // // // // // // // //   const safeCarMake = car.make || "Unknown";
// // // // // // // // //   const safeCarModel = car.model || "Unknown";
// // // // // // // // //   const safeCarType = car.type || "Unknown";
// // // // // // // // //   const safePrice = selectedDeal.price || "Not available";

// // // // // // // // //   if (!car || !safePrice || safePrice === "Not available") {
// // // // // // // // //     return <div className="p-4 text-center">No valid car selected. Please go back and select a car.</div>;
// // // // // // // // //   }

// // // // // // // // //   const handleBookNow = async () => {
// // // // // // // // //     setLoading(true);
// // // // // // // // //     setError(null);

// // // // // // // // //     try {
// // // // // // // // //       // Parse and validate price
// // // // // // // // //       const priceNumeric = parseFloat(safePrice.replace(/[^0-9.-]+/g, ""));
// // // // // // // // //       if (isNaN(priceNumeric) || priceNumeric <= 0) {
// // // // // // // // //         throw new Error("Invalid price format");
// // // // // // // // //       }
// // // // // // // // //       const amountInCents = Math.round(priceNumeric * 100); // Ensure integer
// // // // // // // // //       console.log("Parsed amount in cents:", amountInCents);

// // // // // // // // //       console.log("Creating checkout session with amount:", amountInCents);
// // // // // // // // //       console.log("Request body:", {
// // // // // // // // //         amount: amountInCents,
// // // // // // // // //         description: `Car Rental - ${safeCarMake} ${safeCarModel}`,
// // // // // // // // //       });

// // // // // // // // //       // Store booking details in sessionStorage
// // // // // // // // //       const bookingDetails = { car, selectedDeal };
// // // // // // // // //       sessionStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));

// // // // // // // // //       // Create a Checkout Session on the backend
// // // // // // // // //       const response = await fetch("http://localhost:5001/create-checkout-session", {
// // // // // // // // //         method: "POST",
// // // // // // // // //         headers: { "Content-Type": "application/json" },
// // // // // // // // //         body: JSON.stringify({
// // // // // // // // //           amount: amountInCents,
// // // // // // // // //           description: `Car Rental - ${safeCarMake} ${safeCarModel}`,
// // // // // // // // //         }),
// // // // // // // // //       });

// // // // // // // // //       if (!response.ok) {
// // // // // // // // //         const errorText = await response.text();
// // // // // // // // //         console.log("Backend response error:", errorText);
// // // // // // // // //         throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
// // // // // // // // //       }

// // // // // // // // //       const { sessionId } = await response.json();
// // // // // // // // //       console.log("Received sessionId:", sessionId);

// // // // // // // // //       // Redirect to Stripe Checkout
// // // // // // // // //       const stripe = await stripePromise;
// // // // // // // // //       const { error } = await stripe.redirectToCheckout({ sessionId });

// // // // // // // // //       if (error) {
// // // // // // // // //         throw new Error(`Stripe redirect error: ${error.message}`);
// // // // // // // // //       }
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error("Error creating checkout session:", error);
// // // // // // // // //       setError(`Failed to initiate payment: ${error.message}`);
// // // // // // // // //     } finally {
// // // // // // // // //       setLoading(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleBack = () => {
// // // // // // // // //     console.log("handleBack called, navigating back with state:", location.state);
// // // // // // // // //     navigate(-1, { state: location.state });
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div className="min-h-screen bg-gray-50">
// // // // // // // // //       <div className="container mx-auto max-w-7xl px-4 py-8">
// // // // // // // // //         <h2 className="text-3xl font-bold text-gray-800 mb-6">Confirm Your Booking</h2>
// // // // // // // // //         <div className="bg-white rounded-2xl shadow-lg p-6">
// // // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
// // // // // // // // //             <div className="md:col-span-1">
// // // // // // // // //               <h3 className="text-xl font-semibold text-gray-800 mb-4">Car Details</h3>
// // // // // // // // //               <p className="text-gray-600 mb-2">
// // // // // // // // //                 <span className="font-medium">Make:</span> {safeCarMake}
// // // // // // // // //               </p>
// // // // // // // // //               <p className="text-gray-600 mb-2">
// // // // // // // // //                 <span className="font-medium">Model:</span> {safeCarModel}
// // // // // // // // //               </p>
// // // // // // // // //               <p className="text-gray-600 mb-2">
// // // // // // // // //                 <span className="font-medium">Type:</span> {safeCarType}
// // // // // // // // //               </p>
// // // // // // // // //               <p className="text-gray-600 mb-2">
// // // // // // // // //                 <span className="font-medium">Price:</span> ₹{safePrice}/hour
// // // // // // // // //               </p>
// // // // // // // // //             </div>
// // // // // // // // //           </div>

// // // // // // // // //           {error && <div className="p-4 text-red-500">{error}</div>}

// // // // // // // // //           <div className="flex justify-between items-center p-4 border-t">
// // // // // // // // //             <p className="text-xl font-bold">
// // // // // // // // //               ₹ {safePrice} <span className="text-sm font-normal">FOR RENTAL</span>
// // // // // // // // //             </p>
// // // // // // // // //             <div>
// // // // // // // // //               <button
// // // // // // // // //                 onClick={handleBookNow}
// // // // // // // // //                 className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
// // // // // // // // //                 disabled={loading}
// // // // // // // // //               >
// // // // // // // // //                 {loading ? "Processing..." : "Confirm Booking"}
// // // // // // // // //               </button>
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //       <Footer />
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default CarConfirmation;







// // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // import { useLocation, useNavigate } from "react-router-dom";
// // // // // // // // // import axios from "axios";
// // // // // // // // // import { loadStripe } from "@stripe/stripe-js";
// // // // // // // // // import {
// // // // // // // // //   FaUserFriends,
// // // // // // // // //   FaSuitcase,
// // // // // // // // //   FaCogs,
// // // // // // // // //   FaMapMarkerAlt,
// // // // // // // // //   FaStar,
// // // // // // // // // } from "react-icons/fa";
// // // // // // // // // import Footer from "./Footer";

// // // // // // // // // // Load Stripe with your public key
// // // // // // // // // const stripePromise = loadStripe("pk_test_51RBq3dPlQbJhRZQumwQFlV6uBA7rekmsFfXhxYG3fyxau7bPHQgoV86IaD5cbhvdM394vHEDKi3KhiqskSxT16Cf00rWlbxKrL");

// // // // // // // // // const CarConfirmation = () => {
// // // // // // // // //   const location = useLocation();
// // // // // // // // //   const navigate = useNavigate();
// // // // // // // // //   const {
// // // // // // // // //     pickupDate,
// // // // // // // // //     pickupTime,
// // // // // // // // //     dropoffDate,
// // // // // // // // //     dropoffTime,
// // // // // // // // //     pickupLocation,
// // // // // // // // //     car = {},
// // // // // // // // //     selectedDeal = {},
// // // // // // // // //   } = location.state || {};
// // // // // // // // //   const [carData, setCarData] = useState(car || {});
// // // // // // // // //   const [totalPrice, setTotalPrice] = useState(0);
// // // // // // // // //   const [loading, setLoading] = useState(true);

// // // // // // // // //   // Calculate price based on per-hour rate and duration
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const calculatePrice = () => {
// // // // // // // // //       console.log("Received state:", {
// // // // // // // // //         pickupDate,
// // // // // // // // //         pickupTime,
// // // // // // // // //         dropoffDate,
// // // // // // // // //         dropoffTime,
// // // // // // // // //         pickupLocation,
// // // // // // // // //         car,
// // // // // // // // //         selectedDeal,
// // // // // // // // //       });

// // // // // // // // //       // Validate all required fields
// // // // // // // // //       if (!pickupDate || !pickupTime || !dropoffDate || !dropoffTime || !pickupLocation || !selectedDeal?.price) {
// // // // // // // // //         console.warn("🚨 Missing required fields or price:", {
// // // // // // // // //           pickupDate,
// // // // // // // // //           pickupTime,
// // // // // // // // //           dropoffDate,
// // // // // // // // //           dropoffTime,
// // // // // // // // //           pickupLocation,
// // // // // // // // //           selectedDeal,
// // // // // // // // //         });
// // // // // // // // //         setTotalPrice(0);
// // // // // // // // //         return;
// // // // // // // // //       }

// // // // // // // // //       // Parse dates using ISO format
// // // // // // // // //       const pickup = new Date(`${pickupDate}T${pickupTime}`);
// // // // // // // // //       const dropoff = new Date(`${dropoffDate}T${dropoffTime}`);

// // // // // // // // //       // Validate date objects
// // // // // // // // //       if (isNaN(pickup.getTime()) || isNaN(dropoff.getTime())) {
// // // // // // // // //         console.warn("❌ Invalid date format:", { pickup, dropoff });
// // // // // // // // //         setTotalPrice(0);
// // // // // // // // //         return;
// // // // // // // // //       }

// // // // // // // // //       // Ensure dropoff is after pickup
// // // // // // // // //       if (pickup >= dropoff) {
// // // // // // // // //         console.warn("❌ Dropoff date must be after pickup date.");
// // // // // // // // //         setTotalPrice(0);
// // // // // // // // //         return;
// // // // // // // // //       }

// // // // // // // // //       // Calculate hours
// // // // // // // // //       const calculatedHours = Math.max(1, Math.ceil((dropoff - pickup) / (1000 * 60 * 60))); // Minimum 1 hour, round up
// // // // // // // // //       const basePrice = calculatedHours * selectedDeal.price;

// // // // // // // // //       // Update state
// // // // // // // // //       setTotalPrice(basePrice);
// // // // // // // // //       console.log("Calculated:", { hours: calculatedHours, totalPrice: basePrice });
// // // // // // // // //     };

// // // // // // // // //     calculatePrice();
// // // // // // // // //     setLoading(false);
// // // // // // // // //   }, [pickupDate, pickupTime, dropoffDate, dropoffTime, pickupLocation, selectedDeal]);

// // // // // // // // //   const handlePayment = async () => {
// // // // // // // // //     if (!totalPrice || totalPrice <= 0) {
// // // // // // // // //       console.warn("Cannot proceed with payment: Total price is zero.");
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     const stripe = await stripePromise;
// // // // // // // // //     try {
// // // // // // // // //       const response = await axios.post("http://localhost:5001/create-checkout-session", {
// // // // // // // // //         amount: totalPrice * 100, // Amount in paise
// // // // // // // // //         currency: "inr",
// // // // // // // // //         pickupLocation: pickupLocation || "N/A",
// // // // // // // // //         pickupDate,
// // // // // // // // //         pickupTime,
// // // // // // // // //         dropoffDate,
// // // // // // // // //         dropoffTime,
// // // // // // // // //         carId: carData.id,
// // // // // // // // //         carMake: carData.make,
// // // // // // // // //         carModel: carData.model,
// // // // // // // // //         agency: selectedDeal.agency,
// // // // // // // // //       });

// // // // // // // // //       const { id: sessionId } = response.data;

// // // // // // // // //       const { error } = await stripe.redirectToCheckout({
// // // // // // // // //         sessionId: sessionId,
// // // // // // // // //       });

// // // // // // // // //       if (error) {
// // // // // // // // //         console.error("Error redirecting to Stripe checkout:", error);
// // // // // // // // //       }
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error("Axios error during payment:", error);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   if (loading) return <div className="text-center py-10 text-gray-800">Loading...</div>;
// // // // // // // // //   if (!carData || !selectedDeal)
// // // // // // // // //     return <div className="text-center py-10 text-gray-800">Car or deal not found</div>;

// // // // // // // // //   return (
// // // // // // // // //     <div className="min-h-screen bg-gray-50">
// // // // // // // // //       <div className="container mx-auto max-w-7xl px-4 py-8">
// // // // // // // // //         <h2 className="text-3xl font-bold text-gray-800 mb-6">Confirm Your Booking</h2>
// // // // // // // // //         <div className="bg-white rounded-2xl shadow-lg p-6">
// // // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // // // // // //             <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
// // // // // // // // //               <div className="mt-6">
// // // // // // // // //                 <h4 className="text-lg font-semibold text-gray-800 mb-3">Booking Details</h4>
// // // // // // // // //                 <p className="text-gray-600">
// // // // // // // // //                   <strong>Location:</strong> {pickupLocation || "N/A"}
// // // // // // // // //                 </p>
// // // // // // // // //                 <p className="text-gray-600">
// // // // // // // // //                   <strong>Pickup Date & Time:</strong> {pickupDate && pickupTime ? `${pickupDate} ${pickupTime}` : "N/A"}
// // // // // // // // //                 </p>
// // // // // // // // //                 <p className="text-gray-600">
// // // // // // // // //                   <strong>Dropoff Date & Time:</strong> {dropoffDate && dropoffTime ? `${dropoffDate} ${dropoffTime}` : "N/A"}
// // // // // // // // //                 </p>
// // // // // // // // //                 <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-3">Price Breakdown</h4>
// // // // // // // // //                 <p className="text-gray-600">Rental Cost: ₹{totalPrice.toLocaleString()}</p>
// // // // // // // // //                 <p className="text-gray-600">Extras: ₹0</p>
// // // // // // // // //                 <p className="text-2xl font-bold text-gray-800">Total: ₹{totalPrice.toLocaleString()}</p>
// // // // // // // // //               </div>
// // // // // // // // //             </div>

// // // // // // // // //             <div className="md:col-span-1">
// // // // // // // // //               <div className="flex flex-col md:flex-row gap-6">
// // // // // // // // //                 <div className="md:w-1/2">
// // // // // // // // //                   <img
// // // // // // // // //                     src={carData.image || "https://via.placeholder.com/300x200"}
// // // // // // // // //                     alt={`${carData.make || "Unknown"} ${carData.model || "Model"}`}
// // // // // // // // //                     className="w-full h-48 object-contain rounded-lg bg-gray-50 p-2 mb-4"
// // // // // // // // //                   />
// // // // // // // // //                   <button
// // // // // // // // //                     onClick={() => navigate(-1)}
// // // // // // // // //                     className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
// // // // // // // // //                   >
// // // // // // // // //                     Back to Search Results
// // // // // // // // //                   </button>
// // // // // // // // //                 </div>

// // // // // // // // //                 <div className="md:w-1/2">
// // // // // // // // //                   <div className="flex items-center space-x-3 mb-4">
// // // // // // // // //                     <h3 className="text-xl font-semibold text-gray-800">
// // // // // // // // //                       {carData.make || "Unknown"} {carData.model || "Model"}
// // // // // // // // //                     </h3>
// // // // // // // // //                     <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
// // // // // // // // //                       {carData.type || "N/A"}
// // // // // // // // //                     </span>
// // // // // // // // //                   </div>

// // // // // // // // //                   <div className="grid grid-cols-2 gap-4 mb-4">
// // // // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // //                       <FaUserFriends size={14} />
// // // // // // // // //                       <span className="text-sm">{carData.passengers || "N/A"} Passengers</span>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // //                       <FaSuitcase size={14} />
// // // // // // // // //                       <span className="text-sm">4 Luggage</span>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // //                       <FaCogs size={14} />
// // // // // // // // //                       <span className="text-sm">{carData.transmission || "N/A"}</span>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // //                       <FaMapMarkerAlt size={14} />
// // // // // // // // //                       <span className="text-sm">Unlimited Mileage</span>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // // //                       <FaStar size={14} className="text-yellow-400" />
// // // // // // // // //                       <span className="text-sm">{carData.ratings || "N/A"}/5</span>
// // // // // // // // //                     </div>
// // // // // // // // //                   </div>

// // // // // // // // //                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
// // // // // // // // //                     <p className="text-gray-800 font-semibold">Agency: {selectedDeal.agency || "N/A"}</p>
// // // // // // // // //                     <p className="text-gray-600">Fuel Policy: {carData.fuel_policy || "N/A"}</p>
// // // // // // // // //                   </div>

// // // // // // // // //                   <div className="mt-6 border-t pt-4">
// // // // // // // // //                     <div className="flex justify-between items-center">
// // // // // // // // //                       <h2 className="text-lg font-semibold text-gray-800">Total Price</h2>
// // // // // // // // //                       <span className="text-2xl font-bold text-gray-800">₹{totalPrice.toLocaleString()}</span>
// // // // // // // // //                     </div>
// // // // // // // // //                     <button
// // // // // // // // //                       onClick={handlePayment}
// // // // // // // // //                       className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
// // // // // // // // //                     >
// // // // // // // // //                       Confirm Booking
// // // // // // // // //                     </button>
// // // // // // // // //                   </div>
// // // // // // // // //                 </div>
// // // // // // // // //               </div>
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       <Footer />
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default CarConfirmation;



// // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // import { useLocation, useNavigate } from "react-router-dom";
// // // // // // // // import axios from "axios";
// // // // // // // // import { loadStripe } from "@stripe/stripe-js";
// // // // // // // // import {
// // // // // // // //   FaUserFriends,
// // // // // // // //   FaSuitcase,
// // // // // // // //   FaCogs,
// // // // // // // //   FaMapMarkerAlt,
// // // // // // // //   FaStar,
// // // // // // // // } from "react-icons/fa";
// // // // // // // // import Footer from "./Footer";

// // // // // // // // // Load Stripe with your public key
// // // // // // // // const stripePromise = loadStripe("pk_test_51RBq3dPlQbJhRZQumwQFlV6uBA7rekmsFfXhxYG3fyxau7bPHQgoV86IaD5cbhvdM394vHEDKi3KhiqskSxT16Cf00rWlbxKrL");

// // // // // // // // const CarConfirmation = () => {
// // // // // // // //   const location = useLocation();
// // // // // // // //   const navigate = useNavigate();
// // // // // // // //   const {
// // // // // // // //     pickupDate,
// // // // // // // //     pickupTime,
// // // // // // // //     dropoffDate,
// // // // // // // //     dropoffTime,
// // // // // // // //     pickupLocation,
// // // // // // // //     car = {},
// // // // // // // //     selectedDeal = {},
// // // // // // // //   } = location.state || {};
// // // // // // // //   const [carData, setCarData] = useState(car || {});
// // // // // // // //   const [totalPrice, setTotalPrice] = useState(0);
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const [extras, setExtras] = useState({
// // // // // // // //     additionalDriver: false,
// // // // // // // //     extraLuggage: false,
// // // // // // // //     childSeat: false,
// // // // // // // //   });

// // // // // // // //   // Fixed prices for extras
// // // // // // // //   const EXTRA_PRICES = {
// // // // // // // //     additionalDriver: 500,
// // // // // // // //     extraLuggage: 300,
// // // // // // // //     childSeat: 400,
// // // // // // // //   };

// // // // // // // //   // Calculate price based on per-hour rate, duration, and extras
// // // // // // // //   useEffect(() => {
// // // // // // // //     const calculatePrice = () => {
// // // // // // // //       console.log("Received state:", {
// // // // // // // //         pickupDate,
// // // // // // // //         pickupTime,
// // // // // // // //         dropoffDate,
// // // // // // // //         dropoffTime,
// // // // // // // //         pickupLocation,
// // // // // // // //         car,
// // // // // // // //         selectedDeal,
// // // // // // // //       });

// // // // // // // //       // Validate all required fields
// // // // // // // //       if (!pickupDate || !pickupTime || !dropoffDate || !dropoffTime || !pickupLocation || !selectedDeal?.price) {
// // // // // // // //         console.warn("🚨 Missing required fields or price:", {
// // // // // // // //           pickupDate,
// // // // // // // //           pickupTime,
// // // // // // // //           dropoffDate,
// // // // // // // //           dropoffTime,
// // // // // // // //           pickupLocation,
// // // // // // // //           selectedDeal,
// // // // // // // //         });
// // // // // // // //         setTotalPrice(0);
// // // // // // // //         return;
// // // // // // // //       }

// // // // // // // //       // Parse dates using ISO format
// // // // // // // //       const pickup = new Date(`${pickupDate}T${pickupTime}`);
// // // // // // // //       const dropoff = new Date(`${dropoffDate}T${dropoffTime}`);

// // // // // // // //       // Validate date objects
// // // // // // // //       if (isNaN(pickup.getTime()) || isNaN(dropoff.getTime())) {
// // // // // // // //         console.warn("❌ Invalid date format:", { pickup, dropoff });
// // // // // // // //         setTotalPrice(0);
// // // // // // // //         return;
// // // // // // // //       }

// // // // // // // //       // Ensure dropoff is after pickup
// // // // // // // //       if (pickup >= dropoff) {
// // // // // // // //         console.warn("❌ Dropoff date must be after pickup date.");
// // // // // // // //         setTotalPrice(0);
// // // // // // // //         return;
// // // // // // // //       }

// // // // // // // //       // Calculate hours
// // // // // // // //       const calculatedHours = Math.max(1, Math.ceil((dropoff - pickup) / (1000 * 60 * 60))); // Minimum 1 hour, round up
// // // // // // // //       const basePrice = calculatedHours * selectedDeal.price;
// // // // // // // //       const extraCost = 
// // // // // // // //         (extras.additionalDriver ? EXTRA_PRICES.additionalDriver : 0) +
// // // // // // // //         (extras.extraLuggage ? EXTRA_PRICES.extraLuggage : 0) +
// // // // // // // //         (extras.childSeat ? EXTRA_PRICES.childSeat : 0);

// // // // // // // //       // Update state
// // // // // // // //       setTotalPrice(basePrice + extraCost);
// // // // // // // //       console.log("Calculated:", { hours: calculatedHours, basePrice, extraCost, totalPrice: basePrice + extraCost });
// // // // // // // //     };

// // // // // // // //     calculatePrice();
// // // // // // // //     setLoading(false);
// // // // // // // //   }, [pickupDate, pickupTime, dropoffDate, dropoffTime, pickupLocation, selectedDeal, extras]);

// // // // // // // //   const handlePayment = async () => {
// // // // // // // //     if (!totalPrice || totalPrice <= 0) {
// // // // // // // //       console.warn("Cannot proceed with payment: Total price is zero.");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     const stripe = await stripePromise;
// // // // // // // //     try {
// // // // // // // //       const response = await axios.post("http://localhost:5001/create-checkout-session", {
// // // // // // // //         amount: totalPrice * 100, // Amount in paise
// // // // // // // //         currency: "inr",
// // // // // // // //         pickupLocation: pickupLocation || "N/A",
// // // // // // // //         pickupDate,
// // // // // // // //         pickupTime,
// // // // // // // //         dropoffDate,
// // // // // // // //         dropoffTime,
// // // // // // // //         carId: carData.id,
// // // // // // // //         carMake: carData.make,
// // // // // // // //         carModel: carData.model,
// // // // // // // //         agency: selectedDeal.agency,
// // // // // // // //       });

// // // // // // // //       const { id: sessionId } = response.data;

// // // // // // // //       const { error } = await stripe.redirectToCheckout({
// // // // // // // //         sessionId: sessionId,
// // // // // // // //       });

// // // // // // // //       if (error) {
// // // // // // // //         console.error("Error redirecting to Stripe checkout:", error);
// // // // // // // //       }
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("Axios error during payment:", error);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // Handle extra selection
// // // // // // // //   const handleExtraChange = (extra) => {
// // // // // // // //     setExtras((prev) => ({
// // // // // // // //       ...prev,
// // // // // // // //       [extra]: !prev[extra],
// // // // // // // //     }));
// // // // // // // //   };

// // // // // // // //   if (loading) return <div className="text-center py-10 text-gray-800">Loading...</div>;
// // // // // // // //   if (!carData || !selectedDeal)
// // // // // // // //     return <div className="text-center py-10 text-gray-800">Car or deal not found</div>;

// // // // // // // //   return (
// // // // // // // //     <div className="min-h-screen bg-gray-50">
// // // // // // // //       <div className="container mx-auto max-w-7xl px-4 py-8">
// // // // // // // //         <h2 className="text-3xl font-bold text-gray-800 mb-6">Confirm Your Booking</h2>
// // // // // // // //         <div className="bg-white rounded-2xl shadow-lg p-6">
// // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // // // // //             {/* 3/4th Section for Car and Booking Details */}
// // // // // // // //             <div className="md:col-span-2 border-r border-gray-200 pr-6">
// // // // // // // //               <div className="flex flex-col md:flex-row gap-6">
// // // // // // // //                 <div className="md:w-1/2">
// // // // // // // //                   <img
// // // // // // // //                     src={carData.image || "https://via.placeholder.com/300x200"}
// // // // // // // //                     alt={`${carData.make || "Unknown"} ${carData.model || "Model"}`}
// // // // // // // //                     className="w-full h-48 object-contain rounded-lg bg-gray-50 p-2 mb-4"
// // // // // // // //                   />
// // // // // // // //                   <button
// // // // // // // //                     onClick={() => navigate(-1)}
// // // // // // // //                     className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
// // // // // // // //                   >
// // // // // // // //                     Back to Search Results
// // // // // // // //                   </button>
// // // // // // // //                 </div>

// // // // // // // //                 <div className="md:w-1/2">
// // // // // // // //                   <div className="flex items-center space-x-3 mb-4">
// // // // // // // //                     <h3 className="text-xl font-semibold text-gray-800">
// // // // // // // //                       {carData.make || "Unknown"} {carData.model || "Model"}
// // // // // // // //                     </h3>
// // // // // // // //                     <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
// // // // // // // //                       {carData.type || "N/A"}
// // // // // // // //                     </span>
// // // // // // // //                   </div>

// // // // // // // //                   <div className="grid grid-cols-2 gap-4 mb-4">
// // // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // //                       <FaUserFriends size={14} />
// // // // // // // //                       <span className="text-sm">{carData.passengers || "N/A"} Passengers</span>
// // // // // // // //                     </div>
// // // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // //                       <FaSuitcase size={14} />
// // // // // // // //                       <span className="text-sm">4 Luggage</span>
// // // // // // // //                     </div>
// // // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // //                       <FaCogs size={14} />
// // // // // // // //                       <span className="text-sm">{carData.transmission || "N/A"}</span>
// // // // // // // //                     </div>
// // // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // //                       <FaMapMarkerAlt size={14} />
// // // // // // // //                       <span className="text-sm">Unlimited Mileage</span>
// // // // // // // //                     </div>
// // // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // // //                       <FaStar size={14} className="text-yellow-400" />
// // // // // // // //                       <span className="text-sm">{carData.ratings || "N/A"}/5</span>
// // // // // // // //                     </div>
// // // // // // // //                   </div>

// // // // // // // //                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
// // // // // // // //                     <p className="text-gray-800 font-semibold">Agency: {selectedDeal.agency || "N/A"}</p>
// // // // // // // //                     <p className="text-gray-600">Fuel Policy: {carData.fuel_policy || "N/A"}</p>
// // // // // // // //                   </div>

// // // // // // // //                   {/* Extras Section */}
// // // // // // // //                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
// // // // // // // //                     <h4 className="text-lg font-semibold text-gray-800 mb-3">Extras</h4>
// // // // // // // //                     <div className="space-y-2">
// // // // // // // //                       <label className="flex items-center space-x-2">
// // // // // // // //                         <input
// // // // // // // //                           type="checkbox"
// // // // // // // //                           checked={extras.additionalDriver}
// // // // // // // //                           onChange={() => handleExtraChange("additionalDriver")}
// // // // // // // //                           className="form-checkbox text-blue-600"
// // // // // // // //                         />
// // // // // // // //                         <span className="text-gray-600">Additional Driver (₹500)</span>
// // // // // // // //                       </label>
// // // // // // // //                       <label className="flex items-center space-x-2">
// // // // // // // //                         <input
// // // // // // // //                           type="checkbox"
// // // // // // // //                           checked={extras.extraLuggage}
// // // // // // // //                           onChange={() => handleExtraChange("extraLuggage")}
// // // // // // // //                           className="form-checkbox text-blue-600"
// // // // // // // //                         />
// // // // // // // //                         <span className="text-gray-600">Extra Luggage (₹300)</span>
// // // // // // // //                       </label>
// // // // // // // //                       <label className="flex items-center space-x-2">
// // // // // // // //                         <input
// // // // // // // //                           type="checkbox"
// // // // // // // //                           checked={extras.childSeat}
// // // // // // // //                           onChange={() => handleExtraChange("childSeat")}
// // // // // // // //                           className="form-checkbox text-blue-600"
// // // // // // // //                         />
// // // // // // // //                         <span className="text-gray-600">Child Seat (₹400)</span>
// // // // // // // //                       </label>
// // // // // // // //                     </div>
// // // // // // // //                   </div>
// // // // // // // //                 </div>
// // // // // // // //               </div>

// // // // // // // //               <div className="mt-6">
// // // // // // // //                 <h4 className="text-lg font-semibold text-gray-800 mb-3">Booking Details</h4>
// // // // // // // //                 <p className="text-gray-600">
// // // // // // // //                   <strong>Location:</strong> {pickupLocation || "N/A"}
// // // // // // // //                 </p>
// // // // // // // //                 <p className="text-gray-600">
// // // // // // // //                   <strong>Pickup Date & Time:</strong> {pickupDate && pickupTime ? `${pickupDate} ${pickupTime}` : "N/A"}
// // // // // // // //                 </p>
// // // // // // // //                 <p className="text-gray-600">
// // // // // // // //                   <strong>Dropoff Date & Time:</strong> {dropoffDate && dropoffTime ? `${dropoffDate} ${dropoffTime}` : "N/A"}
// // // // // // // //                 </p>
// // // // // // // //               </div>
// // // // // // // //             </div>

// // // // // // // //             {/* 1/4th Section for Price */}
// // // // // // // //             <div className="md:col-span-1 pl-6">
// // // // // // // //               <div className="bg-gray-100 p-4 rounded-lg h-full">
// // // // // // // //                 <h4 className="text-lg font-semibold text-gray-800 mb-3">Price Breakdown</h4>
// // // // // // // //                 <p className="text-gray-600">Rental Cost: ₹{totalPrice.toLocaleString()}</p>
// // // // // // // //                 <p className="text-gray-600">
// // // // // // // //                   Extras: ₹
// // // // // // // //                   {[
// // // // // // // //                     extras.additionalDriver && EXTRA_PRICES.additionalDriver,
// // // // // // // //                     extras.extraLuggage && EXTRA_PRICES.extraLuggage,
// // // // // // // //                     extras.childSeat && EXTRA_PRICES.childSeat,
// // // // // // // //                   ]
// // // // // // // //                     .filter(Boolean)
// // // // // // // //                     .reduce((sum, price) => sum + price, 0)
// // // // // // // //                     .toLocaleString() || "0"}
// // // // // // // //                 </p>
// // // // // // // //                 <p className="text-2xl font-bold text-gray-800 mt-4">Total: ₹{totalPrice.toLocaleString()}</p>
// // // // // // // //                 <button
// // // // // // // //                   onClick={handlePayment}
// // // // // // // //                   className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
// // // // // // // //                 >
// // // // // // // //                   Confirm Booking
// // // // // // // //                 </button>
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       <Footer />
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default CarConfirmation;







// // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // import { useLocation, useNavigate } from "react-router-dom";
// // // // // // // import axios from "axios";
// // // // // // // import { loadStripe } from "@stripe/stripe-js";
// // // // // // // import {
// // // // // // //   FaUserFriends,
// // // // // // //   FaSuitcase,
// // // // // // //   FaCogs,
// // // // // // //   FaMapMarkerAlt,
// // // // // // //   FaStar,
// // // // // // // } from "react-icons/fa";
// // // // // // // import Footer from "./Footer";

// // // // // // // // Load Stripe with your public key
// // // // // // // const stripePromise = loadStripe("pk_test_51RBq3dPlQbJhRZQumwQFlV6uBA7rekmsFfXhxYG3fyxau7bPHQgoV86IaD5cbhvdM394vHEDKi3KhiqskSxT16Cf00rWlbxKrL");

// // // // // // // const CarConfirmation = () => {
// // // // // // //   const location = useLocation();
// // // // // // //   const navigate = useNavigate();
// // // // // // //   const {
// // // // // // //     pickupDate,
// // // // // // //     pickupTime,
// // // // // // //     dropoffDate,
// // // // // // //     dropoffTime,
// // // // // // //     pickupLocation,
// // // // // // //     car = {},
// // // // // // //     selectedDeal = {},
// // // // // // //   } = location.state || {};
// // // // // // //   const [carData, setCarData] = useState(car || {});
// // // // // // //   const [totalPrice, setTotalPrice] = useState(0);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [extras, setExtras] = useState({
// // // // // // //     additionalDriver: false,
// // // // // // //     extraLuggage: false,
// // // // // // //     childSeat: false,
// // // // // // //   });

// // // // // // //   // Fixed prices for extras
// // // // // // //   const EXTRA_PRICES = {
// // // // // // //     additionalDriver: 500,
// // // // // // //     extraLuggage: 300,
// // // // // // //     childSeat: 400,
// // // // // // //   };

// // // // // // //   // Calculate price based on per-hour rate, duration, and extras
// // // // // // //   useEffect(() => {
// // // // // // //     const calculatePrice = () => {
// // // // // // //       console.log("Received state:", {
// // // // // // //         pickupDate,
// // // // // // //         pickupTime,
// // // // // // //         dropoffDate,
// // // // // // //         dropoffTime,
// // // // // // //         pickupLocation,
// // // // // // //         car,
// // // // // // //         selectedDeal,
// // // // // // //       });

// // // // // // //       // Validate all required fields
// // // // // // //       if (!pickupDate || !pickupTime || !dropoffDate || !dropoffTime || !pickupLocation || !selectedDeal?.price) {
// // // // // // //         console.warn("🚨 Missing required fields or price:", {
// // // // // // //           pickupDate,
// // // // // // //           pickupTime,
// // // // // // //           dropoffDate,
// // // // // // //           dropoffTime,
// // // // // // //           pickupLocation,
// // // // // // //           selectedDeal,
// // // // // // //         });
// // // // // // //         setTotalPrice(0);
// // // // // // //         return;
// // // // // // //       }

// // // // // // //       // Parse dates using ISO format
// // // // // // //       const pickup = new Date(`${pickupDate}T${pickupTime}`);
// // // // // // //       const dropoff = new Date(`${dropoffDate}T${dropoffTime}`);

// // // // // // //       // Validate date objects
// // // // // // //       if (isNaN(pickup.getTime()) || isNaN(dropoff.getTime())) {
// // // // // // //         console.warn("❌ Invalid date format:", { pickup, dropoff });
// // // // // // //         setTotalPrice(0);
// // // // // // //         return;
// // // // // // //       }

// // // // // // //       // Ensure dropoff is after pickup
// // // // // // //       if (pickup >= dropoff) {
// // // // // // //         console.warn("❌ Dropoff date must be after pickup date.");
// // // // // // //         setTotalPrice(0);
// // // // // // //         return;
// // // // // // //       }

// // // // // // //       // Calculate hours
// // // // // // //       const calculatedHours = Math.max(1, Math.ceil((dropoff - pickup) / (1000 * 60 * 60))); // Minimum 1 hour, round up
// // // // // // //       const basePrice = calculatedHours * selectedDeal.price;
// // // // // // //       const extraCost = 
// // // // // // //         (extras.additionalDriver ? EXTRA_PRICES.additionalDriver : 0) +
// // // // // // //         (extras.extraLuggage ? EXTRA_PRICES.extraLuggage : 0) +
// // // // // // //         (extras.childSeat ? EXTRA_PRICES.childSeat : 0);

// // // // // // //       // Update state
// // // // // // //       setTotalPrice(basePrice + extraCost);
// // // // // // //       console.log("Calculated:", { hours: calculatedHours, basePrice, extraCost, totalPrice: basePrice + extraCost });
// // // // // // //     };

// // // // // // //     calculatePrice();
// // // // // // //     setLoading(false);
// // // // // // //   }, [pickupDate, pickupTime, dropoffDate, dropoffTime, pickupLocation, selectedDeal, extras]);

// // // // // // //   const handlePayment = async () => {
// // // // // // //     if (!totalPrice || totalPrice <= 0) {
// // // // // // //       console.warn("Cannot proceed with payment: Total price is zero.");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     const stripe = await stripePromise;
// // // // // // //     try {
// // // // // // //       const response = await axios.post("http://localhost:5001/create-checkout-session", {
// // // // // // //         amount: totalPrice * 100, // Amount in paise
// // // // // // //         currency: "inr",
// // // // // // //         pickupLocation: pickupLocation || "N/A",
// // // // // // //         pickupDate,
// // // // // // //         pickupTime,
// // // // // // //         dropoffDate,
// // // // // // //         dropoffTime,
// // // // // // //         carId: carData.id,
// // // // // // //         carMake: carData.make,
// // // // // // //         carModel: carData.model,
// // // // // // //         agency: selectedDeal.agency,
// // // // // // //       });

// // // // // // //       const { id: sessionId } = response.data;

// // // // // // //       const { error } = await stripe.redirectToCheckout({
// // // // // // //         sessionId: sessionId,
// // // // // // //       });

// // // // // // //       if (error) {
// // // // // // //         console.error("Error redirecting to Stripe checkout:", error);
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Axios error during payment:", error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // Handle extra selection
// // // // // // //   const handleExtraChange = (extra) => {
// // // // // // //     setExtras((prev) => ({
// // // // // // //       ...prev,
// // // // // // //       [extra]: !prev[extra],
// // // // // // //     }));
// // // // // // //   };

// // // // // // //   if (loading) return <div className="text-center py-10 text-gray-800">Loading...</div>;
// // // // // // //   if (!carData || !selectedDeal)
// // // // // // //     return <div className="text-center py-10 text-gray-800">Car or deal not found</div>;

// // // // // // //   return (
// // // // // // //     <div className="min-h-screen bg-gray-50">
// // // // // // //       <div className="container mx-auto max-w-7xl px-4 py-8">
// // // // // // //         <h2 className="text-3xl font-bold text-gray-800 mb-6">Confirm Your Booking</h2>
// // // // // // //         <div className="bg-white rounded-2xl shadow-lg p-6">
// // // // // // //           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
// // // // // // //             {/* Left Section: Booking Details and Price (1/4) */}
// // // // // // //             <div className="md:col-span-1 border-r border-gray-200 pr-6">
// // // // // // //               <div className="mt-6">
// // // // // // //                 <h4 className="text-lg font-semibold text-gray-800 mb-3">Booking Details</h4>
// // // // // // //                 <p className="text-gray-600">
// // // // // // //                   <strong>Location:</strong> {pickupLocation || "N/A"}
// // // // // // //                 </p>
// // // // // // //                 <p className="text-gray-600">
// // // // // // //                   <strong>Pickup Date & Time:</strong> {pickupDate && pickupTime ? `${pickupDate} ${pickupTime}` : "N/A"}
// // // // // // //                 </p>
// // // // // // //                 <p className="text-gray-600">
// // // // // // //                   <strong>Dropoff Date & Time:</strong> {dropoffDate && dropoffTime ? `${dropoffDate} ${dropoffTime}` : "N/A"}
// // // // // // //                 </p>
// // // // // // //               </div>
// // // // // // //               <div className="mt-6 border-t pt-4">
// // // // // // //                 <h4 className="text-lg font-semibold text-gray-800 mb-3">Price Breakdown</h4>
// // // // // // //                 <p className="text-gray-600">Rental Cost: ₹{totalPrice.toLocaleString()}</p>
// // // // // // //                 <p className="text-gray-600">
// // // // // // //                   Extras: ₹
// // // // // // //                   {[
// // // // // // //                     extras.additionalDriver && EXTRA_PRICES.additionalDriver,
// // // // // // //                     extras.extraLuggage && EXTRA_PRICES.extraLuggage,
// // // // // // //                     extras.childSeat && EXTRA_PRICES.childSeat,
// // // // // // //                   ]
// // // // // // //                     .filter(Boolean)
// // // // // // //                     .reduce((sum, price) => sum + price, 0)
// // // // // // //                     .toLocaleString() || "0"}
// // // // // // //                 </p>
// // // // // // //                 <p className="text-2xl font-bold text-gray-800 mt-4">Total: ₹{totalPrice.toLocaleString()}</p>
// // // // // // //                 <button
// // // // // // //                   onClick={handlePayment}
// // // // // // //                   className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
// // // // // // //                 >
// // // // // // //                   Confirm Booking
// // // // // // //                 </button>
// // // // // // //               </div>
// // // // // // //             </div>

// // // // // // //             {/* Right Section: Car Details and Extras (3/4) */}
// // // // // // //             <div className="md:col-span-3 pl-6">
// // // // // // //               <div className="flex flex-col md:flex-row gap-6">
// // // // // // //                 <div className="md:w-1/3">
// // // // // // //                   <img
// // // // // // //                     src={carData.image || "https://via.placeholder.com/300x200"}
// // // // // // //                     alt={`${carData.make || "Unknown"} ${carData.model || "Model"}`}
// // // // // // //                     className="w-full h-48 object-contain rounded-lg bg-gray-50 p-2 mb-4"
// // // // // // //                   />
// // // // // // //                   <button
// // // // // // //                     onClick={() => navigate(-1)}
// // // // // // //                     className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
// // // // // // //                   >
// // // // // // //                     Back to Search Results
// // // // // // //                   </button>
// // // // // // //                 </div>

// // // // // // //                 <div className="md:w-2/3">
// // // // // // //                   <div className="flex items-center space-x-3 mb-4">
// // // // // // //                     <h3 className="text-xl font-semibold text-gray-800">
// // // // // // //                       {carData.make || "Unknown"} {carData.model || "Model"}
// // // // // // //                     </h3>
// // // // // // //                     <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
// // // // // // //                       {carData.type || "N/A"}
// // // // // // //                     </span>
// // // // // // //                   </div>

// // // // // // //                   <div className="grid grid-cols-2 gap-4 mb-4">
// // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // //                       <FaUserFriends size={14} />
// // // // // // //                       <span className="text-sm">{carData.passengers || "N/A"} Passengers</span>
// // // // // // //                     </div>
// // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // //                       <FaSuitcase size={14} />
// // // // // // //                       <span className="text-sm">4 Luggage</span>
// // // // // // //                     </div>
// // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // //                       <FaCogs size={14} />
// // // // // // //                       <span className="text-sm">{carData.transmission || "N/A"}</span>
// // // // // // //                     </div>
// // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // //                       <FaMapMarkerAlt size={14} />
// // // // // // //                       <span className="text-sm">Unlimited Mileage</span>
// // // // // // //                     </div>
// // // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // // //                       <FaStar size={14} className="text-yellow-400" />
// // // // // // //                       <span className="text-sm">{carData.ratings || "N/A"}/5</span>
// // // // // // //                     </div>
// // // // // // //                   </div>

// // // // // // //                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
// // // // // // //                     <p className="text-gray-800 font-semibold">Agency: {selectedDeal.agency || "N/A"}</p>
// // // // // // //                     <p className="text-gray-600">Fuel Policy: {carData.fuel_policy || "N/A"}</p>
// // // // // // //                   </div>

// // // // // // //                   {/* Extras Section */}
// // // // // // //                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
// // // // // // //                     <h4 className="text-lg font-semibold text-gray-800 mb-3">Extras</h4>
// // // // // // //                     <div className="space-y-2">
// // // // // // //                       <label className="flex items-center space-x-2">
// // // // // // //                         <input
// // // // // // //                           type="checkbox"
// // // // // // //                           checked={extras.additionalDriver}
// // // // // // //                           onChange={() => handleExtraChange("additionalDriver")}
// // // // // // //                           className="form-checkbox text-blue-600"
// // // // // // //                         />
// // // // // // //                         <span className="text-gray-600">Additional Driver (₹500)</span>
// // // // // // //                       </label>
// // // // // // //                       <label className="flex items-center space-x-2">
// // // // // // //                         <input
// // // // // // //                           type="checkbox"
// // // // // // //                           checked={extras.extraLuggage}
// // // // // // //                           onChange={() => handleExtraChange("extraLuggage")}
// // // // // // //                           className="form-checkbox text-blue-600"
// // // // // // //                         />
// // // // // // //                         <span className="text-gray-600">Extra Luggage (₹300)</span>
// // // // // // //                       </label>
// // // // // // //                       <label className="flex items-center space-x-2">
// // // // // // //                         <input
// // // // // // //                           type="checkbox"
// // // // // // //                           checked={extras.childSeat}
// // // // // // //                           onChange={() => handleExtraChange("childSeat")}
// // // // // // //                           className="form-checkbox text-blue-600"
// // // // // // //                         />
// // // // // // //                         <span className="text-gray-600">Child Seat (₹400)</span>
// // // // // // //                       </label>
// // // // // // //                     </div>
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       <Footer />
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default CarConfirmation;







// // // // // // import React, { useState, useEffect } from "react";
// // // // // // import { useLocation, useNavigate } from "react-router-dom";
// // // // // // import axios from "axios";
// // // // // // import { loadStripe } from "@stripe/stripe-js";
// // // // // // import {
// // // // // //   FaUserFriends,
// // // // // //   FaSuitcase,
// // // // // //   FaCogs,
// // // // // //   FaMapMarkerAlt,
// // // // // //   FaStar,
// // // // // // } from "react-icons/fa";
// // // // // // import Footer from "./Footer";

// // // // // // // Load Stripe with your public key
// // // // // // const stripePromise = loadStripe("pk_test_51RBq3dPlQbJhRZQumwQFlV6uBA7rekmsFfXhxYG3fyxau7bPHQgoV86IaD5cbhvdM394vHEDKi3KhiqskSxT16Cf00rWlbxKrL");

// // // // // // const CarConfirmation = () => {
// // // // // //   const location = useLocation();
// // // // // //   const navigate = useNavigate();
// // // // // //   const {
// // // // // //     pickupDate,
// // // // // //     pickupTime,
// // // // // //     dropoffDate,
// // // // // //     dropoffTime,
// // // // // //     pickupLocation,
// // // // // //     car = {},
// // // // // //     selectedDeal = {},
// // // // // //   } = location.state || {};
// // // // // //   const [carData, setCarData] = useState(car || {});
// // // // // //   const [totalPrice, setTotalPrice] = useState(0);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [extras, setExtras] = useState({
// // // // // //     additionalDriver: false,
// // // // // //     extraLuggage: false,
// // // // // //     childSeat: false,
// // // // // //   });

// // // // // //   // Fixed prices for extras
// // // // // //   const EXTRA_PRICES = {
// // // // // //     additionalDriver: 500,
// // // // // //     extraLuggage: 300,
// // // // // //     childSeat: 400,
// // // // // //   };

// // // // // //   // Calculate price based on per-hour rate, duration, and extras
// // // // // //   useEffect(() => {
// // // // // //     const calculatePrice = () => {
// // // // // //       console.log("Received state:", {
// // // // // //         pickupDate,
// // // // // //         pickupTime,
// // // // // //         dropoffDate,
// // // // // //         dropoffTime,
// // // // // //         pickupLocation,
// // // // // //         car,
// // // // // //         selectedDeal,
// // // // // //       });

// // // // // //       // Validate all required fields
// // // // // //       if (!pickupDate || !pickupTime || !dropoffDate || !dropoffTime || !pickupLocation || !selectedDeal?.price) {
// // // // // //         console.warn("🚨 Missing required fields or price:", {
// // // // // //           pickupDate,
// // // // // //           pickupTime,
// // // // // //           dropoffDate,
// // // // // //           dropoffTime,
// // // // // //           pickupLocation,
// // // // // //           selectedDeal,
// // // // // //         });
// // // // // //         setTotalPrice(0);
// // // // // //         return;
// // // // // //       }

// // // // // //       // Parse dates using ISO format
// // // // // //       const pickup = new Date(`${pickupDate}T${pickupTime}`);
// // // // // //       const dropoff = new Date(`${dropoffDate}T${dropoffTime}`);

// // // // // //       // Validate date objects
// // // // // //       if (isNaN(pickup.getTime()) || isNaN(dropoff.getTime())) {
// // // // // //         console.warn("❌ Invalid date format:", { pickup, dropoff });
// // // // // //         setTotalPrice(0);
// // // // // //         return;
// // // // // //       }

// // // // // //       // Ensure dropoff is after pickup
// // // // // //       if (pickup >= dropoff) {
// // // // // //         console.warn("❌ Dropoff date must be after pickup date.");
// // // // // //         setTotalPrice(0);
// // // // // //         return;
// // // // // //       }

// // // // // //       // Calculate hours
// // // // // //       const calculatedHours = Math.max(1, Math.ceil((dropoff - pickup) / (1000 * 60 * 60))); // Minimum 1 hour, round up
// // // // // //       const basePrice = calculatedHours * selectedDeal.price;
// // // // // //       const extraCost = 
// // // // // //         (extras.additionalDriver ? EXTRA_PRICES.additionalDriver : 0) +
// // // // // //         (extras.extraLuggage ? EXTRA_PRICES.extraLuggage : 0) +
// // // // // //         (extras.childSeat ? EXTRA_PRICES.childSeat : 0);

// // // // // //       // Update state
// // // // // //       setTotalPrice(basePrice + extraCost);
// // // // // //       console.log("Calculated:", { hours: calculatedHours, basePrice, extraCost, totalPrice: basePrice + extraCost });
// // // // // //     };

// // // // // //     calculatePrice();
// // // // // //     setLoading(false);
// // // // // //   }, [pickupDate, pickupTime, dropoffDate, dropoffTime, pickupLocation, selectedDeal, extras]);

// // // // // //   const handlePayment = async () => {
// // // // // //     if (!totalPrice || totalPrice <= 0) {
// // // // // //       console.warn("Cannot proceed with payment: Total price is zero.");
// // // // // //       return;
// // // // // //     }

// // // // // //     const stripe = await stripePromise;
// // // // // //     try {
// // // // // //       const response = await axios.post("http://localhost:5001/create-checkout-session", {
// // // // // //         amount: totalPrice * 100, // Amount in paise
// // // // // //         currency: "inr",
// // // // // //         pickupLocation: pickupLocation || "N/A",
// // // // // //         pickupDate,
// // // // // //         pickupTime,
// // // // // //         dropoffDate,
// // // // // //         dropoffTime,
// // // // // //         carId: carData.id,
// // // // // //         carMake: carData.make,
// // // // // //         carModel: carData.model,
// // // // // //         agency: selectedDeal.agency,
// // // // // //       });

// // // // // //       const { id: sessionId } = response.data;

// // // // // //       const { error } = await stripe.redirectToCheckout({
// // // // // //         sessionId: sessionId,
// // // // // //       });

// // // // // //       if (error) {
// // // // // //         console.error("Error redirecting to Stripe checkout:", error);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error("Axios error during payment:", error);
// // // // // //     }
// // // // // //   };

// // // // // //   // Handle extra selection
// // // // // //   const handleExtraChange = (extra) => {
// // // // // //     setExtras((prev) => ({
// // // // // //       ...prev,
// // // // // //       [extra]: !prev[extra],
// // // // // //     }));
// // // // // //   };

// // // // // //   if (loading) return <div className="text-center py-10 text-gray-800">Loading...</div>;
// // // // // //   if (!carData || !selectedDeal)
// // // // // //     return <div className="text-center py-10 text-gray-800">Car or deal not found</div>;

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-gray-50">
// // // // // //       <div className="container mx-auto max-w-7xl px-4 py-8">
// // // // // //         <h2 className="text-3xl font-bold text-gray-800 mb-6">Confirm Your Booking</h2>
// // // // // //         <div className="bg-white rounded-2xl shadow-lg p-6">
// // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // // //             {/* Left Section: Booking Details and Price (1/2) */}
// // // // // //             <div className="md:col-span-1 border-r border-gray-200 pr-6">
// // // // // //               <div className="mt-6">
// // // // // //                 <h4 className="text-lg font-semibold text-gray-800 mb-3">Booking Details</h4>
// // // // // //                 <p className="text-gray-600">
// // // // // //                   <strong>Location:</strong> {pickupLocation || "N/A"}
// // // // // //                 </p>
// // // // // //                 <p className="text-gray-600">
// // // // // //                   <strong>Pickup Date & Time:</strong> {pickupDate && pickupTime ? `${pickupDate} ${pickupTime}` : "N/A"}
// // // // // //                 </p>
// // // // // //                 <p className="text-gray-600">
// // // // // //                   <strong>Dropoff Date & Time:</strong> {dropoffDate && dropoffTime ? `${dropoffDate} ${dropoffTime}` : "N/A"}
// // // // // //                 </p>
// // // // // //               </div>
// // // // // //               <div className="mt-6 border-t pt-4">
// // // // // //                 <h4 className="text-lg font-semibold text-gray-800 mb-3">Price Breakdown</h4>
// // // // // //                 <p className="text-gray-600">Rental Cost: ₹{totalPrice.toLocaleString()}</p>
// // // // // //                 <p className="text-gray-600">
// // // // // //                   Extras: ₹
// // // // // //                   {[
// // // // // //                     extras.additionalDriver && EXTRA_PRICES.additionalDriver,
// // // // // //                     extras.extraLuggage && EXTRA_PRICES.extraLuggage,
// // // // // //                     extras.childSeat && EXTRA_PRICES.childSeat,
// // // // // //                   ]
// // // // // //                     .filter(Boolean)
// // // // // //                     .reduce((sum, price) => sum + price, 0)
// // // // // //                     .toLocaleString() || "0"}
// // // // // //                 </p>
// // // // // //                 <p className="text-2xl font-bold text-gray-800 mt-4">Total: ₹{totalPrice.toLocaleString()}</p>
// // // // // //                 <button
// // // // // //                   onClick={handlePayment}
// // // // // //                   className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
// // // // // //                 >
// // // // // //                   Confirm Booking
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             </div>

// // // // // //             {/* Right Section: Car Details and Extras (1/2) */}
// // // // // //             <div className="md:col-span-1 pl-6">
// // // // // //               <div className="flex flex-col gap-6">
// // // // // //                 <div className="w-full">
// // // // // //                   <div className="flex items-center space-x-3 mb-4">
// // // // // //                     <h3 className="text-xl font-semibold text-gray-800">
// // // // // //                       {carData.make || "Unknown"} {carData.model || "Model"}
// // // // // //                     </h3>
// // // // // //                     <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
// // // // // //                       {carData.type || "N/A"}
// // // // // //                     </span>
// // // // // //                   </div>

// // // // // //                   <div className="grid grid-cols-2 gap-4 mb-4">
// // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // //                       <FaUserFriends size={14} />
// // // // // //                       <span className="text-sm">{carData.passengers || "N/A"} Passengers</span>
// // // // // //                     </div>
// // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // //                       <FaSuitcase size={14} />
// // // // // //                       <span className="text-sm">4 Luggage</span>
// // // // // //                     </div>
// // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // //                       <FaCogs size={14} />
// // // // // //                       <span className="text-sm">{carData.transmission || "N/A"}</span>
// // // // // //                     </div>
// // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // //                       <FaMapMarkerAlt size={14} />
// // // // // //                       <span className="text-sm">Unlimited Mileage</span>
// // // // // //                     </div>
// // // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // // //                       <FaStar size={14} className="text-yellow-400" />
// // // // // //                       <span className="text-sm">{carData.ratings || "N/A"}/5</span>
// // // // // //                     </div>
// // // // // //                   </div>

// // // // // //                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
// // // // // //                     <p className="text-gray-800 font-semibold">Agency: {selectedDeal.agency || "N/A"}</p>
// // // // // //                     <p className="text-gray-600">Fuel Policy: {carData.fuel_policy || "N/A"}</p>
// // // // // //                   </div>

// // // // // //                   {/* Extras Section */}
// // // // // //                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
// // // // // //                     <h4 className="text-lg font-semibold text-gray-800 mb-3">Extras</h4>
// // // // // //                     <div className="space-y-2">
// // // // // //                       <label className="flex items-center space-x-2">
// // // // // //                         <input
// // // // // //                           type="checkbox"
// // // // // //                           checked={extras.additionalDriver}
// // // // // //                           onChange={() => handleExtraChange("additionalDriver")}
// // // // // //                           className="form-checkbox text-blue-600"
// // // // // //                         />
// // // // // //                         <span className="text-gray-600">Additional Driver (₹500)</span>
// // // // // //                       </label>
// // // // // //                       <label className="flex items-center space-x-2">
// // // // // //                         <input
// // // // // //                           type="checkbox"
// // // // // //                           checked={extras.extraLuggage}
// // // // // //                           onChange={() => handleExtraChange("extraLuggage")}
// // // // // //                           className="form-checkbox text-blue-600"
// // // // // //                         />
// // // // // //                         <span className="text-gray-600">Extra Luggage (₹300)</span>
// // // // // //                       </label>
// // // // // //                       <label className="flex items-center space-x-2">
// // // // // //                         <input
// // // // // //                           type="checkbox"
// // // // // //                           checked={extras.childSeat}
// // // // // //                           onChange={() => handleExtraChange("childSeat")}
// // // // // //                           className="form-checkbox text-blue-600"
// // // // // //                         />
// // // // // //                         <span className="text-gray-600">Child Seat (₹400)</span>
// // // // // //                       </label>
// // // // // //                     </div>
// // // // // //                   </div>

// // // // // //                   <button
// // // // // //                     onClick={() => navigate(-1)}
// // // // // //                     className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
// // // // // //                   >
// // // // // //                     Back to Search Results
// // // // // //                   </button>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <Footer />
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default CarConfirmation;








// // // // // import React, { useState, useEffect } from "react";
// // // // // import { useLocation, useNavigate } from "react-router-dom";
// // // // // import axios from "axios";
// // // // // import { loadStripe } from "@stripe/stripe-js";
// // // // // import {
// // // // //   FaUserFriends,
// // // // //   FaSuitcase,
// // // // //   FaCogs,
// // // // //   FaMapMarkerAlt,
// // // // //   FaStar,
// // // // // } from "react-icons/fa";
// // // // // import Footer from "./Footer";

// // // // // // Load Stripe with your public key
// // // // // const stripePromise = loadStripe("pk_test_51RBq3dPlQbJhRZQumwQFlV6uBA7rekmsFfXhxYG3fyxau7bPHQgoV86IaD5cbhvdM394vHEDKi3KhiqskSxT16Cf00rWlbxKrL");

// // // // // const CarConfirmation = () => {
// // // // //   const location = useLocation();
// // // // //   const navigate = useNavigate();
// // // // //   const {
// // // // //     pickupDate,
// // // // //     pickupTime,
// // // // //     dropoffDate,
// // // // //     dropoffTime,
// // // // //     pickupLocation,
// // // // //     car = {},
// // // // //     selectedDeal = {},
// // // // //   } = location.state || {};
// // // // //   const [carData, setCarData] = useState(car || {});
// // // // //   const [totalPrice, setTotalPrice] = useState(0);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [extras, setExtras] = useState({
// // // // //     additionalDriver: false,
// // // // //     extraLuggage: false,
// // // // //     childSeat: false,
// // // // //   });
// // // // //   const [termsAccepted, setTermsAccepted] = useState(false);

// // // // //   // Fixed prices for extras
// // // // //   const EXTRA_PRICES = {
// // // // //     additionalDriver: 500,
// // // // //     extraLuggage: 300,
// // // // //     childSeat: 400,
// // // // //   };

// // // // //   // Calculate price based on per-hour rate, duration, and extras
// // // // //   useEffect(() => {
// // // // //     const calculatePrice = () => {
// // // // //       console.log("Received state:", {
// // // // //         pickupDate,
// // // // //         pickupTime,
// // // // //         dropoffDate,
// // // // //         dropoffTime,
// // // // //         pickupLocation,
// // // // //         car,
// // // // //         selectedDeal,
// // // // //       });

// // // // //       // Validate all required fields
// // // // //       if (!pickupDate || !pickupTime || !dropoffDate || !dropoffTime || !pickupLocation || !selectedDeal?.price) {
// // // // //         console.warn("🚨 Missing required fields or price:", {
// // // // //           pickupDate,
// // // // //           pickupTime,
// // // // //           dropoffDate,
// // // // //           dropoffTime,
// // // // //           pickupLocation,
// // // // //           selectedDeal,
// // // // //         });
// // // // //         setTotalPrice(0);
// // // // //         return;
// // // // //       }

// // // // //       // Parse dates using ISO format
// // // // //       const pickup = new Date(`${pickupDate}T${pickupTime}`);
// // // // //       const dropoff = new Date(`${dropoffDate}T${dropoffTime}`);

// // // // //       // Validate date objects
// // // // //       if (isNaN(pickup.getTime()) || isNaN(dropoff.getTime())) {
// // // // //         console.warn("❌ Invalid date format:", { pickup, dropoff });
// // // // //         setTotalPrice(0);
// // // // //         return;
// // // // //       }

// // // // //       // Ensure dropoff is after pickup
// // // // //       if (pickup >= dropoff) {
// // // // //         console.warn("❌ Dropoff date must be after pickup date.");
// // // // //         setTotalPrice(0);
// // // // //         return;
// // // // //       }

// // // // //       // Calculate hours
// // // // //       const calculatedHours = Math.max(1, Math.ceil((dropoff - pickup) / (1000 * 60 * 60))); // Minimum 1 hour, round up
// // // // //       const basePrice = calculatedHours * selectedDeal.price;
// // // // //       const extraCost = 
// // // // //         (extras.additionalDriver ? EXTRA_PRICES.additionalDriver : 0) +
// // // // //         (extras.extraLuggage ? EXTRA_PRICES.extraLuggage : 0) +
// // // // //         (extras.childSeat ? EXTRA_PRICES.childSeat : 0);

// // // // //       // Update state
// // // // //       setTotalPrice(basePrice + extraCost);
// // // // //       console.log("Calculated:", { hours: calculatedHours, basePrice, extraCost, totalPrice: basePrice + extraCost });
// // // // //     };

// // // // //     calculatePrice();
// // // // //     setLoading(false);
// // // // //   }, [pickupDate, pickupTime, dropoffDate, dropoffTime, pickupLocation, selectedDeal, extras]);

// // // // //   const handlePayment = async () => {
// // // // //     if (!totalPrice || totalPrice <= 0 || !termsAccepted) {
// // // // //       console.warn("Cannot proceed with payment: Total price is zero or terms not accepted.");
// // // // //       return;
// // // // //     }

// // // // //     const stripe = await stripePromise;
// // // // //     try {
// // // // //       const response = await axios.post("http://localhost:5001/create-checkout-session", {
// // // // //         amount: totalPrice * 100, // Amount in paise
// // // // //         currency: "inr",
// // // // //         pickupLocation: pickupLocation || "N/A",
// // // // //         pickupDate,
// // // // //         pickupTime,
// // // // //         dropoffDate,
// // // // //         dropoffTime,
// // // // //         carId: carData.id,
// // // // //         carMake: carData.make,
// // // // //         carModel: carData.model,
// // // // //         agency: selectedDeal.agency,
// // // // //       });

// // // // //       const { id: sessionId } = response.data;

// // // // //       const { error } = await stripe.redirectToCheckout({
// // // // //         sessionId: sessionId,
// // // // //       });

// // // // //       if (error) {
// // // // //         console.error("Error redirecting to Stripe checkout:", error);
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error("Axios error during payment:", error);
// // // // //     }
// // // // //   };

// // // // //   // Handle extra selection
// // // // //   const handleExtraChange = (extra) => {
// // // // //     setExtras((prev) => ({
// // // // //       ...prev,
// // // // //       [extra]: !prev[extra],
// // // // //     }));
// // // // //   };

// // // // //   if (loading) return <div className="text-center py-10 text-gray-800">Loading...</div>;
// // // // //   if (!carData || !selectedDeal)
// // // // //     return <div className="text-center py-10 text-gray-800">Car or deal not found</div>;

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gray-50">
// // // // //       <div className="container mx-auto max-w-7xl px-4 py-8">
// // // // //         <h2 className="text-3xl font-bold text-gray-800 mb-6">Confirm Your Booking</h2>
// // // // //         <div className="bg-white rounded-2xl shadow-lg p-6">
// // // // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // //             {/* Left Section: Booking Details and Price (1/2) */}
// // // // //             <div className="md:col-span-1 border-r border-gray-200 pr-6">
// // // // //               <div className="mt-6">
// // // // //                 <h4 className="text-lg font-semibold text-gray-800 mb-3">Booking Details</h4>
// // // // //                 <p className="text-gray-600">
// // // // //                   <strong>Location:</strong> {pickupLocation || "N/A"}
// // // // //                 </p>
// // // // //                 <p className="text-gray-600">
// // // // //                   <strong>Pickup Date & Time:</strong> {pickupDate && pickupTime ? `${pickupDate} ${pickupTime}` : "N/A"}
// // // // //                 </p>
// // // // //                 <p className="text-gray-600">
// // // // //                   <strong>Dropoff Date & Time:</strong> {dropoffDate && dropoffTime ? `${dropoffDate} ${dropoffTime}` : "N/A"}
// // // // //                 </p>
// // // // //               </div>
// // // // //               <div className="mt-6 border-t pt-4">
// // // // //                 <h4 className="text-lg font-semibold text-gray-800 mb-3">Price Breakdown</h4>
// // // // //                 <p className="text-gray-600">Rental Cost: ₹{totalPrice.toLocaleString()}</p>
// // // // //                 <p className="text-gray-600">
// // // // //                   Extras: ₹
// // // // //                   {[
// // // // //                     extras.additionalDriver && EXTRA_PRICES.additionalDriver,
// // // // //                     extras.extraLuggage && EXTRA_PRICES.extraLuggage,
// // // // //                     extras.childSeat && EXTRA_PRICES.childSeat,
// // // // //                   ]
// // // // //                     .filter(Boolean)
// // // // //                     .reduce((sum, price) => sum + price, 0)
// // // // //                     .toLocaleString() || "0"}
// // // // //                 </p>
// // // // //                 <p className="text-2xl font-bold text-gray-800 mt-4">Total: ₹{totalPrice.toLocaleString()}</p>
// // // // //                 <button
// // // // //                   onClick={handlePayment}
// // // // //                   className={`w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ${!termsAccepted ? 'opacity-50 cursor-not-allowed' : ''}`}
// // // // //                   disabled={!termsAccepted}
// // // // //                 >
// // // // //                   Confirm Booking
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>

// // // // //             {/* Right Section: Car Details and Extras (1/2) */}
// // // // //             <div className="md:col-span-1 pl-6">
// // // // //               <div className="flex flex-col gap-6">
// // // // //                 <div className="w-full">
// // // // //                   <div className="flex items-center space-x-3 mb-4">
// // // // //                     <h3 className="text-xl font-semibold text-gray-800">
// // // // //                       {carData.make || "Unknown"} {carData.model || "Model"}
// // // // //                     </h3>
// // // // //                     <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
// // // // //                       {carData.type || "N/A"}
// // // // //                     </span>
// // // // //                   </div>

// // // // //                   <div className="grid grid-cols-2 gap-4 mb-4">
// // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // //                       <FaUserFriends size={14} />
// // // // //                       <span className="text-sm">{carData.passengers || "N/A"} Passengers</span>
// // // // //                     </div>
// // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // //                       <FaSuitcase size={14} />
// // // // //                       <span className="text-sm">4 Luggage</span>
// // // // //                     </div>
// // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // //                       <FaCogs size={14} />
// // // // //                       <span className="text-sm">{carData.transmission || "N/A"}</span>
// // // // //                     </div>
// // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // //                       <FaMapMarkerAlt size={14} />
// // // // //                       <span className="text-sm">Unlimited Mileage</span>
// // // // //                     </div>
// // // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // // //                       <FaStar size={14} className="text-yellow-400" />
// // // // //                       <span className="text-sm">{carData.ratings || "N/A"}/5</span>
// // // // //                     </div>
// // // // //                   </div>

// // // // //                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
// // // // //                     <p className="text-gray-800 font-semibold">Agency: {selectedDeal.agency || "N/A"}</p>
// // // // //                     <p className="text-gray-600">Fuel Policy: {carData.fuel_policy || "N/A"}</p>
// // // // //                   </div>

// // // // //                   {/* Extras Section */}
// // // // //                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
// // // // //                     <h4 className="text-lg font-semibold text-gray-800 mb-3">Extras</h4>
// // // // //                     <div className="space-y-2">
// // // // //                       <label className="flex items-center space-x-2">
// // // // //                         <input
// // // // //                           type="checkbox"
// // // // //                           checked={extras.additionalDriver}
// // // // //                           onChange={() => handleExtraChange("additionalDriver")}
// // // // //                           className="form-checkbox text-blue-600"
// // // // //                         />
// // // // //                         <span className="text-gray-600">Additional Driver (₹500)</span>
// // // // //                       </label>
// // // // //                       <label className="flex items-center space-x-2">
// // // // //                         <input
// // // // //                           type="checkbox"
// // // // //                           checked={extras.extraLuggage}
// // // // //                           onChange={() => handleExtraChange("extraLuggage")}
// // // // //                           className="form-checkbox text-blue-600"
// // // // //                         />
// // // // //                         <span className="text-gray-600">Extra Luggage (₹300)</span>
// // // // //                       </label>
// // // // //                       <label className="flex items-center space-x-2">
// // // // //                         <input
// // // // //                           type="checkbox"
// // // // //                           checked={extras.childSeat}
// // // // //                           onChange={() => handleExtraChange("childSeat")}
// // // // //                           className="form-checkbox text-blue-600"
// // // // //                         />
// // // // //                         <span className="text-gray-600">Child Seat (₹400)</span>
// // // // //                       </label>
// // // // //                     </div>
// // // // //                   </div>

// // // // //                   {/* Driver Details Section (Visible only when additionalDriver is selected) */}
// // // // //                   {extras.additionalDriver && (
// // // // //                     <div className="bg-gray-100 p-4 rounded-lg mb-4">
// // // // //                       <h4 className="text-lg font-semibold text-gray-800 mb-3">Driver Details</h4>
// // // // //                       <p className="text-gray-600">
// // // // //                         <strong>Name:</strong> [Enter Driver Name]
// // // // //                       </p>
// // // // //                       <p className="text-gray-600">
// // // // //                         <strong>License Number:</strong> [Enter License Number]
// // // // //                       </p>
// // // // //                       <p className="text-gray-600">
// // // // //                         <strong>Contact:</strong> [Enter Contact Number]
// // // // //                       </p>
// // // // //                       {/* Add input fields or logic as needed for dynamic driver details */}
// // // // //                     </div>
// // // // //                   )}

// // // // //                   {/* Policy Terms */}
// // // // //                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
// // // // //                     <h4 className="text-lg font-semibold text-gray-800 mb-3">Policy Terms</h4>
// // // // //                     <p className="text-gray-600">
// // // // //                       - Vehicle must be returned with a full tank of fuel.
// // // // //                       <br />- Any damage to the vehicle will incur additional charges.
// // // // //                       <br />- Rental period cannot exceed 30 days without prior approval.
// // // // //                     </p>
// // // // //                   </div>

// // // // //                   {/* Cancellation Policy */}
// // // // //                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
// // // // //                     <h4 className="text-lg font-semibold text-gray-800 mb-3">Cancellation Policy</h4>
// // // // //                     <p className="text-gray-600">
// // // // //                       - Free cancellation up to 48 hours before pickup.
// // // // //                       <br />- 50% refund if cancelled within 24-48 hours.
// // // // //                       <br />- No refund if cancelled within 24 hours.
// // // // //                     </p>
// // // // //                   </div>

// // // // //                   {/* Terms and Conditions Checkbox */}
// // // // //                   <div className="mb-4">
// // // // //                     <label className="flex items-center space-x-2">
// // // // //                       <input
// // // // //                         type="checkbox"
// // // // //                         checked={termsAccepted}
// // // // //                         onChange={(e) => setTermsAccepted(e.target.checked)}
// // // // //                         className="form-checkbox text-blue-600"
// // // // //                       />
// // // // //                       <span className="text-gray-600">
// // // // //                         I agree to the <a href="#" className="text-blue-600 underline">Terms and Conditions</a>
// // // // //                       </span>
// // // // //                     </label>
// // // // //                   </div>

// // // // //                   <button
// // // // //                     onClick={() => navigate(-1)}
// // // // //                     className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
// // // // //                   >
// // // // //                     Back to Search Results
// // // // //                   </button>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       <Footer />
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default CarConfirmation;




// // // // import React, { useState, useEffect } from "react";
// // // // import { useLocation, useNavigate } from "react-router-dom";
// // // // import axios from "axios";
// // // // import { loadStripe } from "@stripe/stripe-js";
// // // // import {
// // // //   FaUserFriends,
// // // //   FaSuitcase,
// // // //   FaCogs,
// // // //   FaMapMarkerAlt,
// // // //   FaStar,
// // // //   FaTimes,
// // // // } from "react-icons/fa";
// // // // import Footer from "./Footer";

// // // // // Load Stripe with your public key
// // // // const stripePromise = loadStripe("pk_test_51RBq3dPlQbJhRZQumwQFlV6uBA7rekmsFfXhxYG3fyxau7bPHQgoV86IaD5cbhvdM394vHEDKi3KhiqskSxT16Cf00rWlbxKrL");

// // // // const CarConfirmation = () => {
// // // //   const location = useLocation();
// // // //   const navigate = useNavigate();
// // // //   const {
// // // //     pickupDate,
// // // //     pickupTime,
// // // //     dropoffDate,
// // // //     dropoffTime,
// // // //     pickupLocation,
// // // //     car = {},
// // // //     selectedDeal = {},
// // // //   } = location.state || {};
// // // //   const [carData, setCarData] = useState(car || {});
// // // //   const [totalPrice, setTotalPrice] = useState(0);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [extras, setExtras] = useState({
// // // //     additionalDriver: false,
// // // //     extraLuggage: false,
// // // //     childSeat: false,
// // // //   });
// // // //   const [termsAccepted, setTermsAccepted] = useState(false);

// // // //   // Fixed prices for extras
// // // //   const EXTRA_PRICES = {
// // // //     additionalDriver: 500,
// // // //     extraLuggage: 300,
// // // //     childSeat: 400,
// // // //   };

// // // //   // Calculate price based on per-hour rate, duration, and extras
// // // //   useEffect(() => {
// // // //     const calculatePrice = () => {
// // // //       console.log("Received state:", {
// // // //         pickupDate,
// // // //         pickupTime,
// // // //         dropoffDate,
// // // //         dropoffTime,
// // // //         pickupLocation,
// // // //         car,
// // // //         selectedDeal,
// // // //       });

// // // //       // Validate all required fields
// // // //       if (!pickupDate || !pickupTime || !dropoffDate || !dropoffTime || !pickupLocation || !selectedDeal?.price) {
// // // //         console.warn("🚨 Missing required fields or price:", {
// // // //           pickupDate,
// // // //           pickupTime,
// // // //           dropoffDate,
// // // //           dropoffTime,
// // // //           pickupLocation,
// // // //           selectedDeal,
// // // //         });
// // // //         setTotalPrice(0);
// // // //         return;
// // // //       }

// // // //       // Parse dates using ISO format
// // // //       const pickup = new Date(`${pickupDate}T${pickupTime}`);
// // // //       const dropoff = new Date(`${dropoffDate}T${dropoffTime}`);

// // // //       // Validate date objects
// // // //       if (isNaN(pickup.getTime()) || isNaN(dropoff.getTime())) {
// // // //         console.warn("❌ Invalid date format:", { pickup, dropoff });
// // // //         setTotalPrice(0);
// // // //         return;
// // // //       }

// // // //       // Ensure dropoff is after pickup
// // // //       if (pickup >= dropoff) {
// // // //         console.warn("❌ Dropoff date must be after pickup date.");
// // // //         setTotalPrice(0);
// // // //         return;
// // // //       }

// // // //       // Calculate hours
// // // //       const calculatedHours = Math.max(1, Math.ceil((dropoff - pickup) / (1000 * 60 * 60))); // Minimum 1 hour, round up
// // // //       const basePrice = calculatedHours * selectedDeal.price;
// // // //       const extraCost = 
// // // //         (extras.additionalDriver ? EXTRA_PRICES.additionalDriver : 0) +
// // // //         (extras.extraLuggage ? EXTRA_PRICES.extraLuggage : 0) +
// // // //         (extras.childSeat ? EXTRA_PRICES.childSeat : 0);

// // // //       // Update state
// // // //       setTotalPrice(basePrice + extraCost);
// // // //       console.log("Calculated:", { hours: calculatedHours, basePrice, extraCost, totalPrice: basePrice + extraCost });
// // // //     };

// // // //     calculatePrice();
// // // //     setLoading(false);
// // // //   }, [pickupDate, pickupTime, dropoffDate, dropoffTime, pickupLocation, selectedDeal, extras]);

// // // //   const handlePayment = async () => {
// // // //     if (!totalPrice || totalPrice <= 0 || !termsAccepted) {
// // // //       console.warn("Cannot proceed with payment: Total price is zero or terms not accepted.");
// // // //       return;
// // // //     }

// // // //     const stripe = await stripePromise;
// // // //     try {
// // // //       const response = await axios.post("http://localhost:5001/create-checkout-session", {
// // // //         amount: totalPrice * 100, // Amount in paise
// // // //         currency: "inr",
// // // //         pickupLocation: pickupLocation || "N/A",
// // // //         pickupDate,
// // // //         pickupTime,
// // // //         dropoffDate,
// // // //         dropoffTime,
// // // //         carId: carData.id,
// // // //         carMake: carData.make,
// // // //         carModel: carData.model,
// // // //         agency: selectedDeal.agency,
// // // //       });

// // // //       const { id: sessionId } = response.data;

// // // //       const { error } = await stripe.redirectToCheckout({
// // // //         sessionId: sessionId,
// // // //       });

// // // //       if (error) {
// // // //         console.error("Error redirecting to Stripe checkout:", error);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Axios error during payment:", error);
// // // //     }
// // // //   };

// // // //   // Handle extra selection
// // // //   const handleExtraChange = (extra) => {
// // // //     setExtras((prev) => ({
// // // //       ...prev,
// // // //       [extra]: !prev[extra],
// // // //     }));
// // // //   };

// // // //   // Handle close (back to CabListing)
// // // //   const handleClose = () => {
// // // //     navigate(-1); // Go back to the previous page (CabListing)
// // // //   };

// // // //   if (loading) return <div className="text-center py-10 text-gray-800">Loading...</div>;
// // // //   if (!carData || !selectedDeal)
// // // //     return <div className="text-center py-10 text-gray-800">Car or deal not found</div>;

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50">
// // // //       <div className="container mx-auto max-w-7xl px-4 py-6 sm:py-8">
// // // //         <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
// // // //           Confirm Your Booking
// // // //         </h2>
// // // //         <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
// // // //           {/* Left Section: Booking Details and Price (1/3rd, fixed like filters in CabListing) */}
// // // //           <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:w-1/4 md:sticky md:top-20 h-auto md:h-[70vh] overflow-y-auto scrollbar-thin">
// // // //             <div className="mt-6">
// // // //               <h4 className="text-lg font-semibold text-gray-800 mb-3">Booking Details</h4>
// // // //               <p className="text-gray-600">
// // // //                 <strong>Location:</strong> {pickupLocation || "N/A"}
// // // //               </p>
// // // //               <p className="text-gray-600">
// // // //                 <strong>Pickup Date & Time:</strong> {pickupDate && pickupTime ? `${pickupDate} ${pickupTime}` : "N/A"}
// // // //               </p>
// // // //               <p className="text-gray-600">
// // // //                 <strong>Dropoff Date & Time:</strong> {dropoffDate && dropoffTime ? `${dropoffDate} ${dropoffTime}` : "N/A"}
// // // //               </p>
// // // //             </div>
// // // //             <div className="mt-6 border-t pt-4">
// // // //               <h4 className="text-lg font-semibold text-gray-800 mb-3">Price Breakdown</h4>
// // // //               <p className="text-gray-600">Rental Cost: ₹{totalPrice.toLocaleString()}</p>
// // // //               <p className="text-gray-600">
// // // //                 Extras: ₹
// // // //                 {[
// // // //                   extras.additionalDriver && EXTRA_PRICES.additionalDriver,
// // // //                   extras.extraLuggage && EXTRA_PRICES.extraLuggage,
// // // //                   extras.childSeat && EXTRA_PRICES.childSeat,
// // // //                 ]
// // // //                   .filter(Boolean)
// // // //                   .reduce((sum, price) => sum + price, 0)
// // // //                   .toLocaleString() || "0"}
// // // //               </p>
// // // //               <p className="text-2xl font-bold text-gray-800 mt-4">Total: ₹{totalPrice.toLocaleString()}</p>
// // // //             </div>
// // // //           </div>

// // // //           {/* Right Section: Car Details and Extras (2/3rd, scrollable like CarCard in CabListing) */}
// // // //           <main className="w-full md:w-3/4 relative">
// // // //             <button
// // // //               onClick={handleClose}
// // // //               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors md:hidden"
// // // //             >
// // // //               <FaTimes size={20} />
// // // //             </button>
// // // //             <div className="bg-white rounded-xl shadow-lg p-6 overflow-y-auto h-[70vh] scrollbar-thin">
// // // //               <div className="flex flex-col gap-6">
// // // //                 <div className="w-full">
// // // //                   <div className="flex items-center space-x-3 mb-4">
// // // //                     <h3 className="text-xl font-semibold text-gray-800">
// // // //                       {carData.make || "Unknown"} {carData.model || "Model"}
// // // //                     </h3>
// // // //                     <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
// // // //                       {carData.type || "N/A"}
// // // //                     </span>
// // // //                   </div>

// // // //                   <div className="grid grid-cols-2 gap-4 mb-4">
// // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // //                       <FaUserFriends size={14} />
// // // //                       <span className="text-sm">{carData.passengers || "N/A"} Passengers</span>
// // // //                     </div>
// // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // //                       <FaSuitcase size={14} />
// // // //                       <span className="text-sm">4 Luggage</span>
// // // //                     </div>
// // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // //                       <FaCogs size={14} />
// // // //                       <span className="text-sm">{carData.transmission || "N/A"}</span>
// // // //                     </div>
// // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // //                       <FaMapMarkerAlt size={14} />
// // // //                       <span className="text-sm">Unlimited Mileage</span>
// // // //                     </div>
// // // //                     <div className="flex items-center space-x-2 text-gray-600">
// // // //                       <FaStar size={14} className="text-yellow-400" />
// // // //                       <span className="text-sm">{carData.ratings || "N/A"}/5</span>
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
// // // //                     <p className="text-gray-800 font-semibold">Agency: {selectedDeal.agency || "N/A"}</p>
// // // //                     <p className="text-gray-600">Fuel Policy: {carData.fuel_policy || "N/A"}</p>
// // // //                   </div>

// // // //                   {/* Extras Section */}
// // // //                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
// // // //                     <h4 className="text-lg font-semibold text-gray-800 mb-3">Extras</h4>
// // // //                     <div className="space-y-2">
// // // //                       <label className="flex items-center space-x-2">
// // // //                         <input
// // // //                           type="checkbox"
// // // //                           checked={extras.additionalDriver}
// // // //                           onChange={() => handleExtraChange("additionalDriver")}
// // // //                           className="form-checkbox text-blue-600"
// // // //                         />
// // // //                         <span className="text-gray-600">Additional Driver (₹500)</span>
// // // //                       </label>
// // // //                       <label className="flex items-center space-x-2">
// // // //                         <input
// // // //                           type="checkbox"
// // // //                           checked={extras.extraLuggage}
// // // //                           onChange={() => handleExtraChange("extraLuggage")}
// // // //                           className="form-checkbox text-blue-600"
// // // //                         />
// // // //                         <span className="text-gray-600">Extra Luggage (₹300)</span>
// // // //                       </label>
// // // //                       <label className="flex items-center space-x-2">
// // // //                         <input
// // // //                           type="checkbox"
// // // //                           checked={extras.childSeat}
// // // //                           onChange={() => handleExtraChange("childSeat")}
// // // //                           className="form-checkbox text-blue-600"
// // // //                         />
// // // //                         <span className="text-gray-600">Child Seat (₹400)</span>
// // // //                       </label>
// // // //                     </div>
// // // //                   </div>

// // // //                   {/* Driver Details Section (Visible only when additionalDriver is selected) */}
// // // //                   {extras.additionalDriver && (
// // // //                     <div className="bg-gray-100 p-4 rounded-lg mb-4">
// // // //                       <h4 className="text-lg font-semibold text-gray-800 mb-3">Driver Details</h4>
// // // //                       <p className="text-gray-600">
// // // //                         <strong>Name:</strong> [Enter Driver Name]
// // // //                       </p>
// // // //                       <p className="text-gray-600">
// // // //                         <strong>License Number:</strong> [Enter License Number]
// // // //                       </p>
// // // //                       <p className="text-gray-600">
// // // //                         <strong>Contact:</strong> [Enter Contact Number]
// // // //                       </p>
// // // //                       {/* Add input fields or logic as needed for dynamic driver details */}
// // // //                     </div>
// // // //                   )}

// // // //                   {/* Policy Terms */}
// // // //                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
// // // //                     <h4 className="text-lg font-semibold text-gray-800 mb-3">Policy Terms</h4>
// // // //                     <p className="text-gray-600">
// // // //                       - Vehicle must be returned with a full tank of fuel.
// // // //                       <br />- Any damage to the vehicle will incur additional charges.
// // // //                       <br />- Rental period cannot exceed 30 days without prior approval.
// // // //                     </p>
// // // //                   </div>

// // // //                   {/* Cancellation Policy */}
// // // //                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
// // // //                     <h4 className="text-lg font-semibold text-gray-800 mb-3">Cancellation Policy</h4>
// // // //                     <p className="text-gray-600">
// // // //                       - Free cancellation up to 48 hours before pickup.
// // // //                       <br />- 50% refund if cancelled within 24-48 hours.
// // // //                       <br />- No refund if cancelled within 24 hours.
// // // //                     </p>
// // // //                   </div>

// // // //                   {/* Terms and Conditions Checkbox */}
// // // //                   <div className="mb-6">
// // // //                     <label className="flex items-center space-x-2">
// // // //                       <input
// // // //                         type="checkbox"
// // // //                         checked={termsAccepted}
// // // //                         onChange={(e) => setTermsAccepted(e.target.checked)}
// // // //                         className="form-checkbox text-blue-600"
// // // //                       />
// // // //                       <span className="text-gray-600">
// // // //                         I agree to the <a href="#" className="text-blue-600 underline">Terms and Conditions</a>
// // // //                       </span>
// // // //                     </label>
// // // //                   </div>

// // // //                   {/* Confirm Booking Button (Bottom-right corner) */}
// // // //                   <div className="fixed bottom-6 right-6 md:static md:mt-auto">
// // // //                     <button
// // // //                       onClick={handlePayment}
// // // //                       className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ${!termsAccepted ? 'opacity-50 cursor-not-allowed' : ''}`}
// // // //                       disabled={!termsAccepted}
// // // //                     >
// // // //                       Confirm Booking
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //             {/* Close button (visible on desktop in top-right) */}
// // // //             <button
// // // //               onClick={handleClose}
// // // //               className="hidden md:block absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
// // // //             >
// // // //               <FaTimes size={20} />
// // // //             </button>
// // // //           </main>
// // // //         </div>
// // // //       </div>

// // // //       <Footer />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default CarConfirmation;







// // // import React, { useState, useEffect } from "react";
// // // import { useLocation, useNavigate } from "react-router-dom";
// // // import axios from "axios";
// // // import { loadStripe } from "@stripe/stripe-js";
// // // import {
// // //   FaUserFriends,
// // //   FaSuitcase,
// // //   FaCogs,
// // //   FaMapMarkerAlt,
// // //   FaStar,
// // //   FaTimes,
// // // } from "react-icons/fa";
// // // import Footer from "./Footer";

// // // // Load Stripe with your public key
// // // const stripePromise = loadStripe("pk_test_51RBq3dPlQbJhRZQumwQFlV6uBA7rekmsFfXhxYG3fyxau7bPHQgoV86IaD5cbhvdM394vHEDKi3KhiqskSxT16Cf00rWlbxKrL");

// // // const CarConfirmation = () => {
// // //   const location = useLocation();
// // //   const navigate = useNavigate();
// // //   const {
// // //     pickupDate,
// // //     pickupTime,
// // //     dropoffDate,
// // //     dropoffTime,
// // //     pickupLocation,
// // //     car = {},
// // //     selectedDeal = {},
// // //   } = location.state || {};
// // //   const [carData, setCarData] = useState(car || {});
// // //   const [totalPrice, setTotalPrice] = useState(0);
// // //   const [loading, setLoading] = useState(true);
// // //   const [extras, setExtras] = useState({
// // //     additionalDriver: false,
// // //     extraLuggage: false,
// // //     childSeat: false,
// // //   });
// // //   const [termsAccepted, setTermsAccepted] = useState(false);

// // //   // Fixed prices for extras
// // //   const EXTRA_PRICES = {
// // //     additionalDriver: 500,
// // //     extraLuggage: 300,
// // //     childSeat: 400,
// // //   };

// // //   // Calculate price based on per-hour rate, duration, and extras
// // //   useEffect(() => {
// // //     const calculatePrice = () => {
// // //       console.log("Received state:", {
// // //         pickupDate,
// // //         pickupTime,
// // //         dropoffDate,
// // //         dropoffTime,
// // //         pickupLocation,
// // //         car,
// // //         selectedDeal,
// // //       });

// // //       // Validate all required fields
// // //       if (!pickupDate || !pickupTime || !dropoffDate || !dropoffTime || !pickupLocation || !selectedDeal?.price) {
// // //         console.warn("🚨 Missing required fields or price:", {
// // //           pickupDate,
// // //           pickupTime,
// // //           dropoffDate,
// // //           dropoffTime,
// // //           pickupLocation,
// // //           selectedDeal,
// // //         });
// // //         setTotalPrice(0);
// // //         return;
// // //       }

// // //       // Parse dates using ISO format
// // //       const pickup = new Date(`${pickupDate}T${pickupTime}`);
// // //       const dropoff = new Date(`${dropoffDate}T${dropoffTime}`);

// // //       // Validate date objects
// // //       if (isNaN(pickup.getTime()) || isNaN(dropoff.getTime())) {
// // //         console.warn("❌ Invalid date format:", { pickup, dropoff });
// // //         setTotalPrice(0);
// // //         return;
// // //       }

// // //       // Ensure dropoff is after pickup
// // //       if (pickup >= dropoff) {
// // //         console.warn("❌ Dropoff date must be after pickup date.");
// // //         setTotalPrice(0);
// // //         return;
// // //       }

// // //       // Calculate hours
// // //       const calculatedHours = Math.max(1, Math.ceil((dropoff - pickup) / (1000 * 60 * 60))); // Minimum 1 hour, round up
// // //       const basePrice = calculatedHours * selectedDeal.price;
// // //       const extraCost = 
// // //         (extras.additionalDriver ? EXTRA_PRICES.additionalDriver : 0) +
// // //         (extras.extraLuggage ? EXTRA_PRICES.extraLuggage : 0) +
// // //         (extras.childSeat ? EXTRA_PRICES.childSeat : 0);

// // //       // Update state
// // //       setTotalPrice(basePrice + extraCost);
// // //       console.log("Calculated:", { hours: calculatedHours, basePrice, extraCost, totalPrice: basePrice + extraCost });
// // //     };

// // //     calculatePrice();
// // //     setLoading(false);
// // //   }, [pickupDate, pickupTime, dropoffDate, dropoffTime, pickupLocation, selectedDeal, extras]);

// // //   const handlePayment = async () => {
// // //     if (!totalPrice || totalPrice <= 0 || !termsAccepted) {
// // //       console.warn("Cannot proceed with payment: Total price is zero or terms not accepted.");
// // //       return;
// // //     }

// // //     const stripe = await stripePromise;
// // //     try {
// // //       const response = await axios.post("http://localhost:5001/create-checkout-session", {
// // //         amount: totalPrice * 100, // Amount in paise
// // //         currency: "inr",
// // //         pickupLocation: pickupLocation || "N/A",
// // //         pickupDate,
// // //         pickupTime,
// // //         dropoffDate,
// // //         dropoffTime,
// // //         carId: carData.id,
// // //         carMake: carData.make,
// // //         carModel: carData.model,
// // //         agency: selectedDeal.agency,
// // //       });

// // //       const { id: sessionId } = response.data;

// // //       const { error } = await stripe.redirectToCheckout({
// // //         sessionId: sessionId,
// // //       });

// // //       if (error) {
// // //         console.error("Error redirecting to Stripe checkout:", error);
// // //       }
// // //     } catch (error) {
// // //       console.error("Axios error during payment:", error);
// // //     }
// // //   };

// // //   // Handle extra selection
// // //   const handleExtraChange = (extra) => {
// // //     setExtras((prev) => ({
// // //       ...prev,
// // //       [extra]: !prev[extra],
// // //     }));
// // //   };

// // //   // Handle close (back to CabListing)
// // //   const handleClose = () => {
// // //     navigate(-1); // Go back to the previous page (CabListing)
// // //   };

// // //   if (loading) return <div className="text-center py-10 text-gray-800">Loading...</div>;
// // //   if (!carData || !selectedDeal)
// // //     return <div className="text-center py-10 text-gray-800">Car or deal not found</div>;

// // //   return (
// // //     <div className="min-h-screen bg-gray-50">
// // //       <div className="container mx-auto max-w-7xl px-4 py-6 sm:py-8">
// // //         <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
// // //           Confirm Your Booking
// // //         </h2>
// // //         <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
// // //           {/* Left Section: Booking Details and Price (1/3rd, fixed and floating, no scrollbar) */}
// // //           <div className="bg-white p-4 sm:p-6 md:w-1/4 md:sticky md:top-20 h-auto md:h-screen overflow-y-visible">
// // //             <div className="mt-6">
// // //               <h4 className="text-lg font-semibold text-gray-800 mb-3">Booking Details</h4>
// // //               <p className="text-gray-600">
// // //                 <strong>Location:</strong> {pickupLocation || "N/A"}
// // //               </p>
// // //               <p className="text-gray-600">
// // //                 <strong>Pickup Date & Time:</strong> {pickupDate && pickupTime ? `${pickupDate} ${pickupTime}` : "N/A"}
// // //               </p>
// // //               <p className="text-gray-600">
// // //                 <strong>Dropoff Date & Time:</strong> {dropoffDate && dropoffTime ? `${dropoffDate} ${dropoffTime}` : "N/A"}
// // //               </p>
// // //             </div>
// // //             <div className="mt-6 border-t pt-4">
// // //               <h4 className="text-lg font-semibold text-gray-800 mb-3">Price Breakdown</h4>
// // //               <p className="text-gray-600">Rental Cost: ₹{totalPrice.toLocaleString()}</p>
// // //               <p className="text-gray-600">
// // //                 Extras: ₹
// // //                 {[
// // //                   extras.additionalDriver && EXTRA_PRICES.additionalDriver,
// // //                   extras.extraLuggage && EXTRA_PRICES.extraLuggage,
// // //                   extras.childSeat && EXTRA_PRICES.childSeat,
// // //                 ]
// // //                   .filter(Boolean)
// // //                   .reduce((sum, price) => sum + price, 0)
// // //                   .toLocaleString() || "0"}
// // //               </p>
// // //               <p className="text-2xl font-bold text-gray-800 mt-4">Total: ₹{totalPrice.toLocaleString()}</p>
// // //             </div>
// // //           </div>

// // //           {/* Right Section: Car Details and Extras (2/3rd, no local scrollbar, uses page scroll) */}
// // //           <main className="w-full md:w-3/4">
// // //             <button
// // //               onClick={handleClose}
// // //               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
// // //             >
// // //               <FaTimes size={20} />
// // //             </button>
// // //             <div className="p-6">
// // //               <div className="flex flex-col gap-6">
// // //                 <div className="w-full">
// // //                   <div className="flex items-center space-x-3 mb-4">
// // //                     <h3 className="text-xl font-semibold text-gray-800">
// // //                       {carData.make || "Unknown"} {carData.model || "Model"}
// // //                     </h3>
// // //                     <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
// // //                       {carData.type || "N/A"}
// // //                     </span>
// // //                   </div>

// // //                   <div className="grid grid-cols-2 gap-4 mb-4">
// // //                     <div className="flex items-center space-x-2 text-gray-600">
// // //                       <FaUserFriends size={14} />
// // //                       <span className="text-sm">{carData.passengers || "N/A"} Passengers</span>
// // //                     </div>
// // //                     <div className="flex items-center space-x-2 text-gray-600">
// // //                       <FaSuitcase size={14} />
// // //                       <span className="text-sm">4 Luggage</span>
// // //                     </div>
// // //                     <div className="flex items-center space-x-2 text-gray-600">
// // //                       <FaCogs size={14} />
// // //                       <span className="text-sm">{carData.transmission || "N/A"}</span>
// // //                     </div>
// // //                     <div className="flex items-center space-x-2 text-gray-600">
// // //                       <FaMapMarkerAlt size={14} />
// // //                       <span className="text-sm">Unlimited Mileage</span>
// // //                     </div>
// // //                     <div className="flex items-center space-x-2 text-gray-600">
// // //                       <FaStar size={14} className="text-yellow-400" />
// // //                       <span className="text-sm">{carData.ratings || "N/A"}/5</span>
// // //                     </div>
// // //                   </div>

// // //                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
// // //                     <p className="text-gray-800 font-semibold">Agency: {selectedDeal.agency || "N/A"}</p>
// // //                     <p className="text-gray-600">Fuel Policy: {carData.fuel_policy || "N/A"}</p>
// // //                   </div>

// // //                   {/* Extras Section */}
// // //                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
// // //                     <h4 className="text-lg font-semibold text-gray-800 mb-3">Extras</h4>
// // //                     <div className="space-y-2">
// // //                       <label className="flex items-center space-x-2">
// // //                         <input
// // //                           type="checkbox"
// // //                           checked={extras.additionalDriver}
// // //                           onChange={() => handleExtraChange("additionalDriver")}
// // //                           className="form-checkbox text-blue-600"
// // //                         />
// // //                         <span className="text-gray-600">Additional Driver (₹500)</span>
// // //                       </label>
// // //                       <label className="flex items-center space-x-2">
// // //                         <input
// // //                           type="checkbox"
// // //                           checked={extras.extraLuggage}
// // //                           onChange={() => handleExtraChange("extraLuggage")}
// // //                           className="form-checkbox text-blue-600"
// // //                         />
// // //                         <span className="text-gray-600">Extra Luggage (₹300)</span>
// // //                       </label>
// // //                       <label className="flex items-center space-x-2">
// // //                         <input
// // //                           type="checkbox"
// // //                           checked={extras.childSeat}
// // //                           onChange={() => handleExtraChange("childSeat")}
// // //                           className="form-checkbox text-blue-600"
// // //                         />
// // //                         <span className="text-gray-600">Child Seat (₹400)</span>
// // //                       </label>
// // //                     </div>
// // //                   </div>

// // //                   {/* Driver Details Section (Visible only when additionalDriver is selected) */}
// // //                   {extras.additionalDriver && (
// // //                     <div className="bg-gray-100 p-4 rounded-lg mb-4">
// // //                       <h4 className="text-lg font-semibold text-gray-800 mb-3">Driver Details</h4>
// // //                       <p className="text-gray-600">
// // //                         <strong>Name:</strong> [Enter Driver Name]
// // //                       </p>
// // //                       <p className="text-gray-600">
// // //                         <strong>License Number:</strong> [Enter License Number]
// // //                       </p>
// // //                       <p className="text-gray-600">
// // //                         <strong>Contact:</strong> [Enter Contact Number]
// // //                       </p>
// // //                       {/* Add input fields or logic as needed for dynamic driver details */}
// // //                     </div>
// // //                   )}

// // //                   {/* Policy Terms */}
// // //                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
// // //                     <h4 className="text-lg font-semibold text-gray-800 mb-3">Policy Terms</h4>
// // //                     <p className="text-gray-600">
// // //                       - Vehicle must be returned with a full tank of fuel.
// // //                       <br />- Any damage to the vehicle will incur additional charges.
// // //                       <br />- Rental period cannot exceed 30 days without prior approval.
// // //                     </p>
// // //                   </div>

// // //                   {/* Cancellation Policy */}
// // //                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
// // //                     <h4 className="text-lg font-semibold text-gray-800 mb-3">Cancellation Policy</h4>
// // //                     <p className="text-gray-600">
// // //                       - Free cancellation up to 48 hours before pickup.
// // //                       <br />- 50% refund if cancelled within 24-48 hours.
// // //                       <br />- No refund if cancelled within 24 hours.
// // //                     </p>
// // //                   </div>

// // //                   {/* Terms and Conditions Checkbox */}
// // //                   <div className="mb-6">
// // //                     <label className="flex items-center space-x-2">
// // //                       <input
// // //                         type="checkbox"
// // //                         checked={termsAccepted}
// // //                         onChange={(e) => setTermsAccepted(e.target.checked)}
// // //                         className="form-checkbox text-blue-600"
// // //                       />
// // //                       <span className="text-gray-600">
// // //                         I agree to the <a href="#" className="text-blue-600 underline">Terms and Conditions</a>
// // //                       </span>
// // //                     </label>
// // //                   </div>

// // //                   {/* Confirm Booking Button (Bottom-right corner) */}
// // //                   <div className="fixed bottom-6 right-6 md:static md:mt-auto">
// // //                     <button
// // //                       onClick={handlePayment}
// // //                       className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ${!termsAccepted ? 'opacity-50 cursor-not-allowed' : ''}`}
// // //                       disabled={!termsAccepted}
// // //                     >
// // //                       Confirm Booking
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </main>
// // //         </div>
// // //       </div>

// // //       <Footer />
// // //     </div>
// // //   );
// // // };

// // // export default CarConfirmation;









// // import React, { useState, useEffect } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { loadStripe } from "@stripe/stripe-js";
// // import {
// //   FaUserFriends,
// //   FaSuitcase,
// //   FaCogs,
// //   FaMapMarkerAlt,
// //   FaStar,
// //   FaTimes,
// // } from "react-icons/fa";
// // import Footer from "./Footer";

// // // Load Stripe with your public key
// // const stripePromise = loadStripe("pk_test_51RBq3dPlQbJhRZQumwQFlV6uBA7rekmsFfXhxYG3fyxau7bPHQgoV86IaD5cbhvdM394vHEDKi3KhiqskSxT16Cf00rWlbxKrL");

// // const CarConfirmation = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const {
// //     pickupDate,
// //     pickupTime,
// //     dropoffDate,
// //     dropoffTime,
// //     pickupLocation,
// //     car = {},
// //     selectedDeal = {},
// //   } = location.state || {};
// //   const [carData, setCarData] = useState(car || {});
// //   const [totalPrice, setTotalPrice] = useState(0);
// //   const [loading, setLoading] = useState(true);
// //   const [extras, setExtras] = useState({
// //     additionalDriver: false,
// //     extraLuggage: false,
// //     childSeat: false,
// //   });
// //   const [termsAccepted, setTermsAccepted] = useState(false);

// //   // Fixed prices for extras
// //   const EXTRA_PRICES = {
// //     additionalDriver: 500,
// //     extraLuggage: 300,
// //     childSeat: 400,
// //   };

// //   // Calculate price based on per-hour rate, duration, and extras
// //   useEffect(() => {
// //     const calculatePrice = () => {
// //       console.log("Received state:", {
// //         pickupDate,
// //         pickupTime,
// //         dropoffDate,
// //         dropoffTime,
// //         pickupLocation,
// //         car,
// //         selectedDeal,
// //       });

// //       // Validate all required fields
// //       if (!pickupDate || !pickupTime || !dropoffDate || !dropoffTime || !pickupLocation || !selectedDeal?.price) {
// //         console.warn("🚨 Missing required fields or price:", {
// //           pickupDate,
// //           pickupTime,
// //           dropoffDate,
// //           dropoffTime,
// //           pickupLocation,
// //           selectedDeal,
// //         });
// //         setTotalPrice(0);
// //         return;
// //       }

// //       // Parse dates using ISO format
// //       const pickup = new Date(`${pickupDate}T${pickupTime}`);
// //       const dropoff = new Date(`${dropoffDate}T${dropoffTime}`);

// //       // Validate date objects
// //       if (isNaN(pickup.getTime()) || isNaN(dropoff.getTime())) {
// //         console.warn("❌ Invalid date format:", { pickup, dropoff });
// //         setTotalPrice(0);
// //         return;
// //       }

// //       // Ensure dropoff is after pickup
// //       if (pickup >= dropoff) {
// //         console.warn("❌ Dropoff date must be after pickup date.");
// //         setTotalPrice(0);
// //         return;
// //       }

// //       // Calculate hours
// //       const calculatedHours = Math.max(1, Math.ceil((dropoff - pickup) / (1000 * 60 * 60))); // Minimum 1 hour, round up
// //       const basePrice = calculatedHours * selectedDeal.price;
// //       const extraCost = 
// //         (extras.additionalDriver ? EXTRA_PRICES.additionalDriver : 0) +
// //         (extras.extraLuggage ? EXTRA_PRICES.extraLuggage : 0) +
// //         (extras.childSeat ? EXTRA_PRICES.childSeat : 0);

// //       // Update state
// //       setTotalPrice(basePrice + extraCost);
// //       console.log("Calculated:", { hours: calculatedHours, basePrice, extraCost, totalPrice: basePrice + extraCost });
// //     };

// //     calculatePrice();
// //     setLoading(false);
// //   }, [pickupDate, pickupTime, dropoffDate, dropoffTime, pickupLocation, selectedDeal, extras]);

// //   // const handlePayment = async () => {
// //   //   if (!totalPrice || totalPrice <= 0 || !termsAccepted) {
// //   //     console.warn("Cannot proceed with payment: Total price is zero or terms not accepted.");
// //   //     return;
// //   //   }



// //   const handlePayment = async () => {
// //     if (!totalPrice || totalPrice <= 0 || !termsAccepted) {
// //       console.warn("Cannot proceed with payment: Total price is zero or terms not accepted.");
// //       return;
// //     }
  
// //     const stripe = await stripePromise;
// //     try {
// //       const response = await axios.post("http://localhost:5001/create-checkout-session", {
// //         amount: totalPrice * 100, // Amount in paise
// //         currency: "inr",
// //         pickupLocation: pickupLocation || "N/A",
// //         pickupDate,
// //         pickupTime,
// //         dropoffDate,
// //         dropoffTime,
// //         carId: carData.id,
// //         carMake: carData.make,
// //         carModel: carData.model,
// //         agency: selectedDeal.agency,
// //       });
  
// //       const { id: sessionId } = response.data;
  
// //       const { error } = await stripe.redirectToCheckout({
// //         sessionId: sessionId,
// //       });
  
// //       if (error) {
// //         console.error("Error redirecting to Stripe checkout:", error);
// //       } else {
// //         // Simulate success navigation (replace with actual success callback if Stripe provides it)
// //         navigate("/booking-confirmed", {
// //           state: {
// //             pickupLocation,
// //             pickupDate,
// //             pickupTime,
// //             dropoffDate,
// //             dropoffTime,
// //             car: carData,
// //             selectedDeal,
// //             extras,
// //           },
// //         });
// //       }
// //     } catch (error) {
// //       console.error("Axios error during payment:", error);
// //     }
// //   };

// //     const stripe = await stripePromise;
// //     try {
// //       const response = await axios.post("http://localhost:5001/create-checkout-session", {
// //         amount: totalPrice * 100, // Amount in paise
// //         currency: "inr",
// //         pickupLocation: pickupLocation || "N/A",
// //         pickupDate,
// //         pickupTime,
// //         dropoffDate,
// //         dropoffTime,
// //         carId: carData.id,
// //         carMake: carData.make,
// //         carModel: carData.model,
// //         agency: selectedDeal.agency,
// //       });

// //       const { id: sessionId } = response.data;

// //       const { error } = await stripe.redirectToCheckout({
// //         sessionId: sessionId,
// //       });

// //       if (error) {
// //         console.error("Error redirecting to Stripe checkout:", error);
// //       }
// //     } catch (error) {
// //       console.error("Axios error during payment:", error);
// //     }
// //   };

// //   // Handle extra selection
// //   const handleExtraChange = (extra) => {
// //     setExtras((prev) => ({
// //       ...prev,
// //       [extra]: !prev[extra],
// //     }));
// //   };

// //   // Handle close (back to CabListing)
// //   const handleClose = () => {
// //     navigate(-1); // Go back to the previous page (CabListing)
// //   };

// //   if (loading) return <div className="text-center py-10 text-gray-800">Loading...</div>;
// //   if (!carData || !selectedDeal)
// //     return <div className="text-center py-10 text-gray-800">Car or deal not found</div>;

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <div className="container mx-auto max-w-7xl px-4 py-6 sm:py-8">
// //         <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
// //           Confirm Your Booking
// //         </h2>
// //         <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
// //           {/* Left Section: Booking Details and Price (1/3rd, fixed and floating with shadow) */}
// //           <div className="bg-white p-4 sm:p-6 md:w-1/3 md:sticky md:top-20 h-auto md:h-screen overflow-y-visible shadow-lg">
// //             <div className="mt-6">
// //               <h4 className="text-lg font-semibold text-gray-800 mb-3">Booking Details</h4>
// //               <p className="text-gray-600">
// //                 <strong>Location:</strong> {pickupLocation || "N/A"}
// //               </p>
// //               <p className="text-gray-600">
// //                 <strong>Pickup Date & Time:</strong> {pickupDate && pickupTime ? `${pickupDate} ${pickupTime}` : "N/A"}
// //               </p>
// //               <p className="text-gray-600">
// //                 <strong>Dropoff Date & Time:</strong> {dropoffDate && dropoffTime ? `${dropoffDate} ${dropoffTime}` : "N/A"}
// //               </p>
// //             </div>
// //             <div className="mt-6 border-t pt-4">
// //               <h4 className="text-lg font-semibold text-gray-800 mb-3">Price Breakdown</h4>
// //               <p className="text-gray-600">Rental Cost: ₹{totalPrice.toLocaleString()}</p>
// //               <p className="text-gray-600">
// //                 Extras: ₹
// //                 {[
// //                   extras.additionalDriver && EXTRA_PRICES.additionalDriver,
// //                   extras.extraLuggage && EXTRA_PRICES.extraLuggage,
// //                   extras.childSeat && EXTRA_PRICES.childSeat,
// //                 ]
// //                   .filter(Boolean)
// //                   .reduce((sum, price) => sum + price, 0)
// //                   .toLocaleString() || "0"}
// //               </p>
// //               <p className="text-2xl font-bold text-gray-800 mt-4">Total: ₹{totalPrice.toLocaleString()}</p>
// //             </div>
// //           </div>

// //           {/* Right Section: Car Details and Extras (2/3rd, no local scrollbar, uses page scroll) */}
// //           <main className="w-full md:w-2/3">
// //             <button
// //               onClick={handleClose}
// //               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
// //             >
// //               <FaTimes size={20} />
// //             </button>
// //             <div className="p-6">
// //               <div className="flex flex-col gap-6">
// //                 <div className="w-full">
// //                   <div className="flex items-center space-x-3 mb-4">
// //                     <h3 className="text-xl font-semibold text-gray-800">
// //                       {carData.make || "Unknown"} {carData.model || "Model"}
// //                     </h3>
// //                     <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
// //                       {carData.type || "N/A"}
// //                     </span>
// //                   </div>

// //                   <div className="grid grid-cols-2 gap-4 mb-4">
// //                     <div className="flex items-center space-x-2 text-gray-600">
// //                       <FaUserFriends size={14} />
// //                       <span className="text-sm">{carData.passengers || "N/A"} Passengers</span>
// //                     </div>
// //                     <div className="flex items-center space-x-2 text-gray-600">
// //                       <FaSuitcase size={14} />
// //                       <span className="text-sm">4 Luggage</span>
// //                     </div>
// //                     <div className="flex items-center space-x-2 text-gray-600">
// //                       <FaCogs size={14} />
// //                       <span className="text-sm">{carData.transmission || "N/A"}</span>
// //                     </div>
// //                     <div className="flex items-center space-x-2 text-gray-600">
// //                       <FaMapMarkerAlt size={14} />
// //                       <span className="text-sm">Unlimited Mileage</span>
// //                     </div>
// //                     <div className="flex items-center space-x-2 text-gray-600">
// //                       <FaStar size={14} className="text-yellow-400" />
// //                       <span className="text-sm">{carData.ratings || "N/A"}/5</span>
// //                     </div>
// //                   </div>

// //                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
// //                     <p className="text-gray-800 font-semibold">Agency: {selectedDeal.agency || "N/A"}</p>
// //                     <p className="text-gray-600">Fuel Policy: {carData.fuel_policy || "N/A"}</p>
// //                   </div>

// //                   {/* Extras Section */}
// //                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
// //                     <h4 className="text-lg font-semibold text-gray-800 mb-3">Extras</h4>
// //                     <div className="space-y-2">
// //                       <label className="flex items-center space-x-2">
// //                         <input
// //                           type="checkbox"
// //                           checked={extras.additionalDriver}
// //                           onChange={() => handleExtraChange("additionalDriver")}
// //                           className="form-checkbox text-blue-600"
// //                         />
// //                         <span className="text-gray-600">Additional Driver (₹500)</span>
// //                       </label>
// //                       <label className="flex items-center space-x-2">
// //                         <input
// //                           type="checkbox"
// //                           checked={extras.extraLuggage}
// //                           onChange={() => handleExtraChange("extraLuggage")}
// //                           className="form-checkbox text-blue-600"
// //                         />
// //                         <span className="text-gray-600">Extra Luggage (₹300)</span>
// //                       </label>
// //                       <label className="flex items-center space-x-2">
// //                         <input
// //                           type="checkbox"
// //                           checked={extras.childSeat}
// //                           onChange={() => handleExtraChange("childSeat")}
// //                           className="form-checkbox text-blue-600"
// //                         />
// //                         <span className="text-gray-600">Child Seat (₹400)</span>
// //                       </label>
// //                     </div>
// //                   </div>

// //                   {/* Driver Details Section (Visible only when additionalDriver is selected) */}
// //                   {extras.additionalDriver && (
// //                     <div className="bg-gray-100 p-4 rounded-lg mb-4">
// //                       <h4 className="text-lg font-semibold text-gray-800 mb-3">Driver Details</h4>
// //                       <p className="text-gray-600">
// //                         <strong>Name:</strong> [Enter Driver Name]
// //                       </p>
// //                       <p className="text-gray-600">
// //                         <strong>License Number:</strong> [Enter License Number]
// //                       </p>
// //                       <p className="text-gray-600">
// //                         <strong>Contact:</strong> [Enter Contact Number]
// //                       </p>
// //                       {/* Add input fields or logic as needed for dynamic driver details */}
// //                     </div>
// //                   )}

// //                   {/* Policy Terms */}
// //                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
// //                     <h4 className="text-lg font-semibold text-gray-800 mb-3">Policy Terms</h4>
// //                     <p className="text-gray-600">
// //                       - Vehicle must be returned with a full tank of fuel.
// //                       <br />- Any damage to the vehicle will incur additional charges.
// //                       <br />- Rental period cannot exceed 30 days without prior approval.
// //                     </p>
// //                   </div>

// //                   {/* Cancellation Policy */}
// //                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
// //                     <h4 className="text-lg font-semibold text-gray-800 mb-3">Cancellation Policy</h4>
// //                     <p className="text-gray-600">
// //                       - Free cancellation up to 48 hours before pickup.
// //                       <br />- 50% refund if cancelled within 24-48 hours.
// //                       <br />- No refund if cancelled within 24 hours.
// //                     </p>
// //                   </div>

// //                   {/* Terms and Conditions Checkbox */}
// //                   <div className="mb-6">
// //                     <label className="flex items-center space-x-2">
// //                       <input
// //                         type="checkbox"
// //                         checked={termsAccepted}
// //                         onChange={(e) => setTermsAccepted(e.target.checked)}
// //                         className="form-checkbox text-blue-600"
// //                       />
// //                       <span className="text-gray-600">
// //                         I agree to the <a href="#" className="text-blue-600 underline">Terms and Conditions</a>
// //                       </span>
// //                     </label>
// //                   </div>

// //                   {/* Confirm Booking Button (Bottom-right corner) */}
// //                   <div className="fixed bottom-6 right-6 md:static md:mt-auto">
// //                     <button
// //                       onClick={handlePayment}
// //                       className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ${!termsAccepted ? 'opacity-50 cursor-not-allowed' : ''}`}
// //                       disabled={!termsAccepted}
// //                     >
// //                       Confirm Booking
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </main>
// //         </div>
// //       </div>

// //       <Footer />
// //     </div>
// //   );
// // };

// // export default CarConfirmation;







// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   FaUserFriends,
//   FaSuitcase,
//   FaCogs,
//   FaMapMarkerAlt,
//   FaStar,
//   FaTimes,
// } from "react-icons/fa";
// import Footer from "./Footer";

// // Load Stripe with your public key
// const stripePromise = loadStripe("pk_test_51RBq3dPlQbJhRZQumwQFlV6uBA7rekmsFfXhxYG3fyxau7bPHQgoV86IaD5cbhvdM394vHEDKi3KhiqskSxT16Cf00rWlbxKrL");

// const CarConfirmation = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const {
//     pickupDate,
//     pickupTime,
//     dropoffDate,
//     dropoffTime,
//     pickupLocation,
//     car = {},
//     selectedDeal = {},
//   } = location.state || {};
//   const [carData, setCarData] = useState(car || {});
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [extras, setExtras] = useState({
//     additionalDriver: false,
//     extraLuggage: false,
//     childSeat: false,
//   });
//   const [termsAccepted, setTermsAccepted] = useState(false);

//   // Fixed prices for extras
//   const EXTRA_PRICES = {
//     additionalDriver: 500,
//     extraLuggage: 300,
//     childSeat: 400,
//   };

//   // Calculate price based on per-hour rate, duration, and extras
//   useEffect(() => {
//     const calculatePrice = () => {
//       console.log("Received state:", {
//         pickupDate,
//         pickupTime,
//         dropoffDate,
//         dropoffTime,
//         pickupLocation,
//         car,
//         selectedDeal,
//       });

//       // Validate all required fields
//       if (!pickupDate || !pickupTime || !dropoffDate || !dropoffTime || !pickupLocation || !selectedDeal?.price) {
//         console.warn("🚨 Missing required fields or price:", {
//           pickupDate,
//           pickupTime,
//           dropoffDate,
//           dropoffTime,
//           pickupLocation,
//           selectedDeal,
//         });
//         setTotalPrice(0);
//         return;
//       }

//       // Parse dates using ISO format
//       const pickup = new Date(`${pickupDate}T${pickupTime}`);
//       const dropoff = new Date(`${dropoffDate}T${dropoffTime}`);

//       // Validate date objects
//       if (isNaN(pickup.getTime()) || isNaN(dropoff.getTime())) {
//         console.warn("❌ Invalid date format:", { pickup, dropoff });
//         setTotalPrice(0);
//         return;
//       }

//       // Ensure dropoff is after pickup
//       if (pickup >= dropoff) {
//         console.warn("❌ Dropoff date must be after pickup date.");
//         setTotalPrice(0);
//         return;
//       }

//       // Calculate hours
//       const calculatedHours = Math.max(1, Math.ceil((dropoff - pickup) / (1000 * 60 * 60))); // Minimum 1 hour, round up
//       const basePrice = calculatedHours * selectedDeal.price;
//       const extraCost = 
//         (extras.additionalDriver ? EXTRA_PRICES.additionalDriver : 0) +
//         (extras.extraLuggage ? EXTRA_PRICES.extraLuggage : 0) +
//         (extras.childSeat ? EXTRA_PRICES.childSeat : 0);

//       // Update state
//       setTotalPrice(basePrice + extraCost);
//       console.log("Calculated:", { hours: calculatedHours, basePrice, extraCost, totalPrice: basePrice + extraCost });
//     };

//     calculatePrice();
//     setLoading(false);
//   }, [pickupDate, pickupTime, dropoffDate, dropoffTime, pickupLocation, selectedDeal, extras]);

//   // Handle payment (marked as async)
//   const handlePayment = async () => {
//     if (!totalPrice || totalPrice <= 0 || !termsAccepted) {
//       console.warn("Cannot proceed with payment: Total price is zero or terms not accepted.");
//       return;
//     }

//     const stripe = await stripePromise;
//     try {
//       const response = await axios.post("http://localhost:5001/create-checkout-session", {
//         amount: totalPrice * 100, // Amount in paise
//         currency: "inr",
//         pickupLocation: pickupLocation || "N/A",
//         pickupDate,
//         pickupTime,
//         dropoffDate,
//         dropoffTime,
//         carId: carData.id,
//         carMake: carData.make,
//         carModel: carData.model,
//         agency: selectedDeal.agency,
//       });

//       const { id: sessionId } = response.data;

//       const { error } = await stripe.redirectToCheckout({
//         sessionId: sessionId,
//       });

//       if (error) {
//         console.error("Error redirecting to Stripe checkout:", error);
//       } else {
//         // Navigate to BookingConfirmed after payment attempt (replace with webhook success if possible)
//         navigate("/booking-confirmed", {
//           state: {
//             pickupLocation,
//             pickupDate,
//             pickupTime,
//             dropoffDate,
//             dropoffTime,
//             car: carData,
//             selectedDeal,
//             extras,
//           },
//         });
//       }
//     } catch (error) {
//       console.error("Axios error during payment:", error);
//     }
//   };

//   // Handle extra selection
//   const handleExtraChange = (extra) => {
//     setExtras((prev) => ({
//       ...prev,
//       [extra]: !prev[extra],
//     }));
//   };

//   // Handle close (back to CabListing)
//   const handleClose = () => {
//     navigate(-1); // Go back to the previous page (CabListing)
//   };

//   if (loading) return <div className="text-center py-10 text-gray-800">Loading...</div>;
//   if (!carData || !selectedDeal)
//     return <div className="text-center py-10 text-gray-800">Car or deal not found</div>;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto max-w-7xl px-4 py-6 sm:py-8">
//         <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
//           Confirm Your Booking
//         </h2>
//         <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
//           {/* Left Section: Booking Details and Price (1/3rd, fixed and floating with shadow) */}
//           <div className="bg-white p-4 sm:p-6 md:w-1/3 md:sticky md:top-20 h-auto md:h-screen overflow-y-visible shadow-lg">
//             <div className="mt-6">
//               <h4 className="text-lg font-semibold text-gray-800 mb-3">Booking Details</h4>
//               <p className="text-gray-600">
//                 <strong>Location:</strong> {pickupLocation || "N/A"}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Pickup Date & Time:</strong> {pickupDate && pickupTime ? `${pickupDate} ${pickupTime}` : "N/A"}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Dropoff Date & Time:</strong> {dropoffDate && dropoffTime ? `${dropoffDate} ${dropoffTime}` : "N/A"}
//               </p>
//             </div>
//             <div className="mt-6 border-t pt-4">
//               <h4 className="text-lg font-semibold text-gray-800 mb-3">Price Breakdown</h4>
//               <p className="text-gray-600">Rental Cost: ₹{totalPrice.toLocaleString()}</p>
//               <p className="text-gray-600">
//                 Extras: ₹
//                 {[
//                   extras.additionalDriver && EXTRA_PRICES.additionalDriver,
//                   extras.extraLuggage && EXTRA_PRICES.extraLuggage,
//                   extras.childSeat && EXTRA_PRICES.childSeat,
//                 ]
//                   .filter(Boolean)
//                   .reduce((sum, price) => sum + price, 0)
//                   .toLocaleString() || "0"}
//               </p>
//               <p className="text-2xl font-bold text-gray-800 mt-4">Total: ₹{totalPrice.toLocaleString()}</p>
//             </div>
//           </div>

//           {/* Right Section: Car Details and Extras (2/3rd, no local scrollbar, uses page scroll) */}
//           <main className="w-full md:w-2/3">
//             <button
//               onClick={handleClose}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               <FaTimes size={20} />
//             </button>
//             <div className="p-6">
//               <div className="flex flex-col gap-6">
//                 <div className="w-full">
//                   <div className="flex items-center space-x-3 mb-4">
//                     <h3 className="text-xl font-semibold text-gray-800">
//                       {carData.make || "Unknown"} {carData.model || "Model"}
//                     </h3>
//                     <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
//                       {carData.type || "N/A"}
//                     </span>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4 mb-4">
//                     <div className="flex items-center space-x-2 text-gray-600">
//                       <FaUserFriends size={14} />
//                       <span className="text-sm">{carData.passengers || "N/A"} Passengers</span>
//                     </div>
//                     <div className="flex items-center space-x-2 text-gray-600">
//                       <FaSuitcase size={14} />
//                       <span className="text-sm">4 Luggage</span>
//                     </div>
//                     <div className="flex items-center space-x-2 text-gray-600">
//                       <FaCogs size={14} />
//                       <span className="text-sm">{carData.transmission || "N/A"}</span>
//                     </div>
//                     <div className="flex items-center space-x-2 text-gray-600">
//                       <FaMapMarkerAlt size={14} />
//                       <span className="text-sm">Unlimited Mileage</span>
//                     </div>
//                     <div className="flex items-center space-x-2 text-gray-600">
//                       <FaStar size={14} className="text-yellow-400" />
//                       <span className="text-sm">{carData.ratings || "N/A"}/5</span>
//                     </div>
//                   </div>

//                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
//                     <p className="text-gray-800 font-semibold">Agency: {selectedDeal.agency || "N/A"}</p>
//                     <p className="text-gray-600">Fuel Policy: {carData.fuel_policy || "N/A"}</p>
//                   </div>

//                   {/* Extras Section */}
//                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
//                     <h4 className="text-lg font-semibold text-gray-800 mb-3">Extras</h4>
//                     <div className="space-y-2">
//                       <label className="flex items-center space-x-2">
//                         <input
//                           type="checkbox"
//                           checked={extras.additionalDriver}
//                           onChange={() => handleExtraChange("additionalDriver")}
//                           className="form-checkbox text-blue-600"
//                         />
//                         <span className="text-gray-600">Additional Driver (₹500)</span>
//                       </label>
//                       <label className="flex items-center space-x-2">
//                         <input
//                           type="checkbox"
//                           checked={extras.extraLuggage}
//                           onChange={() => handleExtraChange("extraLuggage")}
//                           className="form-checkbox text-blue-600"
//                         />
//                         <span className="text-gray-600">Extra Luggage (₹300)</span>
//                       </label>
//                       <label className="flex items-center space-x-2">
//                         <input
//                           type="checkbox"
//                           checked={extras.childSeat}
//                           onChange={() => handleExtraChange("childSeat")}
//                           className="form-checkbox text-blue-600"
//                         />
//                         <span className="text-gray-600">Child Seat (₹400)</span>
//                       </label>
//                     </div>
//                   </div>

//                   {/* Driver Details Section (Visible only when additionalDriver is selected) */}
//                   {extras.additionalDriver && (
//                     <div className="bg-gray-100 p-4 rounded-lg mb-4">
//                       <h4 className="text-lg font-semibold text-gray-800 mb-3">Driver Details</h4>
//                       <p className="text-gray-600">
//                         <strong>Name:</strong> [Enter Driver Name]
//                       </p>
//                       <p className="text-gray-600">
//                         <strong>License Number:</strong> [Enter License Number]
//                       </p>
//                       <p className="text-gray-600">
//                         <strong>Contact:</strong> [Enter Contact Number]
//                       </p>
//                       {/* Add input fields or logic as needed for dynamic driver details */}
//                     </div>
//                   )}

//                   {/* Policy Terms */}
//                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
//                     <h4 className="text-lg font-semibold text-gray-800 mb-3">Policy Terms</h4>
//                     <p className="text-gray-600">
//                       - Vehicle must be returned with a full tank of fuel.
//                       <br />- Any damage to the vehicle will incur additional charges.
//                       <br />- Rental period cannot exceed 30 days without prior approval.
//                     </p>
//                   </div>

//                   {/* Cancellation Policy */}
//                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
//                     <h4 className="text-lg font-semibold text-gray-800 mb-3">Cancellation Policy</h4>
//                     <p className="text-gray-600">
//                       - Free cancellation up to 48 hours before pickup.
//                       <br />- 50% refund if cancelled within 24-48 hours.
//                       <br />- No refund if cancelled within 24 hours.
//                     </p>
//                   </div>

//                   {/* Terms and Conditions Checkbox */}
//                   <div className="mb-6">
//                     <label className="flex items-center space-x-2">
//                       <input
//                         type="checkbox"
//                         checked={termsAccepted}
//                         onChange={(e) => setTermsAccepted(e.target.checked)}
//                         className="form-checkbox text-blue-600"
//                       />
//                       <span className="text-gray-600">
//                         I agree to the <a href="#" className="text-blue-600 underline">Terms and Conditions</a>
//                       </span>
//                     </label>
//                   </div>

//                   {/* Confirm Booking Button (Bottom-right corner) */}
//                   <div className="fixed bottom-6 right-6 md:static md:mt-auto">
//                     <button
//                       onClick={handlePayment}
//                       className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ${!termsAccepted ? 'opacity-50 cursor-not-allowed' : ''}`}
//                       disabled={!termsAccepted}
//                     >
//                       Confirm Booking
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default CarConfirmation;




import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  FaUserFriends,
  FaSuitcase,
  FaCogs,
  FaMapMarkerAlt,
  FaStar,
  FaTimes,
} from "react-icons/fa";
import Footer from "./Footer";

// Load Stripe with your public key
const stripePromise = loadStripe("pk_test_51RBq3dPlQbJhRZQuFznwHLWQKdYK7o6ZMRPcykMQJrVT4goDZs056Fjkac47TTzEiuyg0P06VsPQPESvM8fY8MlX00ARWblp0v");

const CarConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    pickupDate,
    pickupTime,
    dropoffDate,
    dropoffTime,
    pickupLocation,
    car = {},
    selectedDeal = {},
  } = location.state || {};
  const [carData, setCarData] = useState(car || {});
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [extras, setExtras] = useState({
    additionalDriver: false,
    extraLuggage: false,
    childSeat: false,
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const EXTRA_PRICES = {
    additionalDriver: 500,
    extraLuggage: 300,
    childSeat: 400,
  };

  useEffect(() => {
    const calculatePrice = () => {
      if (!pickupDate || !pickupTime || !dropoffDate || !dropoffTime || !pickupLocation || !selectedDeal?.price) {
        setTotalPrice(0);
        return;
      }
      const pickup = new Date(`${pickupDate}T${pickupTime}`);
      const dropoff = new Date(`${dropoffDate}T${dropoffTime}`);
      if (isNaN(pickup.getTime()) || isNaN(dropoff.getTime()) || pickup >= dropoff) {
        setTotalPrice(0);
        return;
      }
      const calculatedHours = Math.max(1, Math.ceil((dropoff - pickup) / (1000 * 60 * 60)));
      const basePrice = calculatedHours * selectedDeal.price;
      const extraCost = (extras.additionalDriver ? EXTRA_PRICES.additionalDriver : 0) +
                        (extras.extraLuggage ? EXTRA_PRICES.extraLuggage : 0) +
                        (extras.childSeat ? EXTRA_PRICES.childSeat : 0);
      setTotalPrice(basePrice + extraCost);
    };
    calculatePrice();
    setLoading(false);
  }, [pickupDate, pickupTime, dropoffDate, dropoffTime, pickupLocation, selectedDeal, extras]);

  const handlePayment = async () => {
    if (!totalPrice || totalPrice <= 0 || !termsAccepted) return;

    // Store booking details in localStorage before payment
    const bookingData = {
      pickupLocation,
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
      car: carData,
      selectedDeal,
      extras,
    };
    localStorage.setItem('lastBooking', JSON.stringify(bookingData));

    const stripe = await stripePromise;
    try {
      const response = await axios.post("http://localhost:5001/create-checkout-session", {
        amount: totalPrice * 100,
        pickupLocation,
        pickupDate,
        pickupTime,
        dropoffDate,
        dropoffTime,
        carId: carData.id,
        carMake: carData.make,
        carModel: carData.model,
        agency: selectedDeal.agency,
        extras,
      });
      const { id: sessionId } = response.data;
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Payment error:", error);
      localStorage.removeItem('lastBooking'); // Clean up on error
    }
  };

  const handleExtraChange = (extra) => {
    setExtras((prev) => ({ ...prev, [extra]: !prev[extra] }));
  };

  const handleClose = () => navigate(-1);

  if (loading) return <div className="text-center py-10 text-gray-800">Loading...</div>;
  if (!carData || !selectedDeal) return <div className="text-center py-10 text-gray-800">Car or deal not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-6 sm:py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">Confirm Your Booking</h2>
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 md:w-1/3 md:sticky md:top-20 h-auto md:h-screen overflow-y-visible shadow-lg">
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Booking Details</h4>
              <p className="text-gray-600"><strong>Location:</strong> {pickupLocation || "N/A"}</p>
              <p className="text-gray-600"><strong>Pickup Date & Time:</strong> {pickupDate && pickupTime ? `${pickupDate} ${pickupTime}` : "N/A"}</p>
              <p className="text-gray-600"><strong>Dropoff Date & Time:</strong> {dropoffDate && dropoffTime ? `${dropoffDate} ${dropoffTime}` : "N/A"}</p>
            </div>
            <div className="mt-6 border-t pt-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Price Breakdown</h4>
              <p className="text-gray-600">Rental Cost: ₹{totalPrice.toLocaleString()}</p>
              <p className="text-gray-600">Extras: ₹{[
                extras.additionalDriver && EXTRA_PRICES.additionalDriver,
                extras.extraLuggage && EXTRA_PRICES.extraLuggage,
                extras.childSeat && EXTRA_PRICES.childSeat,
              ].filter(Boolean).reduce((sum, price) => sum + price, 0).toLocaleString() || "0"}</p>
              <p className="text-2xl font-bold text-gray-800 mt-4">Total: ₹{totalPrice.toLocaleString()}</p>
            </div>
          </div>
          <main className="w-full md:w-2/3">
            <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"><FaTimes size={20} /></button>
            <div className="p-6">
              <div className="flex flex-col gap-6">
                <div className="w-full">
                  <div className="flex items-center space-x-3 mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{carData.make || "Unknown"} {carData.model || "Model"}</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{carData.type || "N/A"}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-gray-600"><FaUserFriends size={14} /><span className="text-sm">{carData.passengers || "N/A"} Passengers</span></div>
                    <div className="flex items-center space-x-2 text-gray-600"><FaSuitcase size={14} /><span className="text-sm">4 Luggage</span></div>
                    <div className="flex items-center space-x-2 text-gray-600"><FaCogs size={14} /><span className="text-sm">{carData.transmission || "N/A"}</span></div>
                    <div className="flex items-center space-x-2 text-gray-600"><FaMapMarkerAlt size={14} /><span className="text-sm">Unlimited Mileage</span></div>
                    <div className="flex items-center space-x-2 text-gray-600"><FaStar size={14} className="text-yellow-400" /><span className="text-sm">{carData.ratings || "N/A"}/5</span></div>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <p className="text-gray-800 font-semibold">Agency: {selectedDeal.agency || "N/A"}</p>
                    <p className="text-gray-600">Fuel Policy: {carData.fuel_policy || "N/A"}</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Extras</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2"><input type="checkbox" checked={extras.additionalDriver} onChange={() => handleExtraChange("additionalDriver")} className="form-checkbox text-blue-600" /><span className="text-gray-600">Additional Driver (₹500)</span></label>
                      <label className="flex items-center space-x-2"><input type="checkbox" checked={extras.extraLuggage} onChange={() => handleExtraChange("extraLuggage")} className="form-checkbox text-blue-600" /><span className="text-gray-600">Extra Luggage (₹300)</span></label>
                      <label className="flex items-center space-x-2"><input type="checkbox" checked={extras.childSeat} onChange={() => handleExtraChange("childSeat")} className="form-checkbox text-blue-600" /><span className="text-gray-600">Child Seat (₹400)</span></label>
                    </div>
                  </div>
                  {extras.additionalDriver && <div className="bg-gray-100 p-4 rounded-lg mb-4"><h4 className="text-lg font-semibold text-gray-800 mb-3">Driver Details</h4><p className="text-gray-600"><strong>Name:</strong> [Enter Driver Name]</p><p className="text-gray-600"><strong>License Number:</strong> [Enter License Number]</p><p className="text-gray-600"><strong>Contact:</strong> [Enter Contact Number]</p></div>}
                  <div className="bg-gray-100 p-4 rounded-lg mb-4"><h4 className="text-lg font-semibold text-gray-800 mb-3">Policy Terms</h4><p className="text-gray-600">- Vehicle must be returned with a full tank of fuel.<br />- Any damage to the vehicle will incur additional charges.<br />- Rental period cannot exceed 30 days without prior approval.</p></div>
                  <div className="bg-gray-100 p-4 rounded-lg mb-4"><h4 className="text-lg font-semibold text-gray-800 mb-3">Cancellation Policy</h4><p className="text-gray-600">- Free cancellation up to 48 hours before pickup.<br />- 50% refund if cancelled within 24-48 hours.<br />- No refund if cancelled within 24 hours.</p></div>
                  <div className="mb-6"><label className="flex items-center space-x-2"><input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="form-checkbox text-blue-600" /><span className="text-gray-600">I agree to the <a href="#" className="text-blue-600 underline">Terms and Conditions</a></span></label></div>
                  <div className="fixed bottom-6 right-6 md:static md:mt-auto"><button onClick={handlePayment} className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ${!termsAccepted ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!termsAccepted}>Confirm Booking</button></div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CarConfirmation;