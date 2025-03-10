import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Header from "./components/Header";
import FlightCardList from "./components/FlightCardList";
import CarHire from "./components/CarHire";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/search-results" element={<FlightCardList />} />
          <Route path="/flights" element={<LandingPage />} />
          {/* <Route path="/hotels" element={<Hotels />} />  */}
          <Route path="/carhire" element={<CarHire />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
