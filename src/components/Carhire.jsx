import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function CarHire() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-4">Car Hire</h1>
    
        {/* Empty Div for Future Components */}
        <div className="border border-gray-300 p-4 rounded-lg">
          {/* Add your car hire components here */}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
