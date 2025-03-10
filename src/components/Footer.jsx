import { FaInstagram, FaTwitter, FaMedium } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#06152B] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between flex-wrap">
          <button className="bg-[#1A2C47] text-white px-6 py-3 rounded-lg">India · English (UK) · ₹ INR</button>

          <div className="flex gap-16">
            <div className="flex flex-col gap-4">
              <a href="#" className="hover:underline">Help</a>
              <a href="#" className="hover:underline">Privacy Settings</a>
              <a href="/login" className="hover:underline">Log in</a>
              {/* Social Media Icons */}
              <div className="flex gap-4 mt-1">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"  className="hover:text-[#E4405F] transition-colors duration-300">
                  <FaInstagram size={20} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"  className="hover:text-[#1DA1F2] transition-colors duration-300">
                  <FaTwitter size={20} />
                </a>
                <a href="https://medium.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 transition-colors duration-300">
                  <FaMedium size={20} />
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <a href="#" className="hover:underline">Cookie policy</a>
              <a href="#" className="hover:underline">Privacy policy</a>
              <a href="#" className="hover:underline">Terms of service</a>
              <a href="#" className="hover:underline">Company Details</a>
            </div>

            <div className="flex flex-col gap-4">
              <a href="#" className="hover:underline">Explore</a>
              <a href="#" className="hover:underline">Company</a>
              <a href="#" className="hover:underline">Partners</a>
              <a href="#" className="hover:underline">Trips</a>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          © Tripglide Ltd 2025
        </div>
      </div>
    </footer>
  );
}