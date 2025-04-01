import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FlightFilters from "./FlightFilters";
import FlightCards from "./FlightCards";
import FlightSearchFormPopup from "./FlightSearchFormPopup";
import Header from "./Header";
import Footer from "./Footer";
import { FaSearch, FaFilter } from "react-icons/fa";

// Initial flight data: 15 direct domestic Indian flights
const initialFlightData = [
  {
    id: 1,
    price: 4500,
    departureDate: "2025-04-15",
    cabinClass: "Economy",
    isFavorite: false,
    airline: "IndiGo",
    airlineCode: "6E",
    flightNumber: "231",
    departureTime: "08:00",
    arrivalTime: "10:15",
    duration: "2h 15m",
    stops: 0,
    stopCities: [],
    departure: "Delhi",
    arrival: "Mumbai",
    logo: "https://i.pinimg.com/474x/e9/82/55/e98255f2c1040c38dd2314a6288f1850.jpg",
  },
  {
    id: 2,
    price: 4200,
    departureDate: "2025-04-15",
    cabinClass: "Economy",
    isFavorite: false,
    airline: "Air India",
    airlineCode: "AI",
    flightNumber: "605",
    departureTime: "09:30",
    arrivalTime: "11:15",
    duration: "1h 45m",
    stops: 0,
    stopCities: [],
    departure: "Mumbai",
    arrival: "Bengaluru",
    logo: "https://i.pinimg.com/736x/dd/f1/ce/ddf1ceee59fd228201084a162cbfb48c.jpg",
  },
  {
    id: 3,
    price: 4800,
    departureDate: "2025-04-15",
    cabinClass: "Economy",
    isFavorite: false,
    airline: "SpiceJet",
    airlineCode: "SG",
    flightNumber: "123",
    departureTime: "07:45",
    arrivalTime: "10:30",
    duration: "2h 45m",
    stops: 0,
    stopCities: [],
    departure: "Delhi",
    arrival: "Chennai",
    logo: "https://i.pinimg.com/474x/1f/5c/77/1f5c77cbff120399a8e50b101329a039.jpg",
  },
  {
    id: 4,
    price: 5100,
    departureDate: "2025-04-15",
    cabinClass: "Economy",
    isFavorite: false,
    airline: "Vistara",
    airlineCode: "UK",
    flightNumber: "945",
    departureTime: "12:00",
    arrivalTime: "14:30",
    duration: "2h 30m",
    stops: 0,
    stopCities: [],
    departure: "Bengaluru",
    arrival: "Delhi",
    logo: "https://i.pinimg.com/474x/6b/d3/8c/6bd38cd030c054f5ea2c5d16974d7fbb.jpg",
  },
  {
    id: 5,
    price: 4600,
    departureDate: "2025-04-15",
    cabinClass: "Economy",
    isFavorite: false,
    airline: "Air India",
    airlineCode: "AI",
    flightNumber: "789",
    departureTime: "14:00",
    arrivalTime: "16:20",
    duration: "2h 20m",
    stops: 0,
    stopCities: [],
    departure: "Kolkata",
    arrival: "Delhi",
    logo: "https://i.pinimg.com/736x/dd/f1/ce/ddf1ceee59fd228201084a162cbfb48c.jpg",
  },
  {
    id: 6,
    price: 3500,
    departureDate: "2025-04-15",
    cabinClass: "Economy",
    isFavorite: false,
    airline: "IndiGo",
    airlineCode: "6E",
    flightNumber: "456",
    departureTime: "06:30",
    arrivalTime: "07:45",
    duration: "1h 15m",
    stops: 0,
    stopCities: [],
    departure: "Chennai",
    arrival: "Hyderabad",
    logo: "https://i.pinimg.com/474x/e9/82/55/e98255f2c1040c38dd2314a6288f1850.jpg",
  },
  {
    id: 7,
    price: 3200,
    departureDate: "2025-04-15",
    cabinClass: "Economy",
    isFavorite: false,
    airline: "SpiceJet",
    airlineCode: "SG",
    flightNumber: "789",
    departureTime: "11:00",
    arrivalTime: "12:15",
    duration: "1h 15m",
    stops: 0,
    stopCities: [],
    departure: "Mumbai",
    arrival: "Goa",
    logo: "https://i.pinimg.com/474x/1f/5c/77/1f5c77cbff120399a8e50b101329a039.jpg",
  },
  {
    id: 8,
    price: 3900,
    departureDate: "2025-04-15",
    cabinClass: "Economy",
    isFavorite: false,
    airline: "Vistara",
    airlineCode: "UK",
    flightNumber: "821",
    departureTime: "15:30",
    arrivalTime: "17:00",
    duration: "1h 30m",
    stops: 0,
    stopCities: [],
    departure: "Delhi",
    arrival: "Ahmedabad",
    logo: "https://i.pinimg.com/474x/6b/d3/8c/6bd38cd030c054f5ea2c5d16974d7fbb.jpg",
  },
  {
    id: 9,
    price: 3400,
    departureDate: "2025-04-15",
    cabinClass: "Economy",
    isFavorite: false,
    airline: "IndiGo",
    airlineCode: "6E",
    flightNumber: "987",
    departureTime: "13:00",
    arrivalTime: "14:10",
    duration: "1h 10m",
    stops: 0,
    stopCities: [],
    departure: "Hyderabad",
    arrival: "Bengaluru",
    logo: "https://i.pinimg.com/474x/e9/82/55/e98255f2c1040c38dd2314a6288f1850.jpg",
  },
  {
    id: 10,
    price: 4700,
    departureDate: "2025-04-15",
    cabinClass: "Economy",
    isFavorite: false,
    airline: "Air India",
    airlineCode: "AI",
    flightNumber: "543",
    departureTime: "17:00",
    arrivalTime: "19:15",
    duration: "2h 15m",
    stops: 0,
    stopCities: [],
    departure: "Delhi",
    arrival: "Kolkata",
    logo: "https://i.pinimg.com/736x/dd/f1/ce/ddf1ceee59fd228201084a162cbfb48c.jpg",
  },
  {
    id: 11,
    price: 3000,
    departureDate: "2025-04-15",
    cabinClass: "Economy",
    isFavorite: false,
    airline: "SpiceJet",
    airlineCode: "SG",
    flightNumber: "654",
    departureTime: "08:15",
    arrivalTime: "09:10",
    duration: "55m",
    stops: 0,
    stopCities: [],
    departure: "Bengaluru",
    arrival: "Chennai",
    logo: "https://i.pinimg.com/474x/1f/5c/77/1f5c77cbff120399a8e50b101329a039.jpg",
  },
  {
    id: 12,
    price: 4900,
    departureDate: "2025-04-15",
    cabinClass: "Economy",
    isFavorite: false,
    airline: "Vistara",
    airlineCode: "UK",
    flightNumber: "673",
    departureTime: "19:00",
    arrivalTime: "21:15",
    duration: "2h 15m",
    stops: 0,
    stopCities: [],
    departure: "Mumbai",
    arrival: "Delhi",
    logo: "https://i.pinimg.com/474x/6b/d3/8c/6bd38cd030c054f5ea2c5d16974d7fbb.jpg",
  },
  {
    id: 13,
    price: 4300,
    departureDate: "2025-04-15",
    cabinClass: "Economy",
    isFavorite: false,
    airline: "IndiGo",
    airlineCode: "6E",
    flightNumber: "741",
    departureTime: "10:00",
    arrivalTime: "12:10",
    duration: "2h 10m",
    stops: 0,
    stopCities: [],
    departure: "Pune",
    arrival: "Delhi",
    logo: "https://i.pinimg.com/474x/e9/82/55/e98255f2c1040c38dd2314a6288f1850.jpg",
  },
  {
    id: 14,
    price: 4500,
    departureDate: "2025-04-15",
    cabinClass: "Economy",
    isFavorite: false,
    airline: "Air India",
    airlineCode: "AI",
    flightNumber: "321",
    departureTime: "16:30",
    arrivalTime: "18:30",
    duration: "2h 00m",
    stops: 0,
    stopCities: [],
    departure: "Chennai",
    arrival: "Mumbai",
    logo: "https://i.pinimg.com/736x/dd/f1/ce/ddf1ceee59fd228201084a162cbfb48c.jpg",
  },
  {
    id: 15,
    price: 3100,
    departureDate: "2025-04-15",
    cabinClass: "Economy",
    isFavorite: false,
    airline: "SpiceJet",
    airlineCode: "SG",
    flightNumber: "987",
    departureTime: "09:00",
    arrivalTime: "10:00",
    duration: "1h 00m",
    stops: 0,
    stopCities: [],
    departure: "Delhi",
    arrival: "Jaipur",
    logo: "https://i.pinimg.com/474x/1f/5c/77/1f5c77cbff120399a8e50b101329a039.jpg",
  },
];

const FlightData = () => {
  const location = useLocation();
  const searchParams = location.state || {};
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Search Form State
  const [tripType, setTripType] = useState(searchParams.tripType || "oneway");
  const [from, setFrom] = useState(searchParams.from || "");
  const [to, setTo] = useState(searchParams.to || "");
  const [departDate, setDepartDate] = useState(searchParams.departDate || "");
  const [returnDate, setReturnDate] = useState(searchParams.returnDate || "");
  const [cabinClass, setCabinClass] = useState(searchParams.cabinClass || "Economy");
  const [multiCityFlights, setMultiCityFlights] = useState(
    searchParams.multiCityFlights || [
      { id: 1, from: "", to: "", depart: "" },
      { id: 2, from: "", to: "", depart: "" },
    ]
  );

  // Airports Data (Indian cities only)
  const departureAirports = [
    "Delhi",
    "Mumbai",
    "Bengaluru",
    "Chennai",
    "Hyderabad",
    "Kolkata",
    "Ahmedabad",
    "Goa",
    "Pune",
    "Jaipur",
  ];
  const arrivalAirports = departureAirports;

  // Flight Data State
  const [allFlights, setAllFlights] = useState(initialFlightData);
  const [filteredFlights, setFilteredFlights] = useState(initialFlightData);
  const [selectedFilter, setSelectedFilter] = useState("best");
  const [priceRange, setPriceRange] = useState([3000, 6000]);
  const [stopFilter, setStopFilter] = useState("direct");
  const [timeFilter, setTimeFilter] = useState("all");
  const [airlinesFilter, setAirlinesFilter] = useState([]);
  const [expandedFlightId, setExpandedFlightId] = useState(null);

  // Search Summary
  const searchSummary =
    tripType === "return"
      ? `${from || "From"} → ${to || "To"} • ${departDate || "Depart"} - ${returnDate || "Return"} • ${cabinClass}`
      : tripType === "oneway"
      ? `${from || "From"} → ${to || "To"} • ${departDate || "Depart"} • ${cabinClass}`
      : multiCityFlights
          .map((flight) => `${flight.from || "From"} → ${flight.to || "To"} • ${flight.depart || "Depart"}`)
          .join(" | ") + ` • ${cabinClass}`;

  // Handle Search with Random Shuffling
  const handleSearch = (e) => {
    e.preventDefault();
    let results = [...initialFlightData];

    // Shuffle flights randomly
    results = results.sort(() => Math.random() - 0.5);

    // Apply minimal filtering to ensure flights are always shown
    if (tripType === "multicity" && multiCityFlights.some((leg) => leg.from || leg.to)) {
      results = results.map((flight) => ({
        ...flight,
        multiCityFlights: multiCityFlights.map((leg, index) => {
          const baseFlight = initialFlightData[index % initialFlightData.length];
          return {
            ...baseFlight,
            departure: leg.from || baseFlight.departure,
            arrival: leg.to || baseFlight.arrival,
            departureDate: leg.depart || baseFlight.departureDate,
          };
        }),
      }));
    } else if (tripType === "return" && (from || to)) {
      results = results.map((flight) => ({
        ...flight,
        departure: from || flight.departure,
        arrival: to || flight.arrival,
        departureDate: departDate || flight.departureDate,
        returnFlight: from || to ? {
          ...flight,
          departure: to || flight.arrival,
          arrival: from || flight.departure,
          departureDate: returnDate || flight.departureDate,
        } : null,
      }));
    } else if (tripType === "oneway" && (from || to)) {
      results = results.map((flight) => ({
        ...flight,
        departure: from || flight.departure,
        arrival: to || flight.arrival,
        departureDate: departDate || flight.departureDate,
      }));
    }

    setAllFlights(results);
    setFilteredFlights(results);
    setIsSearchOpen(false);
  };

  // Apply Filters
  useEffect(() => {
    let results = [...allFlights];

    // Apply cabin class filter
    if (cabinClass) {
      results = results.filter((flight) => flight.cabinClass === cabinClass);
    }

    // Apply price range filter
    results = results.filter(
      (flight) => flight.price >= priceRange[0] && flight.price <= priceRange[1]
    );

    // Apply stop filter
    if (stopFilter === "direct") {
      results = results.filter((flight) => flight.stops === 0);
    }

    // Apply time filter
    if (timeFilter === "morning") {
      results = results.filter((flight) => {
        const hour = parseInt(flight.departureTime.split(":")[0]);
        return hour >= 5 && hour < 12;
      });
    } else if (timeFilter === "afternoon") {
      results = results.filter((flight) => {
        const hour = parseInt(flight.departureTime.split(":")[0]);
        return hour >= 12 && hour < 18;
      });
    } else if (timeFilter === "evening") {
      results = results.filter((flight) => {
        const hour = parseInt(flight.departureTime.split(":")[0]);
        return hour >= 18 || hour < 5;
      });
    }

    // Apply airlines filter
    if (airlinesFilter.length > 0) {
      results = results.filter((flight) => airlinesFilter.includes(flight.airline));
    }

    // Apply selected filter (best, cheapest, fastest)
    if (selectedFilter === "cheapest") {
      results.sort((a, b) => a.price - b.price);
    } else if (selectedFilter === "fastest") {
      results.sort((a, b) => {
        const durationA = parseInt(a.duration.split("h")[0]) * 60 + (parseInt(a.duration.split("h")[1]) || 0);
        const durationB = parseInt(b.duration.split("h")[0]) * 60 + (parseInt(b.duration.split("h")[1]) || 0);
        return durationA - durationB;
      });
    } else if (selectedFilter === "best") {
      results.sort((a, b) => {
        const scoreA = a.price / 1000 + parseInt(a.duration.split("h")[0]);
        const scoreB = b.price / 1000 + parseInt(b.duration.split("h")[0]);
        return scoreA - scoreB;
      });
    }

    setFilteredFlights(results);
  }, [
    allFlights,
    selectedFilter,
    priceRange,
    stopFilter,
    timeFilter,
    airlinesFilter,
    cabinClass,
  ]);

  const airlines = [...new Set(allFlights.map((flight) => flight.airline))];

  const toggleFavorite = (flightId) => {
    setAllFlights((prev) =>
      prev.map((flight) =>
        flight.id === flightId ? { ...flight, isFavorite: !flight.isFavorite } : flight
      )
    );
  };

  return (
    <div className="bg-blue-50 min-h-screen">
      {/* <Header /> */}
      <div className="flex bg-[#06152B] justify-center py-6 px-4">
        <div
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center px-6 py-3 rounded-lg w-full max-w-6xl bg-[#0C1D3D]/100 cursor-pointer hover:bg-[#0C1D3D]/80 transition-colors"
        >
          <FaSearch className="text-blue-500 mr-3" size={18} />
          <p className="text-white text-center text-sm flex-1">{searchSummary}</p>
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
        departureAirports={departureAirports}
        arrivalAirports={arrivalAirports}
        multiCityFlights={multiCityFlights}
        setMultiCityFlights={setMultiCityFlights}
      />

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Flight search results ({filteredFlights.length})
          </h2>
          <button
            className="flex items-center md:hidden bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <FaFilter className="mr-2" /> Filters
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <FlightFilters
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            stopFilter={stopFilter}
            setStopFilter={setStopFilter}
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
            airlinesFilter={airlinesFilter}
            setAirlinesFilter={setAirlinesFilter}
            airlines={airlines}
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