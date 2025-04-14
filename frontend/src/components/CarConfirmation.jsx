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
} from "react-icons/fa";
import Footer from "./Footer";

// Load Stripe with your public key
const stripePromise = loadStripe("pk_test_51RBqKcHDDYPUff2kicXW3yxLTiL7zsGgfPPFH5LNU4ldUzgnhUZ7tlYMbdKRiDXDZRNQpdk0SguQued56ZP1EqZl00Msnu4Xv6");

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

  // Calculate price based on per-hour rate and duration
  useEffect(() => {
    const calculatePrice = () => {
      console.log("Received state:", {
        pickupDate,
        pickupTime,
        dropoffDate,
        dropoffTime,
        pickupLocation,
        car,
        selectedDeal,
      });

      // Validate all required fields
      if (!pickupDate || !pickupTime || !dropoffDate || !dropoffTime || !pickupLocation || !selectedDeal?.price) {
        console.warn("🚨 Missing required fields or price:", {
          pickupDate,
          pickupTime,
          dropoffDate,
          dropoffTime,
          pickupLocation,
          selectedDeal,
        });
        setTotalPrice(0);
        return;
      }

      // Parse dates using ISO format
      const pickup = new Date(`${pickupDate}T${pickupTime}`);
      const dropoff = new Date(`${dropoffDate}T${dropoffTime}`);

      // Validate date objects
      if (isNaN(pickup.getTime()) || isNaN(dropoff.getTime())) {
        console.warn("❌ Invalid date format:", { pickup, dropoff });
        setTotalPrice(0);
        return;
      }

      // Ensure dropoff is after pickup
      if (pickup >= dropoff) {
        console.warn("❌ Dropoff date must be after pickup date.");
        setTotalPrice(0);
        return;
      }

      // Calculate hours
      const calculatedHours = Math.max(1, Math.ceil((dropoff - pickup) / (1000 * 60 * 60))); // Minimum 1 hour, round up
      const basePrice = calculatedHours * selectedDeal.price;

      // Update state
      setTotalPrice(basePrice);
      console.log("Calculated:", { hours: calculatedHours, totalPrice: basePrice });
    };

    calculatePrice();
    setLoading(false);
  }, [pickupDate, pickupTime, dropoffDate, dropoffTime, pickupLocation, selectedDeal]);

  const handlePayment = async () => {
    if (!totalPrice || totalPrice <= 0) {
      console.warn("Cannot proceed with payment: Total price is zero.");
      return;
    }

    const stripe = await stripePromise;
    try {
      const response = await axios.post("http://localhost:5001/create-checkout-session", {
        amount: totalPrice * 100, // Amount in paise
        currency: "inr",
        pickupLocation: pickupLocation || "N/A",
        pickupDate,
        pickupTime,
        dropoffDate,
        dropoffTime,
        carId: carData.id,
        carMake: carData.make,
        carModel: carData.model,
        agency: selectedDeal.agency,
      });

      const { id: sessionId } = response.data;

      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        console.error("Error redirecting to Stripe checkout:", error);
      }
    } catch (error) {
      console.error("Axios error during payment:", error);
    }
  };

  if (loading) return <div className="text-center py-10 text-gray-800">Loading...</div>;
  if (!carData || !selectedDeal)
    return <div className="text-center py-10 text-gray-800">Car or deal not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Confirm Your Booking</h2>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Booking Details</h4>
                <p className="text-gray-600">
                  <strong>Location:</strong> {pickupLocation || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Pickup Date & Time:</strong> {pickupDate && pickupTime ? `${pickupDate} ${pickupTime}` : "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Dropoff Date & Time:</strong> {dropoffDate && dropoffTime ? `${dropoffDate} ${dropoffTime}` : "N/A"}
                </p>
                <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-3">Price Breakdown</h4>
                <p className="text-gray-600">Rental Cost: ₹{totalPrice.toLocaleString()}</p>
                <p className="text-gray-600">Extras: ₹0</p>
                <p className="text-2xl font-bold text-gray-800">Total: ₹{totalPrice.toLocaleString()}</p>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <img
                    src={carData.image || "https://via.placeholder.com/300x200"}
                    alt={`${carData.make || "Unknown"} ${carData.model || "Model"}`}
                    className="w-full h-48 object-contain rounded-lg bg-gray-50 p-2 mb-4"
                  />
                  <button
                    onClick={() => navigate(-1)}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Back to Search Results
                  </button>
                </div>

                <div className="md:w-1/2">
                  <div className="flex items-center space-x-3 mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {carData.make || "Unknown"} {carData.model || "Model"}
                    </h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {carData.type || "N/A"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FaUserFriends size={14} />
                      <span className="text-sm">{carData.passengers || "N/A"} Passengers</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FaSuitcase size={14} />
                      <span className="text-sm">4 Luggage</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FaCogs size={14} />
                      <span className="text-sm">{carData.transmission || "N/A"}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FaMapMarkerAlt size={14} />
                      <span className="text-sm">Unlimited Mileage</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FaStar size={14} className="text-yellow-400" />
                      <span className="text-sm">{carData.ratings || "N/A"}/5</span>
                    </div>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <p className="text-gray-800 font-semibold">Agency: {selectedDeal.agency || "N/A"}</p>
                    <p className="text-gray-600">Fuel Policy: {carData.fuel_policy || "N/A"}</p>
                  </div>

                  <div className="mt-6 border-t pt-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-800">Total Price</h2>
                      <span className="text-2xl font-bold text-gray-800">₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={handlePayment}
                      className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CarConfirmation;
