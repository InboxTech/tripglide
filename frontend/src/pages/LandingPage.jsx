import React, { useState, useEffect } from "react";
import { ArrowLeftRight } from "lucide-react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import TravelersCabinClass from "./TravelersCabinClass";

const images = [
  "/images/samuel-ferrara-1527pjeb6jg-unsplash.jpg",
  "/images/daniel-leone-g30P1zcOzXo-unsplash.jpg",
  "/images/benjamin-voros-phIFdC6lA4E-unsplash.jpg",
  "/images/kalen-emsley-Bkci_8qcdvQ-unsplash.jpg",
];

const FlightSearch = () => {
  // State for flights data, loading, and error
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for form selections
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [currentImage, setCurrentImage] = useState(0);

  // Fetch flight data from Flask API
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/") // Flask API URL
      .then((response) => {
        setFlights(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching data");
        setLoading(false);
      });
  }, []);

  // Handle the "From" city selection
  const handleFromChange = (event) => {
    setFrom(event.target.value);
  };

  // Handle the "To" city selection
  const handleToChange = (event) => {
    setTo(event.target.value);
  };

  // Swap "From" and "To" city selections
  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  // Get unique departure and arrival airports
  const departureAirports = [
    ...new Set(flights.map((flight) => flight.departure)),
  ];
  const arrivalAirports = [
    ...new Set(flights.map((flight) => flight.arrival)),
  ];

  // Filter flights based on the selected "from" and "to"
  const filteredFlights = flights.filter(
    (flight) =>
      (from ? flight.departure === from : true) &&
      (to ? flight.arrival === to : true)
  );

  // Change the background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Header />
      <section
        className="px-12 py-10 h-screen bg-cover bg-center flex items-center justify-center pt-20 object-cover"
        style={{
          backgroundImage: `url(${images[currentImage]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          objectFit: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
            Search and Book Flights
          </h1>
          <p className="text-white mb-8 max-w-xl mx-auto">
            <b>Millions of cheap flights. One simple search.</b>
          </p>
        </div>
      </section>

      <form className="bg-gray-300 rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <label className="block text-black mb-1" htmlFor="from">
              From
            </label>
            <input
              list="departure-airports"
              id="from"
              value={from}
              onChange={handleFromChange}
              className="w-full p-3 border rounded"
              placeholder="Type your departure city"
            />
            <datalist className="bg-white" id="departure-airports">
              {loading ? (
                <option className="bg-white">Loading...</option>
              ) : error ? (
                <option>{error}</option>
              ) : (
                departureAirports.map((airport) => (
                  <option key={airport} value={airport}>
                    {airport}
                  </option>
                ))
              )}
            </datalist>
          </div>

          <button
            type="button"
            onClick={handleSwap}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-400 transition mt-6"
          >
            <ArrowLeftRight size={20} />
          </button>

          <div className="flex-1">
            <label className="block text-black mb-1" htmlFor="to">
              To
            </label>
            <input
              list="arrival-airports"
              id="to"
              value={to}
              onChange={handleToChange}
              className="w-full p-3 border rounded"
              placeholder="Type your destination city"
            />
            <datalist id="arrival-airports" className="">
              {loading ? (
                <option>Loading...</option>
              ) : error ? (
                <option>{error}</option>
              ) : (
                arrivalAirports.map((airport) => (
                  <option key={airport} value={airport} className="bg-white">
                    {airport}
                  </option>
                ))
              )}
            </datalist>
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-black mb-1" htmlFor="date">
            Depart
          </label>
          <input
            type="date"
            id="date"
            className="w-full p-3 border rounded cursor-pointer"
            required
          />
        </div>

        <div className="flex-1">
          <label className="block text-black mb-1" htmlFor="date">
            Return
          </label>
          <input
            type="date"
            id="date"
            className="w-full p-3 border rounded cursor-pointer"
            required
          />
        </div>

        {/* Travelers and Cabin Class Dropdown */}
        <TravelersCabinClass />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 mt-6 cursor-pointer"
        >
          Search
        </button>
      </form>

      <section className="px-15 py-18 bg-white">
        <div className="flex justify-center space-x-6 mt-5 mb-8 relative">
          <button
            className="bg-[#031B3D] text-white px-30 py-3 rounded-lg flex items-center space-x-2 shadow-md hover:bg-blue-900 cursor-pointer"
            onClick={() => alert("Hotels clicked!")}
          >
            <span>🏨 Hotels</span>
          </button>
          <button
            className="bg-[#031B3D] text-white px-30 py-3 rounded-lg flex items-center space-x-2 shadow-md hover:bg-blue-900 cursor-pointer"
            onClick={() => alert("Car hire clicked!")}
          >
            <span>🚗 Car hire</span>
          </button>
          <button
            className="bg-[#031B3D] text-white px-30 py-3 rounded-lg flex items-center space-x-2 shadow-md hover:bg-blue-900 cursor-pointer"
            onClick={() => alert("Explore everywhere clicked!")}
          >
            <span>🔍 Explore everywhere</span>
          </button>
        </div>
      </section>

      <hr className="border-blue-900 " />

      <Footer />

      {/* Show flight data only if both "from" and "to" are selected */}
      {from && to ? (
        <div>
          <h3>Available Flights:</h3>
          {filteredFlights.length > 0 ? (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Flight Number</th>
                  <th className="border px-4 py-2">Departure</th>
                  <th className="border px-4 py-2">Arrival</th>
                </tr>
              </thead>
              <tbody>
                {filteredFlights.map((flight) => (
                  <tr key={flight.id}>
                    <td className="border px-4 py-2">{flight.flight_number}</td>
                    <td className="border px-4 py-2">
                      {flight.departure_airport}
                    </td>
                    <td className="border px-4 py-2">
                      {flight.arrival_airport}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No flights available for the selected cities.</p>
          )}
        </div>
      ) : (
        <p>
          Please select both a departure and destination city to view available
          flights.
        </p>
      )}
    </div>
  );
};

export default FlightSearch;
