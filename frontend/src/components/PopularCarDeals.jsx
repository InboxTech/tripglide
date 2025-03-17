import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const carDeals = [
  { city: "Dubai", img: "https://source.unsplash.com/400x250/?dubai", price: "₹1,135", carType: "Economy" },
  { city: "Bangkok", img: "https://source.unsplash.com/400x250/?bangkok", price: "₹1,729", carType: "Economy" },
  { city: "Pune", img: "https://source.unsplash.com/400x250/?pune", price: "₹2,794", carType: "Economy" },
  { city: "New York", img: "https://source.unsplash.com/400x250/?newyork", price: "₹3,200", carType: "SUV" },
  { city: "London", img: "https://source.unsplash.com/400x250/?london", price: "₹2,900", carType: "Luxury" },
  { city: "Sydney", img: "https://source.unsplash.com/400x250/?sydney", price: "₹1,950", carType: "Compact" },
];

const PopularCarDeals = () => {
  return (
    <div className="relative px-6 py-10">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">Popular car rental destinations</h2>

      {/* Navigation Arrows */}
      <div className="absolute top-0 right-0 flex space-x-2">
        <button className="swiper-button-prev bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <button className="swiper-button-next bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300">
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        navigation={{
          nextEl: ".swiper-button-prev",
          prevEl: ".swiper-button-next",
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {carDeals.map((deal, index) => (
          <SwiperSlide key={index}>
            <motion.div
              whileHover={{ scale: 1, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer py-3"
            >
              <img src={deal.img} alt={deal.city} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold">Car hire in {deal.city}</h3>
                <p className="text-gray-600">
                  Most popular car type: <strong>{deal.carType}</strong>
                </p>
                <p className="mt-2 font-bold text-lg">From {deal.price} per day</p>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Info Box */}
      <div className="mt-4 p-4 bg-gray-100 rounded-md text-gray-700 flex items-center">
        <span className="text-xl">ℹ️</span>
        <p className="ml-2">
          These are estimated prices based on the lowest <strong>car rental</strong> prices found in the last 15 days.
        </p>
      </div>
    </div>
  );
};

export default PopularCarDeals;
