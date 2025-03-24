import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "./components/Header";
import SearchSection from "./components/SearchSection";
import SignIn from "./components/SignIn";
import SignUp from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import FlightCardList from "./components/FlightCardList";
import CarHire from "./components/Carhire";
import FeaturesSection from "./components/FeaturesSection";
import CabListing from "./components/CabListing";
import Help from "./components/Help";
import PrivacyPolicy from "./components/PrivacyPolicy";
import RegionalSettings from "./components/RegionalSettings";
import CountryFacts from "./components/CountryFacts";

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
      : [{ username: "testuser", email: "test@example.com", password: "Password123" }];
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
      password: userData.password || 'google-auth' // Handle Google sign-up
    };
    
    // Update mockUsers with the new user
    setMockUsers(prevUsers => {
      const newUsers = [...prevUsers, completeUserData];
      console.log("Added new user:", completeUserData); // Debug log
      return newUsers;
    });
    
    // Set the current user (without password)
    setUser({ 
      username: userData.username, 
      email: userData.email 
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
    <GoogleOAuthProvider clientId="446079422792-q1q20crdehjvc4blhpkn91u2f30iqmee.apps.googleusercontent.com">
      <Router>
        <Header user={user} handleLogout={handleLogout} />
        <Routes>
          <Route path="/signin" element={<SignIn onSignIn={handleSignIn} mockUsers={mockUsers} />} />
          <Route path="/signup" element={<SignUp onSignUp={handleSignUp} mockUsers={mockUsers} />} />
          <Route 
            path="/forgot-password" 
            element={<ForgotPassword 
              mockUsers={mockUsers} 
              setMockUsers={setMockUsers} 
            />} 
          />
          <Route path="/carhire" element={<CarHire />} />
          <Route path="/search-results" element={<FlightCardList />} />
          <Route path="/" element={<SearchSection />} />
          <Route path="/features" element={<FeaturesSection />} />
          <Route path="/cabs" element={<CabListing />} />
          <Route path="/help" element={<Help />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/regional-settings" element={<RegionalSettings />} />
          <Route path="/country-facts" element={<CountryFacts />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
