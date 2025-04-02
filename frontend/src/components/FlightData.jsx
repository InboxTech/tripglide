import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlightFilters from "./FlightFilters";
import FlightCards from "./FlightCards";
import FlightSearchFormPopup from "./FlightSearchFormPopup";
import Footer from "./Footer";
import { FaSearch, FaFilter } from "react-icons/fa";

const FlightData = ({
  allFlights,
  setAllFlights,
  tripType,
  setTripType,
  returnDate,
  setReturnDate,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialSearchParams = location.state || {};
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [from, setFrom] = useState(initialSearchParams.from || "");
  const [to, setTo] = useState(initialSearchParams.to || "");
  const [departDate, setDepartDate] = useState(initialSearchParams.departDate || "");
  const [cabinClass, setCabinClass] = useState(initialSearchParams.cabinClass || "Economy");
  const [filteredFlights, setFilteredFlights] = useState(allFlights);
  const [selectedFilter, setSelectedFilter] = useState("best");
  const [expandedFlightId, setExpandedFlightId] = useState(null);

  useEffect(() => {
    if (location.state) {
      setTripType(location.state.tripType || "oneway");
      setFrom(location.state.from || "");
      setTo(location.state.to || "");
      setDepartDate(location.state.departDate || "");
      setReturnDate(location.state.returnDate || "");
      setCabinClass(location.state.cabinClass || "Economy");
    }
  }, [location.state, setTripType, setReturnDate]);

  useEffect(() => {
    let results = [...allFlights];
    if (tripType === "return" && from && to) {
      results = results.map((flight) => ({
        ...flight, // Preserve existing properties like isFavorite
        departure: from,
        arrival: to,
        departureDate: departDate || flight.departureDate,
        returnFlight: flight.returnFlight || { // Only add if not already present
          ...flight,
          departure: to,
          arrival: from,
          departureDate: returnDate || flight.departureDate,
          departureTime: "14:00",
          arrivalTime: "16:15",
          duration: flight.duration, // Ensure consistency
          stops: flight.stops,
          stopCities: flight.stopCities,
        },
      }));
    } else if (tripType === "oneway" && from && to) {
      results = results.map((flight) => ({
        ...flight,
        departure: from,
        arrival: to,
        departureDate: departDate || flight.departureDate,
      }));
    }
    setFilteredFlights(results);
  }, [tripType, from, to, departDate, returnDate, allFlights]);

  const handleSearch = (e) => {
    e.preventDefault();
    let results = [...allFlights];
    if (tripType === "return" && from && to) {
      results = results.map((flight) => ({
        ...flight,
        departure: from,
        arrival: to,
        departureDate: departDate || flight.departureDate,
        returnFlight: flight.returnFlight || {
          ...flight,
          departure: to,
          arrival: from,
          departureDate: returnDate || flight.departureDate,
          departureTime: "14:00",
          arrivalTime: "16:15",
          duration: flight.duration,
          stops: flight.stops,
          stopCities: flight.stopCities,
        },
      }));
    } else if (tripType === "oneway" && from && to) {
      results = results.map((flight) => ({
        ...flight,
        departure: from,
        arrival: to,
        departureDate: departDate || flight.departureDate,
      }));
    }
    setAllFlights(results); // Update allFlights with returnFlight
    setFilteredFlights(results);
    navigate("/search-results", { state: { tripType, from, to, departDate, returnDate, cabinClass } });
  };

  const toggleFavorite = (flightId) => {
    const updatedFlights = allFlights.map((flight) =>
      flight.id === flightId
        ? {
            ...flight,
            isFavorite: !flight.isFavorite,
            returnFlight: flight.returnFlight || (tripType === "return" && from && to
              ? {
                  ...flight,
                  departure: to,
                  arrival: from,
                  departureDate: returnDate || flight.departureDate,
                  departureTime: "14:00",
                  arrivalTime: "16:15",
                  duration: flight.duration,
                  stops: flight.stops,
                  stopCities: flight.stopCities,
                }
              : undefined),
          }
        : flight
    );
    console.log("FlightData.jsx - Before update - allFlights:", allFlights);
    console.log("FlightData.jsx - Updated flights:", updatedFlights);
    setAllFlights(updatedFlights);
    setFilteredFlights(updatedFlights); // Sync immediately
  };

  // Rest of the component (FlightFilters, FlightCards, etc.) remains unchanged
  return (
    <div className="bg-blue-50 min-h-screen">
      <div className="flex bg-[#06152B] justify-center py-6 px-4">
        <div
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center px-6 py-3 rounded-lg w-full max-w-6xl bg-[#0C1D3D]/100 cursor-pointer hover:bg-[#0C1D3D]/80"
        >
          <FaSearch className="text-blue-500 mr-3" size={18} />
          <p className="text-white text-center text-sm flex-1">
            {from || "From"} → {to || "To"} • {departDate || "Depart"}
            {tripType === "return" && ` - ${returnDate || "Return"}`}
          </p>
        </div>
      </div>

      <FlightSearchFormPopup
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        tripType={tripType}
        from={from}
        to={to}
        departDate={departDate}
        returnDate={returnDate}
        cabinClass={cabinClass}
        setTripType={setTripType}
        setFrom={setFrom}
        setTo={setTo}
        setDepartDate={setDepartDate}
        setReturnDate={setReturnDate}
        setCabinClass={setCabinClass}
        handleSearch={handleSearch}
        departureAirports={["Delhi", "Mumbai"]} // Simplified for demo
        arrivalAirports={["Delhi", "Mumbai"]}
        multiCityFlights={[]}
        setMultiCityFlights={() => {}}
      />

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Flight search results ({filteredFlights.length})</h2>
          <button
            className="flex items-center md:hidden bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <FaFilter className="mr-2" /> Filters
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <FlightFilters
            priceRange={[3000, 6000]}
            setPriceRange={() => {}}
            stopFilter="direct"
            setStopFilter={() => {}}
            timeFilter="all"
            setTimeFilter={() => {}}
            airlinesFilter={[]}
            setAirlinesFilter={() => {}}
            airlines={["IndiGo", "Air India"]}
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
          />
          <FlightCards
            filteredFlights={filteredFlights}
            tripType={tripType}
            returnDate={returnDate}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            expandedFlightId={expandedFlightId}
            setExpandedFlightId={setExpandedFlightId}
            toggleFavorite={toggleFavorite}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FlightData;