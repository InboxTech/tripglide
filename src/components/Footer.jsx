import { FaInstagram, FaTwitter, FaMedium } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#06152B] text-white px-6 py-8">
      <div className="max-w-7xl container mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
          {/* Language and Currency Button */}
          <button className="bg-[#1A2C47] text-white px-6 py-3 rounded-lg w-full md:w-auto">
            India · English (UK) · ₹ INR
          </button>

          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full md:w-auto text-center md:text-left">
            {/* Column 1 */}
            <div className="flex flex-col gap-2">
              <a href="#" className="hover:underline">Help</a>
              <a href="#" className="hover:underline">Privacy Settings</a>
              <a href="/login" className="hover:underline">Log in</a>
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
              <a href="#" className="hover:underline">Cookie policy</a>
              <a href="#" className="hover:underline">Privacy policy</a>
              <a href="#" className="hover:underline">Terms of service</a>
              <a href="#" className="hover:underline">Company Details</a>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-2">
              <a href="#" className="hover:underline">Explore</a>
              <a href="#" className="hover:underline">Company</a>
              <a href="#" className="hover:underline">Partners</a>
              <a href="#" className="hover:underline">Trips</a>
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
