import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import CabPopup from "./CabPopup";

const CabListing = () => {
  const locationState = useLocation();
  const { pickupLocation, pickupDate, dropoffDate, pickupTime, dropoffTime } = locationState.state || {};

  // State for the search popup
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const [formPickupLocation, setFormPickupLocation] = useState(pickupLocation || '');
  const [formPickupDate, setFormPickupDate] = useState(pickupDate || '');
  const [formPickupTime, setFormPickupTime] = useState(pickupTime || '');
  const [formDropoffDate, setFormDropoffDate] = useState(dropoffDate || '');
  const [formDropoffTime, setFormDropoffTime] = useState(dropoffTime || '');
  const [isDifferentLocation, setIsDifferentLocation] = useState(false);
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [isDriverAgeValid, setIsDriverAgeValid] = useState(true);

  const handleSearchSubmit = () => {
    setIsSearchPopupOpen(false);
  };

  const [cars, setCars] = useState([]); // Stores car listings
  const [filteredCars, setFilteredCars] = useState([]); // Stores filtered car listings
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State for mobile filter toggle

  // Dummy car data with 6 additional cars
  useEffect(() => {
    const initialCars = [
      {
        id: 1,
        carMake: "Toyota",
        model: "Corolla",
        type: "Sedan",
        mileage: "15",
        yearOfMake: 2022,
        pricePerDay: 2500,
        carAgency: "ZoomCar",
        agencyPrice: 2200,
        fuelType: "Petrol",
        transmission: "Automatic",
        image: "/images/sedan.jpeg",
        passengers: 4,
      },
      {
        id: 2,
        carMake: "Hyundai",
        model: "Creta",
        type: "SUV",
        mileage: "12",
        yearOfMake: 2023,
        pricePerDay: 3000,
        carAgency: "Drivezy",
        agencyPrice: 2800,
        fuelType: "Diesel",
        transmission: "Manual",
        image: "/images/suv.jpeg",
        passengers: 5,
      },
      {
        id: 3,
        carMake: "Hyundai",
        model: "Creta",
        type: "Hatchback",
        mileage: "18",
        yearOfMake: 2023,
        pricePerDay: 3400,
        carAgency: "Drivezy",
        agencyPrice: 2800,
        fuelType: "Diesel",
        transmission: "Automatic",
        image: "/images/hatchback.jpeg",
        passengers: 4,
      },
      {
        id: 4,
        carMake: "Mercedes-Benz",
        model: "C-Class",
        type: "Luxury",
        mileage: "10",
        yearOfMake: 2023,
        pricePerDay: 6000,
        carAgency: "LuxuryRides",
        agencyPrice: 5500,
        fuelType: "Petrol",
        transmission: "Automatic",
        image: "/images/Mercedes Benz CLE Coupe.jpeg",
        passengers: 4,
      },
      {
        id: 5,
        carMake: "Tata",
        model: "Nexon EV",
        type: "Hatchback",
        mileage: "N/A",
        yearOfMake: 2023,
        pricePerDay: 3800,
        carAgency: "EcoDrive",
        agencyPrice: 3500,
        fuelType: "Electric",
        transmission: "Automatic",
        image: "/images/2023 டாடா நெக்ஸான்_இவி எஸ்யூவி அறிமுகம்.jpeg",
        passengers: 5,
      },
      {
        id: 6,
        carMake: "Maruti Suzuki",
        model: "Dzire",
        type: "Sedan",
        mileage: "20",
        yearOfMake: 2022,
        pricePerDay: 2200,
        carAgency: "ZoomCar",
        agencyPrice: 2000,
        fuelType: "CNG",
        transmission: "Manual",
        image: "/images/AutoMowheelz - Automobile News, Car Reviews, Latest Bike Launches.jpeg",
        passengers: 4,
      },
      {
        id: 7,
        carMake: "Mahindra",
        model: "XUV700",
        type: "SUV",
        mileage: "13",
        yearOfMake: 2023,
        pricePerDay: 4500,
        carAgency: "Drivezy",
        agencyPrice: 4200,
        fuelType: "Diesel",
        transmission: "Automatic",
        image: "/images/Mahindra XUV 3XO compact SUV launched in India from INR 7_49 Lakh _ AUTOBICS.jpeg",
        passengers: 7,
      },
      {
        id: 8,
        carMake: "BMW",
        model: "X5",
        type: "Luxury",
        mileage: "9",
        yearOfMake: 2023,
        pricePerDay: 8000,
        carAgency: "LuxuryRides",
        agencyPrice: 7500,
        fuelType: "Petrol",
        transmission: "Automatic",
        image: "/images/BMW X5 model of 2018 recalled.jpeg",
        passengers: 5,
      },
      {
        id: 9,
        carMake: "MG",
        model: "ZS EV",
        type: "SUV",
        mileage: "N/A",
        yearOfMake: 2023,
        pricePerDay: 4200,
        carAgency: "EcoDrive",
        agencyPrice: 3900,
        fuelType: "Electric",
        transmission: "Automatic",
        image: "/images/MG ZS EV Review_ Performance and Features Explained.jpeg",
        passengers: 5,
      },
    ];
    setCars(initialCars);
    setFilteredCars(initialCars); // Initialize filtered cars
  }, []);

  const [filters, setFilters] = useState({
    passengers: 1,
    carType: [],
    fuelType: [],
    transmission: "all",
    priceRange: [2000, 8000], // Updated max range to accommodate new cars
    carAgency: [],
  });

  // Apply filters to car listings
  useEffect(() => {
    let results = [...cars];

    // Filter by number of passengers
    if (filters.passengers) {
      results = results.filter(car => car.passengers >= parseInt(filters.passengers));
    }

    // Filter by car type
    if (filters.carType.length > 0) {
      results = results.filter(car => filters.carType.includes(car.type));
    }

    // Filter by fuel type
    if (filters.fuelType.length > 0) {
      results = results.filter(car => filters.fuelType.includes(car.fuelType));
    }

    // Filter by transmission
    if (filters.transmission !== "all") {
      results = results.filter(car => car.transmission === filters.transmission);
    }

    // Filter by price range
    results = results.filter(car => 
      car.pricePerDay >= filters.priceRange[0] && car.pricePerDay <= filters.priceRange[1]
    );

    // Filter by car agency
    if (filters.carAgency.length > 0) {
      results = results.filter(car => filters.carAgency.includes(car.carAgency));
    }

    setFilteredCars(results);
  }, [filters, cars]);

  const handleCheckboxChange = (e, category) => {
    const value = e.target.value;
    const checked = e.target.checked;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: checked
        ? [...prevFilters[category], value]
        : prevFilters[category].filter((item) => item !== value),
    }));
  };

  // Unique car agencies for filter
  const carAgencies = [...new Set(cars.map(car => car.carAgency))];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Search Bar */}
      <div className="bg-[#06152B] py-4 px-4 z-10 shadow-lg">
        <div className="flex justify-center">
          <div
            className="flex items-center px-6 py-3 rounded-lg w-full max-w-6xl bg-[#0C1D3D] cursor-pointer"
            onClick={() => setIsSearchPopupOpen(true)}
          >
            <FaSearch className="text-blue-500 mr-3" size={18} />
            <p className="text-white text-sm text-center flex-1">
              {formPickupLocation || "Enter Pickup Location"} • {formPickupDate || "DD/MM/YYYY"}, {formPickupTime || "HH:MM"} - {formDropoffDate || "DD/MM/YYYY"}, {formDropoffTime || "HH:MM"}
            </p>
          </div>
        </div>
      </div>

      {/* Search Form Popup */}
      <CabPopup
        isOpen={isSearchPopupOpen}
        onClose={() => setIsSearchPopupOpen(false)}
        pickupLocation={formPickupLocation}
        setPickupLocation={setFormPickupLocation}
        pickupDate={formPickupDate}
        setPickupDate={setFormPickupDate}
        pickupTime={formPickupTime}
        setPickupTime={setFormPickupTime}
        dropoffDate={formDropoffDate}
        setDropoffDate={setFormDropoffDate}
        dropoffTime={formDropoffTime}
        setDropoffTime={setFormDropoffTime}
        isDifferentLocation={isDifferentLocation}
        setIsDifferentLocation={setIsDifferentLocation}
        dropoffLocation={dropoffLocation}
        setDropoffLocation={setDropoffLocation}
        isDriverAgeValid={isDriverAgeValid}
        setIsDriverAgeValid={setIsDriverAgeValid}
        handleSearch={handleSearchSubmit}
      />

      {/* Page Content */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Available Cabs Heading and Mobile Filter Toggle */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">Available Cabs</h2>
          <button 
            className="flex items-center md:hidden bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <FaFilter className="mr-2" /> Filters
          </button>
        </div>

        {/* Filters and Car Listings */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar for Filters */}
          <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block bg-white rounded-xl shadow-md p-6 md:w-1/4 md:sticky md:top-20 h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200`}>
            <h3 className="text-lg font-bold mb-4 text-black">Filters</h3>

            {/* Number of Passengers */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2 text-black">Number of Passengers</h4>
              <input
                type="number"
                min="1"
                value={filters.passengers}
                onChange={(e) => setFilters({ ...filters, passengers: e.target.value })}
                className="w-full p-2 border rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Car Type */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2 text-black">Car Type</h4>
              <div className="space-y-2">
                {["SUV", "Sedan", "Luxury", "Hatchback"].map((type) => (
                  <label key={type} className="flex items-center cursor-pointer text-black">
                    <input
                      type="checkbox"
                      value={type}
                      onChange={(e) => handleCheckboxChange(e, "carType")}
                      checked={filters.carType.includes(type)}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Fuel Type */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2 text-black">Fuel Type</h4>
              <div className="space-y-2">
                {["Petrol", "Diesel", "CNG", "Electric"].map((fuel) => (
                  <label key={fuel} className="flex items-center cursor-pointer text-black">
                    <input
                      type="checkbox"
                      value={fuel}
                      onChange={(e) => handleCheckboxChange(e, "fuelType")}
                      checked={filters.fuelType.includes(fuel)}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span>{fuel}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Transmission Type */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2 text-black">Transmission Type</h4>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer text-black">
                  <input 
                    type="radio" 
                    name="transmission" 
                    value="all"
                    checked={filters.transmission === "all"} 
                    onChange={() => setFilters({ ...filters, transmission: "all" })} 
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  All
                </label>
                <label className="flex items-center cursor-pointer text-black">
                  <input 
                    type="radio" 
                    name="transmission" 
                    value="Automatic"
                    checked={filters.transmission === "Automatic"} 
                    onChange={() => setFilters({ ...filters, transmission: "Automatic" })} 
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  Automatic
                </label>
                <label className="flex items-center cursor-pointer text-black">
                  <input 
                    type="radio" 
                    name="transmission" 
                    value="Manual"
                    checked={filters.transmission === "Manual"} 
                    onChange={() => setFilters({ ...filters, transmission: "Manual" })} 
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  Manual
                </label>
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2 text-black">Price Range (₹/day)</h4>
              <div className="flex justify-between text-sm mb-1 text-black">
                <span>₹{filters.priceRange[0].toLocaleString()}</span>
                <span>₹{filters.priceRange[1].toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="2000" 
                max="8000" 
                step="100"
                value={filters.priceRange[0]}
                onChange={(e) => setFilters({ ...filters, priceRange: [parseInt(e.target.value), filters.priceRange[1]] })}
                className="w-full mb-2 cursor-pointer"
              />
              <input 
                type="range" 
                min="2000" 
                max="8000" 
                step="100"
                value={filters.priceRange[1]}
                onChange={(e) => setFilters({ ...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value)] })}
                className="w-full cursor-pointer"
              />
            </div>

            {/* Car Agency */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2 text-black">Car Agency</h4>
              <div className="space-y-2">
                {carAgencies.map((agency) => (
                  <label key={agency} className="flex items-center cursor-pointer text-black">
                    <input
                      type="checkbox"
                      value={agency}
                      onChange={(e) => handleCheckboxChange(e, "carAgency")}
                      checked={filters.carAgency.includes(agency)}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span>{agency}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Car Listings */}
          <main className="w-full md:w-3/4">
            {/* Car Cards */}
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <div key={car.id} className="bg-white p-4 shadow-lg rounded-xl mb-4 flex hover:shadow-xl transition-shadow">
                  <img src={car.image} alt={car.model} className="w-32 h-24 object-cover rounded-lg mr-4" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-black">
                      {car.carMake} {car.model} ({car.yearOfMake})
                    </h3>
                    <p className="text-sm text-gray-500">
                      {car.type} • {car.fuelType} • {car.transmission} • {car.mileage} km/l • Seats: {car.passengers}
                    </p>
                    <p className="text-sm text-gray-700">Agency: {car.carAgency}</p>
                    <p className="text-green-600 font-semibold mt-1">
                      ₹ {car.pricePerDay.toLocaleString()}/day{" "}
                      <span className="text-gray-500 text-sm">(Agency Price: ₹{car.agencyPrice.toLocaleString()})</span>
                    </p>
                    <button className="mt-2 bg-blue-600 text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-blue-700 transition">
                      Book Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl p-8 text-center">
                <p className="text-lg text-black">No cars found matching your criteria.</p>
                <p className="text-gray-600 mt-2">Try adjusting your filters.</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CabListing;