import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import TravelersCabinClass from "./TravelersCabinClass"; // Import Travelers and Cabin Component

export default function SearchSection() {
    const [tripType, setTripType] = useState("return");
    const [from, setFrom] = useState(""); // Removed default value, added placeholder
    const [to, setTo] = useState(""); // Removed default value, added placeholder
    const [departDate, setDepartDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [multiCityFlights, setMultiCityFlights] = useState([
        { id: 1, from: "", to: "", depart: "" },
        { id: 2, from: "", to: "", depart: "" }
    ]);
    {/* Calculate if search button should be disabled */}
    const isMultiCityValid = multiCityFlights.every(flight => flight.from && flight.to && flight.depart);
    const isOneWayValid = from && to && departDate;
    const isReturnValid = isOneWayValid && returnDate;

    // Disable logic based on trip type
    const isSearchDisabled =
        (tripType === "multicity" && !isMultiCityValid) ||
        (tripType === "oneway" && !isOneWayValid) ||
        (tripType === "return" && !isReturnValid);

    // Function to swap from and to values
    const swapLocations = () => {
        setFrom((prevFrom) => {
            setTo(prevFrom);
            return to;
        });
    };

     // Function to add flight in Multi-city
     const addMultiCityFlight = () => {
        if (multiCityFlights.length < 6) {
            setMultiCityFlights([...multiCityFlights, { id: Date.now(), from: "", to: "", depart: "" }]);
        }
    };

    // Function to remove flight in Multi-city
    const removeMultiCityFlight = (id) => {
        setMultiCityFlights(multiCityFlights.filter(flight => flight.id !== id));
    };

    // Get today's date in YYYY-MM-DD format for min restriction
    const today = new Date().toISOString().split("T")[0];

    return (
        <section className="relative w-full">
            {/* Header */}
            <Header />

            {/* Background Image */}
             <div className="absolute inset-0 block -z-10">
                <img
                    src="/public/images/benjamin-voros-phIFdC6lA4E-unsplash.jpg"
                    alt="Flight booking background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Hero Content */}
            <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8">
                    The best flight offers from anywhere, to everywhere
                </h1>

                {/* Search Form */}
                <div className="bg-[#001533] p-6 rounded-2xl shadow-lg">
                    {/* Radio Buttons */}
                    <div className="flex gap-6 text-white mb-4">
                        <label className="flex items-center cursor-pointer">
                            <input type="radio" name="tripType" className="mr-2" checked={tripType === "return"} onChange={() => setTripType("return")} /> Return
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input type="radio" name="tripType" className="mr-2" checked={tripType === "oneway"} onChange={() => setTripType("oneway")} /> One way
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input type="radio" name="tripType" className="mr-2" checked={tripType === "multicity"} onChange={() => setTripType("multicity")} /> Multi-city
                        </label>
                    </div>

                     {/* Conditional Forms */}
                     {tripType === "multicity" ? (
                        // Multi-City Form
                        <form className="space-y-4">
                        {multiCityFlights.map((flight, index) => (
                            <div key={flight.id} className="flex flex-wrap md:flex-nowrap gap-4 items-center">
                                {/* From */}
                                <input 
                                    type="text" 
                                    placeholder="From" 
                                    value={flight.from} 
                                    required
                                    onChange={(e) => {
                                        const updatedFlights = [...multiCityFlights];
                                        updatedFlights[index].from = e.target.value;
                                        setMultiCityFlights(updatedFlights);
                                    }} 
                                    className="w-full md:w-1/3 p-3 rounded-lg bg-white text-black"
                                />
                
                                {/* To */}
                                <input 
                                    type="text" 
                                    placeholder="To" 
                                    value={flight.to}
                                    required 
                                    onChange={(e) => {
                                        const updatedFlights = [...multiCityFlights];
                                        updatedFlights[index].to = e.target.value;
                                        setMultiCityFlights(updatedFlights);
                                    }} 
                                    className="w-full md:w-1/3 p-3 rounded-lg bg-white text-black"
                                />
                
                                {/* Depart Date */}
                                <input 
                                        type="date" 
                                        min={index === 0 ? today : multiCityFlights[index - 1].depart || today} // Only allow today or after previous flight date
                                        value={flight.depart} 
                                        required
                                        onChange={(e) => {
                                            const updatedFlights = [...multiCityFlights];
                                            updatedFlights[index].depart = e.target.value;
                                            setMultiCityFlights(updatedFlights);
                                        }} 
                                        className="w-full md:w-1/4 p-3 rounded-lg bg-white text-black cursor-pointer"
                                    />
                
                                {/* Cross Button for Removing Flight */}
                                <button 
                                    type="button"
                                    onClick={() => removeMultiCityFlight(flight.id)}
                                    disabled={index < 2} // Disabling first two buttons
                                    className={`text-white px-4 py-2 rounded-lg transition 
                                        ${index < 2 ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-700 cursor-pointer"}`}
                                >
                                    ✖
                                </button>
                            </div>
                        ))}
                
                        {/* Add Flight Button */}
                        {multiCityFlights.length < 6 && (
                            <button 
                                type="button" 
                                onClick={addMultiCityFlight} 
                                className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-400 transition cursor-pointer"
                            >
                                ➕ Add another flight
                            </button>
                        )}
                
                        {/* Travelers & Search */}
                        <div className="flex flex-wrap md:flex-nowrap items-center gap-4 mt-4">
                            <div className="flex-1">
                                <TravelersCabinClass />
                            </div>
                            <button 
                                type="submit" 
                                disabled={isSearchDisabled}
                                className={`mt-5 px-6 py-3 font-semibold rounded-lg transition 
                                    ${isSearchDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                            >
                                Search
                            </button>
                        </div>
                    </form>
                    ) : (
                    

                    // Return, One Way
                    <form className="flex flex-wrap gap-3 items-center">
                        {/* From */}
                        <div className="flex-1">
                            <label className="block text-white font-semibold mb-1">From</label>
                            <input type="text" required placeholder="Enter your city" value={from} onChange={(e) => setFrom(e.target.value)} className="w-full p-3 rounded-lg bg-white text-black" />
                        </div>

                        {/* Swap Button */}
                        <div className="flex mt-7 justify-center items-center">
                            <button type="button" onClick={swapLocations} className="bg-white hover:bg-gray-400 p-2 rounded-full">⇄</button>
                        </div>

                        {/* To */}
                        <div className="flex-1">
                            <label className="block required: text-white font-semibold mb-1">To</label>
                            <input type="text" placeholder="Enter your city" value={to} onChange={(e) => setTo(e.target.value)} className="w-full p-3 rounded-lg bg-white text-black" />
                        </div>

                        {/* Depart */}
                        <div className="flex-1">
                                <label className="block text-white font-semibold mb-1">Depart</label>
                                <input
                                    type="date"
                                    min={today} 
                                    value={departDate}
                                    required
                                    onChange={(e) => {
                                        setDepartDate(e.target.value);
                                        setReturnDate(""); // Reset return when depart changes
                                    }}
                                    className="w-full p-3 rounded-lg bg-white text-black cursor-pointer"
                                />
                            </div>

                        {/* Return - Removed if One Way */}
                        {tripType !== "oneway" && (
                            <div className="flex-1">
                            <label className="block text-white font-semibold mb-1">Return</label>
                            <input
                                type="date"
                                min={departDate || today} 
                                value={returnDate}
                                required
                                onChange={(e) => setReturnDate(e.target.value)}
                                disabled={!departDate} 
                                className={`w-full p-3 rounded-lg bg-white text-black ${!departDate ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                            />
                        </div>
                        )}

                        {/* Travelers and Cabin */}
                        <div className="flex-1">
                            <TravelersCabinClass />
                        </div>

                        {/* Search Button */}
                        <div className="flex-1">
                        <button
                            type="submit"
                            disabled={isSearchDisabled}
                            className={`w-full mt-6 px-6 py-3 font-semibold rounded-lg transition 
                                ${isSearchDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"}`}
                        >
                            Search
                        </button>
                        </div>
                        </form>
                    )}
    
                    {/* Checkbox Options */}
                    {tripType !== "multicity" && (
                    <div className="flex flex-wrap gap-4 items-center mt-4 text-white">
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="mr-2" /> Add nearby airports
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="mr-2" /> Direct flights only
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="mr-2" /> Flexible Tickets
                        </label>
                    </div>
                )}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </section>
    );
}
