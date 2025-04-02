import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTimes, FaCheckCircle, FaTimesCircle, FaSuitcaseRolling, FaChair, FaUtensils } from "react-icons/fa";

const FlightCart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedFlight, searchParams } = location.state || {};

  console.log("FlightCart location.state:", location.state); // Debug log

  const [selectedFare, setSelectedFare] = useState(null);

  if (!selectedFlight || !selectedFlight.price) {
    return <div className="p-4 text-center">No valid flight selected. Please go back and select a flight.</div>;
  }

  const { tripType, from, to, departDate, returnDate, multiCityFlights } = searchParams || {};
  const firstLeg = tripType === "multicity" ? selectedFlight.multiCityFlights?.[0] : selectedFlight;

  let flightSummary = "";
  if (tripType === "multicity" && multiCityFlights) {
    flightSummary = multiCityFlights
      .map((flight) => `${flight.from} → ${flight.to} • ${flight.depart}`)
      .join(" | ");
  } else if (tripType === "return") {
    flightSummary = `${from} → ${to} • ${departDate} - ${returnDate}`; // Explicitly include returnDate
  } else if (tripType === "oneway") {
    flightSummary = `${from} → ${to} • ${departDate}`;
  }

  const fareOptions = [
    {
      type: "Saver",
      price: selectedFlight.price - 1500,
      baggage: {
        cabin: "7 Kgs Cabin Baggage",
        checkIn: "15 Kgs Check-in Baggage",
      },
      flexibility: {
        refund: "No refund on Cancellation",
        dateChange: `Date Change fee starts at ₹ 3,250 (up to 4 days before departure)`,
      },
      seatsMeals: {
        seats: "Chargeable Seats",
        meals: "Chargeable Meals",
      },
    },
    {
      type: "Flexi",
      price: selectedFlight.price + 500,
      baggage: {
        cabin: "7 Kgs Cabin Baggage",
        checkIn: "15 Kgs Check-in Baggage",
      },
      flexibility: {
        refund: "Cancellation fee starts at ₹ 4,139 (up to 4 days before departure)",
        dateChange: `Lower Date Change fee ₹ 299 (up to 4 days before departure)`,
      },
      seatsMeals: {
        seats: "Free Seats",
        meals: "Complimentary Meals",
      },
    },
    {
      type: "Light",
      price: selectedFlight.price - 1250,
      baggage: {
        cabin: "12 Kgs Cabin Baggage",
        checkIn: "23 Kgs (1 Piece x 23 Kgs) Check-in Baggage",
      },
      flexibility: {
        refund: "No refund on Cancellation",
        dateChange: `Date Change fee starts at ₹ 3,111`,
      },
      seatsMeals: {
        seats: "Seat information not available",
        meals: "Meals information not available",
      },
    },
    {
      type: "Standard",
      price: selectedFlight.price,
      baggage: {
        cabin: "12 Kgs Cabin Baggage",
        checkIn: "46 Kgs (2 Pieces x 23 Kgs) Check-in Baggage",
      },
      flexibility: {
        refund: "No refund on Cancellation",
        dateChange: `Date Change fee starts at ₹ 4,111`,
      },
      seatsMeals: {
        seats: "Seat information not available",
        meals: "Meals information not available",
      },
    },
  ];

  // Set default fare on mount only
  useEffect(() => {
    if (!selectedFare) {
      setSelectedFare(fareOptions.find((fare) => fare.type === "Standard"));
    }
  }, []); // Empty dependency array to run only on mount

  const handleSelectFare = (fare) => {
    setSelectedFare(fare);
  };

  const handleBookNow = () => {
    if (selectedFare) {
      console.log(`Booking flight with fare: ${selectedFare.type}, price: ₹${selectedFare.price}`);
      // Add your booking logic here
    }
  };

  // Navigate back while preserving the state
  const handleGoBack = () => {
    console.log("handleGoBack called, navigating back with state:", location.state); // Debug log
    navigate(-1, {
      state: {
        selectedFlight,
        searchParams: {
          tripType,
          from,
          to,
          departDate,
          returnDate,
          multiCityFlights,
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl relative">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center space-x-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">TRIP TYPE</span>
            <span className="text-sm font-medium">
              {tripType === "oneway" ? "One Way" : tripType === "return" ? "Return" : "Multi-city"}
            </span>
          </div>
          <button
            onClick={handleGoBack}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {tripType === "multicity" && selectedFlight.multiCityFlights ? (
          selectedFlight.multiCityFlights.map((leg, index) => (
            <div key={index} className="p-4 border-b">
              <h3 className="text-lg font-semibold">
                {leg.departure} → {leg.arrival} • {leg.airline} • {leg.departureDate} • Departure at {leg.departureTime} - Arrival at {leg.arrivalTime}
              </h3>
            </div>
          ))
        ) : tripType === "return" && selectedFlight.returnFlight ? (
          <>
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">
                Outbound: {firstLeg.departure} → {firstLeg.arrival} • {firstLeg.airline} • {departDate} • Departure at {firstLeg.departureTime} - Arrival at {firstLeg.arrivalTime}
              </h3>
            </div>
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">
                Return: {selectedFlight.returnFlight.departure} → {selectedFlight.returnFlight.arrival} • {selectedFlight.returnFlight.airline} • {returnDate} • Departure at {selectedFlight.returnFlight.departureTime} - Arrival at {selectedFlight.returnFlight.arrivalTime}
              </h3>
            </div>
          </>
        ) : (
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">
              {firstLeg.departure} → {firstLeg.arrival} • {firstLeg.airline} • {departDate} • Departure at {firstLeg.departureTime} - Arrival at {firstLeg.arrivalTime}
            </h3>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {fareOptions.map((fare, index) => (
            <div
              key={index}
              onClick={() => handleSelectFare(fare)}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedFare?.type === fare.type ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full border-2 border-blue-600 flex items-center justify-center">
                    <div className={selectedFare?.type === fare.type ? "w-4 h-4 bg-blue-600 rounded-full" : ""}></div>
                  </div>
                  <h4 className="text-lg font-semibold">{fare.type.toUpperCase()}</h4>
                </div>
                <p className="text-lg font-bold">₹ {fare.price.toLocaleString()} <span className="text-sm font-normal">per adult</span></p>
              </div>

              <div className="mb-4">
                <h5 className="font-medium mb-2">Baggage</h5>
                <p className="text-sm flex items-center">
                  <FaSuitcaseRolling className="text-green-500 mr-2" />
                  {fare.baggage.cabin}
                </p>
                <p className="text-sm flex items-center">
                  <FaSuitcaseRolling className="text-green-500 mr-2" />
                  {fare.baggage.checkIn}
                </p>
              </div>

              <div className="mb-4">
                <h5 className="font-medium mb-2">Flexibility</h5>
                <p className="text-sm flex items-center">
                  {fare.flexibility.refund.includes("No refund") ? (
                    <FaTimesCircle className="text-red-500 mr-2" />
                  ) : (
                    <FaCheckCircle className="text-green-500 mr-2" />
                  )}
                  {fare.flexibility.refund}
                </p>
                <p className="text-sm flex items-center">
                  <FaCheckCircle className="text-yellow-500 mr-2" />
                  {fare.flexibility.dateChange}
                </p>
              </div>

              <div>
                <h5 className="font-medium mb-2">Seats, Meals & More</h5>
                <p className="text-sm flex items-center">
                  {fare.seatsMeals.seats.includes("Free") ? (
                    <FaChair className="text-green-500 mr-2" />
                  ) : fare.seatsMeals.seats.includes("Chargeable") ? (
                    <FaChair className="text-yellow-500 mr-2" />
                  ) : (
                    <FaTimesCircle className="text-red-500 mr-2" />
                  )}
                  {fare.seatsMeals.seats}
                </p>
                <p className="text-sm flex items-center">
                  {fare.seatsMeals.meals.includes("Complimentary") ? (
                    <FaUtensils className="text-green-500 mr-2" />
                  ) : fare.seatsMeals.meals.includes("Chargeable") ? (
                    <FaUtensils className="text-yellow-500 mr-2" />
                  ) : (
                    <FaTimesCircle className="text-red-500 mr-2" />
                  )}
                  {fare.seatsMeals.meals}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center p-4 border-t">
          <p className="text-xl font-bold">
            ₹ {selectedFare ? selectedFare.price.toLocaleString() : selectedFlight.price.toLocaleString()}{" "}
            <span className="text-sm font-normal">FOR 1 ADULT</span>
          </p>
          <div>
            <button
              onClick={handleBookNow}
              className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-blue-700"
            >
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCart;