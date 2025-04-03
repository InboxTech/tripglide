import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { FaSearch, FaPlane, FaClock, FaExchangeAlt, FaFilter, FaStar, FaRegStar, FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt, FaHeart } from "react-icons/fa";
import SearchFormPopup from "./SearchFormPopUp";

const FlightCardList = () => {
  const location = useLocation();
  const searchParams = location.state || {};
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // State for search form
  const [tripType, setTripType] = useState(searchParams.tripType || "multicity");
  const [from, setFrom] = useState(searchParams.from || "");
  const [to, setTo] = useState(searchParams.to || "");
  const [departDate, setDepartDate] = useState(searchParams.departDate || "");
  const [returnDate, setReturnDate] = useState(searchParams.returnDate || "");
  const [cabinClass, setCabinClass] = useState(searchParams.cabinClass || "Economy");
  const [multiCityFlights, setMultiCityFlights] = useState(
    searchParams.multiCityFlights || [
      { id: 1, from: "New Delhi", to: "London", depart: "2025-04-15" },
      { id: 2, from: "London", to: "Dubai", depart: "2025-04-18" }
    ]
  );
  
  // Mock airports data
  const departureAirports = ["New Delhi", "Mumbai", "Bengaluru", "Chennai", "London", "Dubai"];
  const arrivalAirports = ["London", "New York", "Dubai", "Singapore", "New Delhi", "Mumbai"];

  // Mock flight data for generating additional legs dynamically
  const mockFlightData = [
    {
      airline: "Air India",
      airlineCode: "AI",
      flightNumber: "AI302",
      departureTime: "06:15",
      arrivalTime: "09:25",
      duration: "3h 10m",
      stops: 0,
      stopCities: [],
      logo: "https://i.pinimg.com/736x/dd/f1/ce/ddf1ceee59fd228201084a162cbfb48c.jpg",
    },
    {
      airline: "Emirates",
      airlineCode: "EK",
      flightNumber: "EK517",
      departureTime: "09:40",
      arrivalTime: "12:30",
      duration: "2h 50m",
      stops: 0,
      stopCities: [],
      logo: "https://i.pinimg.com/474x/4e/28/37/4e28374b3286209b1a7da455983a8f51.jpg",
    },
    {
      airline: "Vistara",
      airlineCode: "UK",
      flightNumber: "UK121",
      departureTime: "02:10",
      arrivalTime: "07:45",
      duration: "5h 35m",
      stops: 0,
      stopCities: [],
      logo: "https://i.pinimg.com/736x/2f/da/8f/2fda8fe96633703535e7f47fd663c290.jpg",
    },
    {
      airline: "Qatar Airways",
      airlineCode: "QR",
      flightNumber: "QR507",
      departureTime: "03:55",
      arrivalTime: "09:40",
      duration: "5h 45m",
      stops: 1,
      stopCities: ["Doha"],
      logo: "https://i.pinimg.com/474x/49/b6/4a/49b64a7c09c9732c2ed8e54eb25a136f.jpg",
    },
    {
      airline: "British Airways",
      airlineCode: "BA",
      flightNumber: "BA142",
      departureTime: "11:05",
      arrivalTime: "16:25",
      duration: "5h 20m",
      stops: 0,
      stopCities: [],
      logo: "https://i.pinimg.com/474x/1a/d0/30/1ad0301a1e8e2cfc8a465d40dfc119d8.jpg",
    },
    {
      airline: "Lufthansa",
      airlineCode: "LH",
      flightNumber: "LH761",
      departureTime: "13:25",
      arrivalTime: "16:15",
      duration: "2h 50m",
      stops: 0,
      stopCities: [],
      logo: "https://i.pinimg.com/474x/ba/2d/6b/ba2d6bce884e16fdcac6b29de17eca17.jpg",
    },
    {
      airline: "Etihad Airways",
      airlineCode: "EY",
      flightNumber: "EY204",
      departureTime: "21:05",
      arrivalTime: "23:45",
      duration: "2h 40m",
      stops: 0,
      stopCities: [],
      logo: "https://i.pinimg.com/474x/91/37/09/913709c8027990ce9831efa1dd44f07c.jpg",
    }
  ];

  // Initial flight data with consistent structure for all trip types
  const [allFlights, setAllFlights] = useState([
    {
      id: 1,
      price: 42999,
      departureDate: "2025-04-15",
      cabinClass: "Economy",
      isFavorite: false,
      // For oneway/return
      airline: "Air India",
      airlineCode: "AI",
      flightNumber: "AI302",
      departureTime: "06:15",
      arrivalTime: "09:25",
      duration: "3h 10m",
      stops: 0,
      stopCities: [],
      departure: "New Delhi",
      arrival: "London",
      logo: "https://i.pinimg.com/736x/dd/f1/ce/ddf1ceee59fd228201084a162cbfb48c.jpg",
      returnFlight: {
        airline: "Emirates",
        airlineCode: "EK",
        flightNumber: "EK517",
        departureTime: "09:40",
        arrivalTime: "12:30",
        duration: "2h 50m",
        stops: 0,
        stopCities: [],
        departure: "London",
        arrival: "New Delhi",
        logo: "https://i.pinimg.com/474x/4e/28/37/4e28374b3286209b1a7da455983a8f51.jpg",
      },
      // For multicity
      multiCityFlights: [
        {
          airline: "Air India",
          airlineCode: "AI",
          flightNumber: "AI302",
          departureTime: "06:15",
          arrivalTime: "09:25",
          duration: "3h 10m",
          stops: 0,
          stopCities: [],
          departure: multiCityFlights[0]?.from || "New Delhi",
          arrival: multiCityFlights[0]?.to || "London",
          departureDate: multiCityFlights[0]?.depart || "2025-04-15",
          logo: "https://i.pinimg.com/736x/dd/f1/ce/ddf1ceee59fd228201084a162cbfb48c.jpg",
        },
        {
          airline: "Emirates",
          airlineCode: "EK",
          flightNumber: "EK517",
          departureTime: "09:40",
          arrivalTime: "12:30",
          duration: "2h 50m",
          stops: 0,
          stopCities: [],
          departure: multiCityFlights[1]?.from || "London",
          arrival: multiCityFlights[1]?.to || "Dubai",
          departureDate: multiCityFlights[1]?.depart || "2025-04-18",
          logo: "https://i.pinimg.com/474x/4e/28/37/4e28374b3286209b1a7da455983a8f51.jpg",
        }
      ]
    },
    {
      id: 2,
      price: 38750,
      departureDate: "2025-04-15",
      cabinClass: "Economy",
      isFavorite: false,
      // For oneway/return
      airline: "Vistara",
      airlineCode: "UK",
      flightNumber: "UK121",
      departureTime: "02:10",
      arrivalTime: "07:45",
      duration: "5h 35m",
      stops: 0,
      stopCities: [],
      departure: "New Delhi",
      arrival: "London",
      logo: "https://i.pinimg.com/736x/2f/da/8f/2fda8fe96633703535e7f47fd663c290.jpg",
      returnFlight: {
        airline: "Qatar Airways",
        airlineCode: "QR",
        flightNumber: "QR507",
        departureTime: "03:55",
        arrivalTime: "09:40",
        duration: "5h 45m",
        stops: 1,
        stopCities: ["Doha"],
        departure: "London",
        arrival: "New Delhi",
        logo: "https://i.pinimg.com/474x/49/b6/4a/49b64a7c09c9732c2ed8e54eb25a136f.jpg",
      },
      // For multicity
      multiCityFlights: [
        {
          airline: "Vistara",
          airlineCode: "UK",
          flightNumber: "UK121",
          departureTime: "02:10",
          arrivalTime: "07:45",
          duration: "5h 35m",
          stops: 0,
          stopCities: [],
          departure: multiCityFlights[0]?.from || "New Delhi",
          arrival: multiCityFlights[0]?.to || "London",
          departureDate: multiCityFlights[0]?.depart || "2025-04-15",
          logo: "https://i.pinimg.com/736x/2f/da/8f/2fda8fe96633703535e7f47fd663c290.jpg",
        },
        {
          airline: "Qatar Airways",
          airlineCode: "QR",
          flightNumber: "QR507",
          departureTime: "03:55",
          arrivalTime: "09:40",
          duration: "5h 45m",
          stops: 1,
          stopCities: ["Doha"],
          departure: multiCityFlights[1]?.from || "London",
          arrival: multiCityFlights[1]?.to || "Dubai",
          departureDate: multiCityFlights[1]?.depart || "2025-04-18",
          logo: "https://i.pinimg.com/474x/49/b6/4a/49b64a7c09c9732c2ed8e54eb25a136f.jpg",
        }
      ]
    },
    {
      id: 3,
      price: 51200,
      departureDate: "2025-04-15",
      cabinClass: "Economy",
      isFavorite: false,
      // For oneway/return
      airline: "British Airways",
      airlineCode: "BA",
      flightNumber: "BA142",
      departureTime: "11:05",
      arrivalTime: "16:25",
      duration: "5h 20m",
      stops: 0,
      stopCities: [],
      departure: "New Delhi",
      arrival: "London",
      logo: "https://i.pinimg.com/474x/1a/d0/30/1ad0301a1e8e2cfc8a465d40dfc119d8.jpg",
      returnFlight: {
        airline: "Lufthansa",
        airlineCode: "LH",
        flightNumber: "LH761",
        departureTime: "13:25",
        arrivalTime: "16:15",
        duration: "2h 50m",
        stops: 0,
        stopCities: [],
        departure: "London",
        arrival: "New Delhi",
        logo: "https://i.pinimg.com/474x/ba/2d/6b/ba2d6bce884e16fdcac6b29de17eca17.jpg",
      },
      // For multicity
      multiCityFlights: [
        {
          airline: "British Airways",
          airlineCode: "BA",
          flightNumber: "BA142",
          departureTime: "11:05",
          arrivalTime: "16:25",
          duration: "5h 20m",
          stops: 0,
          stopCities: [],
          departure: multiCityFlights[0]?.from || "New Delhi",
          arrival: multiCityFlights[0]?.to || "London",
          departureDate: multiCityFlights[0]?.depart || "2025-04-15",
          logo: "https://i.pinimg.com/474x/1a/d0/30/1ad0301a1e8e2cfc8a465d40dfc119d8.jpg",
        },
        {
          airline: "Lufthansa",
          airlineCode: "LH",
          flightNumber: "LH761",
          departureTime: "13:25",
          arrivalTime: "16:15",
          duration: "2h 50m",
          stops: 0,
          stopCities: [],
          departure: multiCityFlights[1]?.from || "London",
          arrival: multiCityFlights[1]?.to || "Dubai",
          departureDate: multiCityFlights[1]?.depart || "2025-04-18",
          logo: "https://i.pinimg.com/474x/ba/2d/6b/ba2d6bce884e16fdcac6b29de17eca17.jpg",
        }
      ]
    },
    {
      id: 4,
      price: 45600,
      departureDate: "2025-04-15",
      cabinClass: "Economy",
      isFavorite: false,
      // For oneway/return
      airline: "Lufthansa",
      airlineCode: "LH",
      flightNumber: "LH761",
      departureTime: "13:25",
      arrivalTime: "22:15",
      duration: "8h 50m",
      stops: 1,
      stopCities: ["Frankfurt"],
      departure: "New Delhi",
      arrival: "London",
      logo: "https://i.pinimg.com/474x/ba/2d/6b/ba2d6bce884e16fdcac6b29de17eca17.jpg",
      returnFlight: {
        airline: "Etihad Airways",
        airlineCode: "EY",
        flightNumber: "EY204",
        departureTime: "21:05",
        arrivalTime: "23:45",
        duration: "2h 40m",
        stops: 0,
        stopCities: [],
        departure: "London",
        arrival: "New Delhi",
        logo: "https://i.pinimg.com/474x/91/37/09/913709c8027990ce9831efa1dd44f07c.jpg",
      },
      // For multicity
      multiCityFlights: [
        {
          airline: "Lufthansa",
          airlineCode: "LH",
          flightNumber: "LH761",
          departureTime: "13:25",
          arrivalTime: "22:15",
          duration: "8h 50m",
          stops: 1,
          stopCities: ["Frankfurt"],
          departure: multiCityFlights[0]?.from || "New Delhi",
          arrival: multiCityFlights[0]?.to || "London",
          departureDate: multiCityFlights[0]?.depart || "2025-04-15",
          logo: "https://i.pinimg.com/474x/ba/2d/6b/ba2d6bce884e16fdcac6b29de17eca17.jpg",
        },
        {
          airline: "Etihad Airways",
          airlineCode: "EY",
          flightNumber: "EY204",
          departureTime: "21:05",
          arrivalTime: "23:45",
          duration: "2h 40m",
          stops: 0,
          stopCities: [],
          departure: multiCityFlights[1]?.from || "London",
          arrival: multiCityFlights[1]?.to || "Dubai",
          departureDate: multiCityFlights[1]?.depart || "2025-04-18",
          logo: "https://i.pinimg.com/474x/91/37/09/913709c8027990ce9831efa1dd44f07c.jpg",
        }
      ]
    }
  ]);

  // Filter states
  const [selectedFilter, setSelectedFilter] = useState("best");
  const [priceRange, setPriceRange] = useState([30000, 60000]);
  const [stopFilter, setStopFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [airlinesFilter, setAirlinesFilter] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedFlightId, setExpandedFlightId] = useState(null);

  // Function to generate a new flight leg dynamically
  const generateFlightLeg = (index, searchLeg) => {
    const flightIndex = index % mockFlightData.length; // Cycle through mock data
    const flightData = mockFlightData[flightIndex];
    return {
      ...flightData,
      departure: searchLeg.from || "",
      arrival: searchLeg.to || "",
      departureDate: searchLeg.depart || "",
    };
  };

  // Update flights when search params change
  useEffect(() => {
    console.log("Search params updated:", { tripType, multiCityFlights, cabinClass });
    
    const updatedFlights = allFlights.map(flight => {
      if (tripType === "multicity") {
        // Ensure the number of legs matches the search form's multiCityFlights
        const updatedMultiCityFlights = multiCityFlights.map((searchLeg, index) => {
          const existingLeg = flight.multiCityFlights[index];
          if (existingLeg) {
            return {
              ...existingLeg,
              departure: searchLeg.from || existingLeg.departure,
              arrival: searchLeg.to || existingLeg.arrival,
              departureDate: searchLeg.depart || existingLeg.departureDate,
            };
          } else {
            // Generate a new leg if it doesn't exist
            return generateFlightLeg(index, searchLeg);
          }
        });

        return {
          ...flight,
          multiCityFlights: updatedMultiCityFlights,
          departureDate: multiCityFlights[0]?.depart || flight.departureDate,
          cabinClass: cabinClass || flight.cabinClass,
        };
      } else if (tripType === "return") {
        return {
          ...flight,
          departure: from || flight.departure,
          arrival: to || flight.arrival,
          departureDate: departDate || flight.departureDate,
          returnDate: returnDate || flight.returnDate,
          cabinClass: cabinClass || flight.cabinClass,
          airline: flight.airline || flight.returnFlight?.airline,
          airlineCode: flight.airlineCode || flight.returnFlight?.airlineCode,
          flightNumber: flight.flightNumber || flight.returnFlight?.flightNumber,
          departureTime: flight.departureTime || flight.returnFlight?.departureTime,
          arrivalTime: flight.arrivalTime || flight.returnFlight?.arrivalTime,
          duration: flight.duration || flight.returnFlight?.duration,
          stops: flight.stops || flight.returnFlight?.stops || 0,
          stopCities: flight.stopCities || flight.returnFlight?.stopCities || [],
          logo: flight.logo || flight.returnFlight?.logo,
          returnFlight: {
            ...flight.returnFlight,
            departure: to || flight.returnFlight.departure,
            arrival: from || flight.returnFlight.arrival,
            departureDate: returnDate || flight.returnFlight.departureDate,
          }
        };
      } else {
        return {
          ...flight,
          departure: from || flight.departure,
          arrival: to || flight.arrival,
          departureDate: departDate || flight.departureDate,
          cabinClass: cabinClass || flight.cabinClass,
          airline: flight.airline || mockFlightData[0].airline,
          airlineCode: flight.airlineCode || mockFlightData[0].airlineCode,
          flightNumber: flight.flightNumber || mockFlightData[0].flightNumber,
          departureTime: flight.departureTime || mockFlightData[0].departureTime,
          arrivalTime: flight.arrivalTime || mockFlightData[0].arrivalTime,
          duration: flight.duration || mockFlightData[0].duration,
          stops: flight.stops || mockFlightData[0].stops || 0,
          stopCities: flight.stopCities || mockFlightData[0].stopCities || [],
          logo: flight.logo || mockFlightData[0].logo,
        };
      }
    });
    
    setAllFlights(updatedFlights);
  }, [from, to, departDate, returnDate, cabinClass, tripType, multiCityFlights]);

  // Apply filters to flights
  useEffect(() => {
    let results = [...allFlights];
    
    if (tripType === "multicity") {
      // Filter by multi-city legs
      results = results.filter(flight => {
        // Ensure the number of legs matches
        if (flight.multiCityFlights.length !== multiCityFlights.length) {
          return false; // Skip flights with mismatched leg counts
        }

        return flight.multiCityFlights.every((leg, index) => {
          const searchLeg = multiCityFlights[index];
          if (!searchLeg) return true; // Skip if no corresponding search leg

          // Defensive checks for undefined departure/arrival
          const legDeparture = leg.departure || "";
          const legArrival = leg.arrival || "";
          const searchFrom = searchLeg.from || "";
          const searchTo = searchLeg.to || "";

          return (
            (!searchFrom || legDeparture.toLowerCase() === searchFrom.toLowerCase()) &&
            (!searchTo || legArrival.toLowerCase() === searchTo.toLowerCase()) &&
            (!searchLeg.depart || leg.departureDate === searchLeg.depart)
          );
        });
      });
    } else if (tripType === "return" || tripType === "oneway") {
      // Filter by departure and arrival cities
      if (from && to) {
        results = results.filter(flight => 
          (flight.departure || "").toLowerCase() === from.toLowerCase() && 
          (flight.arrival || "").toLowerCase() === to.toLowerCase()
        );
      }

      // Filter by departure date
      if (departDate) {
        results = results.filter(flight => flight.departureDate === departDate);
      }
    }

    // Filter by cabin class
    if (cabinClass) {
      results = results.filter(flight => flight.cabinClass === cabinClass);
    }

    // Price filter
    results = results.filter(flight => 
      flight.price >= priceRange[0] && flight.price <= priceRange[1]
    );
    
    // Stops filter
    if (stopFilter === "direct") {
      results = results.filter(flight => 
        tripType === "multicity" 
          ? flight.multiCityFlights.every(leg => leg.stops === 0)
          : flight.stops === 0
      );
    } else if (stopFilter === "1stop") {
      results = results.filter(flight => 
        tripType === "multicity" 
          ? flight.multiCityFlights.every(leg => leg.stops <= 1)
          : flight.stops === 1
      );
    }
    
    // Time filter
    if (timeFilter === "morning") {
      results = results.filter(flight => {
        const firstLeg = tripType === "multicity" ? flight.multiCityFlights[0] : flight;
        const departureTime = firstLeg?.departureTime || "00:00";
        const hour = parseInt(departureTime.split(':')[0]);
        return hour >= 5 && hour < 12;
      });
    } else if (timeFilter === "afternoon") {
      results = results.filter(flight => {
        const firstLeg = tripType === "multicity" ? flight.multiCityFlights[0] : flight;
        const departureTime = firstLeg?.departureTime || "00:00";
        const hour = parseInt(departureTime.split(':')[0]);
        return hour >= 12 && hour < 18;
      });
    } else if (timeFilter === "evening") {
      results = results.filter(flight => {
        const firstLeg = tripType === "multicity" ? flight.multiCityFlights[0] : flight;
        const departureTime = firstLeg?.departureTime || "00:00";
        const hour = parseInt(departureTime.split(':')[0]);
        return hour >= 18 || hour < 5;
      });
    }
    
    // Airlines filter
    if (airlinesFilter.length > 0) {
      results = results.filter(flight => {
        if (tripType === "multicity") {
          return flight.multiCityFlights.some(leg => airlinesFilter.includes(leg.airline));
        }
        return airlinesFilter.includes(flight.airline);
      });
    }
    
    // Sort based on selected filter
    if (selectedFilter === "cheapest") {
      results.sort((a, b) => a.price - b.price);
    } else if (selectedFilter === "fastest") {
      results.sort((a, b) => {
        const totalDurationA = tripType === "multicity"
          ? a.multiCityFlights.reduce((sum, leg) => {
              const [hours, mins] = leg.duration.split('h').map(part => parseInt(part));
              return sum + hours * 60 + mins;
            }, 0)
          : parseInt(a.duration?.split('h')[0] || 0) * 60 + parseInt(a.duration?.split('h')[1]?.split('m')[0] || 0);
        const totalDurationB = tripType === "multicity"
          ? b.multiCityFlights.reduce((sum, leg) => {
              const [hours, mins] = leg.duration.split('h').map(part => parseInt(part));
              return sum + hours * 60 + mins;
            }, 0)
          : parseInt(b.duration?.split('h')[0] || 0) * 60 + parseInt(b.duration?.split('h')[1]?.split('m')[0] || 0);
        return totalDurationA - totalDurationB;
      });
    } else if (selectedFilter === "best") {
      results.sort((a, b) => {
        const totalDurationA = tripType === "multicity"
          ? a.multiCityFlights.reduce((sum, leg) => {
              const [hours, mins] = leg.duration.split('h').map(part => parseInt(part));
              return sum + hours * 60 + mins;
            }, 0)
          : parseInt(a.duration?.split('h')[0] || 0) * 60 + parseInt(a.duration?.split('h')[1]?.split('m')[0] || 0);
        const totalStopsA = tripType === "multicity"
          ? a.multiCityFlights.reduce((sum, leg) => sum + leg.stops, 0)
          : a.stops || 0;
        const scoreA = a.price / 10000 + totalDurationA / 60 + totalStopsA * 2;

        const totalDurationB = tripType === "multicity"
          ? b.multiCityFlights.reduce((sum, leg) => {
              const [hours, mins] = leg.duration.split('h').map(part => parseInt(part));
              return sum + hours * 60 + mins;
            }, 0)
          : parseInt(b.duration?.split('h')[0] || 0) * 60 + parseInt(b.duration?.split('h')[1]?.split('m')[0] || 0);
        const totalStopsB = tripType === "multicity"
          ? b.multiCityFlights.reduce((sum, leg) => sum + leg.stops, 0)
          : b.stops || 0;
        const scoreB = b.price / 10000 + totalDurationB / 60 + totalStopsB * 2;

        return scoreA - scoreB;
      });
    }
    
    setFilteredFlights(results);
  }, [allFlights, selectedFilter, priceRange, stopFilter, timeFilter, airlinesFilter, tripType, multiCityFlights, from, to, departDate, cabinClass]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (tripType === "multicity") {
      console.log("Multi-city search:", multiCityFlights);
    } else {
      console.log("Search:", { tripType, from, to, departDate, returnDate, cabinClass });
    }
    setIsSearchOpen(false);
  };

  // Airline list for filter
  const airlines = [...new Set(
    allFlights.flatMap(flight => 
      tripType === "multicity" 
        ? flight.multiCityFlights.map(leg => leg.airline) 
        : flight.airline
    )
  )];

  // Search Summary
  let searchSummary = "";
  if (tripType === "return") {
    searchSummary = `${from} → ${to} • ${departDate} - ${returnDate} • ${cabinClass}`;
  } else if (tripType === "oneway") {
    searchSummary = `${from} → ${to} • ${departDate} • ${cabinClass}`;
  } else if (tripType === "multicity") {
    searchSummary = multiCityFlights
      .map(flight => `${flight.from} → ${flight.to} • ${flight.depart}`)
      .join(" | ") + ` • ${cabinClass}`;
  }

  const toggleAirlineFilter = (airline) => {
    if (airlinesFilter.includes(airline)) {
      setAirlinesFilter(airlinesFilter.filter(a => a !== airline));
    } else {
      setAirlinesFilter([...airlinesFilter, airline]);
    }
  };

  const toggleFlightDetails = (flightId) => {
    setExpandedFlightId(expandedFlightId === flightId ? null : flightId);
  };

  const toggleFavorite = (flightId) => {
    setAllFlights(prevFlights => 
      prevFlights.map(flight => 
        flight.id === flightId ? { ...flight, isFavorite: !flight.isFavorite } : flight
      )
    );
  };

  return (
    <div className="bg-blue-50 min-h-screen">
      {/* <Header /> */}

      {/* Search Bar */}
      <div className="flex bg-[#06152B] justify-center py-6 px-4">
        <div
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center px-6 py-3 rounded-lg w-full max-w-6xl bg-[#0C1D3D]/100 cursor-pointer hover:bg-[#0C1D3D]/80 transition-colors"
        >
          <FaSearch className="text-blue-500 mr-3" size={18} />
          <p className="text-white text-sm text-center flex-1">{searchSummary}</p>
        </div>
      </div>

      <SearchFormPopup
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
          {/* Filters (Hidden on mobile by default) */}
          <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block bg-white rounded-xl shadow-md p-6 md:w-1/4 md:sticky md:top-20 h-fit`}>
            <h3 className="text-lg font-bold mb-4">Filters</h3>
            
            {/* Price Range Filter */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Price Range</h4>
              <div className="flex justify-between text-sm mb-1">
                <span>₹{priceRange[0].toLocaleString()}</span>
                <span>₹{priceRange[1].toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="30000" 
                max="60000" 
                step="1000"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="w-full mb-2 cursor-pointer"
              />
              <input 
                type="range" 
                min="30000" 
                max="60000" 
                step="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full cursor-pointer"
              />
            </div>
            
            {/* Stops Filter */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Stops</h4>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="stops" 
                    checked={stopFilter === "all"} 
                    onChange={() => setStopFilter("all")} 
                    className="mr-2"
                  />
                  All
                </label>
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="stops" 
                    checked={stopFilter === "direct"} 
                    onChange={() => setStopFilter("direct")} 
                    className="mr-2"
                  />
                  Direct flights only
                </label>
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="stops" 
                    checked={stopFilter === "1stop"} 
                    onChange={() => setStopFilter("1stop")} 
                    className="mr-2"
                  />
                  1 stop
                </label>
              </div>
            </div>
            
            {/* Departure Time Filter */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Departure Time</h4>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="time" 
                    checked={timeFilter === "all"} 
                    onChange={() => setTimeFilter("all")} 
                    className="mr-2"
                  />
                  All
                </label>
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="time" 
                    checked={timeFilter === "morning"} 
                    onChange={() => setTimeFilter("morning")} 
                    className="mr-2"
                  />
                  Morning (5:00 - 11:59)
                </label>
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="time" 
                    checked={timeFilter === "afternoon"} 
                    onChange={() => setTimeFilter("afternoon")} 
                    className="mr-2"
                  />
                  Afternoon (12:00 - 17:59)
                </label>
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="time" 
                    checked={timeFilter === "evening"} 
                    onChange={() => setTimeFilter("evening")} 
                    className="mr-2"
                  />
                  Evening (18:00 - 4:59)
                </label>
              </div>
            </div>
            
            {/* Airlines Filter */}
            <div>
              <h4 className="font-semibold mb-2">Airlines</h4>
              <div className="space-y-2">
                {airlines.map((airline) => (
                  <label key={airline} className="flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={airlinesFilter.includes(airline)} 
                      onChange={() => toggleAirlineFilter(airline)}
                      className="mr-2"
                    />
                    {airline}
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          {/* Flight Results */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="bg-white rounded-xl p-4 mb-6 flex flex-wrap gap-2">
              <button
                className={`px-4 py-2 cursor-pointer rounded-lg ${selectedFilter === "best" ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                onClick={() => setSelectedFilter("best")}
              >
                Best
              </button>
              <button
                className={`px-4 py-2 cursor-pointer rounded-lg ${selectedFilter === "cheapest" ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                onClick={() => setSelectedFilter("cheapest")}
              >
                Cheapest
              </button>
              <button
                className={`px-4 py-2 cursor-pointer rounded-lg ${selectedFilter === "fastest" ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                onClick={() => setSelectedFilter("fastest")}
              >
                Fastest
              </button>
            </div>
            
            {/* Flight Cards */}
            <div className="space-y-4 cursor-pointer">
              {filteredFlights.length > 0 ? (
                filteredFlights.map((flight) => (
                  <div key={flight.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      {/* Flight Header with Heart Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {tripType === "multicity" ? (
                            flight.multiCityFlights.map((leg, index) => (
                              <span key={index} className="text-sm text-gray-500">
                                {leg.airline} {leg.airlineCode}{leg.flightNumber}{index < flight.multiCityFlights.length - 1 ? " | " : ""}
                              </span>
                            ))
                          ) : (
                            <>
                              <h3 className="text-lg font-semibold text-gray-800">{flight.airline}</h3>
                              <span className="text-sm text-gray-500">{flight.airlineCode}{flight.flightNumber}</span>
                              {tripType === "return" && returnDate && flight.returnFlight && (
                                <span className="text-sm text-gray-500">
                                  | {flight.returnFlight.airline} {flight.returnFlight.airlineCode}{flight.returnFlight.flightNumber}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                        <button 
                          onClick={() => toggleFavorite(flight.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <FaHeart className={flight.isFavorite ? 'text-red-500' : ''} size={20} />
                        </button>
                      </div>

                      {/* Main Flight Info */}
                      {tripType === "multicity" ? (
                        flight.multiCityFlights.map((leg, index) => (
                          <div key={index} className={`flex flex-col md:flex-row gap-6 ${index > 0 ? "mt-4 pt-4 border-t border-gray-200" : ""}`}>
                            {/* Leg Info */}
                            <div className="md:w-1/5 flex items-center space-x-3">
                              <img src={leg.logo} alt={leg.airline} className="h-8 w-8 object-contain" />
                              <div>
                                <p className="font-medium">{leg.airline}</p>
                                <p className="text-sm text-gray-500">{leg.airlineCode}{leg.flightNumber}</p>
                              </div>
                            </div>
                            
                            {/* Leg Times */}
                            <div className="md:w-2/5 flex items-center justify-between">
                              <div className="text-center">
                                <p className="text-lg font-bold">{leg.departureTime}</p>
                                <p className="text-sm">{leg.departure || "N/A"}</p>
                              </div>
                              
                              <div className="flex flex-col items-center justify-center px-4">
                                <div className="text-xs text-gray-500">{leg.duration}</div>
                                <div className="w-24 md:w-32 h-px bg-gray-300 relative my-2">
                                  {leg.stops > 0 && (
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
                                  )}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {leg.stops === 0 ? "Direct" : `${leg.stops} stop`}
                                </div>
                              </div>
                              
                              <div className="text-center">
                                <p className="text-lg font-bold">{leg.arrivalTime}</p>
                                <p className="text-sm">{leg.arrival || "N/A"}</p>
                              </div>
                            </div>
                            
                            {/* Cabin & Stops */}
                            <div className="md:w-2/5 flex flex-col-reverse md:flex-row items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-500">{flight.cabinClass}</p>
                                {leg.stops > 0 && (
                                  <p className="text-xs text-gray-500">
                                    via {leg.stopCities.join(", ")}
                                  </p>
                                )}
                              </div>
                              {index === flight.multiCityFlights.length - 1 && (
                                <div className="text-right">
                                  <p className="text-2xl font-bold text-blue-600">₹{flight.price.toLocaleString()}</p>
                                  <button className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition">
                                    Select
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* Outbound Flight Info */}
                          <div className="md:w-1/5 flex items-center space-x-3">
                            <img src={flight.logo} alt={flight.airline} className="h-8 w-8 object-contain" />
                            <div>
                              <p className="font-medium">{flight.airline}</p>
                              <p className="text-sm text-gray-500">{flight.airlineCode}{flight.flightNumber}</p>
                            </div>
                          </div>
                          
                          {/* Outbound Flight Times */}
                          <div className="md:w-2/5 flex items-center justify-between">
                            <div className="text-center">
                              <p className="text-lg font-bold">{flight.departureTime}</p>
                              <p className="text-sm">{flight.departure || "N/A"}</p>
                            </div>
                            
                            <div className="flex flex-col items-center justify-center px-4">
                              <div className="text-xs text-gray-500">{flight.duration}</div>
                              <div className="w-24 md:w-32 h-px bg-gray-300 relative my-2">
                                {flight.stops > 0 && (
                                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
                                )}
                              </div>
                              <div className="text-xs text-gray-500">
                                {flight.stops === 0 ? "Direct" : `${flight.stops} stop`}
                              </div>
                            </div>
                            
                            <div className="text-center">
                              <p className="text-lg font-bold">{flight.arrivalTime}</p>
                              <p className="text-sm">{flight.arrival || "N/A"}</p>
                            </div>
                          </div>
                          
                          {/* Cabin & Price */}
                          <div className="md:w-2/5 flex flex-col-reverse md:flex-row items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-500">{flight.cabinClass}</p>
                              {flight.stops > 0 && (
                                <p className="text-xs text-gray-500">
                                  via {flight.stopCities.join(", ")}
                                </p>
                              )}
                            </div>
                            
                            <div className="text-right">
                              <p className="text-2xl font-bold text-blue-600">₹{flight.price.toLocaleString()}</p>
                              <button className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition">
                                Select
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Return Flight Info (if applicable) */}
                      {tripType === "return" && returnDate && flight.returnFlight && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex flex-col md:flex-row gap-6">
                            {/* Return Flight Info */}
                            <div className="md:w-1/5 flex items-center space-x-3">
                              <img src={flight.returnFlight.logo} alt={flight.returnFlight.airline} className="h-8 w-8 object-contain" />
                              <div>
                                <p className="font-medium">{flight.returnFlight.airline}</p>
                                <p className="text-sm text-gray-500">{flight.returnFlight.airlineCode}{flight.returnFlight.flightNumber}</p>
                              </div>
                            </div>
                            
                            {/* Return Flight Times */}
                            <div className="md:w-2/5 flex items-center justify-between">
                              <div className="text-center">
                                <p className="text-lg font-bold">{flight.returnFlight.departureTime}</p>
                                <p className="text-sm">{flight.returnFlight.departure || "N/A"}</p>
                              </div>
                              
                              <div className="flex flex-col items-center justify-center px-4">
                                <div className="text-xs text-gray-500">{flight.returnFlight.duration}</div>
                                <div className="w-24 md:w-32 h-px bg-gray-300 relative my-2">
                                  {flight.returnFlight.stops > 0 && (
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
                                  )}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {flight.returnFlight.stops === 0 ? "Direct" : `${flight.returnFlight.stops} stop`}
                                </div>
                              </div>
                              
                              <div className="text-center">
                                <p className="text-lg font-bold">{flight.returnFlight.arrivalTime}</p>
                                <p className="text-sm">{flight.returnFlight.arrival || "N/A"}</p>
                              </div>
                            </div>
                            
                            {/* Cabin & Stops */}
                            <div className="md:w-2/5 flex flex-col-reverse md:flex-row items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-500">{flight.cabinClass}</p>
                                {flight.returnFlight.stops > 0 && (
                                  <p className="text-xs text-gray-500">
                                    via {flight.returnFlight.stopCities.join(", ")}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Flight Details Toggle */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <button 
                          className="text-blue-600 text-sm flex items-center cursor-pointer"
                          onClick={() => toggleFlightDetails(flight.id)}
                        >
                          <FaExchangeAlt className="mr-2" /> 
                          {expandedFlightId === flight.id ? "Hide details" : "Flight details"}
                        </button>
                      </div>

                      {/* Expanded Flight Details */}
                      {expandedFlightId === flight.id && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <h3 className="text-lg font-semibold mb-4">Flight Details</h3>
                          <div className="space-y-6">
                            {tripType === "multicity" ? (
                              flight.multiCityFlights.map((leg, index) => (
                                <div key={index}>
                                  <h4 className="font-medium mb-2">Flight {index + 1}</h4>
                                  <div className="flex items-start gap-4">
                                    <div className="flex flex-col items-center">
                                      <FaPlaneDeparture className="text-blue-600" />
                                      <div className="w-px h-16 bg-gray-300 my-1"></div>
                                      <FaPlaneArrival className="text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                      {/* Departure Leg */}
                                      <div className="flex justify-between mb-4">
                                        <div>
                                          <p className="font-medium">{leg.departureTime || "N/A"} • {leg.departure || "N/A"}</p>
                                          <p className="text-sm text-gray-500">{leg.departureDate || "N/A"}</p>
                                          <p className="text-sm text-gray-500">{leg.airline} • {leg.airlineCode}{leg.flightNumber}</p>
                                        </div>
                                        <div className="text-right">
                                          <p className="text-sm text-gray-500">Duration: {leg.duration || "N/A"}</p>
                                        </div>
                                      </div>

                                      {/* Layover (if any) */}
                                      {leg.stops > 0 && (
                                        <div className="bg-gray-200 p-2 rounded-lg mb-4">
                                          <p className="text-sm text-gray-600">
                                            Layover in {leg.stopCities.join(", ") || "N/A"} • Approx. 2h 30m
                                          </p>
                                        </div>
                                      )}

                                      {/* Arrival Leg */}
                                      <div className="flex justify-between">
                                        <div>
                                          <p className="font-medium">{leg.arrivalTime || "N/A"} • {leg.arrival || "N/A"}</p>
                                          <p className="text-sm text-gray-500">{leg.departureDate || "N/A"}</p>
                                          <p className="text-sm text-gray-500">{leg.airline} • {leg.airlineCode}{leg.flightNumber}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <>
                                {/* Outbound Flight Itinerary */}
                                <div>
                                  <h4 className="font-medium mb-2">Outbound Flight</h4>
                                  <div className="flex items-start gap-4">
                                    <div className="flex flex-col items-center">
                                      <FaPlaneDeparture className="text-blue-600" />
                                      <div className="w-px h-16 bg-gray-300 my-1"></div>
                                      <FaPlaneArrival className="text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                      {/* Departure Leg */}
                                      <div className="flex justify-between mb-4">
                                        <div>
                                          <p className="font-medium">{flight.departureTime || "N/A"} • {flight.departure || "N/A"}</p>
                                          <p className="text-sm text-gray-500">{flight.departureDate || "N/A"}</p>
                                          <p className="text-sm text-gray-500">{flight.airline} • {flight.airlineCode}{flight.flightNumber}</p>
                                        </div>
                                        <div className="text-right">
                                          <p className="text-sm text-gray-500">Duration: {flight.duration || "N/A"}</p>
                                        </div>
                                      </div>

                                      {/* Layover (if any) */}
                                      {flight.stops > 0 && (
                                        <div className="bg-gray-200 p-2 rounded-lg mb-4">
                                          <p className="text-sm text-gray-600">
                                            Layover in {flight.stopCities.join(", ") || "N/A"} • Approx. 2h 30m
                                          </p>
                                        </div>
                                      )}

                                      {/* Arrival Leg */}
                                      <div className="flex justify-between">
                                        <div>
                                          <p className="font-medium">{flight.arrivalTime || "N/A"} • {flight.arrival || "N/A"}</p>
                                          <p className="text-sm text-gray-500">{flight.departureDate || "N/A"}</p>
                                          <p className="text-sm text-gray-500">{flight.airline} • {flight.airlineCode}{flight.flightNumber}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Return Flight Itinerary (if applicable) */}
                                {tripType === "return" && returnDate && flight.returnFlight && (
                                  <div>
                                    <h4 className="font-medium mb-2">Return Flight</h4>
                                    <div className="flex items-start gap-4">
                                      <div className="flex flex-col items-center">
                                        <FaPlaneDeparture className="text-blue-600" />
                                        <div className="w-px h-16 bg-gray-300 my-1"></div>
                                        <FaPlaneArrival className="text-blue-600" />
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex justify-between mb-4">
                                          <div>
                                            <p className="font-medium">{flight.returnFlight.departureTime || "N/A"} • {flight.returnFlight.departure || "N/A"}</p>
                                            <p className="text-sm text-gray-500">{flight.returnFlight.departureDate || returnDate || "N/A"}</p>
                                            <p className="text-sm text-gray-500">{flight.returnFlight.airline} • {flight.returnFlight.airlineCode}{flight.returnFlight.flightNumber}</p>
                                          </div>
                                          <div className="text-right">
                                            <p className="text-sm text-gray-500">Duration: {flight.returnFlight.duration || "N/A"}</p>
                                          </div>
                                        </div>

                                        {flight.returnFlight.stops > 0 && (
                                          <div className="bg-gray-200 p-2 rounded-lg mb-4">
                                            <p className="text-sm text-gray-600">
                                              Layover in {flight.returnFlight.stopCities.join(", ") || "N/A"} • Approx. 2h 30m
                                            </p>
                                          </div>
                                        )}

                                        <div className="flex justify-between">
                                          <div>
                                            <p className="font-medium">{flight.returnFlight.arrivalTime || "N/A"} • {flight.returnFlight.arrival || "N/A"}</p>
                                            <p className="text-sm text-gray-500">{flight.returnFlight.departureDate || returnDate || "N/A"}</p>
                                            <p className="text-sm text-gray-500">{flight.returnFlight.airline} • {flight.returnFlight.airlineCode}{flight.returnFlight.flightNumber}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </>
                            )}

                            {/* Price Breakdown */}
                            <div>
                              <h4 className="font-medium mb-2">Price Breakdown</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <p className="text-sm">Base Fare</p>
                                  <p className="text-sm">₹{(flight.price * 0.8).toLocaleString()}</p>
                                </div>
                                <div className="flex justify-between">
                                  <p className="text-sm">Taxes & Fees</p>
                                  <p className="text-sm">₹{(flight.price * 0.2).toLocaleString()}</p>
                                </div>
                                <div className="flex justify-between font-semibold border-t pt-2">
                                  <p>Total Price</p>
                                  <p>₹{flight.price.toLocaleString()}</p>
                                </div>
                              </div>
                            </div>

                            {/* Additional Information */}
                            <div>
                              <h4 className="font-medium mb-2">Additional Information</h4>
                              <div className="space-y-2">
                                {tripType === "multicity" ? (
                                  flight.multiCityFlights.map((leg, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                      <FaCalendarAlt className="text-blue-600" />
                                      <p className="text-sm">
                                        Flight {index + 1} Departure Date: {leg.departureDate || "N/A"}
                                      </p>
                                    </div>
                                  ))
                                ) : (
                                  <>
                                    <div className="flex items-center gap-2">
                                      <FaCalendarAlt className="text-blue-600" />
                                      <p className="text-sm">
                                        Departure Date: {flight.departureDate || "N/A"}
                                      </p>
                                    </div>
                                    {tripType === "return" && returnDate && (
                                      <div className="flex items-center gap-2">
                                        <FaCalendarAlt className="text-blue-600" />
                                        <p className="text-sm">
                                          Return Date: {flight.returnFlight?.departureDate || returnDate || "N/A"}
                                        </p>
                                      </div>
                                    )}
                                  </>
                                )}
                                <div className="flex items-center gap-2">
                                  <FaPlane className="text-blue-600" />
                                  <p className="text-sm">Cabin Class: {flight.cabinClass}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-xl p-8 text-center">
                  <p className="text-lg">No flights found matching your criteria.</p>
                  <p className="text-gray-600 mt-2">Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FlightCardList;
