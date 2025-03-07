import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white py-10 relative z-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">About Skyscanner</h3>
            <p className="text-sm">
              Skyscanner helps travelers find cheap flights, hotels, and car rentals worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-white ml-30">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400 transition-colors ml-30">Flights</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors ml-30">Hotels</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors ml-30">Car Hire</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="pointer-events-auto">
            <h3 className="text-xl font-semibold mb-3 text-white ml-20">Follow Us</h3>
            <div className="flex space-x-4 ml-20">
              <a href="https://www.facebook.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-400 transition-colors cursor-pointer z-50">
                Facebook
              </a>
              <a href="https://x.com/home?lang=en"
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-400 transition-colors cursor-pointer z-50">
                Twitter
              </a>
              <a href="https://www.instagram.com/?hl=en" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-400 transition-colors cursor-pointer z-50">
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6 text-sm text-white">
          &copy; 2025 Skyscanner. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
