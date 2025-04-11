import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [identifierType, setIdentifierType] = useState(null);
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [verificationData, setVerificationData] = useState({ identifier: "", code: "", type: "" });
  const [verificationError, setVerificationError] = useState("");

  const API_URL = "http://localhost:5000/api";

  const isEmail = (str) => /^[\w\.-]+@[\w\.-]+\.\w+$/.test(str);
  const isPhone = (str) => /^\d{10}$/.test(str);

  // Reset state and clear local storage on page load/refresh
  useEffect(() => {
    // Clear local storage to ensure no stale user data
    localStorage.removeItem("user");
    localStorage.removeItem("coTravellers");
    localStorage.removeItem("devices");

    // Reset component state
    setFormData({ identifier: "", password: "" });
    setError("");
    setIdentifierType(null);
    setShowVerificationPopup(false);
    setVerificationData({ identifier: "", code: "", type: "" });
    setVerificationError("");

    // Call server reset endpoint
    fetch(`${API_URL}/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.success) {
          console.log("Server reset successful, ready for new user.");
        } else {
          console.error("Server reset failed:", res.error);
        }
      })
      .catch((err) => console.error("Error resetting server:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "identifier") {
      if (isEmail(value)) {
        setIdentifierType("email");
      } else if (isPhone(value)) {
        setIdentifierType("phone");
      } else {
        setIdentifierType(null);
      }
    }
  };

  const handleVerificationChange = (e) => {
    setVerificationData({ ...verificationData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { identifier, password } = formData;

    if (!identifier || !password) {
      setError("All fields are required");
      return;
    }

    if (!isEmail(identifier) && !isPhone(identifier)) {
      setError(
        identifierType === "email"
          ? "Please enter a valid email"
          : "Please enter a valid 10-digit phone number"
      );
      return;
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const res = await response.json();
      if (res.success) {
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/dashboard");
      } else if (res.requires_verification) {
        setVerificationData({ identifier: res.identifier, code: "", type: res.type });
        setShowVerificationPopup(true);
        setError("");
      } else {
        setError(res.error || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Server error. Please try again.");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await fetch(`${API_URL}/verify_code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: verificationData.identifier,
          code: verificationData.code,
        }),
      });
      const res = await response.json();
      if (res.success) {
        alert(`${verificationData.type === "email" ? "Email" : "Phone"} verified successfully! Please log in again.`);
        setShowVerificationPopup(false);
        setVerificationData({ identifier: "", code: "", type: "" });
        setVerificationError("");
      } else {
        setVerificationError(res.error || "Invalid verification code.");
      }
    } catch (err) {
      console.error("Error verifying code:", err);
      setVerificationError("Server error. Please try again.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="bg-white shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-md"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-gray-800 mb-6 text-center"
        >
          Log In
        </motion.h2>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700">
                {identifierType === "email" ? "Email" : identifierType === "phone" ? "Phone" : "Email or Phone"}
              </label>
              <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Enter your email or phone"
              />
              {formData.identifier && (
                <p className="text-xs text-gray-500 mt-1">
                  {identifierType === "email"
                    ? "Valid email format"
                    : identifierType === "phone"
                    ? "Valid 10-digit phone"
                    : "Enter a valid email or 10-digit phone number"}
                </p>
              )}
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Enter your password"
              />
            </motion.div>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition glow-button"
            >
              Log In
            </motion.button>
          </motion.div>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-sm text-gray-600 text-center"
        >
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </motion.p>
      </motion.div>

      <AnimatePresence>
        {showVerificationPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 backdrop-brightness-30 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-full max-w-md"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Verify {verificationData.type === "email" ? "Email" : "Phone"}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowVerificationPopup(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
              {verificationError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-100 text-red-600 p-2 rounded-md mb-4 text-sm"
                >
                  {verificationError}
                </motion.div>
              )}
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
                  <input
                    type="text"
                    name="code"
                    value={verificationData.code}
                    onChange={handleVerificationChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder={`Enter code sent to ${verificationData.identifier}`}
                  />
                </motion.div>
              </motion.div>
              <div className="flex justify-end mt-6">
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleVerifyCode}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
                >
                  Verify
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;