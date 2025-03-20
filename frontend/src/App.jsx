import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "./components/Header";
import SearchSection from "./components/SearchSection";
import SignIn from "./components/SignIn";
import SignUp from "./components/Signup";
import FlightCardList from "./components/FlightCardList";
import CarHire from "./components/Carhire";
import FeaturesSection from "./components/FeaturesSection";
import CabListing from "./components/CabListing";

function App() {
  // Initialize user state from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [mockUsers, setMockUsers] = useState(() => {
    const savedMockUsers = localStorage.getItem("mockUsers");
    return savedMockUsers 
      ? JSON.parse(savedMockUsers) 
      : [{ username: "testuser", email: "test@example.com", password: "password123" }];
  });

  // Update localStorage whenever user or mockUsers changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("mockUsers", JSON.stringify(mockUsers));
  }, [mockUsers]);

  const handleSignUp = (userData) => {
    setMockUsers([...mockUsers, userData]);
    setUser({ username: userData.username, email: userData.email });
  };

  const handleSignIn = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <GoogleOAuthProvider clientId="903553660853-d2uiue8osd3cjshdgidtd2hq3pge2sce.apps.googleusercontent.com">
      <Router>
        <Header user={user} handleLogout={handleLogout} />
        <Routes>
          <Route path="/signin" element={<SignIn onSignIn={handleSignIn} mockUsers={mockUsers} />} />
          <Route path="/signup" element={<SignUp onSignUp={handleSignUp} mockUsers={mockUsers} />} />
          <Route path="/carhire" element={<CarHire />} />
          <Route path="/search-results" element={<FlightCardList />} />
          <Route path="/" element={<SearchSection />} />
          <Route path="/features" element={<FeaturesSection />} />
          <Route path="/cabs" element={<CabListing />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;