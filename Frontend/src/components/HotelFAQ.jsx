import React, { useState, useEffect } from "react";

const hotelFaqs = [
  { question: "How do I book a hotel with Tripglide?", answer: "We compare hotel prices from top booking sites. Once you find the best deal, we redirect you to the provider’s site to complete your booking." },
  { question: "Can I book a hotel with free cancellation?", answer: "Yes! Many hotel options on Tripglide offer free cancellation. Always check the provider’s cancellation policy before booking." },
  { question: "Do I need a credit card to book a hotel?", answer: "Most hotels require a credit card to confirm your booking, though some allow alternative payment methods. Check the provider’s terms." },
  { question: "Are taxes and fees included in the hotel price?", answer: "Tripglide shows total prices where possible, but some providers may add taxes and fees. Always review the final price before booking." },
  { question: "Can I modify or cancel my hotel booking?", answer: "This depends on the hotel’s policy. If free cancellation is available, you can modify or cancel your booking without extra fees before the deadline." },
  { question: "How do I find the best hotel deals?", answer: "Use Tripglide’s filters to compare prices, star ratings, guest reviews, and amenities. Booking early often gets you the best rates." },
  { question: "Are there any hidden charges?", answer: "Tripglide aims for price transparency. However, some hotels may charge additional fees like resort fees. Check the booking details carefully." },
  { question: "Can I book family rooms or suites?", answer: "Yes! Tripglide allows you to search for specific room types including family rooms, suites, and apartments based on your preferences." },
  { question: "Is breakfast included in the hotel price?", answer: "Some hotels include breakfast in the room rate, while others charge extra. Filter your search to find hotels offering free breakfast." },
  { question: "Can I book hotels for group stays?", answer: "Yes, many hotels accommodate group bookings. It’s best to contact the hotel directly for special rates and arrangements." }
];

const HotelFAQ = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
    console.log("Updated openIndex:", openIndex);
  };

  useEffect(() => {
    console.log("State changed, openIndex is now:", openIndex);
  }, [openIndex]);

  return (
    <div className="max-w-7xl container mx-auto p-6 pointer-events-auto">
      <h2 className="text-2xl font-bold font-serif mb-6">Hotel Booking with Tripglide</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hotelFaqs.map((faq, index) => (
          <div key={index} className="border-b pb-4">
            <button
              className="w-full text-left font-semibold py-2 flex justify-between items-center cursor-pointer pointer-events-auto"
              onClick={() => toggleFAQ(index)}
              style={{
                pointerEvents: "auto !important",
                cursor: "pointer !important",
                zIndex: 999,
              }}
            >
              {faq.question}
              <span>{openIndex === index ? "−" : "+"}</span>
            </button>
            <p
              className={`mt-2 text-gray-600 transition-all duration-300 ease-in-out ${
                openIndex === index ? "block opacity-100 max-h-40" : "hidden opacity-0 max-h-0"
              }`}
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelFAQ;
