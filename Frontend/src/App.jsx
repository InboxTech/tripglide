import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchSection from "./components/SearchSection";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import FlightCardList from "./components/FlightCardList";
import CarHire from "./components/Carhire";
import Hotels from "./components/Hotels";
import FeaturesSection from "./components/FeaturesSection";

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/carhire" element={<CarHire />} />
          <Route path="/search-results" element={<FlightCardList />} />
          <Route path="/hotels" element={<Hotels />} /> 
          <Route path="/carhire" element={<CarHire />} /> 
          <Route path="/flights" element={<SearchSection />} />
          <Route path="/" element={<SearchSection />} />
          <Route path="/features" element={<FeaturesSection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



