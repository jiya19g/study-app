// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import AboutUs from "./AboutUs";
import Help from "./Help";
import Dashboard from "./Dashboard"; // Import the Dashboard component
import "./index.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/help" element={<Help />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Add Dashboard route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;