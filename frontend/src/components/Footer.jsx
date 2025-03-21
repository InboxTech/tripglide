import { FaInstagram, FaTwitter, FaMedium } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#06152B] text-white px-6 py-8">
      <div className="max-w-7xl container mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
          {/* About Us */}
          <div className="bg-[#06214a] text-white px-6 py-3 rounded-lg w-full md:w-auto">
          <h2 className="text-lg font-semibold font-serif text-center md:text-left">About Us</h2>
          <p className="mt-2 font-normal text-sm text-center md:text-left max-w-xl md:max-w-lg leading-relaxed">
            Tripglide is a travel website project designed to help<br className="hidden sm:inline" /> 
            users find the best flights, hotels, and car hire deals.<br className="hidden sm:inline" /> 
            Our goal is to make travel seamless and affordable.
          </p>
        </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full md:w-auto text-center md:text-left">
            {/* Column 1 */}
            <div className="flex flex-col gap-2">
              <a href="/helppage" className="hover:underline">Help</a>
              {/* <a href="#" className="hover:underline">Privacy Settings</a> */}
              {/* <a href="/signin" className="hover:underline">SignIn</a> */}
              {/* Social Media Icons */}
              <div className="flex justify-center md:justify-start gap-4 mt-2">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E4405F] transition duration-300">
                  <FaInstagram size={20} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#1DA1F2] transition duration-300">
                  <FaTwitter size={20} />
                </a>
                <a href="https://medium.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 transition duration-300">
                  <FaMedium size={20} />
                </a>
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-2">
              {/* <a href="#" className="hover:underline">Cookie policy</a> */}
              <a href="#" className="hover:underline">Privacy policy</a>
              {/* <a href="#" className="hover:underline">Terms of service</a> */}
              <a href="https://inboxtechs.com/" target="_blank" className="hover:underline">Company Details</a>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-2">
              {/* <a href="#" className="hover:underline">Explore</a> */}
              <a href="https://inboxtechs.com/" target="_blank" className="hover:underline">Company</a>
              {/* <a href="#" className="hover:underline">Partners</a> */}
              <a href="/" className="hover:underline">Trips</a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-8 border-t border-gray-600 pt-4">
          © Tripglide Ltd 2025
        </div>
      </div>
    </footer>
  );
}
