import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "./components/Header";
import SearchSection from "./components/SearchSection";
import SignIn from "./components/SignIn";
import SignUp from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import CarHire from "./components/Carhire";
import FeaturesSection from "./components/FeaturesSection";
import CabListing from "./components/CabListing";
import Help from "./components/Help";
import PrivacyPolicy from "./components/PrivacyPolicy";
import RegionalSettings from "./components/RegionalSettings";
import CountryFacts from "./components/CountryFacts";
import Hotels from "./components/Hotels";
import HotelSearch from "./components/HotelSearch";

// Import the new components
import FlightFilters from "./components/FlightFilters";
import FlightCards from "./components/FlightCards";
import FlightSearchFormPopup from "./components/FlightSearchFormPopup";
import FlightData from "./components/FlightData";
import FlightCart from "./components/FlightCart";

function App() {
  // Initialize user state from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Initialize mockUsers with a default user and load from localStorage if available
  const [mockUsers, setMockUsers] = useState(() => {
    const savedMockUsers = localStorage.getItem("mockUsers");
    return savedMockUsers
      ? JSON.parse(savedMockUsers)
      : [
          {
            username: "testuser",
            email: "test@example.com",
            password: "Password123",
          },
        ];
  });

  // Update localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Update localStorage whenever mockUsers changes
  useEffect(() => {
    localStorage.setItem("mockUsers", JSON.stringify(mockUsers));
    console.log("Updated mockUsers:", mockUsers); // Debug log
  }, [mockUsers]);

  // Handle user signup - store complete user data
  const handleSignUp = (userData) => {
    // Ensure we store the complete user object including password in mockUsers
    const completeUserData = {
      username: userData.username,
      email: userData.email,
      password: userData.password || "google-auth", // Handle Google sign-up
    };

    // Update mockUsers with the new user
    setMockUsers((prevUsers) => {
      const newUsers = [...prevUsers, completeUserData];
      console.log("Added new user:", completeUserData); // Debug log
      return newUsers;
    });

    // Set the current user (without password)
    setUser({
      username: userData.username,
      email: userData.email,
    });
  };

  // Handle user signin
  const handleSignIn = (userData) => {
    setUser(userData);
  };

  // Handle user logout
  const handleLogout = () => {
    setUser(null);
  };

  // For debugging - can be removed in production
  console.log("Current mockUsers:", mockUsers);

  return (
    <GoogleOAuthProvider clientId="903553660853-d2uiue8osd3cjshdgidtd2hq3pge2sce.apps.googleusercontent.com">
      <Router>
        <Header user={user} handleLogout={handleLogout} />
        <Routes>
          <Route
            path="/signin"
            element={<SignIn onSignIn={handleSignIn} mockUsers={mockUsers} />}
          />
          <Route
            path="/signup"
            element={<SignUp onSignUp={handleSignUp} mockUsers={mockUsers} />}
          />
          <Route
            path="/forgot-password"
            element={
              <ForgotPassword mockUsers={mockUsers} setMockUsers={setMockUsers} />
            }
          />
          <Route path="/carhire" element={<CarHire />} />
          {/* Replace FlightCardList with FlightData */}
          <Route path="/flight-cart" element={<FlightCart />} />
          <Route path="/search-results" element={<FlightData />} />
          <Route path="/" element={<SearchSection />} />
          <Route path="/features" element={<FeaturesSection />} />
          <Route path="/cabs" element={<CabListing />} />
          <Route path="/help" element={<Help />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/regional-settings" element={<RegionalSettings />} />
          <Route path="/country-facts" element={<CountryFacts />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotel-search" element={<HotelSearch />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;