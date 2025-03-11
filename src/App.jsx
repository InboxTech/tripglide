import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchSection from "./components/SearchSection";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import FlightCardList from "./components/FlightCardList";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<LandingPage />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/search-results" element={<FlightCardList />} />
          <Route path="/flights" element={<SearchSection />} />
          <Route path="/" element={<SearchSection />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;



