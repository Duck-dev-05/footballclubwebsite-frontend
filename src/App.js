import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Navbar from "./Componment/Navbar";
import AboutUs from "./Componment/AboutUs";
import FeaturedPlayer from "./Componment/FeaturedPlayer";
import Footer from "./Componment/Footer";
import WelcomeSection from "./Componment/WelcomeSection";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<WelcomeSection />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/fixtures" element={<FeaturedPlayer />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;