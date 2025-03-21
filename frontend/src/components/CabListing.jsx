import React from "react";
import Header from "../components/Header"; 
import { FaSearch, FaFilter } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "./Footer";

const CabListing = () => {
  const locationState = useLocation();
  const { pickupLocation, pickupDate, dropoffDate, pickupTime, dropoffTime } = locationState.state || {};

  const [cars, setCars] = useState([]); // Stores car listings

  // Dummy car data
  useEffect(() => {
    setCars([
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
        image: "/images/sedan.jpeg",
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
        image: "/images/suv.jpeg",
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
        image: "/images/hatchback.jpeg",
      },
    ]);
  }, []);

  const [filters, setFilters] = useState({
    passengers: 0,
    carType: [],
    fuelType: [],
    luggageCapacity: [],
  });

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

  return (
    <div className="min-h-screen text-white bg-gray-100">
      {/* Header Component */}
      <Header />

      {/* Search Bar */}
      <div className=" bg-[#06152B] py-4 px-4 z-10 shadow-lg">
        <div className="flex justify-center">
          <div className="flex items-center px-6 py-3 rounded-lg w-full max-w-6xl bg-[#0C1D3D] cursor-pointer">
            <FaSearch className="text-blue-500 mr-3" size={18} />
            <p className="text-white text-sm text-center flex-1">
              {pickupLocation || "Enter Pickup Location"} • {pickupDate || "DD/MM/YYYY"}, {pickupTime || "HH:MM"} - {dropoffDate || "DD/MM/YYYY"}, {dropoffTime || "HH:MM"}
            </p>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className=" flex">

        {/* Sidebar for Filters */}
        <div className="w-1/4 p-4 bg-[#06152B] shadow-md">
          <h2 className="text-xl font-semibold mb-4">Select Filters</h2>

          {/* Number of Passengers */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Number of Passengers:</label>
            <input
              type="number"
              min="1"
              value={filters.passengers}
              onChange={(e) => setFilters({ ...filters, passengers: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Car Type */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Car Type:</label>
            {["SUV", "Sedan", "Luxury", "Hatchback"].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={type}
                  onChange={(e) => handleCheckboxChange(e, "carType")}
                  checked={filters.carType.includes(type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>

          {/* Fuel Type */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Fuel Type:</label>
            {["Petrol", "Diesel", "CNG", "Electric"].map((fuel) => (
              <label key={fuel} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={fuel}
                  onChange={(e) => handleCheckboxChange(e, "fuelType")}
                  checked={filters.fuelType.includes(fuel)}
                />
                <span>{fuel}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Car Listings */}
        <main className="w-3/4 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-black">Available Cabs</h2>
            <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
              <FaFilter /> Filter
            </button>
          </div>

          {/* Car Cards */}
          {cars.length > 0 ? (
            cars.map((car) => (
              <div key={car.id} className="bg-white p-4 shadow-lg rounded-lg mb-4 flex">
                <img src={car.image} alt={car.model} className="w-32 h-24 object-cover rounded-lg mr-4" />
                <div>
                  <h3 className="text-lg font-semibold">
                    {car.carMake} {car.model} ({car.yearOfMake})
                  </h3>
                  <p className="text-sm text-gray-500">
                    {car.type} • {car.fuelType} • {car.mileage} km/l
                  </p>
                  <p className="text-sm text-gray-700">Agency: {car.carAgency}</p>
                  <p className="text-green-600 font-semibold mt-1">
                    ₹ {car.pricePerDay}/day{" "}
                    <span className="text-gray-500 text-sm">(Agency Price: ₹{car.agencyPrice})</span>
                  </p>
                  <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg">Book Now</button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No cars available.</p>
          )}
        </main>
      </div>

       {/* Footer */}
             <Footer />
    </div>
  );
};

export default CabListing;
