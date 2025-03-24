import React from "react";
import {
    BadgeCheck,
    Star,
    Wifi,
    Coffee,
    Leaf,
    BedDouble,
    Wine,
} from "lucide-react";

const HotelCard = () => {
    const hotels = [
        {
            id: "hotel123",
            name: "The Golden Crown Hotel & Spa Colva Goa",
            location: "Colva, Goa",
            rating: 3.9,
            reviews: 1479,
            image: "/images/Hotel/Card/the-golden-palms-hotel.jpg",
            isFeatured: true,
            tags: ["Women Friendly", "Couple Friendly"],
            ecoFriendly: true,
            amenities: ["Free Breakfast", "Free WiFi", "Swimming Pool", "Bar"],
            discountedPrice: 3383,
            taxes: 595,
        },
        {
            id: "hotel124",
            name: "Marina Bay Resort",
            location: "Candolim, Goa",
            rating: 4.2,
            reviews: 980,
            image: "/images/Hotel/Card/Marina Bay Resort.jpg",
            isFeatured: false,
            tags: ["Couple Friendly"],
            ecoFriendly: false,
            amenities: ["Free WiFi", "Swimming Pool"],
            discountedPrice: 4120,
            taxes: 650,
        },
        {
            id: "hotel125",
            name: "Palm Paradise Resort",
            location: "Baga, Goa",
            rating: 4.5,
            reviews: 2305,
            image: "/images/Hotel/Card/Palm Paradise Resort.jpg",
            isFeatured: true,
            tags: ["Women Friendly"],
            ecoFriendly: true,
            amenities: ["Free Breakfast", "Bar", "Swimming Pool"],
            discountedPrice: 5200,
            taxes: 780,
        },
    ];

    // Dynamically generate star icons
    const renderStars = (rating) => {
        const stars = [];
        const starCount = Math.ceil(rating);
        for (let i = 0; i < starCount; i++) {
            stars.push(
                <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            );
        }
        return stars;
    };

    return (
        <div className="flex flex-col gap-4">
            {hotels.map((hotel) => (
                <div
                    key={hotel.id}
                    className="border rounded-xl shadow-sm flex flex-col md:flex-row bg-white overflow-hidden relative max-w-[1150px] w-full mx-auto"
                >
                    {/* Hotel Image */}
                    <div className="flex flex-col md:flex-row w-full">
                        <div className="w-full md:w-[30%] relative">
                            <img
                                src={hotel.image}
                                alt={hotel.name}
                                className="w-full h-[220px] md:h-[250px] object-cover"
                            />
                        </div>

                        {/* Divider */}
                        <div className="hidden md:block w-px bg-gray-300"></div>

                        {/* Hotel Details */}
                        <div className="flex-1 flex flex-col md:flex-row">
                            {/* Left Details */}
                            <div className="flex-1 p-4 ">
                                {/* Name + Stars */}
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-lg font-semibold">{hotel.name}</h3>
                                </div>
                                <div className="flex items-center">{renderStars(hotel.rating)}</div>

                                {/* Location */}
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500 mb-2">{hotel.location}</p>

                                    {/* Tags */}
                                    <div className="flex gap-2 mt-1 flex-wrap mb-3">
                                        {hotel.tags.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded"
                                            >
                                                {tag.toUpperCase()}
                                            </span>
                                        ))}
                                        {hotel.ecoFriendly && (
                                            <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                                <Leaf className="w-3 h-3" /> ECO+
                                            </span>
                                        )}
                                    </div>

                                    {/* Amenities */}
                                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                                        {hotel.amenities.includes("Free Breakfast") && (
                                            <div className="flex items-center gap-1">
                                                <Coffee className="w-4 h-4 text-green-600" /> Free Breakfast
                                            </div>
                                        )}
                                        {hotel.amenities.includes("Free WiFi") && (
                                            <div className="flex items-center gap-1">
                                                <Wifi className="w-4 h-4 text-green-600" /> Free WiFi
                                            </div>
                                        )}
                                        {hotel.amenities.includes("Swimming Pool") && (
                                            <div className="flex items-center gap-1">
                                                <BedDouble className="w-4 h-4 text-green-600" /> Swimming Pool
                                            </div>
                                        )}
                                        {hotel.amenities.includes("Bar") && (
                                            <div className="flex items-center gap-1">
                                                <Wine className="w-4 h-4 text-green-600" /> Bar
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Rating, Pricing, Button */}
                            <div className="flex flex-col justify-between items-center p-3 md:w-56 border-t md:border-t-0 md:border-l md:border-gray-300  md:h-[250px]">
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center gap-1 text-yellow-800 px-2 py-1 rounded text-sm mb-1">
                                        Very Good
                                        <span className="font-bold ml-1 bg-yellow-400 text-white px-1 rounded text-xs">
                                            {hotel.rating}
                                        </span>
                                    </div>

                                    <div className="text-xs text-gray-600 mb-4">
                                        {hotel.reviews.toLocaleString()} review
                                    </div>

                                </div>

                                {/* Price */}
                                <div className="flex flex-col items-center justify-center w-full">
                                    <div className="text-center mb-3">
                                        <div className="text-2xl font-bold text-gray-800 mb-1">
                                            ₹{hotel.discountedPrice} <span className="text-sm font-normal text-gray-600">/ night</span>
                                        </div>
                                        <div className="text-xs text-gray-700 font-semibold">
                                            +₹{hotel.taxes} taxes & fees
                                        </div>


                                    </div>

                                    {/* Button */}
                                    <button className="bg-red-600 text-white text-sm  py-2 rounded hover:bg-red-700 w-full">
                                        Choose Room
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HotelCard;
