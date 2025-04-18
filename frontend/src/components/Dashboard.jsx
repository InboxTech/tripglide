import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaUser,
  FaBars,
  FaEdit,
  FaLock,
  FaMobileAlt,
  FaSignOutAlt,
  FaUsers,
  FaLaptop,
  FaPlane,
  FaHotel,
  FaCar,
  FaTimesCircle,
} from "react-icons/fa";
import { HiMiniTicket } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [coTravellers, setCoTravellers] = useState([]);
  const [devices, setDevices] = useState([]);
  const [newTraveller, setNewTraveller] = useState({ name: "", relationship: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [verificationData, setVerificationData] = useState({ identifier: "", code: "" });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [activeSection, setActiveSection] = useState("Profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Booking history states
  const [flightBookings, setFlightBookings] = useState([]);
  const [hotelBookings, setHotelBookings] = useState([]);
  const [carRentals, setCarRentals] = useState([]);
  const [historyTab, setHistoryTab] = useState("Flights");
  const [dropdownOpen, setDropdownOpen] = useState({
    flight: null,
    hotel: null,
    car: null,
  });
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, id: null, type: null });

  const API_URL = "http://localhost:5000/api";

  const statesList = [
    "Andaman and Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
    "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand",
    "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra",
    "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal",
  ];

  const profileFields = [
    { label: "Name", name: "username" },
    { label: "Birthday", name: "birthday", type: "date" },
    { label: "Gender", name: "gender" },
    { label: "Address", name: "address" },
    { label: "Pincode", name: "pincode" },
    { label: "State", name: "state" },
    { label: "Email", name: "email" },
    { label: "Phone", name: "phone" },
  ];

  const isEmail = (str) => /^[\w\.-]+@[\w\.-]+\.\w+$/.test(str);
  const isPhone = (str) => /^\d{10}$/.test(str);
  const validatePincode = (str) => /^\d{6}$/.test(str);

  const calculateCompletionPercentage = (userData) => {
    const totalFields = profileFields.length;
    let filledFields = 0;
    profileFields.forEach((field) => {
      if (userData[field.name]) filledFields++;
    });
    return Math.round((filledFields / totalFields) * 100);
  };

  const formatDate = (dateString, includeTime = false) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      ...(includeTime && { hour: "2-digit", minute: "2-digit" }),
    };
    return date.toLocaleString("en-US", options);
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    return timeString.substring(0, 5); // e.g., "14:00"
  };

  const getIdentifier = (user) => user.email || user.phone;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData(parsedUser);
      setCompletionPercentage(calculateCompletionPercentage(parsedUser));
      fetchProfile(getIdentifier(parsedUser));
      fetchBookingHistory(parsedUser.user_id);
    } else {
      navigate("/");
    }
    const storedCoTravellers = localStorage.getItem("coTravellers");
    const storedDevices = localStorage.getItem("devices");
    if (storedCoTravellers) setCoTravellers(JSON.parse(storedCoTravellers));
    if (storedDevices) {
      setDevices(JSON.parse(storedDevices));
    } else {
      const currentDevice = {
        id: Date.now(),
        name: navigator.userAgent,
        lastLogin: new Date().toISOString(),
        isCurrent: true,
      };
      setDevices([currentDevice]);
      localStorage.setItem("devices", JSON.stringify([currentDevice]));
    }
  }, [navigate]);

  const fetchProfile = async (identifier) => {
    try {
      const response = await fetch(`${API_URL}/profile?identifier=${identifier}`);
      const res = await response.json();
      if (res.success) {
        const updatedUser = res.user;
        setUser(updatedUser);
        setFormData(updatedUser);
        setCompletionPercentage(calculateCompletionPercentage(updatedUser));
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to load latest profile data.");
    }
  };

  const fetchBookingHistory = async (user_id) => {
    try {
      // Fetch Flight Bookings
      const flightResponse = await fetch(`${API_URL}/flight_bookings?user_id=${user_id}`);
      const flightData = await flightResponse.json();
      if (flightData.success) {
        setFlightBookings(flightData.bookings);
      } else {
        setError(flightData.error || "Failed to load flight bookings.");
      }

      // Fetch Hotel Bookings
      const hotelResponse = await fetch(`${API_URL}/hotel_bookings?user_id=${user_id}`);
      const hotelData = await hotelResponse.json();
      if (hotelData.success) {
        setHotelBookings(hotelData.bookings);
      } else {
        setError(hotelData.error || "Failed to load hotel bookings.");
      }

      // Fetch Car Rentals
      const carResponse = await fetch(`${API_URL}/car_rentals?user_id=${user_id}`);
      const carData = await carResponse.json();
      if (carData.success) {
        setCarRentals(carData.bookings);
      } else {
        setError(carData.error || "Failed to load car rentals.");
      }
    } catch (err) {
      console.error("Error fetching booking history:", err);
      setError("Server error. Please try again.");
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) => setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  const handleVerificationChange = (e) => setVerificationData({ ...verificationData, [e.target.name]: e.target.value });

  const handleAddCoTraveller = () => {
    if (!newTraveller.name || !newTraveller.relationship) {
      setError("Please fill in all traveller details");
      return;
    }
    const updatedCoTravellers = [...coTravellers, { id: Date.now(), ...newTraveller }];
    setCoTravellers(updatedCoTravellers);
    localStorage.setItem("coTravellers", JSON.stringify(updatedCoTravellers));
    setNewTraveller({ name: "", relationship: "" });
    setError("");
  };

  const handleDeleteCoTraveller = (id) => {
    const updatedCoTravellers = coTravellers.filter((t) => t.id !== id);
    setCoTravellers(updatedCoTravellers);
    localStorage.setItem("coTravellers", JSON.stringify(updatedCoTravellers));
  };

  const handleDeleteDevice = (id) => {
    const updatedDevices = devices.filter((d) => d.id !== id && !d.isCurrent);
    setDevices(updatedDevices);
    localStorage.setItem("devices", JSON.stringify(updatedDevices));
  };

  const handleSave = async () => {
    if (formData.email && !isEmail(formData.email)) {
      setError("Invalid email format.");
      return;
    }
    if (formData.phone && !isPhone(formData.phone)) {
      setError("Phone number must be 10 digits.");
      return;
    }
    if (formData.pincode && !validatePincode(formData.pincode)) {
      setError("Pincode must be 6 digits.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/update_profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, identifier: getIdentifier(user) }),
      });
      const res = await response.json();
      if (res.success) {
        alert("Profile updated successfully!");
        localStorage.setItem("user", JSON.stringify(formData));
        setUser(formData);
        setCompletionPercentage(calculateCompletionPercentage(formData));
        setShowPopup(false);
        setError("");
        fetchProfile(getIdentifier(user));
      } else {
        setError(res.error || "Error updating profile.");
      }
    } catch (err) {
      console.error("Error while updating profile:", err);
      setError("Server error. Please try again.");
    }
  };

  const handleChangePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/change_password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: getIdentifier(user), currentPassword, newPassword }),
      });
      const res = await response.json();
      if (res.success) {
        alert("Password changed successfully!");
        setShowPasswordPopup(false);
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setPasswordError("");
      } else {
        setPasswordError(res.error || "Error changing password.");
      }
    } catch (err) {
      console.error("Error while changing password:", err);
      setPasswordError("Server error. Please try again.");
    }
  };

  const handleRequestVerification = async (phone) => {
    try {
      const response = await fetch(`${API_URL}/request_verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: phone }),
      });
      const res = await response.json();
      if (res.success) {
        setVerificationData({ identifier: phone, code: "" });
        setShowVerificationPopup(true);
        setVerificationError("");
      } else {
        setError(res.error || "Failed to send verification code.");
      }
    } catch (err) {
      console.error("Error requesting verification:", err);
      setError("Server error. Please try again.");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await fetch(`${API_URL}/verify_code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(verificationData),
      });
      const res = await response.json();
      if (res.success) {
        alert("Phone verified successfully!");
        setShowVerificationPopup(false);
        setVerificationData({ identifier: "", code: "" });
        fetchProfile(getIdentifier(user));
      } else {
        setVerificationError(res.error || "Verification failed.");
      }
    } catch (err) {
      console.error("Error verifying code:", err);
      setVerificationError("Server error. Please try again.");
    }
  };

  const handleCompleteFlight = async (booking_id) => {
    try {
      const response = await fetch("http://localhost:5000/api/complete_flight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking_id: booking_id }),
      });
      const data = await response.json();
      if (data.success) {
        // Refresh flight bookings
        const bookingsResponse = await fetch(`http://localhost:5000/api/flight_bookings?user_id=${user.user_id}`);
        const bookingsData = await bookingsResponse.json();
        if (bookingsData.success) {
          setFlightBookings(bookingsData.bookings);
        }
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to complete flight. Please try again.");
    }
  };
  
  const handleCancelFlight = async (booking_id) => {
    try {
      const response = await fetch("http://localhost:5000/api/cancel_flight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking_id: booking_id }),
      });
      const data = await response.json();
      if (data.success) {
        // Refresh flight bookings
        const bookingsResponse = await fetch(`http://localhost:5000/api/flight_bookings?user_id=${user.user_id}`);
        const bookingsData = await bookingsResponse.json();
        if (bookingsData.success) {
          setFlightBookings(bookingsData.bookings);
        }
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to cancel flight. Please try again.");
    }
  };
  
  const handleCompleteHotel = async (booking_id) => {
    try {
      const response = await fetch("http://localhost:5000/api/complete_hotel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking_id: booking_id }),
      });
      const data = await response.json();
      if (data.success) {
        // Refresh hotel bookings
        const bookingsResponse = await fetch(`http://localhost:5000/api/hotel_bookings?user_id=${user.user_id}`);
        const bookingsData = await bookingsResponse.json();
        if (bookingsData.success) {
          setHotelBookings(bookingsData.bookings);
        }
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to complete hotel booking. Please try again.");
    }
  };
  
  const handleCancelHotel = async (booking_id) => {
    try {
      const response = await fetch("http://localhost:5000/api/cancel_hotel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking_id: booking_id }),
      });
      const data = await response.json();
      if (data.success) {
        // Refresh hotel bookings
        const bookingsResponse = await fetch(`http://localhost:5000/api/hotel_bookings?user_id=${user.user_id}`);
        const bookingsData = await bookingsResponse.json();
        if (bookingsData.success) {
          setHotelBookings(bookingsData.bookings);
        }
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to cancel hotel booking. Please try again.");
    }
  };
  
  const handleCompleteCar = async (rentalId) => {
    try {
      const response = await fetch("http://localhost:5000/api/complete_car", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rental_id: rentalId }),
      });
      const data = await response.json();
      if (data.success) {
        // Refresh car rentals
        const rentalsResponse = await fetch(`http://localhost:5000/api/car_rentals?user_id=${user.user_id}`);
        const rentalsData = await rentalsResponse.json();
        if (rentalsData.success) {
          setCarRentals(rentalsData.bookings);
        }
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to complete car rental. Please try again.");
    }
  };
  
  const handleCancelCar = async (rentalId) => {
    try {
      const response = await fetch("http://localhost:5000/api/cancel_car", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rental_id: rentalId }),
      });
      const data = await response.json();
      if (data.success) {
        // Refresh car rentals
        const rentalsResponse = await fetch(`http://localhost:5000/api/car_rentals?user_id=${user.user_id}`);
        const rentalsData = await rentalsResponse.json();
        if (rentalsData.success) {
          setCarRentals(rentalsData.bookings);
        }
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to cancel car rental. Please try again.");
    }
  };

  const toggleDropdown = (id, type, event) => {
    if (event) {
      const rect = event.currentTarget.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        id,
        type,
      });
    } else {
      setDropdownPosition((prev) =>
        prev.id === id && prev.type === type ? { top: 0, left: 0, id: null, type: null } : prev
      );
    }
    setDropdownOpen((prev) => ({
      ...prev,
      [type]: prev[type] === id ? null : id,
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setDropdownOpen({ flight: null, hotel: null, car: null });
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("coTravellers");
    localStorage.removeItem("devices");
    navigate("/");
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  const openEditPopup = () => setShowPopup(true);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-gray-600 text-lg"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
  const buttonVariants = { hover: { scale: 1.05 }, tap: { scale: 0.95 } };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-poppins">      

      <div className="flex flex-col lg:flex-row flex-1 max-w-8xl w-full p-4 gap-5 lg:gap-10">
            {/* Sidebar */}
            <motion.nav
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`lg:w-64 bg-white rounded-xl shadow-lg p-6 sticky top-4 z-50 w-64 transform mt-20 max-h-110 ${
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
              } lg:sticky lg:translate-x-0 transition-transform duration-300 ease-in-out border border-gray-100`}
            >
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full sticky">
                  <FaUser className="text-blue-600 text-xl" />
                </div>
                <span className="ml-3 text-lg font-semibold text-gray-800 truncate">{user.username}</span>
              </div>
              <ul className="space-y-2">
                {[
                  { section: "Profile", label: "Profile", icon: <FaUser className="mr-2" /> },
                  { section: "BookingHistory", label: "Your Booking", icon: <HiMiniTicket className="mr-2" /> },
                  { section: "Login_details", label: "Login Details", icon: <FaLock className="mr-2" /> },
                  { section: "coTravellersSection", label: "Co-Travellers", icon: <FaUsers className="mr-2" /> },
                  { section: "devicesSection", label: "Devices", icon: <FaLaptop className="mr-2" /> },
                  {
                    section: "logoutSection",
                    label: "Logout",
                    icon: <FaSignOutAlt className="mr-2" />,
                    onClick: handleLogout,
                  },
                ].map((item, index) => (
                  <li key={index}>
                    <motion.button
                      onClick={() => (item.onClick ? item.onClick() : handleSectionChange(item.section))}
                      variants={itemVariants}
                      className={`w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-blue-50 transition-colors ${
                        activeSection === item.section ? "bg-blue-100 text-blue-600 font-semibold" : ""
                      }`}
                      whileHover={{ x: 5 }}
                    >
                      {item.icon}
                      {item.label}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </motion.nav>
      
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
              <div
                className="lg:hidden fixed inset-0 backdrop-brightness-30 z-40"
                onClick={() => setIsMobileMenuOpen(false)}
              ></div>
            )}
      
            {/* Main Content */}
            <div className="flex-1 w-full lg:ml-0 mt-4 lg:mt-0 overflow-y-auto">
              <AnimatePresence mode="wait">
                {activeSection === "Profile" && (
                  <motion.div
                    key="Profile"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Profile Completion Card */}
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Completion</h2>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${completionPercentage}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700"
                        />
                      </div>
                      <p className="text-sm text-gray-600">{completionPercentage}% Complete</p>
                    </div>
      
                    {/* Personal Details Card */}
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Personal Details</h2>
                        <motion.button
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          onClick={openEditPopup}
                          className="mt-4 sm:mt-0 flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                          <FaEdit className="mr-2" />
                          Edit Profile
                        </motion.button>
                      </div>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm border border-red-200"
                        >
                          {error}
                        </motion.div>
                      )}
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-4"
                      >
                        {profileFields.map((item, index) => (
                          <motion.div
                            key={index}
                            variants={itemVariants}
                            className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
                          >
                            <span className="text-sm font-medium text-gray-700">{item.label}</span>
                            <span className="text-sm text-gray-600">
                              {item.name === "birthday" && user[item.name]
                                ? formatDate(user[item.name])
                                : user[item.name] || "Not provided"}
                            </span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
      
                {activeSection === "BookingHistory" && (
                  <motion.div
                    key="BookingHistory"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
                  >
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm border border-red-200"
                      >
                        {error}
                      </motion.div>
                    )}
                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 mb-6 space-x-4">
                      {["Flights", "Hotels", "Cars"].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setHistoryTab(tab)}
                          className={`px-4 py-2 text-sm font-semibold transition-colors ${
                            historyTab === tab
                              ? "border-b-2 border-blue-600 text-blue-600"
                              : "text-gray-600 hover:text-blue-600"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-8"
                    >
                      {historyTab === "Flights" && (
                        <>
                          <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                            <FaPlane className="text-blue-600 text-2xl" /> <span>Flight Bookings</span>
                          </h3>
                          {/* Upcoming Flights */}
                          <div className="space-y-4">
                            <h4 className="text-lg font-medium text-gray-700">Upcoming Flights</h4>
                            {flightBookings.filter((b) => b.status === "Upcoming" || b.status === "Pending").length === 0 ? (
                              <p className="text-gray-500 text-sm bg-gray-50 p-4 rounded-lg">
                                No upcoming or pending flights booked.
                              </p>
                            ) : (
                              <div className="relative overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 snap-x snap-mandatory shadow-sm">
                                <div className="w-full min-w-[800px]">
                                  <div className="grid grid-cols-12 gap-x-4 text-sm font-medium text-gray-600 bg-gray-100 p-3 rounded-t-lg">
                                    <div className="col-span-1 text-left">Serial No.</div>
                                    <div className="col-span-2 text-left">Flight No.</div>
                                    <div className="col-span-2 text-left">Airline</div>
                                    <div className="col-span-2 text-left">Route</div>
                                    <div className="col-span-2 text-left">Departure</div>
                                    <div className="col-span-1 text-left">Price</div>
                                    <div className="col-span-1 text-left">Status</div>
                                    <div className="col-span-1 text-left"></div>
                                  </div>
                                  {flightBookings
                                    .filter((b) => b.status === "Upcoming" || b.status === "Pending")
                                    .sort((a, b) => new Date(a.departure_date) - new Date(b.departure_date))
                                    .map((booking, index) => (
                                      <motion.div
                                        key={booking.booking_id}
                                        variants={itemVariants}
                                        className={`p-3 border-b border-gray-100 last:border-b-0 ${
                                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        }`}
                                      >
                                        <div className="grid grid-cols-12 gap-x-4 items-center text-sm">
                                          <div className="col-span-1 text-left">
                                            <p className="text-gray-800">{index + 1}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{booking.flight_number}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{booking.airline}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">
                                              {booking.from_city} to {booking.to_city}
                                            </p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{formatDate(booking.departure_date)}</p>
                                          </div>
                                          <div className="col-span-1 text-left">
                                            <span className="text-gray-800">₹{booking.cost.toFixed(2)}</span>
                                          </div>
                                          <div className="col-span-1 text-left">
                                            <span
                                              className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                                                booking.status === "Pending"
                                                  ? "bg-yellow-100 text-yellow-800"
                                                  : "bg-green-100 text-green-800"
                                              }`}
                                            >
                                              {booking.status}
                                            </span>
                                          </div>
                                          <div className="col-span-1 text-left relative dropdown-container">
                                            <motion.button
                                              variants={buttonVariants}
                                              whileHover={{ scale: 1.1 }}
                                              whileTap={{ scale: 0.9 }}
                                              onClick={(event) => toggleDropdown(booking.booking_id, "flight", event)}
                                              className="text-gray-600 hover:text-gray-800 p-1 rounded-full hover:bg-gray-200 transition"
                                            >
                                              <HiDotsVertical size={20} />
                                            </motion.button>
                                          </div>
                                        </div>
                                      </motion.div>
                                    ))}
                                </div>
                              </div>
                            )}
                          </div>
                          {/* Past Flights */}
                          <div className="space-y-4">
                            <h4 className="text-lg font-medium text-gray-700">Past Flights</h4>
                            {flightBookings.filter((b) => b.status === "Completed").length === 0 ? (
                              <p className="text-gray-500 text-sm bg-gray-50 p-4 rounded-lg">
                                No past flights recorded.
                              </p>
                            ) : (
                              <div className="relative overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 snap-x snap-mandatory shadow-sm">
                                <div className="w-full min-w-[800px]">
                                  <div className="grid grid-cols-12 gap-x-4 text-sm font-medium text-gray-600 bg-gray-100 p-3 rounded-t-lg">
                                    <div className="col-span-1 text-left">Serial No.</div>
                                    <div className="col-span-2 text-left">Flight No.</div>
                                    <div className="col-span-2 text-left">Airline</div>
                                    <div className="col-span-2 text-left">Route</div>
                                    <div className="col-span-2 text-left">Departure</div>
                                    <div className="col-span-1 text-left">Price</div>
                                    <div className="col-span-1 text-left">Status</div>
                                    <div className="col-span-1 text-left"></div>
                                  </div>
                                  {flightBookings
                                    .filter((b) => b.status === "Completed")
                                    .sort((a, b) => new Date(a.departure_date) - new Date(b.departure_date))
                                    .map((booking, index) => (
                                      <motion.div
                                        key={booking.booking_id}
                                        variants={itemVariants}
                                        className={`p-3 border-b border-gray-100 last:border-b-0 ${
                                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        }`}
                                      >
                                        <div className="grid grid-cols-12 gap-x-4 items-center text-sm">
                                          <div className="col-span-1 text-left">
                                            <p className="text-gray-800">{index + 1}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{booking.flight_number}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{booking.airline}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">
                                              {booking.from_city} to {booking.to_city}
                                            </p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{formatDate(booking.departure_date)}</p>
                                          </div>
                                          <div className="col-span-1 text-left">
                                            <span className="text-gray-800">₹{booking.cost.toFixed(2)}</span>
                                          </div>
                                          <div className="col-span-1 text-left">
                                            <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                              Completed
                                            </span>
                                          </div>
                                          <div className="col-span-1 text-left"></div>
                                        </div>
                                      </motion.div>
                                    ))}
                                </div>
                              </div>
                            )}
                          </div>
                          {/* Cancelled Flights */}
                          <div className="space-y-4">
                            <h4 className="text-lg font-medium text-gray-700">Cancelled Flights</h4>
                            {flightBookings.filter((b) => b.status === "Cancelled").length === 0 ? (
                              <p className="text-gray-500 text-sm bg-gray-50 p-4 rounded-lg">
                                No cancelled flights.
                              </p>
                            ) : (
                              <div className="relative overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 snap-x snap-mandatory shadow-sm">
                                <div className="w-full min-w-[800px]">
                                  <div className="grid grid-cols-12 gap-x-4 text-sm font-medium text-gray-600 bg-gray-100 p-3 rounded-t-lg">
                                    <div className="col-span-1 text-left">Serial No.</div>
                                    <div className="col-span-2 text-left">Flight No.</div>
                                    <div className="col-span-2 text-left">Airline</div>
                                    <div className="col-span-2 text-left">Route</div>
                                    <div className="col-span-2 text-left">Departure</div>
                                    <div className="col-span-1 text-left">Price</div>
                                    <div className="col-span-1 text-left">Status</div>
                                    <div className="col-span-1 text-left"></div>
                                  </div>
                                  {flightBookings
                                    .filter((b) => b.status === "Cancelled")
                                    .sort((a, b) => new Date(a.departure_date) - new Date(b.departure_date))
                                    .map((booking, index) => (
                                      <motion.div
                                        key={booking.booking_id}
                                        variants={itemVariants}
                                        className={`p-3 border-b border-gray-100 last:border-b-0 ${
                                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        }`}
                                      >
                                        <div className="grid grid-cols-12 gap-x-4 items-center text-sm">
                                          <div className="col-span-1 text-left">
                                            <p className="text-gray-800">{index + 1}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{booking.flight_number}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{booking.airline}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">
                                              {booking.from_city} to {booking.to_city}
                                            </p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{formatDate(booking.departure_date)}</p>
                                          </div>
                                          <div className="col-span-1 text-left">
                                            <span className="text-gray-800">₹{booking.cost.toFixed(2)}</span>
                                          </div>
                                          <div className="col-span-1 text-left">
                                            <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                              Cancelled
                                            </span>
                                          </div>
                                          <div className="col-span-1 text-left"></div>
                                        </div>
                                      </motion.div>
                                    ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                      {historyTab === "Hotels" && (
                        <>
                          <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                            <FaHotel className="text-blue-600 text-2xl" /> <span>Hotel Bookings</span>
                          </h3>
                          {/* Upcoming Hotels */}
                          <div className="space-y-4">
                            <h4 className="text-lg font-medium text-gray-700">Upcoming Hotels</h4>
                            {hotelBookings.filter((b) => b.status === "Upcoming" || b.status === "Pending").length === 0 ? (
                              <p className="text-gray-500 text-sm bg-gray-50 p-4 rounded-lg">
                                No upcoming or pending hotel bookings.
                              </p>
                            ) : (
                              <div className="relative overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 snap-x snap-mandatory shadow-sm">
                                <div className="w-full min-w-[800px]">
                                  <div className="grid grid-cols-12 gap-x-4 text-sm font-medium text-gray-600 bg-gray-100 p-3 rounded-t-lg">
                                    <div className="col-span-1 text-left">Serial No.</div>
                                    <div className="col-span-2 text-left">Hotel</div>
                                    <div className="col-span-2 text-left">City</div>
                                    <div className="col-span-2 text-left">Check-In</div>
                                    <div className="col-span-2 text-left">Check-Out</div>
                                    <div className="col-span-1 text-left">Price</div>
                                    <div className="col-span-1 text-left">Status</div>
                                    <div className="col-span-1 text-left"></div>
                                  </div>
                                  {hotelBookings
                                    .filter((b) => b.status === "Upcoming" || b.status === "Pending")
                                    .sort((a, b) => new Date(a.check_in_date) - new Date(b.check_in_date))
                                    .map((booking, index) => (
                                      <motion.div
                                        key={booking.booking_id}
                                        variants={itemVariants}
                                        className={`p-3 border-b border-gray-100 last:border-b-0 ${
                                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        }`}
                                      >
                                        <div className="grid grid-cols-12 gap-x-4 items-center text-sm">
                                          <div className="col-span-1 text-left">
                                            <p className="text-gray-800">{index + 1}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{booking.hotel_name}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{booking.city}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{formatDate(booking.check_in_date)}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{formatDate(booking.check_out_date)}</p>
                                          </div>
                                          <div className="col-span-1 text-left">
                                            <span className="text-gray-800">₹{booking.cost.toFixed(2)}</span>
                                          </div>
                                          <div className="col-span-1 text-left">
                                            <span
                                              className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                                                booking.status === "Pending"
                                                  ? "bg-yellow-100 text-yellow-800"
                                                  : "bg-green-100 text-green-800"
                                              }`}
                                            >
                                              {booking.status}
                                            </span>
                                          </div>
                                          <div className="col-span-1 text-left relative dropdown-container">
                                            <motion.button
                                              variants={buttonVariants}
                                              whileHover={{ scale: 1.1 }}
                                              whileTap={{ scale: 0.9 }}
                                              onClick={(event) => toggleDropdown(booking.booking_id, "hotel", event)}
                                              className="text-gray-600 hover:text-gray-800"
                                            >
                                              <HiDotsVertical />
                                            </motion.button>
                                          </div>
                                        </div>
                                      </motion.div>
                                    ))}
                                </div>
                              </div>
                            )}
                          </div>
                          {/* Past Hotels */}
                          <div className="space-y-4">
                            <h4 className="text-lg font-medium text-gray-700">Past Hotels</h4>
                            {hotelBookings.filter((b) => b.status === "Completed").length === 0 ? (
                              <p className="text-gray-500 text-sm bg-gray-50 p-4 rounded-lg">
                                No past hotel bookings.
                              </p>
                            ) : (
                              <div className="relative overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 snap-x snap-mandatory shadow-sm">
                                <div className="w-full min-w-[800px]">
                                  <div className="grid grid-cols-12 gap-x-4 text-sm font-medium text-gray-600 bg-gray-100 p-3 rounded-t-lg">
                                    <div className="col-span-1 text-left">Serial No.</div>
                                    <div className="col-span-2 text-left">Hotel</div>
                                    <div className="col-span-2 text-left">City</div>
                                    <div className="col-span-2 text-left">Check-In</div>
                                    <div className="col-span-2 text-left">Check-Out</div>
                                    <div className="col-span-1 text-left">Price</div>
                                    <div className="col-span-1 text-left">Status</div>
                                    <div className="col-span-1 text-left"></div>
                                  </div>
                                  {hotelBookings
                                    .filter((b) => b.status === "Completed")
                                    .sort((a, b) => new Date(a.check_in_date) - new Date(b.check_in_date))
                                    .map((booking, index) => (
                                      <motion.div
                                        key={booking.booking_id}
                                        variants={itemVariants}
                                        className={`p-3 border-b border-gray-100 last:border-b-0 ${
                                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        }`}
                                      >
                                        <div className="grid grid-cols-12 gap-x-4 items-center text-sm">
                                          <div className="col-span-1 text-left">
                                            <p className="text-gray-800">{index + 1}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{booking.hotel_name}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{booking.city}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{formatDate(booking.check_in_date)}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{formatDate(booking.check_out_date)}</p>
                                          </div>
                                          <div className="col-span-1 text-left">
                                            <span className="text-gray-800">₹{booking.cost.toFixed(2)}</span>
                                          </div>
                                          <div className="col-span-1 text-left">
                                            <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                              Completed
                                            </span>
                                          </div>
                                          <div className="col-span-1 text-left"></div>
                                        </div>
                                      </motion.div>
                                    ))}
                                </div>
                              </div>
                            )}
                          </div>
                          {/* Cancelled Hotels */}
                          <div className="space-y-4">
                            <h4 className="text-lg font-medium text-gray-700">Cancelled Hotels</h4>
                            {hotelBookings.filter((b) => b.status === "Cancelled").length === 0 ? (
                              <p className="text-gray-500 text-sm bg-gray-50 p-4 rounded-lg">
                                No cancelled hotel bookings.
                              </p>
                            ) : (
                              <div className="relative overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 snap-x snap-mandatory shadow-sm">
                                <div className="w-full min-w-[800px]">
                                  <div className="grid grid-cols-12 gap-x-4 text-sm font-medium text-gray-600 bg-gray-100 p-3 rounded-t-lg">
                                    <div className="col-span-1 text-left">Serial No.</div>
                                    <div className="col-span-2 text-left">Hotel</div>
                                    <div className="col-span-2 text-left">City</div>
                                    <div className="col-span-2 text-left">Check-In</div>
                                    <div className="col-span-2 text-left">Check-Out</div>
                                    <div className="col-span-1 text-left">Price</div>
                                    <div className="col-span-1 text-left">Status</div>
                                    <div className="col-span-1 text-left"></div>
                                  </div>
                                  {hotelBookings
                                    .filter((b) => b.status === "Cancelled")
                                    .sort((a, b) => new Date(a.check_in_date) - new Date(b.check_in_date))
                                    .map((booking, index) => (
                                      <motion.div
                                        key={booking.booking_id}
                                        variants={itemVariants}
                                        className={`p-3 border-b border-gray-100 last:border-b-0 ${
                                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        }`}
                                      >
                                        <div className="grid grid-cols-12 gap-x-4 items-center text-sm">
                                          <div className="col-span-1 text-left">
                                            <p className="text-gray-800">{index + 1}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{booking.hotel_name}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{booking.city}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{formatDate(booking.check_in_date)}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{formatDate(booking.check_out_date)}</p>
                                          </div>
                                          <div className="col-span-1 text-left">
                                            <span className="text-gray-800">₹{booking.cost.toFixed(2)}</span>
                                          </div>
                                          <div className="col-span-1 text-left">
                                            <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                              Cancelled
                                            </span>
                                          </div>
                                          <div className="col-span-1 text-left"></div>
                                        </div>
                                      </motion.div>
                                    ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                      {historyTab === "Cars" && (
                        <>
                          <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                            <FaCar className="text-blue-600" /> <span>Car Rentals</span>
                          </h3>
                          {/* Upcoming Cars */}
                          <div className="space-y-4">
                            <h4 className="text-lg font-medium text-gray-700">Upcoming Rentals</h4>
                            {carRentals.filter((b) => b.status === "Upcoming" || b.status === "Pending").length === 0 ? (
                              <p className="text-gray-500 text-sm bg-gray-50 p-4 rounded-lg">
                                No upcoming or pending car rentals.
                              </p>
                            ) : (
                              <div className="relative overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 snap-x snap-mandatory shadow-sm">
                                <div className="w-full min-w-[800px]">
                                  <div className="grid grid-cols-12 gap-x-4 text-sm font-medium text-gray-600 bg-gray-100 p-3 rounded-t-lg">
                                    <div className="col-span-1 text-left">Serial No.</div>
                                    <div className="col-span-2 text-left">Car</div>
                                    <div className="col-span-2 text-left">Route</div>
                                    <div className="col-span-2 text-left">Start</div>
                                    <div className="col-span-2 text-left">End</div>
                                    <div className="col-span-1 text-left">Price</div>
                                    <div className="col-span-1 text-left">Status</div>
                                    <div className="col-span-1 text-left"></div>
                                  </div>
                                  {carRentals
                                    .filter((b) => b.status === "Upcoming" || b.status === "Pending")
                                    .sort((a, b) => new Date(a.start_date || a.end_date) - new Date(b.start_date || b.end_date))
                                    .map((rental, index) => (
                                      <motion.div
                                        key={rental.rental_id}
                                        variants={itemVariants}
                                        className={`p-3 border-b border-gray-100 last:border-b-0 ${
                                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        }`}
                                      >
                                        <div className="grid grid-cols-12 gap-x-4 items-center text-sm">
                                          <div className="col-span-1 text-left">
                                            <p className="text-gray-800">{index + 1}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{rental.car_name}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">
                                              {rental.from_location} to {rental.to_location}
                                            </p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{formatDate(rental.start_date || rental.end_date)}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{formatDate(rental.end_date)}</p>
                                          </div>
                                          <div className="col-span-1 text-left">
                                            <span className="text-gray-800">₹{rental.cost.toFixed(2)}</span>
                                          </div>
                                          <div className="col-span-1 text-left">
                                            <span
                                              className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                                                rental.status === "Pending"
                                                  ? "bg-yellow-100 text-yellow-800"
                                                  : "bg-green-100 text-green-800"
                                              }`}
                                            >
                                              {rental.status}
                                            </span>
                                          </div>
                                          <div className="col-span-1 text-left relative dropdown-container">
                                            <motion.button
                                              variants={buttonVariants}
                                              whileHover={{ scale: 1.1 }}
                                              whileTap={{ scale: 0.9 }}
                                              onClick={(event) => toggleDropdown(rental.rental_id, "car", event)}
                                              className="text-gray-600 hover:text-gray-800"
                                            >
                                              <HiDotsVertical />
                                            </motion.button>
                                          </div>
                                        </div>
                                      </motion.div>
                                    ))}
                                </div>
                              </div>
                            )}
                          </div>
                          {/* Past Cars */}
                          <div className="space-y-4">
                            <h4 className="text-lg font-medium text-gray-700">Past Rentals</h4>
                            {carRentals.filter((b) => b.status === "Completed").length === 0 ? (
                              <p className="text-gray-500 text-sm bg-gray-50 p-4 rounded-lg">
                                No past car rentals.
                              </p>
                            ) : (
                              <div className="relative overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 snap-x snap-mandatory shadow-sm">
                                <div className="w-full min-w-[800px]">
                                  <div className="grid grid-cols-12 gap-x-4 text-sm font-medium text-gray-600 bg-gray-100 p-3 rounded-t-lg">
                                    <div className="col-span-1 text-left">Serial No.</div>
                                    <div className="col-span-2 text-left">Car</div>
                                    <div className="col-span-2 text-left">Route</div>
                                    <div className="col-span-2 text-left">Start</div>
                                    <div className="col-span-2 text-left">End</div>
                                    <div className="col-span-1 text-left">Price</div>
                                    <div className="col-span-1 text-left">Status</div>
                                    <div className="col-span-1 text-left"></div>
                                  </div>
                                  {carRentals
                                    .filter((b) => b.status === "Completed")
                                    .sort((a, b) => new Date(a.start_date || a.end_date) - new Date(b.start_date || b.end_date))
                                    .map((rental, index) => (
                                      <motion.div
                                        key={rental.rental_id}
                                        variants={itemVariants}
                                        className={`p-3 border-b border-gray-100 last:border-b-0 ${
                                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        }`}
                                      >
                                        <div className="grid grid-cols-12 gap-x-4 items-center text-sm">
                                          <div className="col-span-1 text-left">
                                            <p className="text-gray-800">{index + 1}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{rental.car_name}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">
                                              {rental.from_location} to {rental.to_location}
                                            </p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{formatDate(rental.start_date || rental.end_date)}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{formatDate(rental.end_date)}</p>
                                          </div>
                                          <div className="col-span-1 text-left">
                                            <span className="text-gray-800">₹{rental.cost.toFixed(2)}</span>
                                          </div>
                                          <div className="col-span-1 text-left">
                                            <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                              Completed
                                            </span>
                                          </div>
                                          <div className="col-span-1 text-left"></div>
                                        </div>
                                      </motion.div>
                                    ))}
                                </div>
                              </div>
                            )}
                          </div>
                          {/* Cancelled Cars */}
                          <div className="space-y-4">
                            <h4 className="text-lg font-medium text-gray-700">Cancelled Rentals</h4>
                            {carRentals.filter((b) => b.status === "Cancelled").length === 0 ? (
                              <p className="text-gray-500 text-sm bg-gray-50 p-4 rounded-lg">
                                No cancelled car rentals.
                              </p>
                            ) : (
                              <div className="relative overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 snap-x snap-mandatory shadow-sm">
                                <div className="w-full min-w-[800px]">
                                  <div className="grid grid-cols-12 gap-x-4 text-sm font-medium text-gray-600 bg-gray-100 p-3 rounded-t-lg">
                                    <div className="col-span-1 text-left">Serial No.</div>
                                    <div className="col-span-2 text-left">Car</div>
                                    <div className="col-span-2 text-left">Route</div>
                                    <div className="col-span-2 text-left">Start</div>
                                    <div className="col-span-2 text-left">End</div>
                                    <div className="col-span-1 text-left">Price</div>
                                    <div className="col-span-1 text-left">Status</div>
                                    <div className="col-span-1 text-left"></div>
                                  </div>
                                  {carRentals
                                    .filter((b) => b.status === "Cancelled")
                                    .sort((a, b) => new Date(a.start_date || a.end_date) - new Date(b.start_date || b.end_date))
                                    .map((rental, index) => (
                                      <motion.div
                                        key={rental.rental_id}
                                        variants={itemVariants}
                                        className={`p-3 border-b border-gray-100 last:border-b-0 ${
                                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        }`}
                                      >
                                        <div className="grid grid-cols-12 gap-x-4 items-center text-sm">
                                          <div className="col-span-1 text-left">
                                            <p className="text-gray-800">{index + 1}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{rental.car_name}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">
                                              {rental.from_location} to {rental.to_location}
                                            </p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{formatDate(rental.start_date || rental.end_date)}</p>
                                          </div>
                                          <div className="col-span-2 text-left">
                                            <p className="text-gray-800 truncate">{formatDate(rental.end_date)}</p>
                                          </div>
                                          <div className="col-span-1 text-left">
                                            <span className="text-gray-800">₹{rental.cost.toFixed(2)}</span>
                                          </div>
                                          <div className="col-span-1 text-left">
                                            <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                              Cancelled
                                            </span>
                                          </div>
                                          <div className="col-span-1 text-left"></div>
                                        </div>
                                      </motion.div>
                                    ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </motion.div>
                    {/* Dropdown Overlays for Flights, Hotels, and Cars */}
                    {dropdownOpen.flight && dropdownPosition.id && dropdownPosition.type === "flight" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{
                          position: "fixed",
                          top: dropdownPosition.top,
                          left: dropdownPosition.left,
                          zIndex: 50,
                        }}
                        className="w-40 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden"
                      >
                        <div className="max-h-40 overflow-y-auto">
                          {flightBookings
                            .find((b) => b.booking_id === dropdownPosition.id)?.status === "Pending" && (
                            <button
                              onClick={() => {
                                handleCompleteFlight(dropdownPosition.id);
                                toggleDropdown(null, "flight");
                              }}
                              className="flex items-center w-full text-left px-4 py-3 text-sm text-green-600 hover:bg-green-50 transition"
                            >
                              <FaCheckCircle className="mr-2" />
                              Complete
                            </button>
                          )}
                          <button
                            onClick={() => {
                              handleCancelFlight(dropdownPosition.id);
                              toggleDropdown(null, "flight");
                            }}
                            className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
                          >
                            <FaTimesCircle className="mr-2" />
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {dropdownOpen.hotel && dropdownPosition.id && dropdownPosition.type === "hotel" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{
                          position: "fixed",
                          top: dropdownPosition.top,
                          left: dropdownPosition.left,
                          zIndex: 50,
                        }}
                        className="w-40 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden"
                      >
                        <div className="max-h-40 overflow-y-auto">
                          {hotelBookings
                            .find((b) => b.booking_id === dropdownPosition.id)?.status === "Pending" && (
                            <button
                              onClick={() => {
                                handleCompleteHotel(dropdownPosition.id);
                                toggleDropdown(null, "hotel");
                              }}
                              className="flex items-center w-full text-left px-4 py-3 text-sm text-green-600 hover:bg-green-50 transition"
                            >
                              <FaCheckCircle className="mr-2" />
                              Complete
                            </button>
                          )}
                          <button
                            onClick={() => {
                              handleCancelHotel(dropdownPosition.id);
                              toggleDropdown(null, "hotel");
                            }}
                            className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
                          >
                            <FaTimesCircle className="mr-2" />
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {dropdownOpen.car && dropdownPosition.id && dropdownPosition.type === "car" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{
                          position: "fixed",
                          top: dropdownPosition.top,
                          left: dropdownPosition.left,
                          zIndex: 50,
                        }}
                        className="w-40 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden"
                      >
                        <div className="max-h-40 overflow-y-auto">
                          {carRentals
                            .find((b) => b.rental_id === dropdownPosition.id)?.status === "Pending" && (
                            <button
                              onClick={() => {
                                handleCompleteCar(dropdownPosition.id);
                                toggleDropdown(null, "car");
                              }}
                              className="flex items-center w-full text-left px-4 py-3 text-sm text-green-600 hover:bg-green-50 transition"
                            >
                              <FaCheckCircle className="mr-2" />
                              Complete
                            </button>
                          )}
                          <button
                            onClick={() => {
                              handleCancelCar(dropdownPosition.id);
                              toggleDropdown(null, "car");
                            }}
                            className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
                          >
                            <FaTimesCircle className="mr-2" />
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
      
                {activeSection === "Login_details" && (
                  <motion.div
                    key="Login_details"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
                  >
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Login Details</h2>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm border border-red-200"
                      >
                        {error}
                      </motion.div>
                    )}
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-6"
                    >
                      <motion.div
                        variants={itemVariants}
                        className="flex justify-between items-center py-3 border-b border-gray-100"
                      >
                        <span className="text-sm font-medium text-gray-700 flex items-center">
                          <FaMobileAlt className="mr-2 text-gray-500" />
                          Mobile Number
                        </span>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-600">{user.phone || "Not provided"}</span>
                          {user.phone &&
                            (user.phone_verified ? (
                              <FaCheckCircle className="text-green-500" />
                            ) : (
                              <motion.button
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                onClick={() => handleRequestVerification(user.phone)}
                                className="text-blue-600 text-sm hover:underline"
                              >
                                Verify
                              </motion.button>
                            ))}
                        </div>
                      </motion.div>
                      <motion.div
                        variants={itemVariants}
                        className="flex justify-between items-center py-3 border-b border-gray-100"
                      >
                        <span className="text-sm font-medium text-gray-700 flex items-center">
                          <MdEmail className="mr-2 text-gray-500" />
                          Email
                        </span>
                        <span className="text-sm text-gray-600">{user.email || "Not provided"}</span>
                      </motion.div>
                      <motion.div
                        variants={itemVariants}
                        className="flex justify-between items-center py-3"
                      >
                        <span className="text-sm font-medium text-gray-700 flex items-center">
                          <FaLock className="mr-2 text-gray-500" />
                          Password
                        </span>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-600">•••••••</span>
                          <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => setShowPasswordPopup(true)}
                            className="text-blue-600 text-sm hover:underline"
                          >
                            Change
                          </motion.button>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
      
                {activeSection === "coTravellersSection" && (
                  <motion.div
                    key="coTravellersSection"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
                  >
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Co-Travellers</h2>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm border border-red-200"
                      >
                        {error}
                      </motion.div>
                    )}
                    <div className="mb-6">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                        <input
                          type="text"
                          placeholder="Name"
                          value={newTraveller.name}
                          onChange={(e) => setNewTraveller({ ...newTraveller, name: e.target.value })}
                          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        />
                        <input
                          type="text"
                          placeholder="Relationship"
                          value={newTraveller.relationship}
                          onChange={(e) =>
                            setNewTraveller({ ...newTraveller, relationship: e.target.value })
                          }
                          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        />
                        <motion.button
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          onClick={handleAddCoTraveller}
                          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                          <AiOutlinePlus className="mr-2" />
                          Add
                        </motion.button>
                      </div>
                    </div>
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-4"
                    >
                      {coTravellers.length === 0 ? (
                        <p className="text-gray-500 text-sm bg-gray-50 p-4 rounded-lg">
                          No co-travellers added yet.
                        </p>
                      ) : (
                        coTravellers.map((traveller) => (
                          <motion.div
                            key={traveller.id}
                            variants={itemVariants}
                            className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-100"
                          >
                            <div>
                              <p className="text-sm font-medium text-gray-800">{traveller.name}</p>
                              <p className="text-xs text-gray-600">{traveller.relationship}</p>
                            </div>
                            <motion.button
                              variants={buttonVariants}
                              whileHover="hover"
                              whileTap="tap"
                              onClick={() => handleDeleteCoTraveller(traveller.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <AiOutlineDelete size={20} />
                            </motion.button>
                          </motion.div>
                        ))
                      )}
                    </motion.div>
                  </motion.div>
                )}
      
                {activeSection === "devicesSection" && (
                  <motion.div
                    key="devicesSection"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
                  >
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Devices</h2>
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-4"
                    >
                      {devices.length === 0 ? (
                        <p className="text-gray-500 text-sm bg-gray-50 p-4 rounded-lg">
                          No devices found.
                        </p>
                      ) : (
                        devices.map((device) => (
                          <motion.div
                            key={device.id}
                            variants={itemVariants}
                            className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-100"
                          >
                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                {device.name.slice(0, 30)}
                                {device.name.length > 30 ? "..." : ""}
                                {device.isCurrent && (
                                  <span className="ml-2 text-green-600 text-xs">(This device)</span>
                                )}
                              </p>
                              <p className="text-xs text-gray-600">
                                Last login: {formatDate(device.lastLogin)}
                              </p>
                            </div>
                            {!device.isCurrent && (
                              <motion.button
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                onClick={() => handleDeleteDevice(device.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <AiOutlineDelete size={20} />
                              </motion.button>
                            )}
                          </motion.div>
                        ))
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
      </div>

      {/* Edit Profile Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-brightness-30 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Edit Profile</h2>
                <motion.button
                  onClick={() => setShowPopup(false)}
                  className="text-gray-600 hover:text-gray-800"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IoClose size={24} />
                </motion.button>
              </div>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm border border-red-200"
                >
                  {error}
                </motion.div>
              )}
              <div className="space-y-4">
                {profileFields.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">{item.label}</label>
                    {item.name === "state" ? (
                      <select
                        name={item.name}
                        value={formData[item.name] || ""}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                      >
                        <option value="">Select State</option>
                        {statesList.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={item.type || "text"}
                        name={item.name}
                        value={formData[item.name] || ""}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        placeholder={`Enter ${item.label}`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  Cancel
                </motion.button>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Save
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Change Password Popup */}
      <AnimatePresence>
        {showPasswordPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-brightness-30 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Change Password</h2>
                <motion.button
                  onClick={() => setShowPasswordPopup(false)}
                  className="text-gray-600 hover:text-gray-800"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IoClose size={24} />
                </motion.button>
              </div>
              {passwordError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm border border-red-200"
                >
                  {passwordError}
                </motion.div>
              )}
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setShowPasswordPopup(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  Cancel
                </motion.button>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleChangePassword}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Save
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phone Verification Popup */}
      <AnimatePresence>
        {showVerificationPopup && (
          <div
            className="fixed inset-0 backdrop-brightness-30 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
          >
            <div
              className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl transform transition-transform duration-300 scale-100"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Verify Phone</h2>
                <button
                  onClick={() => setShowVerificationPopup(false)}
                  className="text-gray-600 hover:text-gray-800 transition-transform duration-200 transform hover:scale-110"
                >
                  <IoClose size={24} />
                </button>
              </div>
              {verificationError && (
                <div
                  className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm border border-red-200 transition-opacity duration-300"
                >
                  {verificationError}
                </div>
              )}
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Verification Code</label>
                  <input
                    type="text"
                    name="code"
                    value={verificationData.code}
                    onChange={handleVerificationChange}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    placeholder="Enter code"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowVerificationPopup(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-transform duration-200 transform hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  onClick={handleVerifyCode}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-transform duration-200 transform hover:scale-105"
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;