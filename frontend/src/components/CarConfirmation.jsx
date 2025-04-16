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

// Load Stripe with public key from environment variable
const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLIC_KEY ||
    "pk_test_51RBq3dPlQbJhRZQumwQFlV6uBA7rekmsFfXhxYG3fyxau7bPHQgoV86IaD5cbhvdM394vHEDKi3KhiqskSxT16Cf00rWlbxKrL"
);

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
  const [error, setError] = useState(null);
  const [extras, setExtras] = useState({
    additionalDriver: false,
    extraLuggage: false,
    childSeat: false,
  });
  const [driverDetails, setDriverDetails] = useState({
    name: "",
    licenseNumber: "",
    contact: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const EXTRA_PRICES = {
    additionalDriver: 500,
    extraLuggage: 300,
    childSeat: 400,
  };

  useEffect(() => {
    const calculatePrice = () => {
      if (
        !pickupDate ||
        !pickupTime ||
        !dropoffDate ||
        !dropoffTime ||
        !pickupLocation ||
        !selectedDeal?.price
      ) {
        setTotalPrice(0);
        setError("Missing booking details");
        return;
      }

      const pickup = new Date(`${pickupDate}T${pickupTime}`);
      const dropoff = new Date(`${dropoffDate}T${dropoffTime}`);

      if (
        isNaN(pickup.getTime()) ||
        isNaN(dropoff.getTime()) ||
        pickup >= dropoff
      ) {
        setTotalPrice(0);
        setError("Invalid date or time");
        return;
      }

      const calculatedHours = Math.max(
        1,
        Math.ceil((dropoff - pickup) / (1000 * 60 * 60))
      );
      const basePrice = calculatedHours * selectedDeal.price;
      const extraCost =
        (extras.additionalDriver ? EXTRA_PRICES.additionalDriver : 0) +
        (extras.extraLuggage ? EXTRA_PRICES.extraLuggage : 0) +
        (extras.childSeat ? EXTRA_PRICES.childSeat : 0);

      setTotalPrice(basePrice + extraCost);
      setError(null);
    };

    calculatePrice();
    setLoading(false);
  }, [
    pickupDate,
    pickupTime,
    dropoffDate,
    dropoffTime,
    pickupLocation,
    selectedDeal,
    extras,
  ]);

  const handlePayment = async () => {
    if (!totalPrice || totalPrice <= 0 || !termsAccepted) {
      setError("Please accept terms and ensure valid booking details");
      return;
    }

    if (extras.additionalDriver && (!driverDetails.name || !driverDetails.licenseNumber || !driverDetails.contact)) {
      setError("Please provide all driver details");
      return;
    }

    // Store booking details in localStorage
    const bookingData = {
      pickupLocation,
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
      car: carData,
      selectedDeal,
      extras,
      driverDetails,
    };

    try {
      localStorage.setItem("lastBooking", JSON.stringify(bookingData));
    } catch (e) {
      console.error("localStorage error:", e);
      setError("Failed to save booking data");
      return;
    }

    const stripe = await stripePromise;
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL || "http://localhost:5001/create-checkout-session",
        {
          amount: totalPrice * 100, // Convert to cents
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
          driverDetails,
        }
      );
      const { id: sessionId } = response.data;
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Payment error:", error);
      setError("Payment initiation failed. Please try again.");
      localStorage.removeItem("lastBooking");
    }
  };

  const handleExtraChange = (extra) => {
    setExtras((prev) => ({ ...prev, [extra]: !prev[extra] }));
  };

  const handleDriverDetailsChange = (field, value) => {
    setDriverDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleClose = () => navigate(-1);

  if (loading) {
    return <div className="text-center py-10 text-gray-800">Loading...</div>;
  }

  if (!carData.id || !selectedDeal.agency || !selectedDeal.price) {
    return (
      <div className="text-center py-10 text-gray-800">
        Invalid booking details. Please try again.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-6 sm:py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
          Confirm Your Booking
        </h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 md:w-1/3 md:sticky md:top-20 h-auto md:h-screen overflow-y-visible shadow-lg">
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Booking Details
              </h4>
              <p className="text-gray-600">
                <strong>Location:</strong> {pickupLocation || "N/A"}
              </p>
              <p className="text-gray-600">
                <strong>Pickup Date & Time:</strong>{" "}
                {pickupDate && pickupTime ? `${pickupDate} ${pickupTime}` : "N/A"}
              </p>
              <p className="text-gray-600">
                <strong>Dropoff Date & Time:</strong>{" "}
                {dropoffDate && dropoffTime
                  ? `${dropoffDate} ${dropoffTime}`
                  : "N/A"}
              </p>
            </div>
            <div className="mt-6 border-t pt-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Price Breakdown
              </h4>
              <p className="text-gray-600">
                Rental Cost: ₹{totalPrice.toLocaleString()}
              </p>
              <p className="text-gray-600">
                Extras: ₹
                {[
                  extras.additionalDriver && EXTRA_PRICES.additionalDriver,
                  extras.extraLuggage && EXTRA_PRICES.extraLuggage,
                  extras.childSeat && EXTRA_PRICES.childSeat,
                ]
                  .filter(Boolean)
                  .reduce((sum, price) => sum + price, 0)
                  .toLocaleString() || "0"}
              </p>
              <p className="text-2xl font-bold text-gray-800 mt-4">
                Total: ₹{totalPrice.toLocaleString()}
              </p>
            </div>
          </div>
          <main className="w-full md:w-2/3">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes size={20} />
            </button>
            <div className="p-6">
              <div className="flex flex-col gap-6">
                <div className="w-full">
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
                      <span className="text-sm">
                        {carData.passengers || "N/A"} Passengers
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FaSuitcase size={14} />
                      <span className="text-sm">4 Luggage</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FaCogs size={14} />
                      <span className="text-sm">
                        {carData.transmission || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FaMapMarkerAlt size={14} />
                      <span className="text-sm">Unlimited Mileage</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FaStar size={14} className="text-yellow-400" />
                      <span className="text-sm">
                        {carData.ratings || "N/A"}/5
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <p className="text-gray-800 font-semibold">
                      Agency: {selectedDeal.agency || "N/A"}
                    </p>
                    <p className="text-gray-600">
                      Fuel Policy: {selectedDeal.fuelPolicy || "N/A"}
                    </p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      Extras
                    </h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={extras.additionalDriver}
                          onChange={() => handleExtraChange("additionalDriver")}
                          className="form-checkbox text-blue-600"
                        />
                        <span className="text-gray-600">
                          Additional Driver (₹500)
                        </span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={extras.extraLuggage}
                          onChange={() => handleExtraChange("extraLuggage")}
                          className="form-checkbox text-blue-600"
                        />
                        <span className="text-gray-600">
                          Extra Luggage (₹300)
                        </span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={extras.childSeat}
                          onChange={() => handleExtraChange("childSeat")}
                          className="form-checkbox text-blue-600"
                        />
                        <span className="text-gray-600">Child Seat (₹400)</span>
                      </label>
                    </div>
                  </div>
                  {extras.additionalDriver && (
                    <div className="bg-gray-100 p-4 rounded-lg mb-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">
                        Driver Details
                      </h4>
                      <div className="space-y-2">
                        <div>
                          <label className="text-gray-600">Name</label>
                          <input
                            type="text"
                            value={driverDetails.name}
                            onChange={(e) =>
                              handleDriverDetailsChange("name", e.target.value)
                            }
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter driver name"
                          />
                        </div>
                        <div>
                          <label className="text-gray-600">License Number</label>
                          <input
                            type="text"
                            value={driverDetails.licenseNumber}
                            onChange={(e) =>
                              handleDriverDetailsChange(
                                "licenseNumber",
                                e.target.value
                              )
                            }
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter license number"
                          />
                        </div>
                        <div>
                          <label className="text-gray-600">Contact</label>
                          <input
                            type="text"
                            value={driverDetails.contact}
                            onChange={(e) =>
                              handleDriverDetailsChange("contact", e.target.value)
                            }
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter contact number"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      Policy Terms
                    </h4>
                    <p className="text-gray-600">
                      - Vehicle must be returned with a full tank of fuel.
                      <br />
                      - Any damage to the vehicle will incur additional charges.
                      <br />
                      - Rental period cannot exceed 30 days without prior
                      approval.
                    </p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      Cancellation Policy
                    </h4>
                    <p className="text-gray-600">
                      - Free cancellation up to 48 hours before pickup.
                      <br />
                      - 50% refund if cancelled within 24-48 hours.
                      <br />
                      - No refund if cancelled within 24 hours.
                    </p>
                  </div>
                  <div className="mb-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="form-checkbox text-blue-600"
                      />
                      <span className="text-gray-600">
                        I agree to the{" "}
                        <a href="#" className="text-blue-600 underline">
                          Terms and Conditions
                        </a>
                      </span>
                    </label>
                  </div>
                  <div className="fixed bottom-6 right-6 md:static md:mt-auto">
                    <button
                      onClick={handlePayment}
                      className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ${
                        !termsAccepted ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={!termsAccepted}
                    >
                      Confirm Booking
                    </button>
                  </div>
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