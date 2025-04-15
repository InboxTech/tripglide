import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// import queryString from 'query-string';

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