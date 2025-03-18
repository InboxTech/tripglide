import React, { useState } from "react";
import Header from "./Header";
import TravelDeals from "./TravelDeals";
import Footer from "./Footer";
import FeaturesSection from "./FeaturesSection";
import HotelFAQ from "./HotelFAQ";
import { FaHotel, FaCalendarAlt, FaTag, FaPlus, FaMinus, FaChevronDown } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Star } from "lucide-react";



export default function Hotels() {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [destination, setDestination] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [showGuestOptions, setShowGuestOptions] = useState(false);

  const handleCheckInDateChange = (event) => {
    setCheckInDate(event.target.value);
    if (checkOutDate && event.target.value > checkOutDate) {
      setCheckOutDate("");
    }
  };

  const handleCheckOutDateChange = (event) => {
    setCheckOutDate(event.target.value);
  };

  const isFormComplete = destination && checkInDate && checkOutDate;

  const hotelFeatures = [
    {
      icon: <FaHotel />,
      text: "Search and compare hotels in seconds – anywhere in the world",
    },
    {
      icon: <FaCalendarAlt />,
      text: "Compare deals from trusted hotel providers in one place",
    },
    {
      icon: <FaTag />,
      text: "Book a hotel with flexible booking policies or free cancellation",
    },
  ];

  const handleOption = (type, operation) => {
    if (type === "adults") {
      setAdults((prev) => (operation === "inc" ? prev + 1 : prev > 1 ? prev - 1 : 1));
    }
    if (type === "children") {
      setChildren((prev) => (operation === "inc" ? prev + 1 : prev > 0 ? prev - 1 : 0));
    }
    if (type === "rooms") {
      setRooms((prev) => (operation === "inc" ? prev + 1 : prev > 1 ? prev - 1 : 1));
    }
    
  };

  // Hotel Slider Data
  const cities = ["Mumbai", "New Delhi", "Bengaluru", "Jaipur", "Hyderabad"];
  const hotels = [
    {
      name: "The Taj Mahal Palace, Mumbai",
      distance: "14.39 km from city centre",
      rating: 4.8,
      reviews: 22,
      price: "₹18,236",
      image: "/images/taj_mumbai.jpg",
    },
    {
      name: "Hotel Marine Plaza",
      distance: "13.69 km from city centre",
      rating: 4.4,
      reviews: 13,
      price: "₹1,528",
      image: "/images/marine_plaza.webp",
    },
    {
      name: "ITC Maratha, a Luxury Collection",
      distance: "6.39 km from city centre",
      rating: 4.6,
      reviews: 29,
      price: "₹15,741",
      image: "/images/itc_maratha.png",
    },
    {
      name: "The Taj Mahal Palace, Mumbai",
      distance: "14.39 km from city centre",
      rating: 4.8,
      reviews: 22,
      price: "₹18,236",
      image: "/images/taj_mumbai.jpg",
    },
    {
      name: "Hotel Marine Plaza",
      distance: "13.69 km from city centre",
      rating: 4.4,
      reviews: 13,
      price: "₹1,528",
      image: "/images/marine_plaza.webp",
    },
    {
      name: "ITC Maratha, a Luxury Collection",
      distance: "6.39 km from city centre",
      rating: 4.6,
      reviews: 29,
      price: "₹15,741",
      image: "/images/itc_maratha.png",
    }
  ];

  const [selectedCity, setSelectedCity] = useState("Mumbai");


  

  return (
    <section className="relative w-full">
      {/* Header */}
      <Header />

      {/* Background Image */}
      <div className="absolute inset-0 hidden lg:block -z-10 h-[600px] lg:h-[800px]">
        <img
          src="/images/Heroimg.jpg"
          alt="Hotel background"
          className="w-full h-full object-cover object-center fixed"
        />
      </div>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24 mt-16">
        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8">
          Find the best hotel deals
        </h1>

        {/* Search Form */}
        <div className="bg-[#001533] p-6 rounded-2xl shadow-lg">
          <form className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 items-center">
            {/* Destination */}
            <div className="lg:col-span-2">
              <label className="block text-white font-semibold mb-1">
                Where do you want to stay?
              </label>
              <input
                type="text"
                placeholder="Enter destination or hotel name"
                className="w-full p-3 rounded-lg bg-white text-black"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            {/* Check-In */}
            <div>
              <label className="block text-white font-semibold mb-1">Check-In</label>
              <input
                type="date"
                className="w-full p-3 rounded-lg bg-white text-black"
                min={today}
                value={checkInDate}
                onChange={handleCheckInDateChange}
              />
            </div>

            {/* Check-Out */}
            <div>
              <label className="block text-white font-semibold mb-1">Check-Out</label>
              <input
                type="date"
                className="w-full p-3 rounded-lg bg-white text-black"
                min={checkInDate || today}
                value={checkOutDate}
                onChange={handleCheckOutDateChange}
                disabled={!checkInDate}
              />
            </div>

            {/* Guests & Rooms */}
            <div className="relative w-full">
              <label className="block text-white font-semibold mb-1">Guests & Rooms</label>
              <div
                className="flex justify-between items-center w-full p-3 rounded-lg bg-white text-black cursor-pointer"
                onClick={() => setShowGuestOptions(!showGuestOptions)}
              >
                <span>{`${adults} Adults, ${children} Children, ${rooms} Room`}</span>
                <FaChevronDown className={`transition-transform duration-300 ${showGuestOptions ? "rotate-180" : ""}`} />
              </div>

              {/* Dropdown */}
              {showGuestOptions && (
                <div className="absolute bg-white shadow-lg rounded-lg p-4 w-full top-20 z-10 mt-7">
                  {/* Adults */}
                  <div className="flex justify-between items-center mb-4">
                    <span>Adults</span>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => handleOption("adults", "dec")}
                        className="p-2 bg-gray-200 rounded"
                      >
                        <FaMinus />
                      </button>
                      <span>{adults}</span>
                      <button
                        type="button"
                        onClick={() => handleOption("adults", "inc")}
                        className="p-2 bg-gray-200 rounded"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex justify-between items-center mb-4">
                    <span>Children</span>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => handleOption("children", "dec")}
                        className="p-2 bg-gray-200 rounded"
                      >
                        <FaMinus />
                      </button>
                      <span>{children}</span>
                      <button
                        type="button"
                        onClick={() => handleOption("children", "inc")}
                        className="p-2 bg-gray-200 rounded"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>

                  {/* Rooms */}
                  <div className="flex justify-between items-center mb-4">
                    <span>Rooms</span>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => handleOption("rooms", "dec")}
                        className="p-2 bg-gray-200 rounded"
                      >
                        <FaMinus />
                      </button>
                      <span>{rooms}</span>
                      <button
                        type="button"
                        onClick={() => handleOption("rooms", "inc")}
                        className="p-2 bg-gray-200 rounded"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="text-blue-600 font-semibold mt-2"
                    onClick={() => setShowGuestOptions(false)}
                  >
                    Done
                  </button>
                </div>
              )}
            </div>

            {/* Options */}
            <div className="lg:col-span-5 flex flex-wrap gap-4 items-center mt-4">
              <label className="flex items-center text-white">
                <input type="checkbox" className="mr-2" defaultChecked />
                Free cancellation
              </label>

              <label className="flex items-center text-white">
                <input type="checkbox" className="mr-2" />
                4 stars
              </label>

              <label className="flex items-center text-white">
                <input type="checkbox" className="mr-2" />
                3 stars
              </label>

              <button
                type="submit"
                className={`ml-auto px-6 py-3 font-semibold rounded-lg transition ${isFormComplete
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-300 text-gray-200 cursor-not-allowed"
                  }`}
                disabled={!isFormComplete}
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white">
        <div className="container mx-auto max-w-7xl px-8 pt-5">
          <nav className="text-sm">
            <a href="/" className="text-blue-600 hover:underline">
              Home
            </a>
            <span className="mx-2 text-gray-400">›</span>
            <span className="text-gray-600">Hotels</span>
          </nav>
        </div>
        <div className="container mx-auto max-w-7xl">
          <FeaturesSection features={hotelFeatures} />
        </div>
      </div>

      {/* Hotel section */}
      <div className="w-full bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-10 bg-gray-100 w-full">
        <h2 className="text-3xl font-bold mb-2">Hotels in your home country</h2>
        <p className="text-gray-600 mb-6">
          Your next adventure may be closer than you think. Discover hotels just beyond your doorstep.
        </p>

        {/* City Filter */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-full border ${selectedCity === city
                ? "bg-blue-900 text-white"
                : "text-gray-700 bg-white"
                }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {hotels.map((hotel, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">{hotel.name}</h3>
                  <p className="text-sm text-gray-500">{hotel.distance}</p>
                  <div className="flex items-center mt-2">
                    <span className="font-bold mr-1">{hotel.rating}</span>/5
                    <span className="mx-2 text-sm font-medium text-green-700">
                      {hotel.rating >= 4.5 ? "Excellent" : "Very good"}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({hotel.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex mt-1 text-red-500">
                    {Array.from({ length: Math.round(hotel.rating) }).map(
                      (_, idx) => (
                        <Star key={idx} size={16} fill="#ef4444" strokeWidth={0} />
                      )
                    )}
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="font-bold text-lg">{hotel.price}</span>
                    <span className="text-sm text-gray-500">Per night</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      </div>


      {/* Travel Deals */}
      <section className="bg-white">
        <TravelDeals />
      </section>

      {/* Advantages */}
      <section className="bg-gray-100 py-12 px-6 md:px-12">
        <div className="max-w-7xl container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-serif">
            Looking for the best hotel deals worldwide?
          </h2>
          <p className="text-gray-600 mb-10 font-serif">
            Compare hotel prices from top booking sites in one place. With flexible options and no hidden fees,
            booking your perfect stay has never been easier – here’s why.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Wide Selection */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg">
              <img
                src="https://cdn-icons-png.flaticon.com/512/168/168812.png"
                alt="Wide Selection"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-lg font-bold font-serif">Wide Selection, Best Prices</h3>
              <p className="text-gray-600 mt-2 font-serif">
                Choose from thousands of hotels, resorts, and apartments worldwide. Find the perfect stay at the best price.
              </p>
            </div>

            {/* No Hidden Fees */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2910/2910791.png"
                alt="No Hidden Fees"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-lg font-bold font-serif">No Hidden Fees, No Surprises</h3>
              <p className="text-gray-600 mt-2 font-serif">
                The price you see is the price you pay. No unexpected charges – just clear, transparent hotel pricing.
              </p>
            </div>

            {/* Free Cancellation */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg">
              <img
                src="https://cdn-icons-png.flaticon.com/512/709/709790.png"
                alt="Free Cancellation"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-lg font-bold font-serif">Free Cancellation on Most Bookings</h3>
              <p className="text-gray-600 mt-2 font-serif">
                Plans changed? No worries! Many hotels offer free cancellation, so you can book with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      

      {/* Hotel FAQ */}
      <div className="bg-white">
        <HotelFAQ />
      </div>

      {/* Footer */}
      <Footer />
    </section>
  );
}
