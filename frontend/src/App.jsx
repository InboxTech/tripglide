import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
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
import Hotels from "./components/Hotels";
import HotelSearch from "./components/HotelSearch";
import CarConfirmation from "./components/CarConfirmation";
import Login from "./components/Login"
import BookingConfirmed from "./components/BookingConfirmation";
import Cancel from "./components/Cancel";

// Initialize Stripe with your Publishable Key
// const stripePromise = loadStripe("pk_test_51RA1PaAGhuxmwIzwuekZ7LyLuwOFMdNXMGBGdVj7tO603Bz6Rq0lzHf51iuXuc6wJHCQIguaKycDVvzfhOx6gCxM00JF5p3CdX"); // Replace with your Stripe Publishable Key

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

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

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("mockUsers", JSON.stringify(mockUsers));
    console.log("Updated mockUsers:", mockUsers);
  }, [mockUsers]);

  const handleSignUp = (userData) => {
    const completeUserData = {
      username: userData.username,
      email: userData.email,
      password: userData.password || "google-auth",
    };

    setMockUsers((prevUsers) => {
      const newUsers = [...prevUsers, completeUserData]; // Fixed typo here
      console.log("Added new user:", completeUserData);
      return newUsers;
    });

    setUser({
      username: userData.username,
      email: userData.email,
    });
  };

  const handleSignIn = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

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
          <Route path="/search-results" element={<FlightCardList />} />
          <Route path="/" element={<SearchSection />} />
          <Route path="/features" element={<FeaturesSection />} />
          <Route path="/cabs" element={<CabListing />} />
          <Route path="/help" element={<Help />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/regional-settings" element={<RegionalSettings />} />
          <Route path="/country-facts" element={<CountryFacts />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotel-search" element={<HotelSearch />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/car-confirmation" element={<CarConfirmation />}/>
          <Route path="/booking-confirmed" element={<BookingConfirmed />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;





// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { loadStripe } from "@stripe/stripe-js";
// import axios from "axios";
// import Header from "./components/Header";
// import SearchSection from "./components/SearchSection";
// import SignIn from "./components/SignIn";
// import SignUp from "./components/Signup";
// import ForgotPassword from "./components/ForgotPassword";
// import FlightCardList from "./components/FlightCardList";
// import CarHire from "./components/Carhire";
// import FeaturesSection from "./components/FeaturesSection";
// import CabListing from "./components/CabListing";
// import Help from "./components/Help";
// import PrivacyPolicy from "./components/PrivacyPolicy";
// import RegionalSettings from "./components/RegionalSettings";
// import CountryFacts from "./components/CountryFacts";
// import Hotels from "./components/Hotels";
// import HotelSearch from "./components/HotelSearch";
// import CarConfirmation from "./components/CarConfirmation";

// // Initialize Stripe with your Publishable Key
// const stripePromise = loadStripe("pk_test_51RA1PaAGhuxmwIzwuekZ7LyLuwOFMdNXMGBGdVj7tO603Bz6Rq0lzHf51iuXuc6wJHCQIguaKycDVvzfhOx6gCxM00JF5p3CdX"); // Replace with your Stripe Publishable Key

// function App() {
//   const [user, setUser] = useState(() => {
//     const savedUser = localStorage.getItem("user");
//     return savedUser ? JSON.parse(savedUser) : null;
//   });

//   const [mockUsers, setMockUsers] = useState(() => {
//     const savedMockUsers = localStorage.getItem("mockUsers");
//     return savedMockUsers
//       ? JSON.parse(savedMockUsers)
//       : [
//           {
//             username: "testuser",
//             email: "test@example.com",
//             password: "Password123",
//           },
//         ];
//   });

//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("user", JSON.stringify(user));
//     } else {
//       localStorage.removeItem("user");
//     }
//   }, [user]);

//   useEffect(() => {
//     localStorage.setItem("mockUsers", JSON.stringify(mockUsers));
//     console.log("Updated mockUsers:", mockUsers);
//   }, [mockUsers]);

//   const handleSignUp = (userData) => {
//     const completeUserData = {
//       username: userData.username,
//       email: userData.email,
//       password: userData.password || "google-auth",
//     };

//     setMockUsers((prevUsers) => {
//       const newUsers = [...prevUsers, completeUserData]; // Fixed typo here
//       console.log("Added new user:", completeUserData);
//       return newUsers;
//     });

//     setUser({
//       username: userData.username,
//       email: userData.email,
//     });
//   };

//   const handleSignIn = (userData) => {
//     setUser(userData);
//   };

//   const handleLogout = () => {
//     setUser(null);
//   };

//   const handleCheckout = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5001/create-checkout-session",
//         {}
//       );
//       const sessionId = response.data.id;

//       const stripe = await stripePromise;
//       const { error } = await stripe.redirectToCheckout({ sessionId });

//       if (error) {
//         console.error("Stripe checkout error:", error.message);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   console.log("Current mockUsers:", mockUsers);

//   return (
//     <GoogleOAuthProvider clientId="903553660853-d2uiue8osd3cjshdgidtd2hq3pge2sce.apps.googleusercontent.com">
//       <Router>
//         <Header user={user} handleLogout={handleLogout} />
//         <Routes>
//           <Route
//             path="/signin"
//             element={<SignIn onSignIn={handleSignIn} mockUsers={mockUsers} />}
//           />
//           <Route
//             path="/signup"
//             element={<SignUp onSignUp={handleSignUp} mockUsers={mockUsers} />}
//           />
//           <Route
//             path="/forgot-password"
//             element={
//               <ForgotPassword mockUsers={mockUsers} setMockUsers={setMockUsers} />
//             }
//           />
//           <Route path="/carhire" element={<CarHire />} />
//           <Route path="/search-results" element={<FlightCardList />} />
//           <Route path="/" element={<SearchSection />} />
//           <Route path="/features" element={<FeaturesSection />} />
//           <Route path="/cabs" element={<CabListing />} />
//           <Route path="/help" element={<Help />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/regional-settings" element={<RegionalSettings />} />
//           <Route path="/country-facts" element={<CountryFacts />} />
//           <Route path="/hotels" element={<Hotels />} />
//           <Route path="/hotel-search" element={<HotelSearch />} />
//           <Route
//             path="/car-confirmation"
//             element={<CarConfirmation onCheckout={handleCheckout} />}
//           />
//         </Routes>
//       </Router>
//     </GoogleOAuthProvider>
//   );
// }

// export default App;