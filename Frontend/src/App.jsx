import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import TravelDeals from "./pages/TravelDeals";

function App() {
=======
import SearchSection from "./components/SearchSection";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import FlightCardList from "./components/FlightCardList";
import CarHire from "./components/Carhire";
import Hotels from "./components/Hotels";
import FeaturesSection from "./components/FeaturesSection";

function App() {

>>>>>>> 52f1aa5598013bb1c35f193ad01eb15080b5c388
  return (
    <Router>
      <div className="App">
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
=======
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/carhire" element={<CarHire />} />
          <Route path="/search-results" element={<FlightCardList />} />
          <Route path="/hotels" element={<Hotels />} /> 
          <Route path="/carhire" element={<CarHire />} /> 
          <Route path="/flights" element={<SearchSection />} />
          <Route path="/" element={<SearchSection />} />
          <Route path="/features" element={<FeaturesSection />} />
>>>>>>> 52f1aa5598013bb1c35f193ad01eb15080b5c388
        </Routes>
      </div>
    </Router>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;



>>>>>>> 52f1aa5598013bb1c35f193ad01eb15080b5c388
